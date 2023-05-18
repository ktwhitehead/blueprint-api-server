"use strict";
/* eslint-disable camelcase */
exports.shorthands = undefined;
exports.up = pgm => {
    pgm.createType('screener_type', ['standard']);
    pgm.createTable('screener_sections', {
        id: { type: 'bigserial', primaryKey: true },
        title: { type: 'varchar', notNull: true },
        type: { type: 'screener_type', notNull: true },
        screener_id: {
            type: 'bigint',
            notNull: true,
            references: '"screeners"',
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
    pgm.dropTable('screener_sections');
    pgm.dropType('screener_type');
};
