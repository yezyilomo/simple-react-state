# simple-react-state
A simple react state manager based on react hooks and react-redux which makes working with both local and global states completely painless it also works pretty well with nested states.

## Installing
```
yarn add simple-react-state
```

## Getting Started
### Using local state
```js
import React from 'react';
import { useLocalState } from 'simple-react-state';


function UserInfo(props){
    const [user, updateUser] = useLocalState({email: ""})

    let setUserEmail = (e) => {
        updateUser({
            field: 'email',
            value: e.target.value
        });
    }

    return (
        <div>
            User Email: {user.email}
            <br/>
            <input type="text" name="email" value={user.email} onChange={setUserEmail} />
        </div>
    );
}

const App = <UserInfo/>
ReactDOM.render(App, document.querySelector("#root"));
```

### Using global state
```js
import React from 'react';
import {
    Provider, configureStore, useGlobalState
} from 'simple-react-state';


let initialState = {
    user: {
        email: ""
    }
};

let store = configureStore({
    initialState: initialState
});

function UserInfo(props){
    const [user, updateUser] = useGlobalState('user');

    let setUserEmail = (e) => {
        updateUser({
            field: 'email',
            value: e.target.value
        });
    }

    return (
        <div>
            User Email: {user.email}
            <br/>
            <input type="text" name="email" value={user.email} onChange={setUserEmail} />
        </div>
    );
}

const App = <Provider store={store}><UserInfo/></Provider>
ReactDOM.render(App, document.querySelector("#root"));
```

## API
### `useLocalState` hook
`useLocalState` works just like `useState` hook too, it accepts initial state as an argument except it returns an array of local state and `updateState` function(not `setState` like in `useState` hook).

```js
let user = {
    name: 'Yezy',
    age: 24,
    account: {
        id: '23334',
        balance: 433.3
    }
}

[user, updateUser] = useLocalState(user)
```

### `useGlobalState` hook
`useGlobalState` works much like `useState` hook but it accepts a selection string and returns an array of three items which are state, updateState and dispatch, in most cases you will be using the first two items(state and updateState), the last item(dispatch) is for dispatching custom actions if you will have any. For example if you have a store with data like
```js
{
    user: {
        name: 'Yezy',
        age: 24,
        account: {
            id: '23334',
            balance: 433.3
        }
    }
}
```

you can use `useGlobalState` hook to select a deeply nested state like
```js
[age, updateAge, dispatch] = useGlobalState('user.age')
```

```js
[account, updateAccount, dispatch] = useGlobalState('user.account')
```

```js
[balance, updateBalance, dispatch] = useGlobalState('user.account.balance')
```

**Note:** If you pass nothing to `useGlobalState` the whole store is selected.

### `updateState`
`updateState` function works the same on both `useGlobalState` and `useLocalState` hooks, it dispatches an action to perform update on state, an action dispatched should have the following format 

```js
updateState({
    type: 'update type',
    field: 'your field',
    value: 'your value'
})
```

where type can be `ASSIGN`, `PUSH`, `POP`, `REMOVE` or `FILTER`, `ASSIGN` is for assigning a value to a field, `PUSH`, `POP`, `REMOVE` and `FILTER` are for arrays(correspond with array methods).


`ASSIGN` is the default action type, so if you haven't passed the type of your action that one will be used, therefore with this in mind

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

### `setState`
**simple-react-state** allows you to set global state with `setState` method from store object, `setState` works just like `updateState` in fact they are both using the same reducer, so all action types supported by `updateState` are also supported by `setState` too. Here is how to use it

```js
store.setState({
    type: 'ASSIGN',
    field: 'your field',
    value: 'your value'
});
```

**Note:** This should be used outside of your component.

With this in mind the first example above could be re-written to 

```js
import React from 'react';
import {
    Provider, configureStore,
    useGlobalState, useLocalState
} from 'simple-react-state';


let store = configureStore({});

store.setState(
    type: 'ASSIGN',
    field: 'user',
    value: {email: ''}
)

function UserInfo(props){
    const [user, updateUser] = useGlobalState('user');

    let setUserEmail = (e) => {
        updateUser({
            type: 'ASSIGN',
            field: 'email',
            value: e.target.value
        });
    }

    return (
        <div>
            User Email: {user.email}
            <br/>
            <input type="text" name="email" value={user.email} onChange={setUserEmail} />
        </div>
    );
}

const App = <Provider store={store}><UserInfo/></Provider>
ReactDOM.render(App, document.querySelector("#root"));
```

Pretty cool, right?