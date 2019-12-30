import { Provider } from 'react-redux';
import { configureStore } from './store';
import { updateReducer } from './reducers';
import { useLocalState, useGlobalState } from './hooks';


export { 
    Provider, configureStore, useLocalState, 
    useGlobalState, updateReducer
}
