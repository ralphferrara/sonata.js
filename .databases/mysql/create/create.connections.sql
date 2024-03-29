CREATE TABLE `connections` (
  `id_connection` int(11) NOT NULL AUTO_INCREMENT,
  `fid_user` int(11) DEFAULT NULL,
  `fid_recipient` int(11) DEFAULT NULL,
  `fid_area` int(11) DEFAULT NULL,
  `connection_status` varchar(4) DEFAULT NULL,
  `connection_area` varchar(4) DEFAULT NULL,
  `connection_type` varchar(4) DEFAULT NULL,
  `connection_timestamp` timestamp NULL DEFAULT current_timestamp(),
  `connection_completed` datetime DEFAULT '0000-00-00 00:00:00',
  `connection_json` text DEFAULT NULL,
  PRIMARY KEY (`id_connection`),
  KEY `fid_recipient` (`fid_recipient`),
  KEY `fid_area` (`fid_area`),
  KEY `connection_status` (`connection_status`),
  KEY `connection_area` (`connection_area`),
  KEY `connection_type` (`connection_type`),
  KEY `connection_timestamp` (`connection_timestamp`),
  KEY `connection_timestamp_desc` (`connection_timestamp` DESC),
  KEY `connection_completed` (`connection_completed`),
  KEY `connection_completed_desc` (`connection_completed` DESC),
  KEY `fid_user` (`fid_user`),
  KEY `idx_connections_fid_connection_area` (`fid_area`,`connection_area`)
);
