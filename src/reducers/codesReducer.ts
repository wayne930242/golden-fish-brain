import { ICode, IAction, ICodes, TypeCodesState } from "../interface"

export const codesReducer = (state: ICodes, action: IAction<ICode | ICode[] | TypeCodesState>): ICodes => {
  switch (action.type) {
    case 'putCode':
      return {
        ...state,
        data: state.data.concat(action.payload as ICode),
      }
    case 'delCode':
      const newDeletedState = [...state.data.filter(code => code.id !== (action.payload as ICode).id)]
      return {
        ...state,
        data: newDeletedState,
      }
    case 'patchCode':
      const newPatchedState = [...state.data.map(code => code.id !== (action.payload as ICode).id
        ? code
        : action.payload as ICode
      )]
      return {
        ...state,
        data: newPatchedState,
      }
    case 'fetchCodes':
      return {
        ...state,
        data: action.payload as ICode[],
      }
    case 'setState':

      return {
        ...state,
        state: action.payload as TypeCodesState,
      }
    default:
      return state
  }
}
