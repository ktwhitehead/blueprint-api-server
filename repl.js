require('dotenv').config()
const repl = require('node:repl')

const run = async () => {
  const r = repl.start('bp-repl > ')

  r.context.ScreenerService = require('./dist/services/ScreenerService').default
}

run()

/*
  s = new ScreenerService()
  await s.list()

  await s.getScreener(1)
*/
