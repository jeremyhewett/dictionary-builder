-- --------------------------------------------------------
-- Host:                         192.168.83.128
-- Server version:               5.5.24-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dchpca_dchp_2.author
CREATE TABLE IF NOT EXISTS `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20098 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.citation
CREATE TABLE IF NOT EXISTS `citation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `short_meaning` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `part_of_speech` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spelling_variant` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` text COLLATE utf8_unicode_ci,
  `headword_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_user_id` int(11) DEFAULT NULL,
  `legacy_id` int(11) DEFAULT NULL,
  `is_incomplete` int(1) DEFAULT NULL,
  `memo` text COLLATE utf8_unicode_ci,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  `clip_start` int(11) DEFAULT NULL,
  `clip_end` int(11) DEFAULT NULL,
  `clipped_text` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `headword_id_idxfk` (`headword_id`),
  KEY `source_id_idxfk` (`source_id`),
  KEY `user_id_idxfk` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=103127 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_citations_meanings
CREATE TABLE IF NOT EXISTS `det_citations_meanings` (
  `meaning_id` int(11) NOT NULL,
  `citation_id` int(11) NOT NULL,
  PRIMARY KEY (`meaning_id`,`citation_id`),
  KEY `det_citations_meanings_meaning_id_idxfk` (`meaning_id`),
  KEY `det_citations_meanings_citation_id_idx` (`citation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_entries
CREATE TABLE IF NOT EXISTS `det_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `headword` varchar(255) COLLATE utf8_bin NOT NULL,
  `first_field` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `etymology` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_legacy` tinyint(1) NOT NULL DEFAULT '0',
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `spelling_variants` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `superscript` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dagger` tinyint(1) NOT NULL DEFAULT '0',
  `general_labels` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `proofing_status` int(11) NOT NULL DEFAULT '0',
  `proofing_user` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `fist_note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `image_file_name` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_draft` tinyint(1) NOT NULL DEFAULT '0',
  `revised_draft` tinyint(1) NOT NULL DEFAULT '0',
  `semantically_revised` tinyint(1) NOT NULL DEFAULT '0',
  `edited_for_style` tinyint(1) NOT NULL DEFAULT '0',
  `proofread` tinyint(1) NOT NULL DEFAULT '0',
  `chief_editor_ok` tinyint(1) NOT NULL DEFAULT '0',
  `final_proofing` tinyint(1) NOT NULL DEFAULT '0',
  `no_cdn_susp` tinyint(1) NOT NULL DEFAULT '0',
  `no_cdn_conf` tinyint(1) NOT NULL DEFAULT '0',
  `edit_status_comment` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`headword`),
  UNIQUE KEY `det_entries_unique_headword` (`headword`)
) ENGINE=InnoDB AUTO_INCREMENT=12330 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_entries_meanings
CREATE TABLE IF NOT EXISTS `det_entries_meanings` (
  `meaning_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `linknote` varchar(50) CHARACTER SET latin1 NOT NULL,
  `headword` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`meaning_id`,`entry_id`),
  KEY `det_entries_meanings_meaning_id_idxfk` (`meaning_id`),
  KEY `det_entries_meanings_entry_id_idxfk` (`entry_id`),
  KEY `entry_id_idxfk` (`entry_id`,`headword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_entries_references
CREATE TABLE IF NOT EXISTS `det_entries_references` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `reference_id` int(11) NOT NULL,
  `sv_text` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link_text` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link_target` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_accessed` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `det_citations_meanings_meaning_id_idxfk` (`entry_id`),
  KEY `det_citations_meanings_citation_id_idx` (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2854 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_images
CREATE TABLE IF NOT EXISTS `det_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `caption` text,
  `path` varchar(255) NOT NULL DEFAULT '',
  `entry_id` int(11) NOT NULL,
  `scale` double DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1369 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_meanings
CREATE TABLE IF NOT EXISTS `det_meanings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `partofspeech` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `definition` text COLLATE utf8_unicode_ci NOT NULL,
  `ordernum` int(11) NOT NULL,
  `orderletter` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `usage` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `headword` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `canadianism_type` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `canadianism_type_comment` text COLLATE utf8_unicode_ci,
  `order` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dagger` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entry_id_idxfk` (`entry_id`,`headword`)
) ENGINE=InnoDB AUTO_INCREMENT=16063 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_references
CREATE TABLE IF NOT EXISTS `det_references` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `short_display` varchar(255) NOT NULL DEFAULT '',
  `reference_text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=352 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.det_usage_notes
CREATE TABLE IF NOT EXISTS `det_usage_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meaning_id` int(11) NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meaning_id_idxfk` (`meaning_id`)
) ENGINE=InnoDB AUTO_INCREMENT=423 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='InnoDB free: 0 kB';

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.headword
CREATE TABLE IF NOT EXISTS `headword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `headword` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `headword_id_idxfk` (`id`),
  KEY `headword` (`headword`(333)) USING HASH
) ENGINE=MyISAM AUTO_INCREMENT=17725 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.place
CREATE TABLE IF NOT EXISTS `place` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2268 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.source
CREATE TABLE IF NOT EXISTS `source` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type_id` int(11) DEFAULT NULL,
  `year_published` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `page` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `title_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `url` text COLLATE utf8_unicode_ci,
  `url_access_date` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateline` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `periodical_date` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `year_composed` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `publisher` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uttered` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `utterance_witness` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `utterance_time` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `utterance_media` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `utterance_broadcast` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_issue` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `editor` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `evidence` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_idxfk` (`author_id`),
  KEY `title_id_idxfk` (`title_id`),
  KEY `place_id_idxfk` (`place_id`),
  KEY `year_published_idx` (`year_published`)
) ENGINE=InnoDB AUTO_INCREMENT=72564 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.title
CREATE TABLE IF NOT EXISTS `title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  `short_name` mediumtext COLLATE utf8_unicode_ci,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table dchpca_dchp_2.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `course` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_level` int(3) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_key` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_dchp1` tinyint(4) DEFAULT NULL,
  `is_proofer` int(1) DEFAULT '1',
  `is_teach` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=455 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
