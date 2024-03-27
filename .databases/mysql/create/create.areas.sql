CREATE TABLE `blogs_areas` (
  `blog_area` varchar(2) NOT NULL,
  `blog_area_description` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`blog_area`),
  UNIQUE KEY `blog_area_UNIQUE` (`blog_area`),
  KEY `blog_area` (`blog_area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `sonata_next`.`blogs_areas` (`blog_area`, `blog_area_description`) VALUES ('SW', 'Sitewide - Public');
INSERT INTO `sonata_next`.`blogs_areas` (`blog_area`, `blog_area_description`) VALUES ('US', 'User');
INSERT INTO `sonata_next`.`blogs_areas` (`blog_area`, `blog_area_description`) VALUES ('LO', 'Location');
INSERT INTO `sonata_next`.`blogs_areas` (`blog_area`, `blog_area_description`) VALUES ('GR', 'Group');
INSERT INTO `sonata_next`.`blogs_areas` (`blog_area`, `blog_area_description`) VALUES ('EV', 'Event');
