import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import companyContext from '../../contexts/companyContext';
import './css/chat.css';
//import { Tab, Row, Nav, Col } from 'react-bootstrap';
//import { socket } from '../../helper';
//import { GATEWAY_URL } from '../../helper'; 


export default function Chat({ online }){
  const company = useContext(companyContext);
  //const [reconnect, setReconnect] = useState(true);
  //const token = localStorage.getItem('act');
  

  //useEffect(() => {
  //  let mounted = true

  //  if(mounted){
      
  //    socket.on('connect', () => {
  //      console.log('connected')
  //    });

  //    socket.on("session", ({ sessionID, userID }) => {
  //      // attach the session ID to the next reconnection attempts
  //      socket.auth = { sessionID };
  //      // store it in the localStorage
  //      localStorage.setItem("sessionID", sessionID);
  //      // save the ID of the user
  //      socket.userID = userID;
  //    });
    
      
  //  }

  //  return () => {
  //    mounted = false
  //    //socket.disconnect()
  //    //socket.on('disconnect', () => {
  //    //  console.log('disc')
  //    //})
  //  }
  //}, []);
  
  

  //const sendMessage = (content, userID) => {
  //    socket.emit('private messge', {
  //      content, to : userID
  //    })                              
  //}

  return (
    <div>
      <h3>Chat</h3>
      <div className='online_list'>
        <h3>Workspace @ {company?.company_name}</h3>
        <ListGroup>
          {(online?.length > 0) ? 
            <>
              {online.map((user, i) => {
                return (

                  <ListGroup.Item key={i} action >
                    {user.username}   
                  </ListGroup.Item>
                )
              })
              }
            </>
          :
              
            null
          
          }
        </ListGroup>
      </div>

      {/*<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Link 1
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Link 2
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                hi
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                elo
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>*/}



    </div>

  )
}