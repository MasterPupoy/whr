import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';  
import { GATEWAY_URL, months } from '../helper';


export default function BarChart(){
  const [jobs, setJobs] = useState()

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
    fetch(`${GATEWAY_URL}/apply/jobs/organization/${localStorage.getItem('cid')}`, {
      method : 'GET'
     }).then(res => res.json()).then(data => {
       setJobs(data)
    });

  }, []);

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
      backgroundColor: ['#3b4371'],
      borderColor: ['#3b4371'],
      borderRadius: 10,
      borderSkipped: false,
      borderWidth: 1
    }]
  };

  const options = {
    indexAxis: 'y',
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
        text: 'Job Vacancy per month',
      },
      decimation: {
        enabled: true,
        algorithm: 'lttb'
      }
    }
  }


  return(
      <Bar data={data} options={options} />
  )
}

