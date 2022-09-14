const express = require('express');
const ScreenerService = require('../services/ScreenerService');
const router = express.Router();

router.get('/screeners', async function(req, res, next) {
  const screenerService = new ScreenerService();
  const screenerList = await screenerService.list();
  res.json(screenerList);
});

router.get('/screeners/:id', async function(req, res, next) {
  const screenerId = Number(req.params.id);
  const screenerService = new ScreenerService();
  const screener = await screenerService.getScreener(screenerId);
  res.json(screener);
});

router.post('/screeners/:id/', async function(req, res, next) {
  const screenerId = Number(req.params.id);
  const answers = req.body.answers;
  const screenerService = new ScreenerService();
  const screenerResult = await screenerService.determineAssessments(screenerId, answers);
  res.json({ results: screenerResult });
})

module.exports = router;
