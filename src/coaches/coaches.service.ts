import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CoachesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createCoach( name: string, specialization: string, phone: string, email: string, team_code: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO coaches (name, specialization, phone, email, team_code) VALUES (?, ?, ?, ?, ?)',
      [name, specialization, phone, email, team_code],
    );
    return { id: result.insertId, name, specialization, phone, email, team_code };
  }

  async findById(coach_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM coaches WHERE coach_id = ?',
      [coach_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM coaches',
    );
    return rows;
  }

  async updateCoach(coach_id: number, partial: { name?: string; specialization?: string; phone?: string; email?: string; team_code?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.name) {
      fields.push('name = ?');
      values.push(partial.name);
    }
    if (partial.specialization) {
      fields.push('specialization = ?');
      values.push(partial.specialization);
    }
    if (partial.phone) {
      fields.push('phone = ?');
      values.push(partial.phone);
    }
    if (partial.email) {
      fields.push('email = ?');
      values.push(partial.email);
    }
    if (partial.team_code) {
      fields.push('team_code = ?');
      values.push(partial.team_code);
    }
    if (fields.length === 0) return await this.findById(Number(coach_id));
    values.push(coach_id);
    const sql = `UPDATE coaches SET ${fields.join(', ')} WHERE coach_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(Number(coach_id));

    }

  async deleteCoach(coach_id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM coaches WHERE coach_id = ?', [coach_id]);
    return res.affectedRows > 0;
  }

}