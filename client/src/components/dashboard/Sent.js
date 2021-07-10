import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GATEWAY_URL } from '../../helper';
import SlideModal from '../SlideModal';
import Message from '../Message';
import './css/sent.css';


export default function WorkInbox(){
  const [inbox, setInbox] = useState();
  const [show, setShow] = useState();
  const [to , setTo] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const id = localStorage.getItem('id');

  useEffect(() => {
    fetch(`${GATEWAY_URL}/email/delivery/sent/${id}`, {
      method : 'GET'
    }).then(res => res.json()).then(data => setInbox(data));
  }, [id, show]);

  const openMessage = (id, message) => {

    setShow(true);
    setTo(message.to.official_email);
    setSubject(message.subject);
    setContent(message.content);
    setDate(message.date);

  }

  return (
    <div>
       <SlideModal show={show} modalStyle='sent_modal_Style'>
        <Message 
          onClick={() => setShow(prevState => !prevState)}
          to={to}
          content={content}
          subject={subject}
          date={date}
        />
      </SlideModal>
      <h3>Sent Items</h3>
      <Table hover>
        <thead>
          <tr>
            <th>Sent to</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Date</th>
          </tr> 
        </thead>
        <tbody>
        {inbox?.map((message, i) => {
         
          return (   
                <tr 
                key={i}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  openMessage(message._id, message)
                }}
                
                >
                  <td>{message.to.first_name} {message.to.last_name}</td>
                  <td>{message.subject}</td>
                  <td>{message.content.slice(0, 50)} ...</td>
                  <td>{message.date.slice(0,16)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}