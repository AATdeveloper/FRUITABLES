import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../component/redux/slice/counter.slice';

function Counter(props) {

    const co = useSelector(state => state.counter_slice)
    console.log(co);

    const dispatch = useDispatch();
    const handleinc = () => {
        dispatch(increment())
    }
    
    const handledec = () => {
        dispatch(decrement())
        
    }
    return (
        <div>
            <button onClick={handleinc}>+</button>
            {co.count}
            <button onClick={handledec}>-</button>
        </div >
    );
}

export default Counter;