import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';

export default function Compose({ onClick }){
  const [employees, setEmployees] = useState();
  const cid = localStorage.getItem('cid');
  const id = localStorage.getItem('id');
  const to = useRef(null);
  const subject = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    fetch(`${GATEWAY_URL}/whr/employee/employees`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `${localStorage.getItem('act')}`
      },
      body : JSON.stringify({
        company_id : cid
      })
    }).then(res => res.json()).then(data => setEmployees(data));
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(to.current.value, subject.current.value, content.current.value);
    
    fetch(`${GATEWAY_URL}/email/delivery/send`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        from: id,
        to: to.current.value,
        subject: subject.current.value,
        content: content.current.value
      })
    }).then(res => res.json()).then(data => {
      if(data){
        onClick();
        Swal.fire({
          icon: 'success',
          title: 'Message sent!',
          showConfirmButton: false,
          timer: 1500
        });
      };
    })

  }

  return (
      <Form onSubmit={sendMessage}>
        <h3><BsPencilSquare /> Compose Message</h3>
        <Form.Group controlId="to">
          <Form.Label>To :</Form.Label>
          <Form.Control as="select" ref={to}>
            {employees?.map((employee, i) => {
              return (
                <option key={i} value={employee._id}>
                  {employee.official_email}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="subject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control type="text" placeholder="Subject" ref={subject}/>
        </Form.Group>
  
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control as="textarea" rows={10} placeholder='Message' ref={content} />
        </Form.Group>

        <Button type='submit'>Send</Button>
  </Form>
  )
}