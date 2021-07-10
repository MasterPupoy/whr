import React, { useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineForm } from 'react-icons/ai';
import { GATEWAY_URL } from '../helper';
import { IoChevronBackCircle } from 'react-icons/io5';
import Swal from 'sweetalert2';


export default function AddForm({ onClick }){
  const first_name = useRef(null);
  const last_name = useRef(null);
  const date_of_birth = useRef(null);
  const gender = useRef(null);
  const phone_number = useRef(null);
  const designation = useRef(null);
  const official_email = useRef(null);
  const street = useRef(null);
  const province = useRef(null);
  const city = useRef(null);
  const zip_code = useRef(null);
  const joining_date = useRef(null);
  const expected_compensation = useRef(null);
  const temp_password = useRef(null);
  const verify_password = useRef(null);
  const admin = useRef(null);
  const employee_id = useRef(null);


  const addEmployee = async (e) => {
    e.preventDefault()

    await fetch(`${GATEWAY_URL}/whr/employee/add`, {
      method : 'POST',
      headers : {
        'Authorization' : `${localStorage.getItem('act')}`,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        company_id: `${localStorage.getItem('cid')}`,
        first_name: first_name.current.value.trim(),
        last_name: last_name.current.value.trim(),
        date_of_birth: date_of_birth.current.value.trim(),
        gender: gender.current.value.trim(),
        phone_numbers: Number(phone_number.current.value.trim()),
        designation: designation.current.value.trim(),
        password: temp_password.current.value,
        owner: admin.current.value,
        official_email: official_email.current.value.trim(),
        address: {
          street: street.current.value.trim(),
          province: province.current.value.trim(),  
          city: city.current.value.trim(),
          zip_code: zip_code.current.value.trim(),
        },
        compensation: expected_compensation.current.value.trim(),
      })
      }).then(res => res.json()).then(applicant => {
        console.log(applicant);

        if(applicant === true){
          
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Employee Added'
          })

          onClick();
        }
      });
  };

  return (
    <div style={{padding : '10px 40px'}}>
        <IoChevronBackCircle  
        style={{
          fontSize : '30px',
          marginRight : '20px',
          cursor : 'pointer'
        }}

        onClick={onClick}
      /> 
      <Form onSubmit={addEmployee}>
        <h3><AiOutlineForm /> Add Employee</h3>
        
        <Form.Group controlId="employee_id">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control type="text" placeholder="Emlpoyee ID" ref={employee_id} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="access">
            <Form.Label>Acess</Form.Label>
              <Form.Control as="select" placeholder="Select One" ref={admin}>
                <option>Select One</option>
                <option value={true}>Elevated</option>
                <option value={false}>Regular</option>
              </Form.Control>
          </Form.Group>

        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Firstname" ref={first_name} required/>
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Lastname" ref={last_name} required/>
        </Form.Group>

        <Form.Group controlId="official_email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="text" placeholder="Email Address" ref={official_email} required/>
        </Form.Group>

        <Form.Group  controlId="date_of_birth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="Select One" ref={date_of_birth} required/>
        </Form.Group>

        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" placeholder="Designation" ref={designation} required/>
        </Form.Group>

        <Row>
          <Form.Group as={Col} controlId="Gender">
            <Form.Label>Gender</Form.Label>
              <Form.Control as="select" placeholder="Select One" ref={gender} required>
                <option>Select One</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='none'>Prefer not to say</option>
              </Form.Control>
          </Form.Group>

          <Form.Group  controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Select One" ref={phone_number} required/>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" placeholder="street" ref={street} required/>
          </Form.Group>

          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="city" ref={city} required/>
          </Form.Group>

          <Form.Group as={Col} controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control type="text" placeholder="province" ref={province} required/>
          </Form.Group>

        <Form.Group as={Col} controlId="zip_code">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Zip Code" ref={zip_code} required/>
        </Form.Group>
        </Row>

         <Form.Group  controlId="join_date">
          <Form.Label>Joining Date</Form.Label>
          <Form.Control type="date" ref={joining_date} required/>
        </Form.Group>    

        <Form.Group as={Col} controlId="compensation">
          <Form.Label>Monthly Compensation</Form.Label>
          <Form.Control type="text" placeholder="Compensation" ref={expected_compensation} />
        </Form.Group>

        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Temporary Password" ref={temp_password} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="verify_password">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control type="password" placeholder="Verify temporary password" ref={verify_password} required/>
        </Form.Group>
        

        <Button type='submit' variant='success'>Add</Button>
        <Button variant='danger' onClick={onClick}>Cancel</Button>
      </Form>

    </div>
  )
}