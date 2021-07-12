import React, { useRef, useContext } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { RiDoorOpenFill } from 'react-icons/ri';
import userContext from '../contexts/userContext';
import { GATEWAY_URL } from '../helper';
import Swal from 'sweetalert2';

export default function JobForm({ onClick }){
  const job_title = useRef(null);
  const setup = useRef(null);
  const experience = useRef(null);
  const type = useRef(null);
  const salary = useRef(null);
  const description = useRef(null);

  const user = useContext(userContext); 

  const postVacancy = async (e) => {
    e.preventDefault();

      // let job = {
      //   company_id: localStorage.getItem('cid'),
      //   title: job_title.current.value.trim(), 
      //   setup: setup.current.value.trim(), 
      //   experience: experience.current.value.trim(),
      //   type: type.current.value.trim(), 
      //   salary: salary.current.value.trim(), 
      //   description: description.current.value.trim(),
      //   remote : (setup.current.value.trim().toLowerCase() === 'remote') ? true : false 
      // }

 

    await fetch(`${GATEWAY_URL}/apply/jobs/createJob`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        company_id: localStorage.getItem('cid'),
        title: job_title.current.value.trim(), 
        setup: setup.current.value.trim(), 
        experience: experience.current.value.trim(),
        type: type.current.value.trim(), 
        salary: `P ${salary.current.value.trim()}`, 
        description: description.current.value.trim(),
        posted_by:`${user?.first_name} ${user?.last_name}`,
        remote : (setup.current.value.trim().toLowerCase() === 'remote') ? true : false 
      })
    }).then(res => res.json()).then(data => {
    
        if(data){

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
            title: 'Job Posted'
          })

          window.location.reload();

        }
      }
    );
  };

  return (
    <Form onSubmit={postVacancy}>
      <h3><RiDoorOpenFill/> New Job Posting</h3>
      <Form.Group controlId="job_title">
        <Form.Label>Job Title</Form.Label>
        <Form.Control type="text" placeholder="Position" ref={job_title} required/>
      </Form.Group>

      <Row>
        <Form.Group as={Col} controlId="Setup" >
          <Form.Label>Work Setup</Form.Label>
          <Form.Control as="select" placeholder="Select One" ref={setup}>
            <option>On-Site</option>
            <option>Remote</option>
            <option>Temporary Work From Home</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="experience">
          <Form.Label>Experience Required</Form.Label>
            <Form.Control as="select" placeholder="Select One" ref={experience}>
              <option>Entry level</option>
              <option>Mid level / Supervisory</option>
              <option>Senior level / Managerial</option>
            </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="type">
          <Form.Label>Type</Form.Label>
            <Form.Control as="select" placeholder="Select One" ref={type}>
              <option>Regular</option>
              <option>Contract</option>
              <option>Project based</option>
              <option>Consultant</option>
            </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="salary">
          <Form.Label>Salary</Form.Label>
        <Form.Control type="text" placeholder="Compensation" ref={salary} />
        </Form.Group>

      </Row>

      <Form.Group controlId="description">
        <Form.Label>Job Description</Form.Label>
        <Form.Control as="textarea" rows={6} ref={description} required/>
      </Form.Group>
      <p>Note: This post will appear to be posted by {user?.first_name} {user?.last_name} to all admins</p>

      <Button type='submit' variant='success'>Post Vacancy</Button>
      <Button onClick={onClick} variant='danger'>Cancel Post</Button>
    </Form>
  )
}