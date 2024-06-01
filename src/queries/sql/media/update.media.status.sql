UPDATE 
      media 
SET 
      media_status = ?, 
      media_error = ? 
WHERE 
      id_media = ? 
LIMIT 1;