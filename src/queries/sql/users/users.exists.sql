SELECT 
      id_user
FROM
      users
WHERE
      user_username = ?
LIMIT 1;