import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalState } from '../src/';


test('should update age only', () => {
    const { result } = renderHook(() => useLocalState({ name: "Yezy", age: 24 }))

    act(() => {
        result.current[1]({
            field: "age",
            value: 25
        })
    })

    expect(result.current[0]).toStrictEqual({ name: "Yezy", age: 25 })
})