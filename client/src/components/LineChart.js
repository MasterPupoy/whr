import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';  
import { GATEWAY_URL, months } from '../helper';


export default function LineChart(){
  const [talent_pool, setTalentPool] = useState();
  const [jobs, setJobs] = useState();
  const company_id = localStorage.getItem('cid');

  let candidatesJanuary = []
  let candidatesFebruary = []
  let candidatesMarch = []
  let candidatesApril = []
  let candidatesMay = []
  let candidatesJune = []
  let candidatesJuly = [] 
  let candidatesAugust = [] 
  let candidatesSeptember = []
  let candidatesOctober = []
  let candidatesNovember = []
  let candidatesDecember = []

  let hiredJanuary = []
  let hiredFebruary = []
  let hiredMarch = []
  let hiredApril = []
  let hiredMay = []
  let hiredJune = []
  let hiredJuly = [] 
  let hiredAugust = [] 
  let hiredSeptember = []
  let hiredOctober = []
  let hiredNovember = []
  let hiredDecember = []

  let January = []
  let February = []
  let March = []
  let April = []
  let May = []
  let June = []
  let July = [] 
  let August = [] 
  let September = []
  let October = []
  let November = []
  let December = []

  useEffect(() => {
    fetch(`${GATEWAY_URL}/apply/openings/applications/all/${company_id}`, {
      method: 'GET'
    }).then(res => res.json()).then(data => {
      setTalentPool(data);

      fetch(`${GATEWAY_URL}/apply/jobs/organization/${localStorage.getItem('cid')}`, {
        method : 'GET'
       }).then(res => res.json()).then(data => {
         setJobs(data)
      });

    });

  }, []);

  if(talent_pool){

    let candidates = talent_pool.map(candidate => {
      let date = new Date(candidate.applied_on).getMonth();
      return date
    }, []);

    let hired = talent_pool.map(candidate => {
      if(candidate.hired){
        let date = new Date(candidate.hired_on).getMonth();
        return date
      }
      return null
    });


    for(let i = 0; i < candidates.length; i++){
      let month = candidates[i]

      switch (month) {
        case (0):
          candidatesJanuary.push(month)
          break;
        case (1):
          candidatesFebruary.push(month)
          break;
        case (2):
          candidatesMarch.push(month)
          break;
        case (3):
          candidatesApril.push(month)
          break;
        case (4):
          candidatesMay.push(month)
          break;
        case (5):
          candidatesJune.push(month)
          break;
        case (6):
          candidatesJuly.push(month)
          break;
        case (7):
          candidatesAugust.push(month)
          break;
        case (8):
          candidatesSeptember.push(month)
          break;
        case (9):
          candidatesOctober.push(month)
          break;
        case (10):
          candidatesNovember.push(month)
          break;
        case (11):
          candidatesDecember.push(month)
          break;
        default:
          break;
      }
    }

    for(let i = 0; i < hired.length; i++){
      let month = hired[i]

      switch (month) {
        case (0):
          hiredJanuary.push(month)
          break;
        case (1):
          hiredFebruary.push(month)
          break;
        case (2):
          hiredMarch.push(month)
          break;
        case (3):
          hiredApril.push(month)
          break;
        case (4):
          hiredMay.push(month)
          break;
        case (5):
          hiredJune.push(month)
          break;
        case (6):
          hiredJuly.push(month)
          break;
        case (7):
          hiredAugust.push(month)
          break;
        case (8):
          hiredSeptember.push(month)
          break;
        case (9):
          hiredOctober.push(month)
          break;
        case (10):
          hiredNovember.push(month)
          break;
        case (11):
          hiredDecember.push(month)
          break;
        default:
          break;
      }
    }

    
  }

  if(jobs){

    let job_data = jobs.map(job => {
      let date = new Date(job.createdAt).getMonth();
      return date
    }, []);

    for(let i = 0; i < job_data.length; i++){
      let month = job_data[i]

      switch (month) {
        case (0):
          return January.push(month)
        case (1):
          February.push(month)
          break;
        case (2):
          March.push(month)
          break;
        case (3):
          April.push(month)
          break;
        case (4):
          May.push(month)
          break;
        case (5):
          June.push(month)
          break;
        case (6):
          July.push(month)
          break;
        case (7):
          August.push(month)
          break;
        case (8):
          September.push(month)
          break;
        case (9):
          October.push(month)
          break;
        case (10):
          November.push(month)
          break;
        case (11):
          December.push(month)
          break;
        default:
          break;
      }
    }
  }

  const data = {
    labels: months,
    datasets: [{
      label: 'Candidates',
      data: [
        candidatesJanuary.length, 
        candidatesFebruary.length, 
        candidatesMarch.length, 
        candidatesApril.length, 
        candidatesMay.length, 
        candidatesJune.length, 
        candidatesJuly.length,
        candidatesAugust.length,
        candidatesSeptember.length,
        candidatesOctober.length,
        candidatesNovember.length,
        candidatesDecember.length
      ],
      backgroundColor: ['#3b4371'],
      borderColor: ['#3b4371'],
      borderWidth: 3
    },
    {
      label: 'Jobs Posted',
      data: [
        January.length, 
        February.length, 
        March.length, 
        April.length, 
        May.length, 
        June.length, 
        July.length,
        August.length,
        September.length,
        October.length,
        November.length,
        December.length
      ],
      backgroundColor: ['#f3904f'],
      borderColor: ['#f3904f'],
      borderWidth: 3
    },
    {
      label: 'Hired',
      data: [
        hiredJanuary.length, 
        hiredFebruary.length, 
        hiredMarch.length, 
        hiredApril.length, 
        hiredMay.length, 
        hiredJune.length, 
        hiredJuly.length,
        hiredAugust.length,
        hiredSeptember.length,
        hiredOctober.length,
        hiredNovember.length,
        hiredDecember.length
      ],
      backgroundColor: ['#c70039'],
      borderColor: ['#c70039'],
      borderWidth: 3
    } 
  ]
  };

  const options = {
    indexAxis: 'x',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Candidates and Hires',
      },
      decimation: {
        enabled: true,
        algorithm: 'lttb'
      }
    }
  }


  return(
    <Line data={data} options={options} />
  )
}

