import { Provider } from 'react-redux';
import { configureStore } from './store';
import { useLocalState, useGlobalState } from './hooks';
import { rootReducer, updateReducer } from './reducers';


export { 
    Provider, configureStore, useLocalState, 
    useGlobalState, updateReducer
}
