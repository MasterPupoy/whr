import React from 'react';
import { Alert } from 'react-bootstrap';

export default function SomeAlert({ text, classes, show, onClick }){

  return (
    <Alert show={show} onClick={onClick} className={classes} variant='danger'>
      <Alert.Heading>Oops!</Alert.Heading>
        <p>{text}</p>
    </Alert>
  );
};