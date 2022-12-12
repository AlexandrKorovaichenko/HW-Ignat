

const ADD_LOADING = "ADD-LOADING"

export function SetLoadingActionCreator(status: boolean): SetLoadingActionType{ return { type: ADD_LOADING, status } }

type SetLoadingActionType = {
    type: "ADD-LOADING"
    status: boolean
  }

type LoadingStateType = {
    loading: boolean
}

const initState = {
    loading: false
}


export const loadingReducer = (state: LoadingStateType = initState, action: SetLoadingActionType): LoadingStateType => { 
    switch (action.type) {
        
        case ADD_LOADING: {
            return {...state, loading: !state.loading }
        };

        default: return state
    }
}