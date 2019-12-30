import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider, configureStore, useGlobalState } from '../src/';


test('should update name only', () => {
    const store = configureStore({initialState: { name: "Yezy", age: 24 }})
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
    const { result } = renderHook(() => useGlobalState("name"), { wrapper })

    act(() => {
        result.current[1]({
            value: "Ilomo"
        })
    })

    expect(result.current[0]).toBe("Ilomo")  // Make sure we get only selected value 
    expect(store.getState()).toStrictEqual({name: "Ilomo", age: 24})  // Make sure the store is updated
})