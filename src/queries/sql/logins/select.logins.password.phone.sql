SELECT 
      id_login,
      login_password
FROM 
      logins,
      users
WHERE 
      fid_user = id_user AND 
      login_phone = ?
LIMIT 1;