import React from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import './component_styles/message.css'
import ReactHtmlParser from 'react-html-parser';

export default function Email({ email, onClick }){

  return(
    <div>
        <IoChevronBackCircle  
        style={{
          fontSize : '30px',
          marginRight : '20px',
          cursor : 'pointer',
          position : 'fixed'
        }}

        className='backbutton'

        onClick={onClick}
        />
      <div 
        style={{
          paddingTop : '50px',
          paddingLeft : '100px'
      }}>
        <h5>
          From { ReactHtmlParser(email?.from?.html )}
        </h5>
        <h5>
          Subject : {email?.subject}
        </h5>
      </div>
      <div 
        style={{
          paddingTop : '50px',
          paddingLeft : '100px'
        }}
      >
        { ReactHtmlParser(email?.textAsHtml)}
      </div>
      <div style={{ padding : '20px'}}>
      
      </div>
    </div>
  )
}