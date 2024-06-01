SELECT
      id_user,
      user_username
FROM 
      users
WHERE 
      id_user <> ? AND 
      user_username = ?