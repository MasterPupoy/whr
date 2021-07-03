import React from 'react';

export default function RandomQuote(){
  const number = Math.floor(Math.random());
  

  return(
    <div>
      {number}
    </div>
  )
}