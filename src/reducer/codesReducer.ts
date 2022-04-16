import { ICode, IAction, IState } from "../interface"

export const codesReducer = (state: IState, action: IAction<ICode | ICode[] | boolean>): IState => {
  switch (action.type) {
    case 'putCode':
      return {
        ...state,
        codes: state.codes.concat(action.payload as ICode),
      }
    case 'delCode':
      const newDeletedState = [...state.codes.filter(code => code.id !== (action.payload as ICode).id)]
      return {
        ...state,
        codes: newDeletedState,
      }
    case 'patchCode':
      const newPatchedState = [...state.codes.map(code => code.id !== (action.payload as ICode).id
        ? code
        : action.payload as ICode
      )]
      return {
        ...state,
        codes: newPatchedState,
      }
    case 'fetchCodes':
      return {
        ...state,
        codes: action.payload as ICode[],
      }
    case 'setFetching':
      return {
        ...state,
        isFetching: action.payload as boolean,
      }
    default:
      return state
  }
}
