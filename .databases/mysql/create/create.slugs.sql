CREATE TABLE `slugs` (
  `id_slug` INT NOT NULL,
  `fid_area` INT NULL DEFAULT NULL,
  `slug_area` VARCHAR(4) NULL,
  `slug_slug` VARCHAR(128) NULL,
  `slug_previous` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`id_slug`),
  INDEX `fid_area` (`fid_area` ASC),
  INDEX `slug_area` (`slug_area` ASC),
  INDEX `slug_slug` (`slug_slug` ASC),
  INDEX `slug_previous` (`slug_previous` ASC));
