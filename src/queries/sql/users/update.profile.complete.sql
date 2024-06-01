UPDATE 
      users
SET       
      user_gender = ?,
      user_username = ?,
      user_dob = ?,
      user_status = 'C'
WHERE
      id_user = ?
LIMIT 1;