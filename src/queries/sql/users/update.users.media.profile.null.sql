UPDATE
      users
SET
      fid_media_profile = NULL
WHERE
      id_user = ?
LIMIT 1;            
