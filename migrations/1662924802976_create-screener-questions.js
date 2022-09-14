/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createType('screener_question_type', ['multi-choice', 'free-text', 'boolean']);

  pgm.createTable('screener_questions', {
    id: { type: 'bigserial', primaryKey: true },
    title: { type: 'varchar', notNull: true },
    type: { type: 'screener_question_type', notNull: true },
    domain: { type: 'varchar', notNull: true },
    answers: { type: 'jsonb' },
    screener_section_id: {
      type: 'bigint',
      notNull: true,
      references: '"screener_sections"',
      onDelete: 'cascade'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp'
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('screener_questions');
  pgm.dropType('screener_question_type');
};
