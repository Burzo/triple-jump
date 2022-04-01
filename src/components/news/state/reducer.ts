export enum ActionKind {
  Start = 'FETCH_START',
  Success = 'FETCH_SUCCESS',
  Error = 'FETCH_ERROR',
}

export type Action = {
  type: ActionKind
  payload?: any
}

export type State = {
  loading: boolean
  error: Error | null
  data: any
}

export const initialState: State = {
  loading: true,
  error: null,
  data: null,
}

export const MemeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.Start:
      return { ...state, loading: true }
    case ActionKind.Success:
      return { ...state, loading: false, error: null, data: action.payload }
    case ActionKind.Error:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
