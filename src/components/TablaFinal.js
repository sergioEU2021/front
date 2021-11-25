import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
//import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { Link, useHistory } from 'react-router-dom'

function BasicSearch() {

  const history = useHistory();

  const [empleados, setEmpleados] = useState([])

  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [cedula, setCedula] = useState('')
  const [puesto, setPuesto] = useState('')
  const [tcontratos, setTcontratos] = useState([])
  const [contratoselect, setContratoSelect] = useState('')

  useEffect(() => {
    obtenerEmpleados()
    setTcontratos(['Fijo', 'Temporal', 'Practicante'])
    setContratoSelect('Fijo')
  }, [])

  const obtenerEmpleados = async () => {
    const id = sessionStorage.getItem('idusuario')
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('http://localhost:4000/empleados/listarEmpleadosjefe/' + id,
      {
        headers: { 'autorizacion': token }
      })
    console.log(respuesta.data)
    setEmpleados(respuesta.data)
  }

  const eliminar = async (id) => {
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.delete('/empleados/eliminar/' + id, {
      headers: { 'autorizacion': token }
    })

    const mensaje = respuesta.data.mensaje

    Swal.fire({

      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })

    obtenerEmpleados()



  }


  /*const buscar = async (e) => {
    if (e.target.value === '') {
      return obtenerEmpleados()

    }
    const buscar = e.target.value
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get(`/empleados/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`, {
      headers: { 'autorizacion': token }

    })
    setEmpleados(respuesta.data)
  }*/



  const data =

    empleados.map((empleado) => (

      {

        id: empleado._id,
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        cedula: empleado.cedula,
        tcontrato: empleado.tcontrato,




      }


    ))

  function titulo() {
    return (
      <div>
        <h4>Empleados de {sessionStorage.getItem('nombre')}</h4>
      </div>
    );
  }


  const guardar = async (e) => {
    e.preventDefault()
    const usuario = {
      nombres,
      apellidos,
      cedula,
      puesto,
      tcontrato: contratoselect,
      jefe: sessionStorage.getItem('idusuario')

    }

    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.post('/empleados/crear', usuario, {
      headers: { 'autorizacion': token }
    })
    // console.log("prueba")

    const mensaje = respuesta.data.mensaje

    Swal.fire({

      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })

    setTimeout(() => {
      window.location.href = '/index'

    }, 1500)


  }


  return (

    <div className="container mt-4">

      <div className="col-md-3">
        <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addEmpleado">
          <i className='fas fa-plus'></i>
          Add Empleado

        </Link>
      </div>

      <div className="modal fade" id='addEmpleado'>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className='modal-title'>Add empleado</h5>
              <button className='close' data-dismiss='modal'>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={guardar}>
                <div className="form-group">
                  <label >Nombre</label>
                  <input type="text" className='form-control required' onChange={(e) => setNombres(e.target.value)} />
                </div>

                <div className="form-group">
                  <label >Apellidos</label>
                  <input type="text" className='form-control required' onChange={(e) => setApellidos(e.target.value)} />
                </div>

                <div className="form-group">
                  <label >Puesto</label>
                  <input type="text" className='form-control required' onChange={(e) => setPuesto(e.target.value)} />
                </div>

                <div className="form-group">
                  <label >Identificacion</label>
                  <input type="text" className='form-control required' onChange={(e) => setCedula(e.target.value)} />
                </div>

                <div className="form-group">
                  <label >Tipo de contrato</label>
                  <select className='form-control' onChance={(e) => setContratoSelect(e.target.value)}>
                    {
                      tcontratos.map(tcontrato => (
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
      <br />

      <MaterialTable
        title={titulo()}
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'NOMBRES', field: 'nombres' },
          { title: 'APELLIDOS', field: 'apellidos' },
          { title: 'IDENTIFICACION', field: 'cedula', type: 'numeric' },
          { title: 'TIPO DE CONTRATO', field: 'tcontrato' },


        ]}

        data={data}

        options={{
          search: true,
          actionsColumnIndex: -1
        }}

        actions={[
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => eliminar(rowData.id)
            // Do save operation    
          },
          {
            icon: 'edit',
            tooltip: 'Editar',

            onClick: (event, rowData) => history.push('/editar/' + rowData.id)
            // Do save operation    
            //onClick: (event, rowData) =>  this.props.push('/editar/'+rowData.id)

          }
        ]}

     

       

      />

    </div>
  )

}

export default BasicSearch


