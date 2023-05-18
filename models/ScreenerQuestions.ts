import { sql } from 'squid/pg.js'
import db from './db.js';

const ScreenerQuestions = {
  async create(title: any, type: any, screener_section_id: any, domain: any, answers: any) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_questions (title, type, screener_section_id, domain, answers)
      VALUES (${title}, ${type}, ${screener_section_id}, ${domain}, ${answers})
      RETURNING id;
    `);
    return rows[0];
  },
  async find(id: any) {
    const { rows } = await db.query(sql`
    SELECT * FROM screener_questions WHERE id = ${id} LIMIT 1;
    `);
    return rows[0];
  },
  async delete(id: any) {
    await db.query(sql`
    DELETE FROM screener_questions WHERE id = ${id};
    `);
  }
};

export default ScreenerQuestions
