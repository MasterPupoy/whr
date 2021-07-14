import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';

export default function Compose({ onClick, recipient, subj, recipientId }){
 
  const [employees, setEmployees] = useState();
  const cid = localStorage.getItem('cid');
  const id = localStorage.getItem('id');
  const to = useRef();
  const subject = useRef();
  const content = useRef();

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
  }, [cid])


  const sendMessage = (e) => {
    e.preventDefault();


    fetch(`${GATEWAY_URL}/email/delivery/send`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        from: id,
        to: (recipientId) ? recipientId : to.current.value,
        subject: subject.current.value,
        content: content.current.value,
        date: new Date().toString()
      }),
    }).then(res => res.json()).then(data => {
      if(data){
        onClick();
       
        subject.current.value = null
        content.current.value = null
        
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
          title: 'Message Sent'
        })
      };
    })

  }

  return (
      <Form onSubmit={sendMessage}>
        <h3><BsPencilSquare /> Compose Message</h3>
        <Form.Group controlId="to">
          <Form.Label>To :</Form.Label>
          {(recipient) ? 
        
              <Form.Control type="text" value={recipient} readOnly/>
            :
              <Form.Control as="select" 
                ref={to}
              >
                <option>-- Select Recipient --</option>
                {employees?.map((employee, i) => {
                  return (
                    <option 
                      key={i} 
                      value={employee._id}
                    >
                      {employee.designation} - {employee.official_email} 
                    </option>
                  )
                })}
              </Form.Control>
          }
        </Form.Group>

        <Form.Group controlId="subject">
          <Form.Label>Subject:</Form.Label>
          {(subj) ? 
              <Form.Control type="text" value={subj} ref={subject} readOnly/>
            :
              <Form.Control type="text" placeholder="Subject" ref={subject} required />
          }
        </Form.Group>
  
        <Form.Group controlId="message">
          <Form.Label></Form.Label>
          <Form.Control as="textarea" rows={10} placeholder='Message' ref={content}  required/>
        </Form.Group>

        <Button type='submit'>Send</Button>
        <Button onClick={onClick}>Cancel</Button>
  </Form>
  )
}