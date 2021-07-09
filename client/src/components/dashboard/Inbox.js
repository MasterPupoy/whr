import React, { useState } from 'react';
import Title from '../Title';
import { GoMailRead } from 'react-icons/go';
import { RiInboxUnarchiveLine } from 'react-icons/ri'
import './css/inbox.css';
import SlideModal from '../SlideModal';
import WorkInbox from './WorkInbox';
import Chat from './Chat';
import Sent from './Sent';
import Compose from '../Compose';
import CustomButton from '../CustomButton';
//import { socket } from '../../helper';
//import { GATEWAY_URL } from '../../helper'; 

export default function Inbox(){
  const [open, setOpen] = useState(null);
  //const token = localStorage.getItem('act');
  //const [online, setOnline] = useState([]);
  const [show, setShow] = useState(false);
 
  const Selection = () => {
    switch(open){
      case('inbox'):
      return <WorkInbox />
      case('sent'):
      return <Sent />
      case('chat'):
      return <Chat  />
      default:
        return null
      }
  }

  //useEffect(() => {

  //  fetch(`${GATEWAY_URL}/whr/employee/me`, {
  //    method : 'GET',
  //    headers : {
  //      'Authorization' : `${token}`
  //    },
  //  }).then(res => res.json()).then(employee => {
  
  //    const sessionID = localStorage.getItem("sessionID");
  
  //    if (sessionID) {
  //      socket.auth = { sessionID };
  //      socket.connect();
  //    }else{
      
      
  //      let username = `${employee.first_name} ${employee.last_name}`
  //      socket.auth = { username }
  //      socket.connect(); 
  //      console.log('fired fetch')
  //    }
  //  });

  //  socket.on('users', (users) => {
  //    console.log(users)
  //    setOnline(users)
  //  });

  //  socket.on('user connected', (user) => {
  //    console.log(user)
  //    let updated = online
  //    updated.push(user);
  //    console.log(updated)
  //    setOnline(updated)
  //  });

  //}, [])

  return(
    <>
      <Title icon={<GoMailRead />} title='Work Inbox' />
      <div className='compose '>
      <CustomButton 
        text='+ Compose'
        classes='someButton' 
        action={() => setShow(prevState => !prevState)} 
      />
      </div>
      <SlideModal show={show} modalStyle='recruitment_modal_Style'>
        <Compose onClick={() => setShow(prevState => !prevState)} />
      </SlideModal>
      <div className='first-inbox-container'>
        <div className='list-container'>
            <button className='list_container_button' onClick={() => setOpen('inbox')}>Inbox</button>
            <button className='list_container_button' onClick={() => setOpen('sent')}>Sent</button>
            <button to='/chat' className='list_container_button' onClick={() => setOpen('chat')}>Chat</button>
        </div>
      </div>

       <div className='second-inbox-container'>
        <div className='list-container'>
          {(open) ? 
             <Selection />
            :
              <div className='filler'>
                <RiInboxUnarchiveLine className='icon' /><br />
                Choose an Item from the list
              </div>
          }
        </div>
      </div>

    </>
  )
}