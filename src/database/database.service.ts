import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    pool!: mysql.Pool;

    async onModuleInit() {
      this.pool = mysql.createPool({
          host: process.env.DB_HOST || 'mysql-3e9fe964-gbox-9cb8.i.aivencloud.com',
          port: +(process.env.DB_PORT || 23659),
          user: process.env.DB_USER || 'avnadmin',
          password: process.env.DB_PASSWORD || 'AVNS_5s1h0JIeFBwFjOOCpVg',
          database: process.env.DB_NAME || 'defaultdb',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
      });

        const conn = await this.pool.getConnection();
        await conn.ping();
        conn.release();
        console.log('MySQL pool created');
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    getPool() {
        return this.pool;
    }
}