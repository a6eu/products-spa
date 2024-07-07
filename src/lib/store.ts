import { createStore } from 'redux';

interface AppState {
    search: string;
}

interface SetSearchAction {
    type: 'SET_SEARCH';
    payload: string;
}

export type RootState = ReturnType<typeof rootReducer>;

type AppAction = SetSearchAction;

const initialState: AppState = {
    search: '',
};

const rootReducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;
