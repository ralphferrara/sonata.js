SELECT 
      id_login
FROM
      logins
WHERE
      login_phone = ?
LIMIT 1;