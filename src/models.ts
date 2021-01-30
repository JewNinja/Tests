export interface ITest {
  _id: string,
  header: 'Какая ты черепашка?',
  questions: Array<IQuestion>,
  results: any,
  keys: Array<string>,
  name: string,
}

export interface IQuestion {
  query: string,
  answers: Array<{ text: string, key: string }>
}

