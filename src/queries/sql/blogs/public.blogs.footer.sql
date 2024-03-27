SELECT 
        id_blog,
        fid_media_profile,
        blog_title,
        blog_timestamp
FROM
        blogs
WHERE
        blog_area = 'SW'
LIMIT 3;           

