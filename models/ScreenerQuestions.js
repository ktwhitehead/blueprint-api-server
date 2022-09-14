const sql = require('sql-template-strings');
const db = require('./db');

module.exports = {
  async create(title, type, screener_section_id, domain, answers) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_questions (title, type, screener_section_id, domain, answers)
      VALUES (${title}, ${type}, ${screener_section_id}, ${domain}, ${answers})
      RETURNING id;
    `);
    return rows[0];
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM screener_questions WHERE id = ${id} LIMIT 1;
    `);
    return rows[0];
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM screener_questions WHERE id = ${id};
    `);
  }
};