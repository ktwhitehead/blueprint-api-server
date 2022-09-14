const Screeners = require('../models/Screeners')

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
  }
]

module.exports = class ScreenerService {
  constructor() {}

  async list() {
    const screeners = await Screeners.list();
    return screeners;
  }

  async getScreener(id) {
    const screener = await Screeners.fullScreener(id);

    const sections = screener.sections.map((section) => {
      const answers = section.questions.map((question) => question.answers)
      const uniqueAnswers = [...new Map(answers.map((answer) => [answer["title"], answer])).values()]?.[0]
      return {
        type: section.type,
        title: section.title,
        answers: uniqueAnswers,
        questions: section.questions
      }
    });

    const formattedScreener = {
      id: screener.id,
      name: screener.short_name,
      disorder: screener.disorder,
      content: { sections }
    }

    return formattedScreener
  }

  async determineAssessments(screenerId, answers) {
    const questions = await Screeners.questionsForScreener(screenerId);
    const answersWithDomain = answers.map((answer) => ({
      ...answer,
      domain: questions.find((question) =>
        Number(question.question_id) === answer.question_id).domain
    }));

    const assessments = assessmentMap.map((assessment) => {
      const answersByDomain = answersWithDomain.filter((answer) => answer.domain === assessment.domain)
      const valueByDomain = answersByDomain.map((answer) => answer.value).reduce((a, b) => a + b, 0)
      if (valueByDomain >= assessment.value) return assessment.name
    }).filter(Boolean)

    return assessments
  }
}
