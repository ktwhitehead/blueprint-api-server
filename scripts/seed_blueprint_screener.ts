import Screeners from '../models/Screeners.js'
import ScreenerSections from '../models/ScreenerSections.js'
import ScreenerQuestions from '../models/ScreenerQuestions.js'

const screenerQuestions = [
  { text: 'Little interest or pleasure in doing things?', domain: 'depression' },
  { text: 'Feeling down, depressed, or hopeless?', domain: 'depression' },
  { text: 'Sleeping less than usual, but still have a lot of energy?', domain: 'mania' },
  { text: 'Starting lots more projects than usual or doing more risky things than usual?', domain: 'mania' },
  { text: 'Feeling nervous, anxious, frightened, worried, or on edge?', domain: 'anxiety' },
  { text: 'Feeling panic or being frightened?', domain: 'anxiety' },
  { text: 'Avoiding situations that make you feel anxious?', domain: 'anxiety' },
  { text: 'Drinking at least 4 drinks of any kind of alcohol in a single day?', domain: 'substance_use' }
]

const screenerQuestionAnswers = JSON.stringify([
  { title: 'Not at all', value: 0 },
  { title: 'Rare, less than a day or two', value: 1 },
  { title: 'Several days', value: 2 },
  { title: 'More than half the days', value: 3 },
  { title: 'Nearly every day', value: 4 }
])

const run = async () => {
  const screener = await Screeners.create('Cross-Cutting', 'BPDS', 'Blueprint Diagnostic Screener')

  const screenerSection = await ScreenerSections.create(
    'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
    'standard',
    screener.id
  )

  screenerQuestions.forEach(async (question) => {
    await ScreenerQuestions.create(
      question.text,
      'multi-choice',
      screenerSection.id,
      question.domain,
      screenerQuestionAnswers
    )
  })
}

run()