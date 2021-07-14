
module.exports.includeUpdates = (req, res, next) => {
  let data = req.body;
  let updates = {}

  if(data.company_id){
    updates.company_id = data.company_id
  };

  if(data.access_level){
    updates.access_level = data.access_level
  };

  if(data.employee_id){
    updates.employee_id = data.employee_id
  };

  if(data.employee_type){
    updates.employee_type = data.employee_type
  };

  if(data.first_name){
    updates.first_name = data.first_name
  };

  if(data.last_name){
    updates.last_name = data.last_name
  };

  if(data.nick_name){
    updates.nick_name = data.nick_name
  };

  if(data.date_of_birth){
    updates.date_of_birth = data.date_of_birth
  };

  if(data.gender){
    updates.gender = data.gender
  };

  if(data.designation){
    updates.designation = data.designation
  };
  
  if(data.joining_date){
    updates.joining_date = data.joining_date
  };

  if(data.status){
    updates.status = data.status
  };
  
  if(data.official_email){
    updates.official_email = data.official_email
  };

  if(data.personal_email){
    updates.personal_email = data.personal_email
  };

  if(data.team_id){
    updates.team_id = data.team_id
  };
  
  if(data.department_id){
    updates.department_id = data.department_id
  };
  

  if(data.business_unit_id){
    updates.business_unit_id = data.business_unit_id
  };

  if(data.shift_id){
    updates.shift_id = data.shift_id
  };
  
  if(data.compensation){
    updates.compensation = data.compensation
  };

  if(data.last_login){
    updates.last_login = data.last_login
  };

  if(data.last_logout){
    updates.last_logout = data.last_logout
  }

  if(data.terminated){
    updates.terminated = data.terminated
  }

  return updates;

}
