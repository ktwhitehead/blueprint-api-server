import Screeners from '../models/Screeners.js'

const assessmentMap = [
  {
    domain: 'depression',
    value: 2,
    name: 'PHQ-9',
  },
  {
    domain: 'mania',
    value: 2,
    name: 'ASRM',
  },
  {
    domain: 'anxiety',
    value: 2,
    name: 'PHQ-9',
  },
  {
    domain: 'substance_use',
    value: 1,
    name: 'ASSIST',
  },
]

class ScreenerService {
  constructor() {}

  async list() {
    const screeners = await Screeners.list()
    return screeners
  }

  async getScreener(id: BigInt) {
    const screener = await Screeners.fullScreener(id)

    const sections = screener.sections.map((section: any) => {
      const answers = section.questions.map((question: any) => question.answers)
      const uniqueAnswers = [
        ...new Map(answers.map((answer: any) => [answer['title'], answer])).values(),
      ]?.[0]
      return {
        type: section.type,
        title: section.title,
        answers: uniqueAnswers,
        questions: section.questions,
      }
    })

    const formattedScreener = {
      id: screener.id,
      name: screener.short_name,
      disorder: screener.disorder,
      content: { sections },
    }

    return formattedScreener
  }

  async determineAssessments(screenerId: BigInt, answers: any) {
    const screenerQuestions = await Screeners.questionsForScreener(screenerId)
    const answersWithDomain = answers.map((answer: any) => ({
      ...answer,
      domain: screenerQuestions.find((question: any) => Number(question.question_id) === answer.question_id)
        .domain,
    }))

    const assessments = assessmentMap
      .map((assessment) => {
        const answersByDomain = answersWithDomain.filter((answer: any) => answer.domain === assessment.domain)

        const valueByDomain = answersByDomain
          .map((answer: any) => answer.value)
          .reduce((a: any, b: any) => a + b, 0)

        if (valueByDomain >= assessment.value) return assessment.name
      })
      .filter(Boolean)

    return assessments
  }
}

export default ScreenerService
