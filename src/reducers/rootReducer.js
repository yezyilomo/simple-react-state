import { updateReducer } from "./";


function rootReducer(state, action) {
    switch (action.type) {
        case '__BASE_ACTIONS__': {
            return updateReducer(state, action);
        }
        default:
            return state
    }
}

export { rootReducer }