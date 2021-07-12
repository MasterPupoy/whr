import React, { useContext, useState, useEffect } from 'react';
import BarChart from '../BarChart';
import PieChart from '../Piegraph'; 
import Title from '../Title';
import LineChart from '../LineChart';
import { Tab, Nav, Row, Col, Card, Badge } from 'react-bootstrap';
import { GoGraph } from 'react-icons/go';
import { GiOfficeChair } from 'react-icons/gi';
import { months, GATEWAY_URL } from '../../helper';
import userContext from '../../contexts/userContext';
import './css/reports.css';


export default function Reports(){
  const user = useContext(userContext);
  const [jobs, setJobs] = useState();

  useEffect(() => {
    fetch(`${GATEWAY_URL}/apply/jobs/organization/${localStorage.getItem('cid')}`, {
       method : 'GET'
    }).then(res => res.json()).then(data => setJobs(data))
  }, [])

  const piStyle = {
    height: '20px',
    padding : '60px',
  }

  const date = Date.now()
  const current_month = new Date(date).getMonth()

  return(
    <div>
      <Title icon={<GoGraph />} title='Reports' />
      <h2 style={{paddingTop : '20px', paddingBottom : '20px'}}>{months[current_month]} {new Date().getFullYear()}</h2>
      {(user?.owner) ? 
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column chart_small">
                <Nav.Item>
                  <Nav.Link eventKey="first">Job Posting</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Compensation Percentile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Candidate and Hires</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane className='chart_section' eventKey="first">
                  <BarChart />
                </Tab.Pane>
                <Tab.Pane className='chart_section' eventKey="second">
                  <PieChart />
                </Tab.Pane>
                <Tab.Pane className='chart_section' eventKey="third">
                  <div style={piStyle}>

                    <LineChart />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        :

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column chart_small">
                <Nav.Item>
                  <Nav.Link eventKey="first">Job market activity</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="positions">Positions Available</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Candidate and Hires</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane className='chart_section' eventKey="first">
                  <BarChart />
                </Tab.Pane>
                <Tab.Pane className='chart_section' eventKey="positions">
                {(jobs?.length > 0) ? 
                  <div className='job_container'>
                  {jobs.map((job, i) => {

                    let post_date = new Date(job.createdAt).toString()

                    return (
                      <Card 
                        key={i} 
                        style={{ 
                        width: '18rem',
                        margin: '10px'
                        }}>
                        <Card.Body bsPrefix='card_below'>
                          <Card.Title>
                            {job.title}
                            <br />
                            <Badge
                              variant={(job.closed) ? 'danger' : 'info'}
                            >
                              {(job.closed) ? 'closed' : 'open'}
                            </Badge>
                          </Card.Title>
                          <Card.Text className='text-center'>
                            <span>{job.applications}</span>
                            <br />
                            <span>Applications</span>
                          </Card.Text>
                          <div style={{textAlign : 'center'}}>
                            <p className='posted_by'>Posted by : {job.posted_by}</p>
                            <p style={{fontSize : '12px'}}>
                              posted on : {post_date.slice(0,16)}
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                      )
                    })
                  }
                  </div>
                
                :
                  <div className='filler'>
                    <GiOfficeChair className='icon' /><br />
                    <h3>No job posting at this moment</h3>
                  </div>
                }
                </Tab.Pane>
                <Tab.Pane className='chart_section' eventKey="third">
                  <div style={piStyle}>
                    <LineChart />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    
      }
      
    </div>
  )
}