import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GATEWAY_URL } from '../../helper';


export default function WorkInbox(){
  const [inbox, setInbox] = useState();
  const id = localStorage.getItem('id');

  useEffect(() => {
    fetch(`${GATEWAY_URL}/email/delivery/inbox/${id}`, {
      method : 'GET'
    }).then(res => res.json()).then(data => setInbox(data));
  }, []);

  console.log(inbox)

  return (
    <Table hover>
      <thead>
        <tr>
          <th>From</th>
          <th>Subject</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
      {inbox?.map((message, i) => {
        return (   
              <tr key={i}>
                <td>{message.from.first_name} {message.from.last_name}</td>
                <td>{message.subject}</td>
                <td>{message.type}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}