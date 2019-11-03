# simple-react-state
Simple react state manager based on react hooks and react-redux. 

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
        name: ""
    }
}

let store = configureStore({
    preloadedState: preloadedState
})

function Info(props){
    const [user, updateUser] = useGlobalState('user');
    const [car, updateCar] = useLocalState({model: ''});

    let setUserEmail = (e) => {
        updateUser({
            action: 'assign',
            field: 'email',
            value: e.target.value
        });
    }

    let setCarModel = (e) => {
        updateCar({
            action: 'assign',
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

const App = <Provider store={store}><Info/></Provider>
ReactDOM.render(App, document.querySelector("#root"));
```

Supported actions are `assign`, `push`, `pop`, `remove` and `filter`