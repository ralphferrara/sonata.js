CREATE TABLE `logins` (
  `id_login` INT NOT NULL AUTO_INCREMENT,
  `fid_user` INT NULL,
  `login_phone` VARCHAR(64) NULL,
  `login_email` VARCHAR(64) NULL,
  `login_social` VARCHAR(128) NULL,
  `login_status` CHAR(2) NULL,
  `login_verified_phone` TINYINT NULL DEFAULT 0,
  `login_verified_email` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id_login`),
  UNIQUE INDEX `id_login_UNIQUE` (`id_login` ASC),
  UNIQUE INDEX `fid_user_UNIQUE` (`fid_user` ASC),
  UNIQUE INDEX `login_phone_UNIQUE` (`login_phone` ASC),
  UNIQUE INDEX `login_email_UNIQUE` (`login_email` ASC),
  UNIQUE INDEX `login_social_UNIQUE` (`login_social` ASC),
  INDEX `login_status` (`login_status` ASC),
  INDEX `login_verified_phone` (`login_verified_phone` ASC),
  INDEX `login_verified_email` (`login_verified_email` ASC)
);