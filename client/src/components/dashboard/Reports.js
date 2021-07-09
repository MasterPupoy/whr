import React from 'react';
import BarChart from '../BarChart';
import PieChart from '../Piegraph'; 
import Title from '../Title';
import LineChart from '../LineChart';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import { GoGraph } from 'react-icons/go';
import { months } from '../../helper';
import './css/reports.css';


export default function Reports(){

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
    </div>
  )
}