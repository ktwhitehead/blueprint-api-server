/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('screener_answers', {
    id: 'bigserial',
    question_id: { type: 'bigint', notNull: true, references: '"screener_questions"' },
    value: { type: 'varchar' },
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
  pgm.dropTable('screener_answers');
};
