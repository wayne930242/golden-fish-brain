import { TypeLaws } from "./data/laws";

export interface ICodes extends Array<ICode> { }
export interface ICode {
  id: string,
  title: string,
  law: string,
  nums: string[],
  star: number,
  familiar: number,
  note: string,
  hasPeeped: boolean,
  link: string,
  createTime: number,
  editTime: number,
  reviewTime: number,
}

export interface Laws extends Array<Law> { }
export interface Law<Key extends TypeLaws> {
  id: Key,
  codes: ICode[],
}

export interface IAction<Payload> {
  type: string,
  payload?: Payload,
}

export interface IState {
  codes: ICode[],
  isFetching: boolean,
}
