SELECT 
      id_login
FROM
      logins
WHERE
      login_email = ?
LIMIT 1;