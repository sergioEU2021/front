import React from "react";
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import Nav from './components/Nav';
//import NavM from './components/NavM';
//import Login from './components/Login';
import LoginPrueba from './components/LoginPrueba';
import Registro from './components/Registro';
import Index from './components/Index';
import Actualizar from "./components/Actualizar";
//import Tabla from "./components/Tabla";
import Tabla from "./components/TablaFinal"

const estaAutenticado=()=>{

  const token=sessionStorage.getItem('token')
  if(token){

    return true

  }
  else{

    return false

  }
}
  const MyRoute=(props)=>{
    return estaAutenticado()?<Route{...props}/>:<Redirect to='/'/>


  }

  const PublicRoute=(props)=>{
    return estaAutenticado()?<Redirect to='/index'/>:<Route{...props}/>


  }


function App() {
  return (
    <Router>
      <Nav/>
     {/* <PublicRoute path='/' exact component={Login}/> */}
     <Route path='/registrar' exact component={Registro}/>
     <Route path='/tabla' exact component={Tabla}/>
     <MyRoute path='/index' exact component={Index}/>
     <MyRoute path='/editar/:id' exact component={Actualizar}/>
     <PublicRoute path='/' exact component={LoginPrueba}/>
    
     

    
    </Router>

     /* <NavM/>  */
 
  );
}

export default App;
