import React from 'react';
import '../css/button.css';

/* 
pass in text for the button text, action = a function 
for the onClick event and classes for the styles.
*/
export default function CustomButton({ action, text, classes }){
  return (
    <button className={classes} onClick={action}>{text}</button> 
  )
}