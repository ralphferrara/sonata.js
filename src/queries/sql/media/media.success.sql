UPDATE 
      media
SET       
      media_dimension_x = ?, 
      media_dimension_y = ?,
      media_orientation = ?,
      media_meta = ?
WHERE 
      id_media = ?
LIMIT 1;            
