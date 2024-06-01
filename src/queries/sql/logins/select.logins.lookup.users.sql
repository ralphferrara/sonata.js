SELECT 
      id_login,
      fid_user, 
      user_username,
      user_status
FROM 
      logins,
      users
WHERE 
      fid_user = id_user AND 
      id_login = ?
LIMIT 1;