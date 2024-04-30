SELECT 
      id_login,
      id_user, 
      user_status,
      user_level
FROM 
      logins,
      users
WHERE 
      fid_user = id_user AND 
      id_login = ?
LIMIT 1;