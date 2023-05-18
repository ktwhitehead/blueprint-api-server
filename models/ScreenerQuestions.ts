import { sql } from 'squid/pg.js'
import db from './db.js'

export enum ScreenerQuestionType {
  multiChoice = 'multi-choice',
  freeText = 'free-text',
  boolean = 'boolean',
  standard = 'standard',
}

export enum ScreenerQuestionDomain {
  depression = 'depression',
  mania = 'mania',
  anxiety = 'anxiety',
  substanceUse = 'substance_use',
}

const ScreenerQuestions = {
  async create(
    title: string,
    type: ScreenerQuestionType,
    screener_section_id: BigInt,
    domain: ScreenerQuestionDomain,
    answers: {
      title: string
      value: number
    }[],
  ) {
    const { rows } = await db.query(sql`
    INSERT INTO screener_questions (title, type, screener_section_id, domain, answers)
      VALUES (${title}, ${type}, ${screener_section_id}, ${domain}, ${JSON.stringify(answers)})
      RETURNING id;
    `)
    return rows[0]
  },
  async find(id: BigInt) {
    const { rows } = await db.query(sql`
    SELECT * FROM screener_questions WHERE id = ${id} LIMIT 1;
    `)
    return rows[0]
  },
  async delete(id: BigInt) {
    await db.query(sql`
    DELETE FROM screener_questions WHERE id = ${id};
    `)
  },
}

export default ScreenerQuestions
