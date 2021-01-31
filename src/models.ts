export interface ITest {
  _id: string,
  type: string,
  title: 'Какая ты черепашка?',
  questions: Array<IQuestion>,
  results: any,
  keys: Array<string>,
  name: string,
}

export interface IQuestion {
  query: string,
  answers: Array<{ text: string, values: Object }>
}

