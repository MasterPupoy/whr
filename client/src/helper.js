import io from "socket.io-client";
import Swal from 'sweetalert2';


export async function capitalize(str) {
    let remaining = [];
    
    for (let i = 1; i < str.length; i++) {
      remaining += str[i];
    }

    let capitalizedLetter = str[0].toUpperCase();

    let word = capitalizedLetter.concat(remaining);

    return await word.toString();
};


export const socket = io('http://localhost:5000',{
  autoConnect: false,
  path: '/email'
});

export const GATEWAY_URL = 'http://104.236.215.216:4000'

export const version = 'v1.45 alpha'

export const months = [
  'January',
  'February',
  'March',
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September',
  'October',
  'November', 
  'December'
]

export const getValues = async (employeeId) => {
  const token = localStorage.getItem('act');
  const formValues = await Swal.fire({
  title: 'Register your Company',
  html:
    `
    <form>
      <label for='company_name'>Company Name</label>
        <input 
          id="company_name" 
          class="swal2-input"
          placeholder='e.g. Aerojet Rocketdyne'
        ><br><br>
      <label for='company_owner'>Company Owner</label>
        <input 
          id="company_owner" 
          class="swal2-input"
          placeholder='e.g. Eileen Drake'
        ><br><br>
      <label for="industry">Tapped Industry</label>
        <input 
          id="industry" 
          class="swal2-input"
          placeholder='e.g. Aerospace'
          ><br><br>
      <label for="designation">User Designation</label>
        <input id="designation" 
          placeholder='Your designation' 
          class="swal2-input"
        ><br><br>
    </form>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('company_name').value.trim(),
        document.getElementById('company_owner').value.trim(),
        document.getElementById('industry').value.trim(),
        document.getElementById('designation').value.trim()
      ]
    }
  })


  if (formValues.value) {
 
    fetch(`${GATEWAY_URL}/whr/organization/company_registration`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        company_name: formValues.value[0], 
        company_owner: formValues.value[1],  
        industry: formValues.value[2],
      })
    }).then(res => res.json()).then(company => {
      fetch(`${GATEWAY_URL}/whr/employee/${employeeId}`, {
        method : 'PUT',
        headers : {
          'Authorization' : `${token}`,
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          company_id : company._id,
          designation : formValues.value[3]
        })
      }).then(res => res.json()).then(done => {
        if(done){
          Swal.fire({
            title: 'Registered!',
            text: 'You have successfully registered your company',
            icon: 'success',
            confirmButtonText: 'Got It'
          }).then((result) => {
            if(result.isConfirmed){
              localStorage.setItem('cid', company._id)
              window.location.reload();
            }
          })
        }
      })
    })
  }
}