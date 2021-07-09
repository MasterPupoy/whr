import React from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import './component_styles/message.css'

export default function Message({ to, from, subject, content, date, onClick, onCompose }){

  return(
    <div>
      <h2>
        <IoChevronBackCircle  
        style={{
          fontSize : '30px',
          marginRight : '20px',
          cursor : 'pointer'
        }}

        onClick={onClick}
      /> 
         {subject}
      </h2>
      <h4>{(from) ? from : 'From me'}</h4>
      <h5>{(from) ? 'to me' : `to ${to}`}</h5>
      <span
        style={{
          fontSize : '15px'
        }}
      >{date}</span>
      <div 
        style={{
          paddingTop : '50px',
          paddingLeft : '100px'
        }}
      >
        {content}
      </div>
      <div style={{ padding : '20px'}}>
      {(to) ? 

        null
      :
        <button className='reply_button' onClick={onCompose}>Reply</button>
        
      }
      </div>
    </div>
  )
}