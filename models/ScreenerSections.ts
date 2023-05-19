import { sql } from 'squid/pg.js'
import db from './db.js'
import { ScreenerQuestionType, ScreenerQuestion } from './ScreenerQuestions.js'

export enum ScreenerSectionType {
  standard = 'standard',
}

export type ScreenerSection = {
  id: number
  title: string
  type: ScreenerQuestionType
  screener_id: number
  questions: ScreenerQuestion[]
  created_at: string
  updated_at: string
}

const ScreenerSections = {
  async create(title: string, type: ScreenerSectionType, screener_id: number) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_sections (title, type, screener_id)
      VALUES (${title}, ${type}, ${screener_id})
      RETURNING id;
    `)
    return rows[0]
  },
  async find(id: number) {
    const { rows } = await db.query(sql`
    SELECT * FROM screener_sections WHERE id = ${id} LIMIT 1;
    `)
    return rows[0]
  },
  async delete(id: number) {
    await db.query(sql`
    DELETE FROM screener_sections WHERE id = ${id};
    `)
  },
}

export default ScreenerSections
