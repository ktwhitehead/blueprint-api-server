/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('screeners', {
    id: { type: 'bigserial', primaryKey: true },
    disorder: { type: 'varchar', notNull: true },
    short_name: { type: 'varchar', notNull: true },
    full_name: { type: 'varchar', notNull: true },
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
  pgm.dropTable('screeners');
};
