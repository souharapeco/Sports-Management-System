import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MatchesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createMatch( venue_id: number, match_date: string, match_time: string, status: string, home_score: string, away_score: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO matches (venue_id, match_date, match_time, status, home_score, away_score) VALUES (?, ?, ?, ?, 0, 0)',
      [venue_id, match_date, match_time, status, home_score, away_score],
    );
    return { id: result.insertId, venue_id, match_date, match_time, status, home_score, away_score };
  }

  async findById(match_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM matches WHERE match_id = ?',
      [match_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM matches',
    );
    return rows;
  }

  async updateMatch(match_id: number, partial: { match_date?: string; match_time?: string; status?: string; home_score?: string; away_score?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.match_date) {
      fields.push('match_date = ?');
      values.push(partial.match_date  );
    }
    if (partial.match_time) {
      fields.push('match_time = ?');
      values.push(partial.match_time);
    }
    if (partial.status) {
      fields.push('status = ?');
      values.push(partial.status);
    }
    if (partial.home_score) {
      fields.push('home_score = 0');
      values.push(partial.home_score);
    }
    if (partial.away_score) {
      fields.push('away_score = 0');
      values.push(partial.away_score);
    }
    if (fields.length === 0) return await this.findById(Number(match_id));
    values.push(match_id);
    const sql = `UPDATE matches SET ${fields.join(', ')} WHERE match_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(Number(match_id));

    }

  async deleteMatch(match_id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM matches WHERE match_id = ?', [match_id]);
    return res.affectedRows > 0;
  }

}