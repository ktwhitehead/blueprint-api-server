import { sql } from 'squid/pg.js'
import db from './db.js'

export enum ScreenerSectionType {
  standard = 'standard',
}

const ScreenerSections = {
  async create(title: string, type: ScreenerSectionType, screener_id: BigInt) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_sections (title, type, screener_id)
      VALUES (${title}, ${type}, ${screener_id})
      RETURNING id;
    `)
    return rows[0]
  },
  async find(id: BigInt) {
    const { rows } = await db.query(sql`
    SELECT * FROM screener_sections WHERE id = ${id} LIMIT 1;
    `)
    return rows[0]
  },
  async delete(id: BigInt) {
    await db.query(sql`
    DELETE FROM screener_sections WHERE id = ${id};
    `)
  },
}

export default ScreenerSections
