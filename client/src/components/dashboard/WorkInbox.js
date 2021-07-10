import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GATEWAY_URL } from '../../helper';
import Message from '../Message';
import SlideModal from '../SlideModal';
import Compose from '../Compose';

export default function WorkInbox(){
  const [inbox, setInbox] = useState();
  const [from , setFrom] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [compose, setCompose] = useState(false);
  const [recipientId, setRecipientId] = useState();

  const id = localStorage.getItem('id');

  useEffect(() => {

    fetch(`${GATEWAY_URL}/email/delivery/inbox/${id}`, {
      method : 'GET'
    }).then(res => res.json()).then(data => setInbox(data));
  }, [show, compose, id]);

  const openMessage = (id, message) => {

    setShow(true);

    fetch(`${GATEWAY_URL}/email/delivery/${id}`, {
      method : 'PUT'
    }).then(res => res.json()).then(data => {
      
      setRecipientId(message.from._id)
      setFrom(message.from.official_email);
      setSubject(message.subject);
      setContent(message.content);
      setDate(message.date);
    });
  }

  return (
    <div>
      <SlideModal show={show} modalStyle='recruitment_modal_Style'>
        <Message 
          onClick={() => setShow(prevState => !prevState)}
          onCompose={() => setCompose(prevState => !prevState)}
          from={from}
          content={content}
          subject={subject}
          date={date}
        />
      </SlideModal>
      <SlideModal show={compose} modalStyle='recruitment_modal_Style'>
        <Compose 
          recipientId={recipientId}
          recipient={from} 
          subj={subject}
          onClick={() => setCompose(prevState => !prevState)} 
        />
      </SlideModal>
      <h3>Inbox</h3>
      <Table hover>
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
        {inbox?.map((message, i) => {
          return (   
                <tr 
                key={i}
                style={{
                  background: (message.unread) ? '#E5E5E5' : '#fff',
                  fontWeight: (message.unread) ? 'Bold' : '',
                  borderBottom: '1px solid #525252',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  openMessage(message._id, message)
                }}
                >
                  <td>{message.from.first_name} {message.from.last_name}</td>
                  <td>{message.subject}</td>
                  <td>{message.content.slice(0,50)} ...</td>
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