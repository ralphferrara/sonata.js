UPDATE
      users
SET
      fid_media_cover = NULL
WHERE
      id_user = ?
LIMIT 1;            
