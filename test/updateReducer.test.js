import {updateReducer} from '../src';


test('test ASSIGN action type', () => {
    let initialState = {name: "Yezy", age: 24}
    let action = {
        type: "ASSIGN",
        field: "name",
        value: "Ilomo"
    }
    let newState = updateReducer(initialState, action)
    expect(newState).toStrictEqual({name: "Ilomo", age: 24})
})


test('test PUSH action type', () => {
    let initialState = {name: "Yezy", interests: ['Programming', 'Swimming']}
    let action = {
        type: "PUSH",
        field: "interests",
        value: "Reading"
    }
    let newState = updateReducer(initialState, action)
    expect(newState).toStrictEqual({name: "Yezy", interests: ['Programming', 'Swimming', 'Reading']})
})


test('test POP action type', () => {
    let initialState = {name: "Yezy", interests: ['Programming', 'Swimming']}
    let action = {
        type: "POP",
        field: "interests"
    }
    let newState = updateReducer(initialState, action)
    expect(newState).toStrictEqual({name: "Yezy", interests: ['Programming']})
})


test('test REMOVE action type', () => {
    let initialState = {name: "Yezy", interests: ['Programming', 'Swimming']}
    let action = {
        type: "REMOVE",
        field: "interests",
        value: "Programming"
    }
    let newState = updateReducer(initialState, action)
    expect(newState).toStrictEqual({name: "Yezy", interests: ['Swimming']})
})


test('test FILTER action type', () => {
    let initialState = {name: "Yezy", interests: ['Programming', 'Swimming', 'Reading']}
    let action = {
        type: "FILTER",
        field: "interests",
        value: (item) => item !== "Swimming"
    }
    let newState = updateReducer(initialState, action)
    expect(newState).toStrictEqual({name: "Yezy", interests: ['Programming', 'Reading']})
})


test('test BATCH update', () => {
    let initialState = {name: "Yezy", interests: ['Programming', 'Swimming', 'Reading']}
    let actions = [
        {
            type: "ASSIGN",
            field: "name",
            value: "Ilomo"
        },
        {
            type: "FILTER",
            field: "interests",
            value: (item) => item !== "Swimming"
        }
    ]

    let newState = updateReducer(initialState, actions)
    expect(newState).toStrictEqual({name: "Ilomo", interests: ['Programming', 'Reading']})
})