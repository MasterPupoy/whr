import React from 'react';
import Title from '../Title';
import { GoMailRead } from 'react-icons/go';
import { RiInboxUnarchiveLine } from 'react-icons/ri'
import './css/inbox.css';

export default function Inbox(){
  return(
    <>
      <Title icon={<GoMailRead />} title='Work Inbox' />
      <div className='first-inbox-container'>
        <div className='list-container'>
          <h5 className='table-head'>All Updates</h5>
            <ul>
              <li>Compose Message</li>
              <li>Inbox</li>
              <li>Drafts</li>
              <li>Applications</li>
            </ul>
        </div>
      </div>

       <div className='second-inbox-container'>
        <div className='list-container'>
          <div className='filler'>
            <RiInboxUnarchiveLine className='icon' /><br />
            Choose an Item from the list
          </div>
        </div>
      </div>

    </>
  )
}