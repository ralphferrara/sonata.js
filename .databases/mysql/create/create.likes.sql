CREATE TABLE `likes` (
    `id_like` int(11) NOT NULL AUTO_INCREMENT,
    `fid_user` int(11) NOT NULL,
    `fid_recipient` int(11) NULL DEFAULT '-1',
    `fid_area` int(11) NULL,
    `like_area` varchar(4) NOT NULL,
    `like_read` tinyint(4) NOT NULL DEFAULT '0',
    `like_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_like`),
    KEY `fid_user` (`fid_user`),
    KEY `fid_recipient` (`fid_recipient`),
    KEY `fid_area` (`fid_area`),  -- Index on fid_area
    KEY `like_area` (`like_area`),  -- Index on like_area
    KEY `fid_area_like_area` (`fid_area`, `like_area`),  -- Dual index on fid_area and like_area
    KEY `like_read` (`like_read`),
    KEY `like_timestamp` (`like_timestamp`)
);