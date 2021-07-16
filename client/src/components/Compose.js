import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Tab, Nav, Row, Col } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';

export default function Compose({ onClick, recipient, subj, recipientId }){
 
  const [employees, setEmployees] = useState();
  const cid = localStorage.getItem('cid');
  const id = localStorage.getItem('id');
  const [to, setTo] = useState(null);
  const subject = useRef();
  const content = useRef();
  const email = useRef();
  const [key, setKey] = useState('local')

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

    if(key === 'local'){
     
      fetch(`${GATEWAY_URL}/email/delivery/send`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        from: id,
        to: (recipientId) ? recipientId : to,
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
    

    if(key === 'email'){
      console.log(email.current.value)
      fetch(`${GATEWAY_URL}/email/delivery/sendMail`, {
        method : 'POST',
        headers : {
          'Content-Type':'application/json'
        },
        body : JSON.stringify({
          user: "ian@socialme.com",
          password: "Nd!4HL@%C%zCwi3rp*ZLpQ#hM",
          reciever: email.current.value,
          subject: subject.current.value,
          message: content.current.value,
        })
      }).then(res => res.json()).then(data => {
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
      })
    }

  }

  return (
      <Form onSubmit={sendMessage}>
        <h3><BsPencilSquare /> Compose {(key === 'local') ? 'Message' : 'Email'}</h3>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column" style={{fontSize : '15px'}}>
                <Nav.Item>
                  <Nav.Link eventKey="first" onClick={() => {
                    setKey('local')
                  }}>Local Recipient</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" onClick={() => {
                    setKey('email')
                  }}
                  >Email Recipient</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Form.Group controlId="to">
                  <Form.Label>To :</Form.Label>
                  {(recipient) ? 
                
                      <Form.Control type="text" value={recipient} readOnly/>
                    :
                      <Form.Control 
                        as="select" 
                        onChange={(e) => {
                          setTo(e.target.value)
                        }}
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
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Form.Group controlId="to">
                    <Form.Label>To :</Form.Label>
                    <Form.Control type="email" ref={email}/>
                  </Form.Group>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

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

        <Button variant={(key === 'local') ? 'primary' : 'warning'} type='submit'>
          {(key === 'local') ? 'Send Message' : 'Send Email'}
        </Button>
        <Button onClick={onClick}>Cancel</Button>
  </Form>
  )
}