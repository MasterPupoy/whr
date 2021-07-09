import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import whr from '../static/whr3.png';
import whr_enterprise from '../static/whr2.png';
import whr_small from '../static/whr3_small.png';
import '../css/careers.css';

export default function Careers(){
  return(
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
        <img 
            src={whr_small} 
            alt='whr logo' 
            style={{
              width: '100px',
              height: '35px',
              borderRadius: '3px',
              marginLeft: '5px'

            }}
          /> 
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link style={{paddingRight: '50px'}} href="/openings">Careers</Nav.Link>
          <Nav.Link style={{paddingRight: '50px'}} href="/Register">Register</Nav.Link>
          <Nav.Link style={{paddingRight: '50px'}} href="/login">Login</Nav.Link>
        </Nav>
      </Navbar>
      <br />
      <div className='layered'>
        <div className='banner_qoute'>
          <h1>
            "Work gives you meaning and purpose;
            and life is empty without it."
          </h1>
          <p style={{marginLeft : '150px', marginTop : '50px'}}>
            - Stephen Hawking
          </p>
        </div>
        <div className='banner'>
          <svg id="add4e892-dc7d-463c-9a79-cd157cb9a3cb" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="852.18194" height="617.72966" viewBox="0 0 852.18194 617.72966"><rect x="688.01315" y="555.91177" width="104" height="60" fill="#6c63ff"/><path d="M752.36168,743.16566c-.93326,3.17542-1.36642,6.87817.572,9.56082a9.65556,9.65556,0,0,0,4.08648,2.99312,29.11229,29.11229,0,0,0,12.98474,1.90521,6.13154,6.13154,0,0,0,4.59336-1.7636,56.58649,56.58649,0,0,0,19.575-33.39261,3.16579,3.16579,0,0,0-.10416-2.04893,3.24712,3.24712,0,0,0-1.36351-1.15649,30.653,30.653,0,0,0-7.3105-3.33839C771.31676,712.29013,755.84981,731.29745,752.36168,743.16566Z" transform="translate(-173.90903 -141.13517)" fill="#2f2e41"/><path d="M900.00393,698.66826a20.73239,20.73239,0,0,0,6.84363,5.21188,9.60793,9.60793,0,0,0,8.36427-.14239c3.873-2.20486,4.97016-7.3283,4.66109-11.7745-.57168-8.22318-4.49982-15.63344-9.014-22.35075-1.42824-2.12529-4.58989-8.45058-7.36467-8.52926-1.31813-.03743-6.24761,4.74185-7.58708,5.65154-4.89361,3.32336-8.28324,5.7011-7.26484,12.0804C889.77828,685.9304,895.2157,693.54492,900.00393,698.66826Z" transform="translate(-173.90903 -141.13517)" fill="#2f2e41"/><path d="M857.09851,358.55776c-20.83282-1.61549-40.73176-1.0168-61.602-2.088-1.75348-.09-.90847,19.98632-2.72541,30.88795-.93384,5.60307-32.34844,333.83714-28.44922,334.5023a259.06214,259.06214,0,0,0,30.3305,4.49239c4.13352.36391,42.663-213.506,40.81676-230.88689,5.04453,7.39853,22.81211,41.55923,31.79641,80.85373,11.854,51.84585,15.34346,110.48854,22.71173,107.19934a44.13756,44.13756,0,0,1,18.61108-14.71954c12.17816-4.52965-7.55786-253.92383-28.41023-265.38931-.25656-7.29939-.52416-14.77808-3.27513-21.54413C873.02284,372.32214,865.36755,364.702,857.09851,358.55776Z" transform="translate(-173.90903 -141.13517)" fill="#2f2e41"/><polygon points="851.787 617.73 277.706 617.73 277.706 615.548 852.182 615.548 851.787 617.73" fill="#3f3d56"/><rect y="294.36832" width="471.01315" height="92.99491" fill="#e6e6e6"/><rect y="147.42601" width="471.01315" height="92.99489" fill="#e6e6e6"/><rect width="471.01315" height="92.99489" fill="#e6e6e6"/><path d="M183.95009,224.08855H634.88131V151.17646H183.95009Z" transform="translate(-173.90903 -141.13517)" fill="#fff"/><path d="M183.95009,371.83891H634.88131v-72.9121H183.95009Z" transform="translate(-173.90903 -141.13517)" fill="#fff"/><path d="M183.95,518.457H634.88121V445.5449H183.95Z" transform="translate(-173.90903 -141.13517)" fill="#fff"/><circle cx="49.51675" cy="45.89359" r="27.77768" fill="#6c63ff"/><rect x="115.94168" y="35.02405" width="274.15375" height="6.03863" fill="#6c63ff"/><rect x="115.94168" y="50.72448" width="274.15375" height="6.03863" fill="#6c63ff"/><circle cx="49.51675" cy="194.52731" r="27.77768" fill="#ccc"/><rect x="115.94168" y="183.65779" width="274.15375" height="6.03863" fill="#ccc"/><rect x="115.94168" y="199.35822" width="274.15375" height="6.03863" fill="#ccc"/><circle cx="49.51675" cy="341.46966" r="27.77769" fill="#ccc"/><rect x="115.94168" y="330.60012" width="274.15375" height="6.03863" fill="#ccc"/><rect x="115.94168" y="346.30056" width="274.15375" height="6.03863" fill="#ccc"/><path d="M851.96559,199.351c-10.81253-18.26981-32.20421-19.12126-32.20421-19.12126s-20.845-2.66564-34.21691,25.1595c-12.4637,25.9353-29.66522,50.97638-2.76929,57.04765l4.85817-15.12083L790.642,263.5626a105.2364,105.2364,0,0,0,11.50777.19667c28.80332-.92994,56.23416.27208,55.351-10.06377C856.32656,239.95545,862.3694,216.93018,851.96559,199.351Z" transform="translate(-173.90903 -141.13517)" fill="#2f2e41"/><path d="M812.07729,261.59811c.05229,2.05642.03665,4.22524-.98524,6.01055-2.02578,3.53923-6.97115,4.069-9.94583,6.85853-3.1283,2.93353-3.48236,7.69451-3.63146,11.98048-.15587,4.481-.28811,9.10879,1.34726,13.28362a32.29279,32.29279,0,0,0,3.77277,6.48169q2.72424,3.927,5.49883,7.8186a33.75927,33.75927,0,0,0,3.29259,4.132c3.31272,3.37443,7.8567,5.2423,12.39375,6.575,2.93137.86106,6.09649,1.53176,9.00493.59629a17.24036,17.24036,0,0,0,5.23659-3.22,28.0609,28.0609,0,0,0,5.92742-5.74508c2.44231-3.5428,3.11831-7.97785,3.62456-12.251a264.36284,264.36284,0,0,0,1.74255-38.08361,9.33377,9.33377,0,0,0-.7271-4.04639c-1.50628-2.94122-5.54064-3.56914-7.66639-6.09914-1.81747-2.16307-1.89158-5.25014-1.87608-8.07539l.03948-7.19234a3.01284,3.01284,0,0,0-.34955-1.75229,2.96857,2.96857,0,0,0-2.06313-.96257,69.54992,69.54992,0,0,0-13.5313-.90527c-3.672.1122-10.71751-.19515-13.89257,1.85-2.882,1.8564.72645,6.98361,1.394,9.86364A64.262,64.262,0,0,1,812.07729,261.59811Z" transform="translate(-173.90903 -141.13517)" fill="#ffb8b8"/><circle cx="646.59652" cy="79.04091" r="29.07101" fill="#ffb8b8"/><path d="M813.92218,283.04694c-15.00419-47.548-22.90913,19.23731-32.36916,37.47249.08794,12.57282.42873,47.34691,3.36916,60.52751,11.42255,51.2019,67.98975,47.18234,85,4,9.06116-23.00281-11.03988-80.01159-10.35862-106.61165C834.65311,253.19426,833.116,333.27172,813.92218,283.04694Z" transform="translate(-173.90903 -141.13517)" fill="#6c63ff"/><path d="M797.4516,266.73761c-32.5112,15.80158-17.00106,58.25549-28.78537,86.03937-9.412,38.11869-33.34828,50.10538,21.37992,50.99288,11.79191-34.84244.274-72.68949,16.35195-108.16748,1.10709-13.89531,5.87311-19.12078,5.45081-30.88794C808.69672,259.83072,800.53,265.22464,797.4516,266.73761Z" transform="translate(-173.90903 -141.13517)" fill="#575a88"/><polygon points="673.276 56.455 652.142 45.384 622.957 49.913 616.919 76.583 631.95 76.004 636.149 66.206 636.149 75.842 643.084 75.576 647.111 59.977 649.626 76.583 674.283 76.079 673.276 56.455" fill="#2f2e41"/><path d="M834.11305,280.12007c16.73347-1.95292.41934-22.04869,13.70111-21.70725,39.771-6.68935,51.66932,17.94352,36.54421,52.32424-13.86474,27.5378,35.18011,66.22151,7.7812,81.63023-9.72368,3.56942-23.64729,14.79719-33.15053,9.90892C843.73161,363.92783,843.18033,320.11308,834.11305,280.12007Z" transform="translate(-173.90903 -141.13517)" fill="#575a88"/><path d="M880.688,389.59525c-5.82631,2.78637-10.43525,7.21738-14.3352,12.36516-.8256,1.08976.28174,3.12237,2.75591,3.08907,2.30214-.031,3.67748-2.98285,5.97954-3.01385a99.973,99.973,0,0,0,3.80585,18.14512c4.5928-4.03319,7.343-9.71068,9.97425-15.22764l5.20118-10.90548c1.90951-4.00372,3.8198-8.00921,5.541-12.0974a8.728,8.728,0,0,0,.85313-3.04923c.22651-7.03534-6.70988-7.078-9.70133-2.67506C887.49047,381.0417,886.47144,386.82923,880.688,389.59525Z" transform="translate(-173.90903 -141.13517)" fill="#ffb8b8"/><path d="M881.88418,268.64257c4.44717,4.62094,8.92552,9.28113,12.3778,14.686s21.30979,54.01449,22.03379,55.04514c2.57821,3.80469-.43333,13.64043-.58546,14.20364-.29826,1.76623-4.02357,19.403-4.957,23.29768-.65318,2.72541-.64487,5.56312-1.07237,8.33289s-1.38916,5.618-3.52262,7.43532a2.207,2.207,0,0,1-.97024.54292c-1.18333.23092-1.98941-1.138-2.40367-2.27026-1.28979-3.5255-2.592-7.11956-4.866-10.10644s-5.72077-5.32608-9.4748-5.31468a5.0553,5.0553,0,0,1,.36754-4.613c.75222-1.41868,1.85492-2.621,2.68463-3.99579a18.38916,18.38916,0,0,0,2.112-6.03621,39.606,39.606,0,0,0-5.22938-28.24962,27.05174,27.05174,0,0,0-4.36366-5.4545c-1.833-1.71777-3.97763-3.0988-5.67-4.95532a19.37342,19.37342,0,0,1-4.51165-10.94685,57.72075,57.72075,0,0,1,.3181-12.00988c.76131-7.901,1.7394-15.81349,2.868-23.67045a8.82792,8.82792,0,0,1,.78338-2.95616C878.6886,269.9544,880.18712,269.44,881.88418,268.64257Z" transform="translate(-173.90903 -141.13517)" fill="#575a88"/><path d="M784.82417,377.8045c-2.99145-4.40292-9.92784-4.36028-9.70133,2.67506a8.728,8.728,0,0,0,.85313,3.04923c1.72123,4.08819,3.63152,8.09368,5.541,12.0974l5.20118,10.90548c2.63123,5.517,5.38145,11.19445,9.97425,15.22764a99.973,99.973,0,0,0,3.80585-18.14512c2.30206.031,3.67741,2.98288,5.97955,3.01385,2.47417.0333,3.5815-1.99931,2.7559-3.08907-3.89995-5.14778-8.50888-9.57879-14.3352-12.36516C789.11509,388.40779,788.09605,382.62026,784.82417,377.8045Z" transform="translate(-173.90903 -141.13517)" fill="#ffb8b8"/><path d="M797.784,273.18552a8.82815,8.82815,0,0,1,.78337,2.95616c1.12857,7.857,2.10666,15.76945,2.868,23.67045a57.72007,57.72007,0,0,1,.31811,12.00988,19.3735,19.3735,0,0,1-4.51166,10.94685c-1.69234,1.85652-3.837,3.23755-5.67,4.95532a27.05174,27.05174,0,0,0-4.36366,5.4545,39.606,39.606,0,0,0-5.22938,28.24962,18.38947,18.38947,0,0,0,2.112,6.03621c.82971,1.37479,1.93241,2.57711,2.68463,3.99579a5.0553,5.0553,0,0,1,.36754,4.613c-3.754-.0114-7.20071,2.32781-9.4748,5.31468s-3.57626,6.58094-4.86605,10.10644c-.41426,1.13226-1.22034,2.50118-2.40367,2.27026a2.207,2.207,0,0,1-.97024-.54292c-2.13346-1.81736-3.09511-4.66555-3.52261-7.43532s-.4192-5.60748-1.07238-8.33289c-.93339-3.89468-4.6587-21.53145-4.957-23.29768-.15212-.56321-3.16367-10.399-.58545-14.20364.724-1.03065,18.5815-49.64032,22.03378-55.04514s7.93064-10.065,12.3778-14.68595C795.3994,271.01854,796.89793,271.533,797.784,273.18552Z" transform="translate(-173.90903 -141.13517)" fill="#575a88"/></svg>
        </div>
      </div>
      <Container >
        <Row>
        </Row>
        <Row className='row_careers'>
          <Col>
            <img className='logo' src={whr} alt='whr logo' />
          </Col>
          <Col>
            <h1 className='heading_top'>WHR Careers</h1>
            <p>
              Opportunities waiting for you by the companies that 
              trusts Working HR in collaborating with thier
              employees.
            </p>
            <Link 
              className='careers_button'
              style={{marginLeft: '70%'}} 
              to='/openings'
            >
              See Openings
            </Link>
          </Col>
        </Row>
        <Row className='row_careers'>
          <Col>
            <h1 className='heading_top'>Working Human</h1>
            <p>
              WHR Enterprise will take staff management into
              a whole new level. Try it out now!
            </p>
              <Link 
                className='register_button'
                to='/register'
              >
                Register now
              </Link>
          </Col>
          <Col>
            <img className='logo' style={{marginLeft : '200px'}} src={whr_enterprise} alt='whr logo' />
          </Col>
        </Row>
      </Container>

      
    </>
  )
}