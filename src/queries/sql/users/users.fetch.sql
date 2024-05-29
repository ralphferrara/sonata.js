SELECT 
      fid_media_profile,
      fid_media_cover,
      fid_verification,
      user_username,
      user_gender,
      user_dob,
      user_city,
      user_state,
      user_postal,
      user_country,
      user_latitude,
      user_longitude,
      user_joined,
      user_login,
      user_expires,
      user_verified,
      user_age_min,
      user_age_max,
      user_popularity,
      user_count_images,
      user_count_videos,
      user_count_views,
      user_count_forum,
      user_score
FROM
      users
WHERE
      id_user = ?
LIMIT 1;



