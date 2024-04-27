
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes/PrivateRoutes';
import { configstore } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'



function App() {
  const { store, persistor } = configstore()



  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/*" element={<UserRoutes />} />

            <Route element={<PrivateRoutes />}>
              <Route exact path="/admin/*" element={<AdminRoutes />} />
            </Route>



          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;


// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement, incrementByAmount } from './admin/component/redux/counterSlice';

// const App = () => {


//   const counter = useSelector(state => state.counter.value);
//   const dispatch = useDispatch();

//   // const [counter, setCounter] = useState(0);

//   const incrementCounter = () => {
//     dispatch(increment());
//   };

//   const decrementCounter = () => {
//     dispatch(decrement());
//   };

//   return (
//     <div>
//       <div>counter = {counter}</div>

//       <button onClick={incrementCounter}>increment</button>
//       <button onClick={decrementCounter}>decrement</button>

//       <button onClick={() => dispatch(incrementByAmount(10))}>Increment By 10</button>
//     </div>
//   )
// }

// export default App