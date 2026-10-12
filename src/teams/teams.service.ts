import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TeamsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createTeams( team_code: string, team_name: string, sport: string, division: string, founded_year: number, id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO teams (team_code, team_name, sport, division, founded_year, id) VALUES (?, ?, ?, ?, ?, ?)',
      [team_code, team_name, sport, division, founded_year, id],
    );

    return { id: result.insertId, team_code, team_name, sport, division, founded_year, };
  }

  async findById(team_code: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM teams WHERE team_code = ?',
      [team_code],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM teams',
    );
    return rows;
  }

  async updateTeams(team_code: string, partial: { team_code?: string; team_name?: string; sport?: string; division?: string; founded_year?: number; id?: number }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.team_code) {
      fields.push('team_code = ?');
      values.push(partial.team_code);
    }
    if (partial.team_name) {
      fields.push('team_name = ?');
      values.push(partial.team_name);
    }
    if (partial.sport) {
      fields.push('sport = ?');
      values.push(partial.sport);
    }
    if (partial.division) {
      fields.push('division = ?');
      values.push(partial.division);
    }
    if (partial.founded_year) {
      fields.push('founded_year = ?');
      values.push(partial.founded_year);
    }
    if (partial.id) {
      fields.push('id = ?');
      values.push(partial.id);
    }


    if (fields.length === 0) return await this.findById(team_code);
    values.push(team_code);
    const sql = `UPDATE teams SET ${fields.join(', ')} WHERE team_code = ?`;
    await this.pool().execute(sql, values);
    return this.findById(team_code);
  }

  async deleteTeams(team_code: string) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM teams WHERE team_code = ?', [team_code]);
    return res.affectedRows > 0;
  }


}