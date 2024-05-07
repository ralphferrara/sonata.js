CREATE TABLE `statuses` (
  `id_status` int(11) NOT NULL AUTO_INCREMENT,
  `status_table` varchar(60) DEFAULT NULL,
  `status_code` varchar(60) DEFAULT NULL,
  `status_description` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_status`),
  KEY `status_table` (`status_table`),
  KEY `status_code` (`status_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
