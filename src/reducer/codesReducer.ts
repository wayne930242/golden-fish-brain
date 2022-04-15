import { ICode, IAction } from "../interface"

const initialState: ICode[] = []

export const codesReducer = (state: ICode[], action: IAction<ICode | ICode[]>): ICode[] => {
  switch (action.type) {
    case 'putCode':
      return state.concat(action.payload as ICode)
    case 'delCode':
      const newDeletedState = [...state.filter(code => code.id !== (action.payload as ICode).id)]
      return newDeletedState
    case 'patchCode':
      const newPatchedState = [...state.map(code => code.id !== (action.payload as ICode).id
        ? code
        : action.payload as ICode
      )]
      return newPatchedState
    case 'fetchCodes':
      return action.payload as ICode[]
    default:
      return state
  }
}
