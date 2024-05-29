UPDATE 
      media
SET       
      media_status = ?,
      media_error  = 'MEROK',
      media_dimension_x = ?, 
      media_dimension_y = ?,
      media_orientation = ?,
      media_meta = ?
WHERE 
      id_media = ?
LIMIT 1;            
