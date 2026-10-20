import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StandingsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createStandings( team_code: string, wins: number, losses: number, points: number, ranking: string,) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO standings (team_code, wins, losses, points, ranking) VALUES (?, 0, 0, 0, ?)',
      [team_code, wins, losses, points, ranking],
    );
    return { id: result.insertId, team_code, wins, losses, points, ranking };
  }

  async findById(standing_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM standings WHERE standing_id = ?',
      [standing_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM standings',
    );
    return rows;
  }

  async updateStandings(standing_id: number, partial: { team_code?: string; wins?: number; losses?: number; points?: number; ranking?: string; away_score?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.team_code) {
      fields.push('team_code = ?');
      values.push(partial.team_code);
    }
    if (partial.wins) {
      fields.push('wins = 0');
      values.push(partial.wins);
    }
    if (partial.losses) {
      fields.push('losses = 0');
      values.push(partial.losses);
    }
    if (partial.points) {
      fields.push('points = 0');
      values.push(partial.points);
    }
    if (partial.ranking) {
      fields.push('ranking = ?');
      values.push(partial.ranking);
    }
    
    if (fields.length === 0) return await this.findById(Number(standing_id));
    values.push(standing_id);
    const sql = `UPDATE standings SET ${fields.join(', ')} WHERE standing_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(Number(standing_id));

    }

  async deleteStandings(standing_id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM standings WHERE standing_id = ?', [standing_id]);
    return res.affectedRows > 0;
  }

}