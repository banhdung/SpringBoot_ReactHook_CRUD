import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { message } from 'antd';
export default function ListEmployeeComponent() {
    const [employees , setEmployees] = useState([]);
    useEffect(() => {
      getAllEmployees();
    } , [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((Response) => {
            setEmployees(Response.data)
            console.log(Response.data)
           }).catch(error => {
            console.log(error)
           });
    }

    const showDeleteToast = (message) =>{
        toast.success(message , {
            position : toast.POSITION.TOP_RIGHT,
            autoClose : 2000
        })
    }

    const deleteEmployee = (employeeId) =>{
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            width: '400px'
          }).then((result) => {
            if (result.isConfirmed) {
                EmployeeService.deleteEmployee(employeeId).then((Response) =>{            
                    showDeleteToast("Successfully")
                      getAllEmployees();
                  }).catch(error => {
                      console.log(error)
                      toast.error('Error!' + error);
                  })
            }
          });
          
    }
  return (
    <div className='container'>
        <h2 className='text-center'> List Employees</h2>
        <Link to="/add-employee" className='btn btn-primary mb-2'>Add Employee</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>Employees Id</th>
                <th>Employees First Name</th>
                <th>Employees Last Name</th>
                <th>Employees Email</th>
                <th>Actions </th>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee => 
                        <tr key = {employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.emailId}</td>
                            <td>
                                <Link className='btn btn-info' to={`/edit-employee/${employee.id}`}  >Update</Link>
                                <button className='btn btn-danger' onClick={ () => deleteEmployee(employee.id)} style={{marginLeft : "10px"}}>Delete</button>
                                <ToastContainer />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
