# simple-react-state
Simple react state manager based on react hooks and react-redux. **simple-react-state** makes working with both local and global react states completely painless it also works pretty well with nested states.

## Installing
```
yarn add simple-react-state
```

## Getting Started
```js
import React from 'react';
import {
    Provider, configureStore,
    useGlobalState, useLocalState
} from 'simple-react-state';


let preloadedState = {
    user: {
        email: ""
    }
};

let store = configureStore({
    preloadedState: preloadedState
});

function UserInfo(props){
    const [user, updateUser] = useGlobalState('user');
    const [car, updateCar] = useLocalState({model: ''});

    let setUserEmail = (e) => {
        updateUser({
            type: 'ASSIGN',
            field: 'email',
            value: e.target.value
        });
    }

    let setCarModel = (e) => {
        updateCar({
            type: 'ASSIGN',
            field: 'model',
            value: e.target.value
        });
    }

    return (
        <div>
            User Email: {user.email}
            <br/>
            <input type="text" name="email" value={user.email} onChange={setUserEmail} />
            <br/><br/><br/>
            Car Model: {car.model}
            <br/>
            <input type="text" name="model" value={car.model} onChange={setCarModel} />
        </div>
    );
}

const App = <Provider store={store}><UserInfo/></Provider>
ReactDOM.render(App, document.querySelector("#root"));
```

Supported action types are `ASSIGN`, `PUSH`, `POP`, `REMOVE` and `FILTER`. The action type `ASSIGN` is the default, so if you haven't passed the type of your action that one will be set, therefore with this

```js
updateUser({
    field: 'email',
    value: 'user@email.com'
})
```

is the same as
```js
updateUser({
    type: 'ASSIGN',
    field: 'email',
    value: 'user@email.com'
})
```
<br/>

**simple-react-state** allows you to set global state with `setState` method from store object as

```js
store.setState({
    type: 'ASSIGN',
    field: 'your field',
    value: 'your value
});
```

**Note:** This should be used outside of your component.

With this in mind the example above could be re-written to 

```js
import React from 'react';
import {
    Provider, configureStore,
    useGlobalState, useLocalState
} from 'simple-react-state';


let store = configureStore({});

store.setState(
    field: 'user',
    value: {email: ''}
)

function UserInfo(props){
    const [user, updateUser] = useGlobalState('user');
    const [car, updateCar] = useLocalState({model: ''});

    let setUserEmail = (e) => {
        updateUser({
            field: 'email',
            value: e.target.value
        });
    }

    let setCarModel = (e) => {
        updateCar({
            field: 'model',
            value: e.target.value
        });
    }

    return (
        <div>
            User Email: {user.email}
            <br/>
            <input type="text" name="email" value={user.email} onChange={setUserEmail} />
            <br/><br/><br/>
            Car Model: {car.model}
            <br/>
            <input type="text" name="model" value={car.model} onChange={setCarModel} />
        </div>
    );
}

const App = <Provider store={store}><UserInfo/></Provider>
ReactDOM.render(App, document.querySelector("#root"));
```

**Note:**
`useGlobalState` accepts a selection string, for example if you have store with data like
```js
{
    user: {
        name: 'Yezy',
        age: 24',
        account: {
            id: '23334',
            balance: 433.3
        }
    }
}
```

you can use `useGlobalState` hook to select a deeply nested state like
```js
[age, updateAge] = useGlobalState('user.age')
```

```js
[account, updateAccount] = useGlobalState('user.account')
```

```js
[balance, updateBalance] = useGlobalState('user.account.balance')
```

If you pass nothing to `useGlobalState` the whole store is selected.

`useLocalState` works just like `useState` hook, it accepts initial state as argument except it returns an array of local state and `updateState` function(not `setState` like in `useState` hook).

```js
let user = {
    name: 'Yezy',
    age: 24',
    account: {
        id: '23334',
        balance: 433.3
    }
}

[user, updateUser] = useLocalState(user)
```

`updateState` function works the same on both `useGlobalState` and `useLocalState` hooks. The standard format is 

```js
updateState({
    type: 'update type',
    field: 'your field',
    value: 'your value
})
```

where type can be `ASSIGN`, `PUSH`, `POP`, `REMOVE` or `FILTER`