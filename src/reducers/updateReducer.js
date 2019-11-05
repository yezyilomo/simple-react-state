function updateState(state, action){
    if(typeof action !== 'object' || action === null){
        let type = typeof action;
        if (action === null){
            type = null;
        }
        throw TypeError(`updateState() argument must be an object, or array of objects, not array of '${type}', or mixed.`);
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
            // Update on zero level of obj nesting
            return valueChanged;
        }

        let newObj = {...obj};
        newObj[`${fieldName}`] = valueChanged;
        let finalObj = newObj;

        for(let oldObj of objStructure.reverse()){
            finalObj = {...oldObj.value};
            finalObj[`${oldObj.name}`] = newObj;
            newObj = finalObj;
        }
        return finalObj;
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
        // Invalid action arg type
        let type = typeof action;
        if (action === null){
            type = null;
        }
        throw TypeError(`updateReducer() argument must be an object, or array of objects, not '${type}'.`);
    }

    return state;
}

export {updateReducer}
