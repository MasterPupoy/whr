import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../components/component_styles/button.css';

/* 
pass in text for the button text, action = a function 
for the onClick event and classes for the styles.
*/
export default function CustomButton({ loading, action, text, classes = 'customButton'}){
  return (
    <button 
      className={classes} 
      onClick={action}
    >
      {(loading) ? 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        :
        text
      }
    </button> 
  )
}