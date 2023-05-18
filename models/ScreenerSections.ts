import { sql } from 'squid/pg.js'
import db from './db.js';

const ScreenerSections = {
  async create(title: any, type: any, screener_id: any) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_sections (title, type, screener_id)
      VALUES (${title}, ${type}, ${screener_id})
      RETURNING id;
    `);
    return rows[0];
  },
  async find(id: any) {
    const {rows} = await db.query(sql`
    SELECT * FROM screener_sections WHERE id = ${id} LIMIT 1;
    `);
    return rows[0];
  },
  async delete(id: any) {
    await db.query(sql`
    DELETE FROM screener_sections WHERE id = ${id};
    `);
  }
};

export default ScreenerSections
