import { TypeLaws } from "./data/laws";

export interface ICode {
  id: string,
  title: string,
  law: string,
  nums: string[],
  star: number,
  note: string,
  link: string,
  createTime: number,
  editTime: number,
  familiar: number[],
  reviewTime: number[],
  hasPeeped: boolean[],
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
  codes: ICodes,
  session: ISession,
}

export interface ICodes {
  data: ICode[],
  state: TypeCodesState,
}

type TypeCodesState = 'idle' | 'fetching' | 'error' | 'done'

export interface ISession {
  name: string | null,
  state: TypeSessionState,
}

type TypeSessionState = 'login' | 'error' | 'idle'

export type TypeCodesDispatch = React.Dispatch<IAction<ICode | ICode[] | TypeCodesState>>
export type TypeSessionDispatch = React.Dispatch<IAction<string | false>>
export type TypeDispatch = {
  codes: TypeCodesDispatch,
  session: TypeSessionDispatch,
}
