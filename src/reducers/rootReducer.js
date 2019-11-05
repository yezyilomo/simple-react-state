import { updateReducer } from "./";


function rootReducer(state, action) {
    switch (action.type) {
        case 'BASE_ACTION': {
            let baseAction = action.payload;
            return updateReducer(state, baseAction);
        }
        default:
            return state
    }
}

export { rootReducer }