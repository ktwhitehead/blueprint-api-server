import express, { Request, Response, NextFunction } from 'express'
import ScreenerService from '../services/ScreenerService.js'

const router = express.Router()

router.get('/screeners', async function (req: Request, res: Response, next: NextFunction) {
  const screenerService = new ScreenerService()
  const screenerList = await screenerService.list()
  res.json(screenerList)
})

router.get('/screeners/:id', async function (req: Request, res: Response, next: NextFunction) {
  const screenerId = Number(req.params.id)
  const screenerService = new ScreenerService()
  const screener = await screenerService.getScreener(screenerId)
  res.json(screener)
})

router.post('/screeners/:id/', async function (req: Request, res: Response, next: NextFunction) {
  const screenerId = Number(req.params.id)
  const answers = req.body.answers
  const screenerService = new ScreenerService()
  const screenerResult = await screenerService.determineAssessments(screenerId, answers)
  res.json({ results: screenerResult })
})

export { router }
