import {Routes,Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
//import { ProtectedRoutes } from './App';


function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes> 
            <HomePage /> 
          </ProtectedRoutes> } >
        </Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  } else{
    return <Navigate to='/login' />
  }
}

export default App;