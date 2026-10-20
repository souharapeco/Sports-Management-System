import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class VenuesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createVenue( venue_name: string, location: string, capacity: string, facility_type: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO venues (venue_name, location, capacity, facility_type) VALUES (?, ?, ?, ?)',
      [venue_name, location, capacity, facility_type],
    );
    return { id: result.insertId, venue_name, location, capacity, facility_type };
  }

  async findById(venue_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM venues WHERE venue_id = ?',
      [venue_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM venues',
    );
    return rows;
  }

  async updateVenue(venue_id: number, partial: { venue_name?: string; location?: string; capacity?: string; facility_type?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.venue_name) {
      fields.push('venue_name = ?');
      values.push(partial.venue_name);
    }
    if (partial.location) {
      fields.push('location = ?');
      values.push(partial.location);
    }
    if (partial.capacity) {
      fields.push('capacity = ?');
      values.push(partial.capacity);
    }
    if (partial.facility_type) {
      fields.push('facility_type = ?');
      values.push(partial.facility_type);
    }
    if (fields.length === 0) return await this.findById(Number(venue_id));
    values.push(venue_id);
    const sql = `UPDATE venues SET ${fields.join(', ')} WHERE venue_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(Number(venue_id));

    }   

  async deleteVenue(venue_id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM venues WHERE venue_id = ?', [venue_id]);
    return res.affectedRows > 0;
  }   
}
