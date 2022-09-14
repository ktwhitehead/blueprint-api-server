const sql = require('sql-template-strings');
const db = require('./db');

module.exports = {
  async create(disorder, short_name, full_name) {
    const { rows } = await db.query(sql`
    INSERT INTO screeners (disorder, short_name, full_name)
      VALUES (${disorder}, ${short_name}, ${full_name})
      RETURNING id;
    `);
    return rows[0];
  },
  async find(id) {
    const { rows } = await db.query(sql`
    SELECT * FROM screeners WHERE id = ${id} LIMIT 1;
    `);
    return rows[0];
  },
  async list() {
    const { rows } = await db.query(sql`
    SELECT * FROM screeners;
    `);
    return rows;
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM screeners WHERE id = ${id};
    `);
  },
  async questionsForScreener(id) {
    const { rows } = await db.query(sql`
    SELECT
      sq.id question_id,
      sq.domain
    FROM screener_questions sq
    JOIN screener_sections ss ON sq.screener_section_id = ss.id
    JOIN screeners s ON ss.screener_id = s.id
    WHERE s.id = ${id};
    `)
    return rows
  },
  async fullScreener(id) {
    const { rows } = await db.query(sql`
    SELECT
      id,
      disorder,
      short_name,
      full_name,
      json_agg(json_build_object('type', type, 'title', title, 'questions', questions)) as sections
    FROM (
      SELECT
        s.id,
        s.disorder,
        s.short_name,
        s.full_name,
        ss.type,
        ss.title,
        json_agg(json_build_object('id', sq.id, 'title', sq.title, 'type', sq.type, 'answers', answers)) as questions
      FROM screeners s
      JOIN screener_sections ss ON s.id = ss.screener_id
      JOIN screener_questions sq ON ss.id = screener_section_id
      GROUP BY s.id, s.disorder, s.short_name, s.full_name, ss.type, ss.title
    ) a
    WHERE id = ${id}
    GROUP BY id, disorder, short_name, full_name;
    `);
    return rows[0]
  }
};