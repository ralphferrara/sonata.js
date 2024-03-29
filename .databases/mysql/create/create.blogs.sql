CREATE TABLE `blogs` (
  `id_blog` int(11) NOT NULL AUTO_INCREMENT,
  `fid_user` int(11) DEFAULT NULL,
  `fid_media_profile` int(11) DEFAULT NULL,
  `fid_media_cover` varchar(45) DEFAULT NULL,
  `fid_area` int(11) DEFAULT NULL,
  `blog_area` char(2) DEFAULT NULL,
  `blog_title` varchar(45) DEFAULT NULL,
  `blog_text` text DEFAULT NULL,
  `blog_timestamp` timestamp NULL DEFAULT current_timestamp(),
  `blog_permissions` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id_blog`),
  KEY `fid_user` (`fid_user`),
  KEY `fid_media_profile` (`fid_media_profile`),
  KEY `fid_media_cover` (`fid_media_cover`),
  KEY `fid_area` (`fid_area`),
  KEY `blog_area` (`blog_area`),
  KEY `blog_timestamp` (`blog_timestamp`),
  KEY `blog_timestamp_desc` (`blog_timestamp` DESC),
  KEY `blog_permissions` (`blog_permissions`),
  FULLTEXT KEY `blog_title` (`blog_title`),
  FULLTEXT KEY `blog_text` (`blog_text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
