import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { GATEWAY_URL } from '../helper';

export default function PieChart(){
  const [employees, setEmployees] = useState([]);
  const cid = localStorage.getItem('cid');

  let label;
  let dataset;
  let total_value;

  useEffect(() => {

    fetch(`${GATEWAY_URL}/whr/employee/employees`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `${localStorage.getItem('act')}`
      },
      body : JSON.stringify({
        company_id : cid
      })
    }).then(res => res.json()).then(data => setEmployees(data));

  }, [cid])
  
  if(employees){

    // data sanitation
    let compensation_data = employees.map(employee => {

      let employee_name_position = `${employee.designation} ${employee.first_name} ${employee.last_name}`
      if(employee.compensation){
        let compensation = employee.compensation

        if(compensation.includes('P')){
          let value = compensation.replace('P','').trim()


          return ({ 
            name : employee_name_position,
            compensation : parseInt(value) 
          })
        }

        let value = parseInt(compensation.replace(salary =>  {

          if(salary.includes('P') && salary.includes(',')){
            salary.replace('P','')
            salary.replace(',','')
          }

          if(salary.includes(',')){
            salary.replace(',', '')
          }

          return salary
        }));

        return ({ 
          name :employee_name_position,
          compensation : value 
        })
      }

      return ({ 
        name :employee_name_position,
        compensation : 0 
      })
    })

    label = compensation_data.map(employee => {
      return employee.name
    })

    dataset = compensation_data.map(employee => {
      return employee.compensation
    })

  }


  const total = (dataset) => {
    let total_value = 0
    
    for(let i = 0; i < dataset.length; i++){ 
      total_value += dataset[i]
    }

    return total_value
  }

  if(dataset){
   total_value = total(dataset)
  }

  const data = {
    labels: label,
    datasets: [
      {
        label: 'Compensation Percentile',
        data: dataset,
        backgroundColor: [
          '#3b4371',
          '#f3904f',
          '#d83f87',
          '#c70039'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Compensation Percentile'
      }
    }
  }
  
  return (
    <div style={{
      width : '70%',
      paddingLeft : '300px',
    }}>
      <p
        style={{
          fontFamily : 'Montserrat, sans-serif',
          fontSize : '15px',
        }}
      >
        Total Monthly Cost of Manpower : <strong>PHP {total_value}</strong>
      </p>
      <Pie data={data} options={options} />
    </div>
  );
}