import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../component/redux/action/counter.action';

function Counter(props) {

    const co = useSelector(state => state.counter)
    console.log(co);

    const dispatch = useDispatch();
    const handleinc = () => {
        dispatch(increment())
    }
    const handledec = () => {

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