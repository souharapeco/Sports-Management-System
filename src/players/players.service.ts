import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PlayersService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createPlayer( first_name: string, last_name: string, birth_date: string, gender: string, phone: number, email: string, position: string, team_code: string ) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO players (first_name, last_name, birth_date, gender, phone, email, position, team_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, birth_date, gender, phone, email, position, team_code],
    );

    return { id: result.insertId, first_name, last_name, birth_date, gender, phone, email, position, team_code };
}


  async findById(players_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM players WHERE players_id = ?',
      [players_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM players',
    );
    return rows;
  }

  async updatePlayer(
    players_id: number, partial: { first_name?: string; last_name?: string; birth_date?: string; gender?: number; phone?: string; email?: string; position?: string; team_code?: string }) 
  {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.first_name) {
      fields.push('first_name = ?');
      values.push(partial.first_name);
    }

    if (partial.last_name) {
      fields.push('last_name = ?');
      values.push(partial.last_name);
    }

    if (partial.birth_date) {
      fields.push('birth_date = ?');
      values.push(partial.birth_date);
    }

    if (partial.gender) {
      fields.push('gender = ?');
      values.push(partial.gender);
    }

    if (partial.phone) {
      fields.push('phone = ?');
      values.push(partial.phone);
    }

    if (partial.email) {
      fields.push('email = ?');
      values.push(partial.email);
    }

    if (partial.position) {
      fields.push('position = ?');
      values.push(partial.position);
    }

    if (partial.team_code) {
      fields.push('team_code = ?');
      values.push(partial.team_code);
    }

    if (fields.length === 0) return await this.findById(Number(players_id));
    values.push(players_id);
    const sql = `UPDATE players SET ${fields.join(', ')} WHERE players_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(Number(players_id));
  }

  async deletePlayer(players_id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM players WHERE players_id = ?', [players_id]);
    return res.affectedRows > 0;

  }

}