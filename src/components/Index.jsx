import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'


export default function Index() {

    const [empleados,setEmpleados]=useState([])

    const [nombres,setNombres]=useState('')
    const [apellidos,setApellidos]=useState('')
    const [cedula,setCedula]=useState('')
    const [puesto,setPuesto]=useState('')
    const [tcontratos,setTcontratos]=useState([])
    const [contratoselect,setContratoSelect]=useState('')

    useEffect(()=>{
        obtenerEmpleados()
        setTcontratos(['Fijo','Temporal','Practicante'])
        setContratoSelect('Fijo')
    },[])

        const obtenerEmpleados= async()=>{
            const id=sessionStorage.getItem('idusuario')
            const token= sessionStorage.getItem('token')
            const respuesta= await Axios.get('/empleados/listarEmpleadosjefe/' +id,
            {
                headers:{'autorizacion':token}
            })
            console.log(respuesta.data)
            setEmpleados(respuesta.data)
        }

    const eliminar= async(id)=>{
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.delete('/empleados/eliminar/'+id,{
            headers:{'autorizacion':token}
        })

        const mensaje=respuesta.data.mensaje

        Swal.fire({
              
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })

              obtenerEmpleados()



    }
     
    const guardar= async(e)=>{
        e.preventDefault()
        const usuario={
            nombres,
            apellidos,
            cedula,
            puesto,
            tcontrato:contratoselect,
            jefe:sessionStorage.getItem('idusuario')

        }

        const token= sessionStorage.getItem('token')
        const respuesta=await Axios.post('/empleados/crear',usuario,{
            headers:{'autorizacion':token}
        })
        // console.log("prueba")

        const mensaje= respuesta.data.mensaje

        Swal.fire({
              
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })

              setTimeout(()=>{
                  window.location.href='/index'

              },1500)


    }

    const buscar=async(e)=>{
        if(e.target.value===''){
            return obtenerEmpleados()

        }
        const buscar= e.target.value
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get(`/empleados/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`,{
            headers:{'autorizacion':token}

        })
        setEmpleados(respuesta.data)
    }



    return (
        <div>
            <header className='py-2 bg-primary text-white'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-pencil-alt">Empleados</i></h1>
                        </div>
                    </div>
                </div>
            </header>  

            <nav className="navbar py-4">
                <div className="container">

                
                <div className="col-md-3">
                    <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
                        <i className='fas fa-plus'></i>
                        Add Empleado
                        
                    </Link>


                </div>

                <div className="col-md-6 ml-auto">
                    <div className="input-group">
                        <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search' />
                        

                    </div>

                </div>
                </div>

            </nav>


        {/* mostrar empleado */}

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Empleados de {sessionStorage.getItem('nombre')}</h4>

                            </div>

                            <table className="table table-responsive-lg table-striped">
                                <thead className='thead-dark'>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NOMBRES</th>
                                    <th scope="col">APELLIDOS</th>
                                    <th scope="col">IDENTIFICACION</th>
                                    <th scope="col">TIPO DE CONTRATO</th>
                                    <th scope="col">OPCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        empleados.map((empleado,i)=>(

                                            <tr key={empleado._id}>
                                                <td>{i+1}</td>
                                                <td>{empleado.nombres}</td>
                                                <td>{empleado.apellidos}</td>
                                                <td>{empleado.cedula}</td>
                                                <td>{empleado.tcontrato}</td>
                                              
                                                <td> 
                                                    <Link className='btn btn-warning mr-1' to={'/editar/'+empleado._id}>Editar</Link>
                                                    <button className='btn btn-danger mr-1' onClick={()=>eliminar(empleado._id)}>Eliminar</button>
                                                </td>



                                            </tr>
                                        

                                        ))
                                   }
                                 
                                </tbody>
                                </table>

                        </div>

                    </div>

                </div>
                
            </div>

        </section>


        <div className="modal fade" id='addEmpleado'>
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                <h5 className='modal-title'>Add empleado</h5>
                <button className='close'  data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={guardar}>
                        <div className="form-group">
                            <label >Nombre</label>
                            <input type="text" className='form-control required' onChange={(e)=>setNombres(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Apellidos</label>
                            <input type="text" className='form-control required' onChange={(e)=>setApellidos(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Puesto</label>
                            <input type="text" className='form-control required' onChange={(e)=>setPuesto(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Identificacion</label>
                            <input type="text" className='form-control required' onChange={(e)=>setCedula(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Tipo de contrato</label>
                            <select className='form-control' onChance={(e)=> setContratoSelect(e.target.value)}>
                                
                                {
                                    tcontratos.map(tcontrato=>(
                                        <option key={tcontrato}>
                                            {tcontrato}

                                        </option>
                                    ))


                                }


                            </select>
                        </div>

                        <div className="form-group">
                            <button className='btn btn-primary' type='submit'>Guardar</button>

                        </div>

                        
                    </form>

                </div>

            </div>

            </div>

        </div>


        </div>


      
    

           

  
    )
}
