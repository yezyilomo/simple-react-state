import { combineReducers } from 'redux';
import { configureStore as prepareStore } from 'redux-starter-kit';
import { rootReducer } from '../reducers';


function configureStore(config){
    let passedReducer = config.reducer;
    if(passedReducer === undefined){
        config.reducer = rootReducer
    }
    else{
        config.reducer = combineReducers({rootReducer, passedReducer});
    }

    let store = prepareStore(config);

    // Add setState method on store as altenative to dispatch with action
    // of type __BASE_ACTIONS__
    store.constructor.prototype.setState = function (action){
        action.type = "__BASE_ACTIONS__";
        this.dispatch(action);
    }
    return store
}

export {configureStore}
