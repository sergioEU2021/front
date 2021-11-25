import React, { useState ,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import tableIcons from "./MaterialTableIcons";




   /*const rows = [

  empleados.map((empleado,i)=>(
    
   { id: i+1, nombres: empleado.nombres, apellidos: empleado.apellidos, cedula: empleado.cedula}
                                       
                                        

     ))
  

  ];*/

export default function DataTable() {

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
          const respuesta= await Axios.get('http://localhost:4000/empleados/listarEmpleadosjefe/' +id,
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


  const columns = [

    
    { field: 'id', headerName: 'ID', width: 180 },
    { field: 'nombres', headerName: 'NOMBRES', width: 180 },
    { field: 'apellidos', headerName: 'APELLIDOS', width: 180 },
    { field: 'cedula', headerName: 'IDENTIFICACION', width: 180 },
    { field: 'tcontrato', headerName: 'TIPO DE CONTRATO', width: 180 },
    { field: 'opciones', headerName: 'OPCIONES', width: 180 },
    
  
   
  ];



/*const rowData = empleados?.map(empleado=>{
  return{

    id: empleado?._id,
    nombres: empleado?.nombres,
    apellidos:empleado?.apellidos,
    cedula: empleado?.cedula,
  };
});*/

 const rows = 

    empleados.map((empleado)=>(
      
    { 
      
      id:empleado._id, 
      nombres: empleado.nombres,
      apellidos: empleado.apellidos, 
      cedula: empleado.cedula,
      tcontrato: empleado.tcontrato,
      opciones: <Button variant="outlined">Outlined</Button>
 

    }
                                       
                                      
      ))
  
    






  
 /*const rows = [



    empleados.map((empleado)=>(
    
    { id:empleado._id, nombres: empleado.nombres, apellidos: empleado.apellidos, cedula: empleado.cedula}
                                       
                                        

      ))
  
    ];*/
 
  



  return (
    <div className="container mt-4">
        <br />
        <br />
        
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        title="mi tabla"

        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
           
          },
          rows => ({
            icon: 'delete',
            tooltip: 'Delete User',
          
          })
        ]}
      
        pageSize={5}
        rowsPerPageOptions={[5]}
        
      />
    </div>
    </div>

  );


 




}