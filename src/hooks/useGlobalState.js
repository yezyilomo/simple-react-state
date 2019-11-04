import { useSelector, useDispatch } from 'react-redux';


function useGlobalState(stateSelector=null){

    let getStateSelector = (state) => {
        let fields = [];
        if(stateSelector !== null){
            fields = stateSelector.split(".");
        }
        let obj = state;
        for(let field of fields){
            obj = obj[field];
        }
        return obj;
    }

    let globalState = useSelector(getStateSelector);
    let dispatch = useDispatch();

    let updateState = (action) => {
        action.type = "__BASE_ACTIONS__";
        if(action.field !== undefined){
            action.field = stateSelector + '.' + action.field;
        }
        else{
            action.field = stateSelector;
        }
        dispatch(action);
    }

    return [globalState, updateState, dispatch];
}

export { useGlobalState }
