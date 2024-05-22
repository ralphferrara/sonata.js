UPDATE
      media
SET
      fid_media_profile = $1
WHERE
      id_media = $2
LIMIT 1;            
