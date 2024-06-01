UPDATE users
SET fid_media_cover = (
    SELECT id_media 
    FROM media 
    WHERE users.id_user = media.fid_user AND id_media = ?
    LIMIT 1
)
WHERE id_user = ?
LIMIT 1;