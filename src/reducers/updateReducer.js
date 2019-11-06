function updateState(state, action){
    if(typeof action !== 'object' || action === null){
        // Invalid action
        let type = typeof action;
        if (action === null){
            type = null;
        }
        throw TypeError(`updateState() argument must be action object not '${type}'.`);
    }

    let fields = [];
    let fieldName = "stateKey";
    let obj = {stateKey: state};
    let objStructure = [];

    if(action.field !== undefined){
        // At lest one level of obj nesting
        fields = action.field.split(".");
        fieldName = fields.pop();
        obj = state;
        for(let field of fields){
            objStructure.push({name: field, value: obj});
            obj = obj[field];
        }
    }
    
    let recreateState = (valueChanged) => {
        if (action.field === undefined){
            // Update entire state
            return valueChanged;
        }

        // Create a partial compy of an object to update
        let newObj = {...obj};

        // Update required field
        newObj[`${fieldName}`] = valueChanged;
        let updatedState = newObj;

        // Recreate state object(patch back updated copy of an object to state)
        for(let oldObj of objStructure.reverse()){
            updatedState = {...oldObj.value};
            updatedState[`${oldObj.name}`] = newObj;
            newObj = updatedState;
        }
        return updatedState;
    }

    switch (action.type) {
        case 'ASSIGN':
        case undefined: {
            return recreateState(action.value);
        }
        case 'PUSH': {
            let newArray = [...obj[fieldName]];
            newArray.push(action.value);
            return recreateState(newArray);
        }
        case 'POP': {
            let newArray = [...obj[fieldName]];
            newArray.pop();
            return recreateState(newArray);
        }
        case 'REMOVE': {
            let newArray = [...obj[fieldName]];
            let index = newArray.indexOf(action.value);
            if (index > -1){
                newArray.splice(index, 1);
            }
            return recreateState(newArray);
        }
        case 'FILTER': {
            let newArray = [...obj[fieldName]];
            let filteredArray = newArray.filter(action.value);
            return recreateState(filteredArray);
        }
        default:
            return state
    }
}


function updateReducer(state, action){
    if(Array.isArray(action)){
        // Batch update
        for(let actionItem of action){
            state = updateState(state, actionItem);
        }
    }
    else if(typeof action === 'object' && action !== null){
        // Single update
        state = updateState(state, action);
    }
    else {
        // Invalid action
        let type = typeof action;
        if (action === null){
            type = null;
        }
        throw TypeError(`updateReducer() argument must be action object, or array of actions, not '${type}'.`);
    }

    return state;
}

export {updateReducer}
