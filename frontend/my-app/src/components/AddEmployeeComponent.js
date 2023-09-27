import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


   const showToastAndNavigate = (message) => {
    toast.success( message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
    navigate("/employees");
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };
    if (id) {
      EmployeeService.updateEmployee(id , employee).then((Response) => {
        showToastAndNavigate("Update successfully" );
      }).catch(error => {
        console.log(error)
      })
    } else {
      EmployeeService.createEmployee(employee).then((Response) => {
        showToastAndNavigate("Create successfully");
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((Response) => {
      setFirstName(Response.data.firstName)
      setLastName(Response.data.lastName)
      setEmailId(Response.data.emailId)
    }).catch(error => {
      console.log(error)
    })
  } , [])

  const title = () => {
    if(id){
      return<h2 className='text-center'>Update Employee</h2>
    }else{
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form>
                <div className='form-froup mb-2'>
                  <label className='form-label'>First Name : </label>
                  <input
                    type='text'
                    placeholder='Enter the first name'
                    name='firstName'
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>

                <div className='form-froup mb-2'>
                  <label className='form-label'>Last Name : </label>
                  <input
                    type='text'
                    placeholder='Enter the last name'
                    name='lastName'
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>

                <div className='form-froup mb-2'>
                  <label className='form-label'>Email : </label>
                  <input
                    type='text'
                    placeholder='Enter the Email'
                    name='emailId'
                    className='form-control'
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  ></input>
                </div>

                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Save</button>
                <Link to="/employees" style={{marginLeft : "10px"}} className="btn btn-danger"> Cancel </Link>
          
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
