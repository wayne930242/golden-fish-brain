import { TypeLaws } from "./data/laws";

export interface ICodes extends Array<ICode> { }
export interface ICode {
  title: string,
  law: string,
  nums: string[],
  star: number,
  familiar: number,
  note: string,
  hasPeeped: boolean,
  link: string,
}

export interface Laws extends Array<Law> { }
export interface Law<Key extends TypeLaws> {
  id: Key,
  codes: ICode[],
}
