import Screeners from '../models/Screeners.js'
import ScreenerSections from '../models/ScreenerSections.js'
import ScreenerQuestions, {
  ScreenerQuestionDomain,
  ScreenerQuestionType,
} from '../models/ScreenerQuestions.js'
import { ScreenerSectionType } from '../models/ScreenerSections.js'

const screenerQuestions = [
  { text: 'Little interest or pleasure in doing things?', domain: ScreenerQuestionDomain.depression },
  { text: 'Feeling down, depressed, or hopeless?', domain: ScreenerQuestionDomain.depression },
  { text: 'Sleeping less than usual, but still have a lot of energy?', domain: ScreenerQuestionDomain.mania },
  {
    text: 'Starting lots more projects than usual or doing more risky things than usual?',
    domain: ScreenerQuestionDomain.mania,
  },
  {
    text: 'Feeling nervous, anxious, frightened, worried, or on edge?',
    domain: ScreenerQuestionDomain.anxiety,
  },
  { text: 'Feeling panic or being frightened?', domain: ScreenerQuestionDomain.anxiety },
  { text: 'Avoiding situations that make you feel anxious?', domain: ScreenerQuestionDomain.anxiety },
  {
    text: 'Drinking at least 4 drinks of any kind of alcohol in a single day?',
    domain: ScreenerQuestionDomain.substanceUse,
  },
]

const screenerQuestionAnswers = [
  { title: 'Not at all', value: 0 },
  { title: 'Rare, less than a day or two', value: 1 },
  { title: 'Several days', value: 2 },
  { title: 'More than half the days', value: 3 },
  { title: 'Nearly every day', value: 4 },
]

const run = async () => {
  const screener = await Screeners.create('Cross-Cutting', 'BPDS', 'Blueprint Diagnostic Screener')

  const screenerSection = await ScreenerSections.create(
    'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
    ScreenerSectionType.standard,
    screener.id,
  )

  screenerQuestions.forEach(async (question) => {
    await ScreenerQuestions.create(
      question.text,
      ScreenerQuestionType.multiChoice,
      screenerSection.id,
      question.domain,
      screenerQuestionAnswers,
    )
  })
}

run()
