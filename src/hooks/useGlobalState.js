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

    let updateState = (baseAction) => {
        if(baseAction.field !== undefined){
            baseAction.field = stateSelector + '.' + baseAction.field;
        }
        else{
            baseAction.field = stateSelector;
        }
        let action = {
            type: "BASE_ACTION", 
            payload: baseAction
        };
        dispatch(action);
    }

    return [globalState, updateState, dispatch];
}

export { useGlobalState }
