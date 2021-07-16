import React, { useEffect, useState } from 'react';
import { Table, Tabs, Tab, Spinner } from 'react-bootstrap';
import { GATEWAY_URL } from '../../helper';
import Message from '../Message';
import SlideModal from '../SlideModal';
import Email from '../Email';
import Compose from '../Compose';
import './css/inbox.css';
import Swal from 'sweetalert2';
import {AiOutlineReload} from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'; 

export default function WorkInbox(){
  const [inbox, setInbox] = useState();
  const [mails, setMails] = useState();
  const [from , setFrom] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [compose, setCompose] = useState(false);
  const [recipientId, setRecipientId] = useState();
  const [key, setKey] = useState('home');
  const [workInbox, setWorkInbox] = useState(false);
  const [email, setEmail] = useState();

  const id = localStorage.getItem('id');
  
  useEffect(() => {

    if(key === 'home'){

      fetch(`${GATEWAY_URL}/email/delivery/inbox/${id}`, {
        method : 'GET'
      }).then(res => res.json()).then(data => {
        
        if(data){
          let inbox = data.reverse()
          setInbox(inbox)
        }
      })  
    }

    if(key === 'inbox'){
      fetch(`${GATEWAY_URL}/email/delivery/inbox`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user : "ian@socialme.com",
          password : "Nd!4HL@%C%zCwi3rp*ZLpQ#hM"
        })
      }).then(res => res.json()).then(mails => {
        let workinbox = mails.reverse()
        setMails(workinbox);
      })
    }
  }, [show, compose, workInbox, id, key]);

  const refresh = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: 'Loading email...'
    })

    fetch(`${GATEWAY_URL}/email/delivery/inbox`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        user : "ian@socialme.com",
        password : "Nd!4HL@%C%zCwi3rp*ZLpQ#hM"
      })
    }).then(res => res.json()).then(mails => {
      let workinbox = mails.reverse()
      setMails(workinbox);
    })
  }

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

  const openMail = (mail) => {
    setWorkInbox(true)
    setEmail(mail)
    
    if(mail.headerLines[0].line === 'false'){
      const uid = mail.headerLines[1].line
    
      fetch(`${GATEWAY_URL}/email/delivery/read/${uid}`, {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            user : "ian@socialme.com",
            password : "Nd!4HL@%C%zCwi3rp*ZLpQ#hM"
          })
        }).then(res => res.json()).then(mails => {
          console.log(mails)
        })
    }
  }

  const deleteMail = (mail) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: 'Deleting email...'
    })


    const uid = mail.headerLines[1].line

    fetch(`${GATEWAY_URL}/email/delivery/delete/${uid}`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        user : "ian@socialme.com",
        password : "Nd!4HL@%C%zCwi3rp*ZLpQ#hM"
      })
    }).then(res => res.json()).then(mails => {
      refresh()
    })
}

  return (
    <div style={{background : '#fff'}}>
      <SlideModal show={show} modalStyle='inbox_modal_Style'>
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
      <SlideModal show={workInbox} modalStyle='inbox_modal_Style'>
        <Email
          onClick={() => setWorkInbox(prevState => !prevState)}
          onCompose={() => setCompose(prevState => !prevState)}
          email={email}
        />
      </SlideModal>
      <h3>
        <AiOutlineReload 
        className='refresh'
        onClick={() => {
          refresh()
        }}/>
        Inbox 
      </h3>
      <Tabs
      id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Local Inbox">
          <Table style={{overflowY : 'scroll', background : '#fff'}} hover>
            <thead>
              <tr>
              </tr>
            </thead>
            {(inbox) ? 
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
                          <td><BsFillTrashFill className='trash' /> </td>
                        </tr>
                      )
                    })
                  }
              </tbody>

            :
                <div class='loadingg'>
                  <Spinner animation="border" role="status" className='filler'>
            
                  </Spinner>
                  <h4>Fetching mail...</h4>
                </div>
            }
          </Table>
        </Tab>
        <Tab eventKey="inbox" title="Mailbox" >
          <Table style={{ background : '#fff'}} striped hover>
            <thead>
              <tr>
          
              </tr>
            </thead>
            {(mails) ? 
              <tbody style={{overflowY : 'scroll', background : '#fff'}}>
                {mails?.map((message, i) => {
                    let date = new Date(message.date).toString()
                    return (   
                      <tr 
                      key={i}
                      style={{
                        background: (message.headerLines[0].line === 'false') ? '#E5E5E5' : '#fff',
                        fontWeight: (message.headerLines[0].line === 'false') ? 'Bold' : '',
                        borderBottom: '2px solid #d5d5d5',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        openMail(message)
                      }}
                      >
                        <td>{message.from.text} {message.from.last_name}</td>
                        <td>{message.subject}</td>
                        <td>{message.text.slice(0,50)} ...</td>
                        <td>{date.slice(0,16)}</td>
                        <td><BsFillTrashFill className='trash' onClick={() => {
                          deleteMail(message)
                        }}/></td>
                      </tr>
                    )
                  })
                } 
              </tbody>   

              :

              <div className='loadingg' >
                <Spinner animation="border" role="status">
          
                </Spinner>
                <h3>Fetching Mail</h3>
              </div>
            }
          </Table>
        </Tab>
      </Tabs> 
    </div>
  )
}