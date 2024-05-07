SELECT 
      id_user, 
      fid_media_profile,
      fid_media_cover,
      user_username,
      user_gender,
      user_dob
FROM
      users
WHERE
      id_user = ?
LIMIT 1;