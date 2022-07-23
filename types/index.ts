export interface IUser {
  access: string;
  refresh: string;
}

export interface IAuth {
  user?: IUser;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message?: string;
}

export interface IQuestionOption {
  answer: string;
  correct: boolean;
  id: number;
}

export interface IQuestions {
  id: number;
  image?: string;
  multichoice: boolean;
  question: string;
  answers_list: IQuestionOption[];
}
