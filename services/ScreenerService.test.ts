import ScreenerService from './ScreenerService.js'
import Screeners from '../models/Screeners.js'

const fullScreener = {
  id: 123,
  disorder: 'disorder',
  short_name: 'short_name',
  full_name: 'full_name',
  sections: [
    {
      type: 'standard',
      title: 'section title',
      questions: [
        {
          id: 1,
          title: 'question 1',
          type: 'multi-choice',
          answers: [
            { title: 'Choice 1', value: 0 },
            { title: 'Choice 2', value: 1 },
            { title: 'Choice 3', value: 2 },
            { title: 'Choice 4', value: 3 }
          ]
        }
      ]
    }
  ]
}

const userAnswers = [
  { question_id: 1, value: 2 },
  { question_id: 2, value: 1 },
  { question_id: 3, value: 0 }
]

describe('ScreenerService', () => {
  describe('getScreener', () => {
    it('calls on the db for the screener data and formats it properly', async () => {
      jest.spyOn(Screeners, 'fullScreener').mockImplementationOnce(async () => fullScreener)
      const screenerService = new ScreenerService()
      const result = await screenerService.getScreener(123)

      const answers = result.content.sections[0].answers
      const questions = result.content.sections[0].questions

      expect(result.content.sections.length).toEqual(1)
      expect(answers.length).toEqual(4)
      expect(questions.length).toEqual(1)
      expect(questions[0].title).toEqual('question 1')
    })
  })

  describe('determineAssessments', () => {
    it('calculates a score per domain and retuns the expected results', async () => {
      jest.spyOn(Screeners, 'questionsForScreener').mockImplementationOnce(async () => [
        { question_id: 1, domain: 'depression' },
        { question_id: 2, domain: 'substance_use' },
        { question_id: 3, domain: 'mania' }
      ])
      const screenerService = new ScreenerService()
      const result = await screenerService.determineAssessments(123, userAnswers)

      expect(result).toEqual(['PHQ-9', 'ASSIST'])
    })
  })
})
