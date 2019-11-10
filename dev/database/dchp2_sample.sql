-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.24-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2014-07-05 23:12:19
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for dchpca_dchp2
-- CREATE DATABASE IF NOT EXISTS "dchpca_dchp2" /*!40100 DEFAULT   */;
-- USE "dchpca_dchp2";


-- Dumping structure for table dchpca_dchp2.author
CREATE TABLE IF NOT EXISTS "author" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "name" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.author: 19 297 rows
/*!40000 ALTER TABLE "author" DISABLE KEYS */;
INSERT INTO "author" ("id", "name", "is_dchp1", "is_teach") VALUES
	(1, 'JHEWETT', NULL, NULL)
	;
/*!40000 ALTER TABLE "author" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.citation
CREATE TABLE IF NOT EXISTS "citation" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "created" timestamp DEFAULT NULL,
  "short_meaning" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "part_of_speech" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "spelling_variant" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "text" character varying COLLATE pg_catalog."default",
  "headword_id" int DEFAULT NULL,
  "source_id" int DEFAULT NULL,
  "user_id" int DEFAULT NULL,
  "last_modified" timestamp DEFAULT NULL,
  "last_modified_user_id" int DEFAULT NULL,
  "legacy_id" int DEFAULT NULL,
  "is_incomplete" boolean DEFAULT NULL,
  "memo" character varying COLLATE pg_catalog."default",
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL,
  "clip_start" int DEFAULT NULL,
  "clip_end" int DEFAULT NULL,
  "clipped_text" character varying COLLATE pg_catalog."default"
);

-- Dumping data for table dchpca_dchp2.citation: 71 707 rows
/*!40000 ALTER TABLE "citation" DISABLE KEYS */;
INSERT INTO "citation" ("id", "created", "short_meaning", "part_of_speech", "spelling_variant", "text", "headword_id", "source_id", "user_id", "last_modified", "last_modified_user_id", "legacy_id", "is_incomplete", "memo", "is_dchp1", "is_teach", "clip_start", "clip_end", "clipped_text") VALUES
	(1808, '2007-04-26 21:40:51', NULL, '', 'Inuksuit,inuksuk,inutsuk, inuksugaq,inuksugait', '[b]Inuksuit[/b] The term inuksuk is a derivative of the Inuktitut (eastern Canadian Inuit language) morphemes, Inuk (\\"human being\\" Inuit, pl.) and -suk (\\"to act in the capacity of\\" -suit, pl.) (Hallendy 1992)...The spelling of the word varies slightly throughout the Arctic, such as the Nunavik (Arctic Quebec) version inutsuk, and the Igloolik version inuksugaq (plural: inuksugait) (MacDonald 2000: 188). ', 392, 1, 180, '2007-04-26 22:48:45', 0, 5, NULL, NULL, NULL, NULL, 0, 411, '[b]Inuksuit[/b] The term inuksuk is a derivative of the Inuktitut (eastern Canadian Inuit language) morphemes, Inuk (\\"human being\\" Inuit, pl.) and -suk (\\"to act in the capacity of\\" -suit, pl.) (Hallendy 1992)...The spelling of the word varies slightly throughout the Arctic, such as the Nunavik (Arctic Quebec) version inutsuk, and the Igloolik version inuksugaq (plural: inuksugait) (MacDonald 2000: 188). ')
	;
/*!40000 ALTER TABLE "citation" ENABLE KEYS */;


-- Dumping structure for view dchpca_dchp2.det_bibliographies
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE "det_bibliographies" (
	"id" int NULL DEFAULT '0',
	"citation"  character varying COLLATE pg_catalog."default",
	"yearpub" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"page" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"author" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"place" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"title" character varying COLLATE pg_catalog."default",
	"editor" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"yearcomp" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"perio_date" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"vol_iss" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"url_acc_date" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"url" character varying COLLATE pg_catalog."default",
	"publisher" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"uttered" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"witness" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"time_apx" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"media" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"broadcast" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"evidence" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"dateline" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"short_title" character varying COLLATE pg_catalog."default"
);


-- Dumping structure for view dchpca_dchp2.det_citations
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE "det_citations" (
	"id" int NOT NULL DEFAULT '0',
	"headword" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"citation" character varying COLLATE pg_catalog."default",
	"meanshort" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"spellvar" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"dchp_1" BOOLEAN DEFAULT NULL,
	"yearpub" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"page" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"author" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"place" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"title" character varying COLLATE pg_catalog."default",
	"yearcomp" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"perio_date" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"vol_iss" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"url" character varying COLLATE pg_catalog."default",
	"uttered" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"media" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"broadcast" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"evidence" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"dateline" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"short_title" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL
);


-- Dumping structure for table dchpca_dchp2.det_citations_meanings
CREATE TABLE IF NOT EXISTS "det_citations_meanings" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "meaning_id" int NOT NULL,
  "citation_id" int NOT NULL
);

-- Dumping data for table dchpca_dchp2.det_citations_meanings: ~26 826 rows (approximately)
/*!40000 ALTER TABLE "det_citations_meanings" DISABLE KEYS */;
INSERT INTO "det_citations_meanings" ("meaning_id", "citation_id") VALUES
	(0, 67264),
	(15718, 100136)
	;
/*!40000 ALTER TABLE "det_citations_meanings" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_entries
CREATE TABLE IF NOT EXISTS "det_entries" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "headword" character varying COLLATE pg_catalog."default" NOT NULL,
  "first_field" character varying COLLATE pg_catalog."default"   NOT NULL,
  "etymology" character varying COLLATE pg_catalog."default"   NOT NULL,
  "is_legacy" boolean DEFAULT NULL,
  "is_public" boolean DEFAULT NULL,
  "spelling_variants" character varying COLLATE pg_catalog."default"   DEFAULT NULL,
  "superscript" character varying COLLATE pg_catalog."default"   NOT NULL,
  "dagger" boolean NOT NULL DEFAULT false,
  "general_labels" character varying COLLATE pg_catalog."default"   DEFAULT NULL,
  "proofing_status" int NOT NULL DEFAULT '0',
  "proofing_user" character varying COLLATE pg_catalog."default"   DEFAULT NULL,
  "fist_note" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
  "image_file_name" character varying COLLATE pg_catalog."default",
  "comment" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "first_draft" boolean NOT NULL DEFAULT false,
  "revised_draft" boolean NOT NULL DEFAULT false,
  "semantically_revised" boolean NOT NULL DEFAULT false,
  "edited_for_style" boolean NOT NULL DEFAULT false,
  "proofread" boolean NOT NULL DEFAULT false,
  "chief_editor_ok" boolean NOT NULL DEFAULT false,
  "no_cdn_susp" boolean NOT NULL DEFAULT false,
  "no_cdn_conf" boolean NOT NULL DEFAULT false,
  "edit_status_comment" character varying COLLATE pg_catalog."default" DEFAULT NULL
);

CREATE UNIQUE INDEX "det_entries_unique_headword"
    ON det_entries USING btree
    (headword COLLATE pg_catalog."default")
    TABLESPACE pg_default;


-- Dumping data for table dchpca_dchp2.det_entries: ~12 769 rows (approximately)
/*!40000 ALTER TABLE "det_entries" DISABLE KEYS */;
INSERT INTO "det_entries" ("id", "headword", "first_field", "etymology", "is_legacy", "is_public", "spelling_variants", "superscript", "dagger", "general_labels", "proofing_status", "proofing_user", "fist_note", "image_file_name", "comment", "first_draft", "revised_draft", "semantically_revised", "edited_for_style", "proofread", "chief_editor_ok", "no_cdn_susp", "no_cdn_conf", "edit_status_comment") VALUES
	(1, 'abatteau', 'unavailable', '', true, true, NULL, '', false, NULL, 2, 'caitlinjbmail@gmail.com', NULL, '', NULL, false, false, false, false, false, false, true, false, NULL)
	;
/*!40000 ALTER TABLE "det_entries" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_entries_meanings
CREATE TABLE IF NOT EXISTS "det_entries_meanings" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "meaning_id" BIGSERIAL NOT NULL,
  "entry_id" BIGSERIAL NOT NULL,
  "linknote" character varying COLLATE pg_catalog."default",
  "headword" character varying COLLATE pg_catalog."default"
);

-- Dumping data for table dchpca_dchp2.det_entries_meanings: ~13 735 rows (approximately)
/*!40000 ALTER TABLE "det_entries_meanings" DISABLE KEYS */;
INSERT INTO "det_entries_meanings" ("meaning_id", "entry_id", "linknote", "headword") VALUES
	(1, 5, '', NULL),
	(5, 634, '', ''),
	(5, 2461, '(def. 1)', NULL),
	(5, 5382, '', '')
	;
/*!40000 ALTER TABLE "det_entries_meanings" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_entries_references
CREATE TABLE IF NOT EXISTS "det_entries_references" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "entry_id" int NOT NULL,
  "reference_id" int NOT NULL,
  "sv_text" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "link_text" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "link_target" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "date_accessed" timestamp DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.det_entries_references: ~1 275 rows (approximately)
/*!40000 ALTER TABLE "det_entries_references" DISABLE KEYS */;
INSERT INTO "det_entries_references" ("id", "entry_id", "reference_id", "sv_text", "link_text", "link_target", "date_accessed") VALUES
	(1, 26, 8, NULL, NULL, NULL, NULL),
	(2, 26, 37, NULL, NULL, NULL, NULL),
	(3, 26, 53, NULL, NULL, NULL, NULL),
	(4, 26, 54, NULL, NULL, NULL, NULL),
	(5, 26, 64, NULL, NULL, NULL, NULL),
	(6, 231, 8, NULL, NULL, NULL, NULL),
	(7, 379, 64, NULL, NULL, NULL, NULL),
	(8, 819, 37, NULL, NULL, NULL, NULL),
	(9, 819, 53, NULL, NULL, NULL, NULL),
	(10, 819, 54, NULL, NULL, NULL, NULL),
	(11, 907, 64, NULL, NULL, NULL, NULL),
	(12, 1187, 37, NULL, NULL, NULL, NULL),
	(13, 1187, 53, NULL, NULL, NULL, NULL),
	(14, 1187, 54, NULL, NULL, NULL, NULL),
	(15, 1187, 64, NULL, NULL, NULL, NULL),
	(16, 1486, 37, NULL, NULL, NULL, NULL),
	(17, 1486, 53, NULL, NULL, NULL, NULL),
	(18, 1486, 54, NULL, NULL, NULL, NULL),
	(19, 1486, 64, NULL, NULL, NULL, NULL),
	(20, 1514, 8, NULL, NULL, NULL, NULL),
	(21, 1514, 37, NULL, NULL, NULL, NULL),
	(22, 1514, 53, NULL, NULL, NULL, NULL),
	(23, 1514, 54, NULL, NULL, NULL, NULL),
	(24, 1514, 59, NULL, '"Transportation and Technology: The Canoe"', 'http://www.hbcheritage.ca/hbcheritage/history/transportation/canoe/', '2012-11-14 00:00:00'),
	(1683, 11674, 34, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE "det_entries_references" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_images
CREATE TABLE IF NOT EXISTS "det_images" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "caption" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
  "path" character varying COLLATE pg_catalog."default" NOT NULL DEFAULT '',
  "entry_id" int NOT NULL,
  "scale" float DEFAULT NULL,
  "order" int DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.det_images: 647 rows
/*!40000 ALTER TABLE "det_images" DISABLE KEYS */;
INSERT INTO "det_images" ("id", "caption", "path", "entry_id", "scale", "order") VALUES
	(18, '\n        Image 1: pencil crayons      ', '/uploads/entries/11255/2012.04.25_12.39.15_pencil_crayon.jpg', 11255, 0.5, NULL),
	(19, 'Image 2: internet domain searches (30 Apr. 2012)', '/uploads/entries/11255/2012.04.30_16.30.53_pencil_crayon_internet.JPG', 11255, 1, NULL),
	(11, 'A chart', '/uploads/entries/11250/2012.04.23_09.58.11_takeup1.jpeg', 11250, 0.25, NULL),
	(357, '\n        Image 1: Canadian "loonie". Photo: L. Brinton', '/uploads/entries/11630/2012.11.11_09.49.07_Screen_Shot_2012-11-11_at_8.47.28_AM.png', 11630, 1, 1),
	(24, 'Image 2: Internet Domain Search, 24 May 2012. Normalized frequencies.', '/uploads/entries/6310/2012.05.24_11.25.50_parkade_24_May_2012_internet.JPG', 6310, 1, NULL),
	(25, 'Image 1: <parkade> in Spokane, WA (photo S. Dollinger April 2012)</parkade>', '/uploads/entries/6310/2012.06.06_14.15.57_spokane_parkade.JPG', 6310, 0.5, NULL),
	(30, '\n        Image 1: The Prince of Wales Armoury, Edmonton, AB. Source: Wikimedia Commons. Photo: WinterE229      ', '/uploads/entries/11273/2012.07.13_15.52.13_armoury_(Prince_of_Wales_Armouries_Edmonton_Alberta_Canada_04A).jpg', 11273, 0.5, NULL),
	(46, '\n        \n        \n        Image 1: Automated banking machine, Toronto, ON. Source: Wikimedia Commons. Photo: Raysonho@Grid Engine                  ', '/uploads/entries/11242/2012.07.24_13.43.39_automated_banking_machine(2).png', 11242, 0.75, NULL),
	(364, 'Chart 1: Internet Domain Search, 12 October 2012', '/uploads/entries/11633/2012.11.19_18.07.01_Texas_mickey_-_12_Oct_2012.JPG', 11633, 1, 1),
	(197, 'Chart 1: Internet Domain Search, 23 August 2012 ', '/uploads/entries/11242/2012.09.11_11.21.48_automated_bank_machine_-_23_Aug_2012.JPG', 11242, 1, NULL),
	(42, '\n        Chart 1: Internet Domain Search, 18 July 2012.      ', '/uploads/entries/11279/2012.07.18_18.45.55_gem_jar.PNG', 11279, 1, NULL),
	(36, '\n        \n        \n        Image 1: Green bin in Toronto. Source: Wikimedia Commons, Creative Commons Attribution 3.0. Photo: NotYouHaha                  ', '/uploads/entries/11278/2012.07.16_21.50.57_green_bin_(Toronto).png', 11278, 0.5, NULL),
	(63, '\n        \n        \n        Image 1: A <i>gas bar</i> in Vancouver, BC. Photo: S. Dollinger                  ', '/uploads/entries/11218/2012.08.09_10.44.53_gas_bar.JPG', 11218, 0.5, NULL),
	(64, '\n        Chart 1: Internet Domain Search, 20 July 2012      ', '/uploads/entries/11249/2012.08.09_13.26.54_drinking_box.JPG', 11249, 1, NULL),
	(38, '\n        \n        Image 1: Woman with amautik and stroller, Cape Dorset, Nunavut. Source: Wikimedia Commons.  Photo: Ansgar Walk.           ', '/uploads/entries/11245/2012.07.17_08.10.40_amautik.jpg', 11245, 0.5, NULL),
	(39, '\n        Image 1: Autoroute near Gatineau, QC. Source: Wikimedia Commons. Photo: MaximeL.       ', '/uploads/entries/11281/2012.07.18_13.49.33_autoroute_(Autoroute5N_km5).jpg', 11281, 0.5, NULL),
	(41, '         Image 1: Internet Domain Search, 18 July 2012      ', '/uploads/entries/11284/2012.07.18_17.16.29_gotchies.JPG', 11284, 1, NULL),
	(43, '\n        Image 1: Animator at Notre-Dame-de-Bon-Secours Chapel. Source: Wikimedia Commons. Photo: Jean Gagnon      ', '/uploads/entries/11283/2012.07.20_15.09.15_animator.png', 11283, 0.5, NULL),
	(44, '\n        \n        Image 1: Musical Ride on Canada Day (2007). Source: Wikimedia Commons. Photo: Nikki           ', '/uploads/entries/11290/2012.07.20_19.06.37_musical_ride_(Canada_Day_-_Musical_Ride).jpg', 11290, 0.8, 1),
	(45, '\n        \n        \n        Image 1: Statue Honouring Josiah Henson, leader in the African-Canadian Dawn Settlement in Ontario. Source: Wikimedia Commons. Photo: M. Readey.                   ', '/uploads/entries/11293/2012.07.20_20.31.58_African-Canadian.png', 11293, 0.5, NULL),
	(49, 'Image 1: Internet Domain Search, 13 February 2012', '/uploads/entries/11314/2012.07.27_17.45.09_cabane_a_sucre.JPG', 11314, 1, NULL),
	(824, 'Chart 1: Internet Domain Search, 9 September 2013', '/uploads/entries/11671/2013.09.09_14.48.24_backbench_-_9_sep_2013.JPG', 11671, 1, NULL);
/*!40000 ALTER TABLE "det_images" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_ips
CREATE TABLE IF NOT EXISTS "det_ips" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "ip_addr" character varying COLLATE pg_catalog."default" NOT NULL,
  "host_name" character varying COLLATE pg_catalog."default" NOT NULL
);

-- Dumping data for table dchpca_dchp2.det_ips: ~0 rows (approximately)
/*!40000 ALTER TABLE "det_ips" DISABLE KEYS */;
/*!40000 ALTER TABLE "det_ips" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_log_entries
CREATE TABLE IF NOT EXISTS "det_log_entries" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "entry_id" int NOT NULL,
  "user_id" int NOT NULL,
  "created" timestamp NOT NULL,
  "headword" character varying COLLATE pg_catalog."default"
);

-- Dumping data for table dchpca_dchp2.det_log_entries: ~17 827 rows (approximately)
/*!40000 ALTER TABLE "det_log_entries" DISABLE KEYS */;
INSERT INTO "det_log_entries" ("id", "entry_id", "user_id", "created", "headword") VALUES
	(1, 1, 301, '2010-01-31 17:16:50', NULL),
	(2, 2, 214, '2010-02-01 10:38:50', NULL),
	(18177, 11435, 445, '2013-10-16 14:56:31', NULL),
	(18178, 11435, 445, '2013-10-21 12:36:48', NULL);
/*!40000 ALTER TABLE "det_log_entries" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_meanings
CREATE TABLE IF NOT EXISTS "det_meanings" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "entry_id" int NOT NULL,
  "partofspeech" character varying COLLATE pg_catalog."default" NOT NULL,
  "definition" character varying COLLATE pg_catalog."default" NOT NULL,
  "ordernum" int NOT NULL,
  "orderletter" character varying COLLATE pg_catalog."default" NOT NULL,
  "usage" character varying COLLATE pg_catalog."default" NOT NULL,
  "headword" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "canadianism_type" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "canadianism_type_comment" character varying COLLATE pg_catalog."default",
  "order" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "dagger" int NOT NULL
);

-- Dumping data for table dchpca_dchp2.det_meanings: ~15 815 rows (approximately)
/*!40000 ALTER TABLE "det_meanings" DISABLE KEYS */;
INSERT INTO "det_meanings" ("id", "entry_id", "partofspeech", "definition", "ordernum", "orderletter", "usage", "headword", "canadianism_type", "canadianism_type_comment", "order", "dagger") VALUES
	(1, 1, 'n.', '', 0, 'ZZZ', '', NULL, NULL, NULL, '0', 0),
	(2, 2, 'n.', 'an Indian name for Prince Edward Island.', 0, 'ZZZ', '', NULL, NULL, NULL, '0', 0),
	(3, 3, 'n.', 'the political and financial policies developed as the basis of Social Credit government by William Aberhart, Premier of Alberta, 1935 to 1943.', 0, 'ZZZ', '', NULL, NULL, NULL, '0', 0),
	(5, 5, 'n.', 'a dike (def. 1) or dam equipped with a gate which functions as a valve releasing flood water from behind but preventing sea water from \nentering at high tide. ', 0, 'ZZZ', '', NULL, NULL, NULL, '1', 0),
	(15717, 12114, 'n.', 'the circle of latitude 49 degrees north of the equator, which also marks the international border between Canada and the USA in British Columbia, Alberta, Saskatchewan, and Manitoba. ENTRY IN PROGRESS\n', 0, '', '', NULL, '4. Culturally Significant', 'In 1818, following the War of 1812, British and American governments agreed to make the 49th parallel the official western border between Canada and the USA, from the Lake of the Woods (which borders Ontario, Manitoba and Minnesota) until the Rocky Mountains. The area west of the Rocky Mountains was known as the Columbia District (by Canadians) or Oregon Country (by Americans) and its ownership was disputed until the Oregon Treaty of 1846 was established (also known as the Treaty of Washington in the USA), which extended the international border along the 49th parallel to the Straight of Georgia. See also the <i>Canadian Encyclopedia</i> reference.\n<br>See also COD-2, s.v. "forty-ninth parallel", ITP Nelson, s.v. "forty-ninth parallel", and DA, s.v. "forty-niner" (10a).', NULL, 0),
	(15718, 11671, 'n.', 'the collective group of people who occupy the backbench; often in a compound, as in <b>back bench member</b>.', 0, '', '', NULL, NULL, NULL, '2', 0);
/*!40000 ALTER TABLE "det_meanings" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.det_references
CREATE TABLE IF NOT EXISTS "det_references" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "short_display" character varying COLLATE pg_catalog."default" NOT NULL DEFAULT '',
  "reference_text" character varying COLLATE pg_catalog."default" NOT NULL
);

-- Dumping data for table dchpca_dchp2.det_references: 160 rows
/*!40000 ALTER TABLE "det_references" DISABLE KEYS */;
INSERT INTO "det_references" ("id", "short_display", "reference_text") VALUES
	(1, 'DARE', 'Cassidy, Frederic and Joan Hall (eds.). 1985-2012. <i>Dictionary of American Regional English</i>. Vols. 1-5. Cambridge, MA: Belknap Press.'),
	(2, 'Pratt (1993)', 'Pratt, T. K. 1993. The hobgoblin of Canadian English spelling. In: <i>Focus on Canada</i>, ed. by Sandra Clarke, 45-64. Amsterdam: Benjamins.'),
	(41, 'Harris (1983)', 'Harris, Barbara P. 1983. Handsaw or harlot? Some problem etymologies in the lexicon of Chinook Jargon. <i>Canadian Journal of Linguistics</i>. 28(1): 25-32.'),
	(169, 'Grady (1998)', 'Grady, Wayne. 1998. <I>Chasing the Chinook: On the trail of Canadian words and culture</i>. Harmondsworth, England: Penguin Books.');
/*!40000 ALTER TABLE "det_references" ENABLE KEYS */;


-- Dumping structure for view dchpca_dchp2.det_shortcitations
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE "det_shortcitations" (
	"id" BIGSERIAL PRIMARY KEY NOT NULL,
	"headword" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"citation" character varying COLLATE pg_catalog."default" DEFAULT NULL,
	"short_meaning" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"yearpub" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"page" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"author" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"title" character varying COLLATE pg_catalog."default"
);


-- Dumping structure for table dchpca_dchp2.det_usage_notes
CREATE TABLE IF NOT EXISTS "det_usage_notes" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "meaning_id" int NOT NULL,
  "text" character varying COLLATE pg_catalog."default" NOT NULL
);

-- Dumping data for table dchpca_dchp2.det_usage_notes: ~261 rows (approximately)
/*!40000 ALTER TABLE "det_usage_notes" DISABLE KEYS */;
INSERT INTO "det_usage_notes" ("id", "meaning_id", "text") VALUES
	(7, 1999, '<i>In spite of the definition given in many dictionaries still, the term</i> <b>Canuck</b> <i>as applied by Canadians to themselves is not at all derogatory, quite the contrary. Nor is the term, in modern use, especially associated with French Canadians; again, quite the contrary</i>.'),
	(9, 120, '<i>The entries for</i> <b>America</b> <i>and</i> <b>American</b> <i>are intended to give some idea of the meaning of these terms in Canada during the past two hundred years. In modern times, it is not usual to include Canada as part of America, which, rightly or wrongly, generally refers to the United States.</i>'),
	(343, 15424, 'The awards are named after Pierre Juneau, the first chairperson of the Canadian Radio-television Telecommunications Commission. Juneau was responsible for the implementation of Canadian content requirements on the radio, and these rules later carried on to television. From the renaming of the award in 1971, the name was shortened to <i>Juno</i>, but appears as <i>JUNO</i> in all official literature. The award ceremony is often referred to as <i>The Junos</i>.'),
	(344, 15717, 'The term is sometimes used to reference the whole Canada and US international border, despite some areas of Canada and the USA crossing the 49th parallel.  ');
/*!40000 ALTER TABLE "det_usage_notes" ENABLE KEYS */;


-- Dumping structure for view dchpca_dchp2.det_users
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE "det_users" (
	"id" BIGSERIAL PRIMARY KEY NOT NULL,
	"is_admin" boolean DEFAULT NULL,
	"is_active" boolean DEFAULT NULL,
	"first"character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"last" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"email" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"password" character varying COLLATE pg_catalog."default" NULL DEFAULT NULL,
	"is_proofer" boolean DEFAULT NULL
);


-- Dumping structure for table dchpca_dchp2.det_user_sessions
CREATE TABLE IF NOT EXISTS "det_user_sessions" (
  "id" character varying COLLATE pg_catalog."default"  NOT NULL,
  "data" character varying COLLATE pg_catalog."default",
  "expires" int DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.det_user_sessions: 1 rows
/*!40000 ALTER TABLE "det_user_sessions" DISABLE KEYS */;
INSERT INTO "det_user_sessions" ("id", "data", "expires") VALUES
	('rv6q3uhfooodtttlfienmaaap0', 'Config|a:4:{s:9:"userAgent";s:32:"29954801db4d8e68080c828c65d3d93c";s:4:"time";i:1383093830;s:4:"rand";i:12449;s:7:"timeout";i:10;}_Token|a:4:{s:3:"key";s:40:"3af1918a4d8c1efdd2f8b8ba58df41bf447fe838";s:7:"expires";i:1383093830;s:18:"allowedControllers";a:0:{}s:14:"allowedActions";a:0:{}}Role|s:13:"Administrator";User|a:1:{s:4:"User";a:6:{s:2:"id";s:3:"445";s:5:"email";s:22:"jeremyhewett@gmail.com";s:8:"is_admin";s:1:"1";s:5:"first";s:6:"Jeremy";s:4:"last";s:7:"Heweitt";s:8:"password";s:32:"bb29677642d29d503762bd4ce32a79e9";}}AllUsers|a:36:{i:0;a:1:{s:4:"user";a:3:{s:5:"email";N;s:10:"first_name";N;s:9:"last_name";N;}}i:1;a:1:{s:4:"user";a:3:{s:5:"email";N;s:10:"first_name";N;s:9:"last_name";N;}}i:2;a:1:{s:4:"user";a:3:{s:5:"email";N;s:10:"first_name";N;s:9:"last_name";N;}}i:3;a:1:{s:4:"user";a:3:{s:5:"email";s:21:"baillieford@gmail.com";s:10:"first_name";s:7:"Baillie";s:9:"last_name";s:4:"Ford";}}i:4;a:1:{s:4:"user";a:3:{s:5:"email";s:23:"breanna.laing@gmail.com";s:10:"first_name";s:7:"Breanna";s:9:"last_name";s:5:"Laing";}}i:5;a:1:{s:4:"user";a:3:{s:5:"email";s:23:"caitlinjbmail@gmail.com";s:10:"first_name";s:7:"Caitlin";s:9:"last_name";s:7:"Bethune";}}i:6;a:1:{s:4:"user";a:3:{s:5:"email";s:18:"viviraye@yahoo.com";s:10:"first_name";s:6:"Cicily";s:9:"last_name";s:6:"Cooper";}}i:7;a:1:{s:4:"user";a:3:{s:5:"email";s:25:"dbarta@interchange.ubc.ca";s:10:"first_name";s:5:"Damon";s:9:"last_name";s:5:"Barta";}}i:8;a:1:{s:4:"user";a:3:{s:5:"email";s:24:"mrkennedy12345@gmail.com";s:10:"first_name";s:5:"David";s:9:"last_name";s:7:"Kennedy";}}i:9;a:1:{s:4:"user";a:3:{s:5:"email";s:25:"emilyjeanbriggs@gmail.com";s:10:"first_name";s:5:"Emily";s:9:"last_name";s:6:"Briggs";}}i:10;a:1:{s:4:"user";a:3:{s:5:"email";s:16:"ewclee@gmail.com";s:10:"first_name";s:4:"Emma";s:9:"last_name";s:3:"Lee";}}i:11;a:1:{s:4:"user";a:3:{s:5:"email";s:27:"evgenia2@interchange.ubc.ca";s:10:"first_name";s:7:"Evgenia";s:9:"last_name";s:8:"Todorova";}}i:12;a:1:{s:4:"user";a:3:{s:5:"email";s:23:"faeriecabrera@gmail.com";s:10:"first_name";s:6:"Faerie";s:9:"last_name";s:7:"Cabrera";}}i:13;a:1:{s:4:"user";a:3:{s:5:"email";s:18:"fyang_cb@yahoo.com";s:10:"first_name";s:5:"Frank";s:9:"last_name";s:4:"Yang";}}i:14;a:1:{s:4:"user";a:3:{s:5:"email";s:18:"fhangler@gmail.com";s:10:"first_name";s:5:"Frank";s:9:"last_name";s:7:"Hangler";}}i:15;a:1:{s:4:"user";a:3:{s:5:"email";s:17:"gabrielle@glim.ca";s:10:"first_name";s:9:"Gabrielle";s:9:"last_name";s:3:"Lim";}}i:16;a:1:{s:4:"user";a:3:{s:5:"email";s:25:"roeder@interchange.ubc.ca";s:10:"first_name";s:5:"Geoff";s:9:"last_name";s:6:"Roeder";}}i:17;a:1:{s:4:"user";a:3:{s:5:"email";s:27:"helen107@interchange.ubc.ca";s:10:"first_name";s:12:"Helen Ho Lam";s:9:"last_name";s:3:"Lui";}}i:18;a:1:{s:4:"user";a:3:{s:5:"email";s:27:"imoldova@interchange.ubc.ca";s:10:"first_name";s:7:"Izabela";s:9:"last_name";s:8:"Moldovan";}}i:19;a:1:{s:4:"user";a:3:{s:5:"email";s:15:"jm27@queensu.ca";s:10:"first_name";s:6:"Janice";s:9:"last_name";s:8:"McAlpine";}}i:20;a:1:{s:4:"user";a:3:{s:5:"email";s:20:"j.g.ibanez@gmail.com";s:10:"first_name";s:6:"Javier";s:9:"last_name";s:6:"Ibanez";}}i:21;a:1:{s:4:"user";a:3:{s:5:"email";s:22:"jeremyhewett@gmail.com";s:10:"first_name";s:6:"Jeremy";s:9:"last_name";s:7:"Heweitt";}}i:22;a:1:{s:4:"user";a:3:{s:5:"email";s:17:"dodgygt@gmail.com";s:10:"first_name";s:3:"Jim";s:9:"last_name";s:4:"Shaw";}}i:23;a:1:{s:4:"user";a:3:{s:5:"email";s:27:"jocelyn.c.hassell@gmail.com";s:10:"first_name";s:7:"Jocelyn";s:9:"last_name";s:7:"Hassell";}}i:24;a:1:{s:4:"user";a:3:{s:5:"email";s:25:"mtgblacklotus@hotmail.com";s:10:"first_name";s:8:"Jonathan";s:9:"last_name";s:2:"Ng";}}i:25;a:1:{s:4:"user";a:3:{s:5:"email";s:24:"katlo@interchange.ubc.ca";s:10:"first_name";s:7:"Katrina";s:9:"last_name";s:2:"Lo";}}i:26;a:1:{s:4:"user";a:3:{s:5:"email";s:19:"lam.kendi@gmail.com";s:10:"first_name";s:5:"Kendi";s:9:"last_name";s:3:"Lam";}}i:27;a:1:{s:4:"user";a:3:{s:5:"email";s:21:"flibber_o_loo@shaw.ca";s:10:"first_name";s:5:"Laura";s:9:"last_name";s:8:"Kuboniwa";}}i:28;a:1:{s:4:"user";a:3:{s:5:"email";s:19:"brinton@mail.ubc.ca";s:10:"first_name";s:9:"Laurel J.";s:9:"last_name";s:7:"Brinton";}}i:29;a:1:{s:4:"user";a:3:{s:5:"email";s:21:"gigimanabat@yahoo.com";s:10:"first_name";s:9:"Margarita";s:9:"last_name";s:7:"Manabat";}}i:30;a:1:{s:4:"user";a:3:{s:5:"email";s:22:"fee@interchange.ubc.ca";s:10:"first_name";s:7:"Margery";s:9:"last_name";s:3:"Fee";}}i:31;a:1:{s:4:"user";a:3:{s:5:"email";s:18:"margery.fee@ubc.ca";s:10:"first_name";s:7:"Margery";s:9:"last_name";s:3:"Fee";}}i:32;a:1:{s:4:"user";a:3:{s:5:"email";s:19:"dmark1337@gmail.com";s:10:"first_name";s:4:"Mark";s:9:"last_name";s:7:"Douglas";}}i:33;a:1:{s:4:"user";a:3:{s:5:"email";s:30:"matthew@distinctvariations.com";s:10:"first_name";s:7:"Matthew";s:9:"last_name";s:6:"Gruman";}}i:34;a:1:{s:4:"user";a:3:{s:5:"email";s:27:"happysam@interchange.ubc.ca";s:10:"first_name";s:3:"Sam";s:9:"last_name";s:5:"Chung";}}i:35;a:1:{s:4:"user";a:3:{s:5:"email";s:15:"dstefan@dchp.ca";s:10:"first_name";s:6:"Stefan";s:9:"last_name";s:9:"Dollinger";}}}UserID|s:3:"445";', 1383093830);
/*!40000 ALTER TABLE "det_user_sessions" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.headword
CREATE TABLE IF NOT EXISTS "headword" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "headword" character varying COLLATE pg_catalog."default"  NOT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.headword: 17 536 rows
/*!40000 ALTER TABLE "headword" DISABLE KEYS */;
INSERT INTO "headword" ("id", "headword", "is_dchp1", "is_teach") VALUES
	(17538, 'residential school survivor', NULL, NULL),
	(17539, 'Jigg''s dinner', NULL, NULL),
	(17540, 'Jiggs dinner', NULL, NULL),
	(17541, '49th parallel', NULL, NULL);
/*!40000 ALTER TABLE "headword" ENABLE KEYS */;

-- Dumping structure for table dchpca_dchp2.place
CREATE TABLE IF NOT EXISTS "place" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "name" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.place: 2 172 rows
/*!40000 ALTER TABLE "place" DISABLE KEYS */;
INSERT INTO "place" ("id", "name", "is_dchp1", "is_teach") VALUES
	(1, 'The Gazette. Montreal, Que.: Aug 9, 2003. pg. K.1.BRE', NULL, NULL),
	(2, '', NULL, NULL),
	(3, 'Don Mills, ON', NULL, NULL),
	(4, 'Vancouver, BC', NULL, NULL),
	(2170, 'Coleman, AB', NULL, NULL),
	(2171, 'Swan Hills, AB', NULL, NULL),
	(2172, 'Slave Lake, AB', NULL, NULL);
/*!40000 ALTER TABLE "place" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.sdt
CREATE TABLE IF NOT EXISTS "sdt" (
  "sdtid" BIGSERIAL PRIMARY KEY NOT NULL,
  "sourceid" int NOT NULL,
  "sdt_memo" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "sdt_var" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "sdt_dns" int DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.sdt: 185 512 rows
/*!40000 ALTER TABLE "sdt" DISABLE KEYS */;
INSERT INTO "sdt" ("sdtid", "sourceid", "sdt_memo", "sdt_var", "sdt_dns") VALUES
	(1532, 6, '', '', 0),
	(0, 1, '1,887 results; earliest citation from 2001', 'general synod', 1);
/*!40000 ALTER TABLE "sdt" ENABLE KEYS */;

-- Dumping structure for table dchpca_dchp2.sdt_head
CREATE TABLE IF NOT EXISTS "sdt_head" (
  "headid" int NOT NULL,
  "sdtid" BIGSERIAL PRIMARY KEY NOT NULL
);

-- Dumping data for table dchpca_dchp2.sdt_head: 2 765 rows
/*!40000 ALTER TABLE "sdt_head" DISABLE KEYS */;
INSERT INTO "sdt_head" ("headid", "sdtid") VALUES
	(2, 1532),
	(6, 1533),
	(7, 1534),
	(8868, 4296);
/*!40000 ALTER TABLE "sdt_head" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.sdt_memos
CREATE TABLE IF NOT EXISTS "sdt_memos" (
  "sdtid" BIGSERIAL PRIMARY KEY NOT NULL,
  "big_memo_sdt" character varying COLLATE pg_catalog."default",
  "big_memo_dic" character varying COLLATE pg_catalog."default"
);

-- Dumping data for table dchpca_dchp2.sdt_memos: 7 211 rows
/*!40000 ALTER TABLE "sdt_memos" DISABLE KEYS */;
INSERT INTO "sdt_memos" ("sdtid", "big_memo_sdt", "big_memo_dic") VALUES
	(1532, '', ''),
	(4296, 'Toronto Star: non-hit for "Indian register" from 1 Jan. 1951 to present. -GL (20 Aug. 2012)', '');
/*!40000 ALTER TABLE "sdt_memos" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.sdt_sources
CREATE TABLE IF NOT EXISTS "sdt_sources" (
  "sourceid" BIGSERIAL PRIMARY KEY NOT NULL,
  "source_name" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "source_type" int DEFAULT NULL,
  "source_label" character varying COLLATE pg_catalog."default"  DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.sdt_sources: 77 rows
/*!40000 ALTER TABLE "sdt_sources" DISABLE KEYS */;
INSERT INTO "sdt_sources" ("sourceid", "source_name", "source_type", "source_label") VALUES
	(1, 'Canadian Newsstand', 1, 'canadian'),
	(2, 'The Globe and Mail (1844 - 2000)', 2, 'gm'),
	(3, 'Canadiana.org', 2, 'canadiana_org'),
	(4, 'Manitobia.org (MB)', 2, 'manitoba'),
	(5, 'Kitimat Newspapers (BC, 1898 - )', 2, 'kitimat'),
	(6, 'The Gateway (AB, 1910 - )', 2, 'gate'),
	(7, 'Champlain Society', 2, 'champ'),
	(8, 'BC - UBC Archives (1918 - )', 3, 'ubc'),
	(9, 'AB - The Gaunlet', 3, 'gaunt'),
	(10, 'MB - The Quill', 3, 'quill'),
	(11, 'ON - Arthur', 3, 'arthur'),
	(12, 'ON - The Medium', 3, 'medium'),
	(13, 'ON - Brock Press', 3, 'brock'),
	(14, 'QC - McGill Tribune', 3, 'mcgill'),
	(15, 'NL - The Muse', 3, 'muse'),
	(16, 'Strathy Corpus (c. 1985 - 2004)', 4, 'strathy'),
	(17, 'Corpus of Early Ontario English (1788 - 1850)', 4, 'ontario'),
	(18, '<acronym title="Dictionary of Canadianisms on Historical Principles">DCHP-1</acronym>', 5, 'dchp'),
	(19, '<acronym title="Oxford English Dictionary">OED</acronym> (1884 - )', 5, 'oed'),
	(20, '<acronym title="Dictionary of American Regional English">DARE</acronym> (1985 - )', 5, 'dare'),
	(21, '<acronym title="Dictionary of Americanisms">DA</acronym> (1951 - )', 5, 'da'),
	(22, '<acronym title="Dictionary of Newfoundland English">DNE</acronym> ', 5, 'dne'),
	(23, '<acronym title="Dictionary of Prince Edward Island English">DPEIE</acronym> (1988)', 5, 'dpei'),
	(24, '<acronym title="Canadian Oxford Dictionary">CanOx-2</acronym> (2004)', 5, 'canox'),
	(25, 'ITP Nelson (1987)', 5, 'itp'),
	(26, 'Sandilands (1913)', 5, 'sand'),
	(27, 'Gage Canada (1997)', 5, 'gage'),
	(28, '<acronym title="Random House Historical Dictionary of American Slang">RHHDAS (1994 - )</acronym>', 5, 'dhas'),
	(29, '<acronym title="Dictionary of New Zealand English on Historical Principles">DNZE</acronym> (1997)', 5, 'dnze'),
	(30, '<acronym title="Australian National Dictionary on Historical Principles">AND</acronym> (1988)', 5, 'and'),
	(31, '<acronym title="Dictionary of South African English on Historical Principles">DSAFE</acronym> (1996)', 5, 'dsafe'),
	(32, '<acronym title="English Dialect Dictionary">EDD</acronym> (1905)', 5, 'edd'),
	(33, '<acronym title="Scottish National Dictionary">SND</acronym> (1930s - )', 5, 'snd'),
	(34, 'SK - The Carillon', 3, 'carillon'),
	(35, 'NB - The Argody', 3, 'argody'),
	(36, 'NS - Dalhousie Gazette', 3, 'dal'),
	(37, '<acronym title="Dictionary of American English">DAE</acronym>', 5, 'dae'),
	(53, 'Add Newer Source', 6, 'muqkn'),
	(83, 'American Heritage Dictionary', 6, 'm6z2v'),
	(84, 'The Nova Scotia Business Journal', 6, 'mtpet'),
	(85, 'Chronicling America', 6, 'to3go'),
	(86, '1902', 6, 'ir3p0'),
	(87, 'McGill Daily', 6, '8umjx'),
	(88, 'Google Books', 6, '3c12c'),
	(89, 'The Ingot', 6, '12exn');
/*!40000 ALTER TABLE "sdt_sources" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.source
CREATE TABLE IF NOT EXISTS "source" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "type_id" int DEFAULT NULL,
  "year_published"character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "page" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "author_id" int DEFAULT NULL,
  "title_id" int DEFAULT NULL,
  "place_id" int DEFAULT NULL,
  "url" character varying COLLATE pg_catalog."default",
  "url_access_date" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "dateline" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "periodical_date" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "year_composed" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "publisher" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "uttered" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "utterance_witness" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "utterance_time" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "utterance_media" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "utterance_broadcast" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "volume_issue" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "editor" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "evidence" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.source: ~82 958 rows (approximately)
/*!40000 ALTER TABLE "source" DISABLE KEYS */;
INSERT INTO "source" ("id", "type_id", "year_published", "page", "author_id", "title_id", "place_id", "url", "url_access_date", "dateline", "periodical_date", "year_composed", "publisher", "uttered", "utterance_witness", "utterance_time", "utterance_media", "utterance_broadcast", "volume_issue", "editor", "evidence", "is_dchp1", "is_teach") VALUES
	(1, 1, '2002', 'Volume 26, num?É¬©ro 2, 2002', NULL, 827, 150, 'http://72.14.253.104/search?q=cache:Xn7Fn-zd8_QJ:www.erudit.org/revue/etudinuit/2002/v26/n2/007648ar.html+kamigluk&hl=zh-TW&ct=clnk&cd=5', '', NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL),
	(2, 1, '1977', 'Winter 1977: 11', 7549, 71, 314, 'http://www.library.ubc.ca/archives/pdfs/chronicle/AL_CHRON_1977_4.pdf#xml=http://stikine.library.ubc.ca/dtSearch/dtisapi6.dll?cmd=getpdfhits&u=1e2347f&DocId=163&Index=%2a08ffed365a912495a6cc1ac9cf30a599&HitCount=1&hits=1ab0+&SearchForm=c%3a%5cinetpub%5cwwwroot%5cubcpubs%5cubcpubs%5fform%2ehtml&.pdf', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(69574, 1, '1971', '5', 19297, 1102, 293, 'http://heritage.theglobeandmail.com/PageView.asp', '9 Sep. 2013', NULL, '13 Dec. 1971', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE "source" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.title
CREATE TABLE IF NOT EXISTS "title" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "name" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "short_name" character varying COLLATE pg_catalog."default" DEFAULT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.title: 9 609 rows
/*!40000 ALTER TABLE "title" DISABLE KEYS */;
INSERT INTO "title" ("id", "name", "short_name", "is_dchp1", "is_teach") VALUES
	(1, ' A general history and collection of voyages and travels, arranged in systematic order forming a complete history of the origin and progress of navigation, discovery and commerce, by sea and land, from the earliest ages to the present time', NULL, NULL, NULL),
	(2, ' Acts of the Parliament of the Dominion of Canada ... first session of the second Parliament, begun and holden at Ottawa, on the fifth day of March, and closed by prorogation on the thirteenth day of August, 1873', NULL, NULL, NULL),
	(3, ' Appendix to the seventeenth volume of the journals of the Legislative Assembly of the Province of Canada ... 29th January to 4th May, 1859 ... twenty-second year of the reign of ... Queen Victoria : being the 2nd session of the 6th Provincial Parliament of Canada', NULL, NULL, NULL),
	(4, ' Bill an act to amend and consolidate the judicature acts of Lower Canada', NULL, NULL, NULL),
	(5, ' British American medical & physical journal', NULL, NULL, NULL),
	(6, ' Evidence for the United States in the matter of the claims of the Hudson''s Bay and Puget''s Sound Agricultural Companies : pending before the British and American Joint Commission, for the final settlement of the same : miscellaneous.', NULL, NULL, NULL),
	(7, ' Kaffir, kangaroo, Klondike tales of the gold fields', NULL, NULL, NULL),
	(9625, 'Kinesis', NULL, NULL, NULL);
/*!40000 ALTER TABLE "title" ENABLE KEYS */;


-- Dumping structure for table dchpca_dchp2.user
CREATE TABLE IF NOT EXISTS "user" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL,
  "student_id" int DEFAULT NULL,
  "course" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "access_level" int DEFAULT NULL,
  "is_active" boolean DEFAULT NULL,
  "first_name" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "last_name" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "email" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "password" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "password_key" character varying COLLATE pg_catalog."default"  DEFAULT NULL,
  "is_dchp1" boolean DEFAULT NULL,
  "is_proofer" boolean DEFAULT NULL,
  "is_teach" boolean DEFAULT NULL
);

-- Dumping data for table dchpca_dchp2.user: 349 rows
/*!40000 ALTER TABLE "user" DISABLE KEYS */;
INSERT INTO "user" ("id", "student_id", "course", "access_level", "is_active", "first_name", "last_name", "email", "password", "password_key", "is_dchp1", "is_proofer", "is_teach") VALUES
	(153, 20877031, 'engl-320', 0, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(209, 30568034, 'engl-320', 0, false, 'Stephanie', 'Post', '', NULL, '4a1cee2b38cc6270d122ae4e75323896', NULL, true, NULL),
	(448, 82214131, '2', 0, false, 'Dorota', 'Lockyer', 'dlockyer@alumni.ubc.ca', '1afe0dab999c7b667ba0ddc55c4a3fdb', '', NULL, true, NULL);
/*!40000 ALTER TABLE "user" ENABLE KEYS */;


-- Dumping structure for view dchpca_dchp2.det_bibliographies
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS "det_bibliographies";
CREATE VIEW "det_bibliographies" AS select "c"."id" AS "id","c"."clipped_text" AS "citation","s"."year_published" AS "yearpub","s"."page" AS "page","a"."name" AS "author","p"."name" AS "place","t"."name" AS "title","s"."editor" AS "editor","s"."year_composed" AS "yearcomp","s"."periodical_date" AS "perio_date","s"."volume_issue" AS "vol_iss","s"."url_access_date" AS "url_acc_date","s"."url" AS "url","s"."publisher" AS "publisher","s"."uttered" AS "uttered","s"."utterance_witness" AS "witness","s"."utterance_time" AS "time_apx","s"."utterance_media" AS "media","s"."utterance_broadcast" AS "broadcast","s"."evidence" AS "evidence","s"."dateline" AS "dateline","t"."short_name" AS "short_title" from (((("source" "s" left join "citation" "c" on(("s"."id" = "c"."source_id"))) left join "author" "a" on(("s"."author_id" = "a"."id"))) left join "place" "p" on(("s"."place_id" = "p"."id"))) left join "title" "t" on(("s"."title_id" = "t"."id"))) ;


-- Dumping structure for view dchpca_dchp2.det_citations
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS "det_citations";
CREATE VIEW "det_citations" AS select "c"."id" AS "id","h"."headword" AS "headword","c"."clipped_text" AS "citation","c"."short_meaning" AS "meanshort","c"."spelling_variant" AS "spellvar","c"."is_dchp1" AS "dchp_1","s"."year_published" AS "yearpub","s"."page" AS "page","a"."name" AS "author","p"."name" AS "place","t"."name" AS "title","s"."year_composed" AS "yearcomp","s"."periodical_date" AS "perio_date","s"."volume_issue" AS "vol_iss","s"."url" AS "url","s"."uttered" AS "uttered","s"."utterance_media" AS "media","s"."utterance_broadcast" AS "broadcast","s"."evidence" AS "evidence","s"."dateline" AS "dateline","t"."short_name" AS "short_title" from ((((("citation" "c" left join "source" "s" on(("c"."source_id" = "s"."id"))) left join "author" "a" on(("s"."author_id" = "a"."id"))) left join "place" "p" on(("s"."place_id" = "p"."id"))) left join "title" "t" on(("s"."title_id" = "t"."id"))) left join "headword" "h" on(("c"."headword_id" = "h"."id"))) ;


-- Dumping structure for view dchpca_dchp2.det_shortcitations
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS "det_shortcitations";
CREATE VIEW "det_shortcitations" AS select "c"."id" AS "id","h"."headword" AS "headword","c"."clipped_text" AS "citation","c"."short_meaning" AS "short_meaning","s"."year_published" AS "yearpub","s"."page" AS "page","a"."name" AS "author","t"."name" AS "title" from (((("citation" "c" join "source" "s" on(("s"."id" = "c"."source_id"))) left join "author" "a" on(("s"."author_id" = "a"."id"))) left join "title" "t" on(("s"."title_id" = "t"."id"))) left join "headword" "h" on(("c"."headword_id" = "h"."id"))) ;


-- Dumping structure for view dchpca_dchp2.det_users
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS "det_users";
CREATE VIEW "det_users" AS select "user"."id" AS "id","user"."access_level" AS "is_admin","user"."is_active" AS "is_active","user"."first_name" AS "first","user"."last_name" AS "last","user"."email" AS "email","user"."password" AS "password","user"."is_proofer" AS "is_proofer" from "user" ;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
