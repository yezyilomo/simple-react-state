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
    return prepareStore(config);
}

export {configureStore}