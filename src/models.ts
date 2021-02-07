export interface INewTest {
  type: string,
  title: string,
  questions: Array<IQuestion>,
  results: any,
  keys: Array<string>,
  name: string,
}

export interface ITest extends INewTest {
  _id: string,
}

export interface IQuestion {
  query: string,
  answers: Array<{ text: string, values: Object }>
}

