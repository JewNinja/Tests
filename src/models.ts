export interface INewTest {
  type: string;
  title: string;
  questions: Array<IQuestion>;
  results: Record<string, string>;
  keys: Array<string>;
  name: string;
}

export interface ITest extends INewTest {
  _id: string;
}

export interface IQuestion {
  query: string;
  answers: Array<IAnswer>;
}

export interface IAnswer {
  text: string;
  values: Record<string, number>;
}

