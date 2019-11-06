import { combineReducers } from 'redux';
import { configureStore as prepareStore } from 'redux-starter-kit';
import { rootReducer } from '../reducers';


function configureStore(config){
    // use initialState instaead of preloadedState to set initial store state
    config.preloadedState = config.initialState;
    let reducer = config.reducer;
    if(reducer === undefined){
        config.reducer = rootReducer
    }
    else{
        config.reducer = combineReducers({rootReducer, reducer});
    }

    let store = prepareStore(config);

    // Add setState method on store as altenative to dispatch with action
    // of type BASE_ACTION
    store.setState = function (baseAction){
        let action = {
            type: "BASE_ACTION",
            payload: baseAction
        };
        store.dispatch(action);
    }
    return store
}

export {configureStore}
