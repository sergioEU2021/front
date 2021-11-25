import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

  const [menu,setMenu]=useState(false)
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setMenu(true)

    }
 
  }, [])

  const salir=()=>{
    sessionStorage.clear()
    window.location.href="/"

  }
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container">
      <Link className="navbar-brand" to="/tabla">Inicio</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {
          menu?
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link className="nav-link" to="/"> <i className='fas fa-user'></i> Bienvenido {sessionStorage.getItem('nombre')} </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" onClick={()=>salir()} to="/"> <i className='fas fa-user-times'></i >Salir</Link>
            </li>

        

          
        
          </ul>
        
        </div>
        :

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">

        <li class="nav-item">
        <Link className="nav-link" to="/registrar" > <i className='fas fa-user-plus'></i> Registrar</Link>
      </li>
      </ul>
      </div>
    }

  
      </div>
    </nav>



  )
}
