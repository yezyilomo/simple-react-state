function updateState(state, dispatch){
    if(typeof dispatch !== 'object' || dispatch === null){
        let type = typeof dispatch;
        if (dispatch === null){
            type = null;
        }
        throw TypeError(`updateState() argument must be an object, or array of objects, not array of '${type}', or mixed.`);
    }

    let fields = []
    let fieldName = "stateKey"
    let obj = {stateKey: state}
    let objStructure = [];
    if(dispatch.field !== undefined){
        // At lest one level of obj nesting
        fields = dispatch.field.split(".");
        fieldName = fields.pop();
        obj = state;
        for(let field of fields){
            objStructure.push({name: field, value: obj});
            obj = obj[field];
        }
    }

    let recreateState = (valueChanged) => {
        if (dispatch.field === undefined){
            // Update on zero level of obj nesting
            return valueChanged;
        }

        let newObj = {...obj}
        newObj[`${fieldName}`] = valueChanged
        let finalObj = newObj;

        for(let oldObj of objStructure.reverse()){
            finalObj = {...oldObj.value};
            finalObj[`${oldObj.name}`] = newObj;
            newObj = finalObj
        }
        return finalObj;
    }

    if(dispatch.action === "assign" || dispatch.action === undefined){
        state = recreateState(dispatch.value)
    }
    else if(dispatch.action === "push"){
        let newArray = [...obj[fieldName]]
        newArray.push(dispatch.value);
        state = recreateState(newArray);
    }
    else if(dispatch.action === "pop"){
        let newArray = [...obj[fieldName]]
        newArray.pop();
        state = recreateState(newArray);
    }
    else if(dispatch.action === "remove"){
        let newArray = [...obj[fieldName]]
        let index = newArray.indexOf(dispatch.value);
        if (index > -1){
            newArray.splice(index, 1);
        }
        state = recreateState(newArray);
    }
    else if(dispatch.action === "filter"){
        let newArray = [...obj[fieldName]]
        let filteredArray = newArray.filter(dispatch.value);
        state = recreateState(filteredArray);
    }
    else{
        // Unsupported Operator
    }
    return state
}


function updateReducer(state, dispatch){
    if(Array.isArray(dispatch)){
        // Batch update
        for(let dispatch of dispatch){
            state = updateState(state, dispatch);
        }
    }
    else if(typeof dispatch === 'object' && dispatch !== null){
        // Single update
        state = updateState(state, dispatch);
    }
    else {
        // Invalid dispatch arg type
        let type = typeof dispatch;
        if (dispatch === null){
            type = null;
        }
        throw TypeError(`updateReducer() argument must be an object, or array of objects, not '${type}'.`);
    }

    return state
}

export {updateReducer}
