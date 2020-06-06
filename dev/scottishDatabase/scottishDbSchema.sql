
DROP TABLE IF EXISTS "tbl_bibliographical";
CREATE TABLE IF NOT EXISTS "tbl_bibliographical" (
	"bibliographical_id" INTEGER NULL DEFAULT NULL,
	"source_title" TEXT NULL DEFAULT NULL,
	"source_title2" TEXT NULL DEFAULT NULL,
	"dummy_pub" VARCHAR(255) NULL DEFAULT NULL,
	"redundant" BOOLEAN NULL DEFAULT NULL,
	"publication" INTEGER NULL DEFAULT NULL,
	"date_of_composition_exact" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_composition_descriptive" VARCHAR(255) NULL DEFAULT NULL,
	"reported_by" INTEGER NULL DEFAULT NULL,
	"genre" VARCHAR(255) NULL DEFAULT NULL,
	"audience" VARCHAR(255) NULL DEFAULT NULL,
	"article_title" VARCHAR(255) NULL DEFAULT NULL,
	"page_range" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_composition" VARCHAR(255) NULL DEFAULT NULL,
	"misc_info" VARCHAR(255) NULL DEFAULT NULL,
	"object_type" INTEGER NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_dictionary_entry";
CREATE TABLE IF NOT EXISTS "tbl_dictionary_entry" (
	"dictionary_entry_id" INTEGER NULL DEFAULT NULL,
	"keyword" INTEGER NULL DEFAULT NULL,
	"dictionary" VARCHAR(255) NULL DEFAULT NULL,
	"headword_identifier" VARCHAR(255) NULL DEFAULT NULL,
	"homonym_no" INTEGER NULL DEFAULT NULL,
	"sense" VARCHAR(255) NULL DEFAULT NULL,
	"correction" VARCHAR(255) NULL DEFAULT NULL,
	"etymology" VARCHAR(255) NULL DEFAULT NULL,
	"comments" TEXT NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_genre_list";
CREATE TABLE IF NOT EXISTS "tbl_genre_list" (
	"index" INTEGER NULL DEFAULT NULL,
	"genre_label" VARCHAR(255) NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_keyword";
CREATE TABLE IF NOT EXISTS "tbl_keyword" (
	"keyword_id" INTEGER NULL DEFAULT NULL,
	"keyword" VARCHAR(255) NULL DEFAULT NULL,
	"quotation" INTEGER NULL DEFAULT NULL,
	"basic_part_of_speech" VARCHAR(255) NULL DEFAULT NULL,
	"morphology" VARCHAR(255) NULL DEFAULT NULL,
	"thesaurus_code" VARCHAR(255) NULL DEFAULT NULL,
	"phonemic_transcription" VARCHAR(255) NULL DEFAULT NULL,
	"grammar" VARCHAR(255) NULL DEFAULT NULL,
	"notes" VARCHAR(255) NULL DEFAULT NULL,
	"definition" VARCHAR(255) NULL DEFAULT NULL,
	"cross_references" VARCHAR(255) NULL DEFAULT NULL,
	"edit_keyword" VARCHAR(255) NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_medium_genre_update";
CREATE TABLE IF NOT EXISTS "tbl_medium_genre_update" (
	"pub_id" INTEGER NULL DEFAULT NULL,
	"medium" INTEGER NULL DEFAULT NULL,
	"genre" INTEGER NULL DEFAULT NULL,
	"audience" INTEGER NULL DEFAULT NULL
);


DROP TABLE IF EXISTS "tbl_medium_list";
CREATE TABLE IF NOT EXISTS "tbl_medium_list" (
	"index" INTEGER NULL DEFAULT NULL,
	"medium_label" VARCHAR(255) NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_people";
CREATE TABLE IF NOT EXISTS "tbl_people" (
	"person_id" INTEGER NULL DEFAULT NULL,
	"last_name" VARCHAR(255) NULL DEFAULT NULL,
	"forenames" VARCHAR(255) NULL DEFAULT NULL,
	"title" VARCHAR(255) NULL DEFAULT NULL,
	"fullname" VARCHAR(255) NULL DEFAULT NULL,
	"pseuodnym" VARCHAR(255) NULL DEFAULT NULL,
	"sex" VARCHAR(255) NULL DEFAULT NULL,
	"decade_of_birth" SMALLINT NULL DEFAULT NULL,
	"age_left_school" SMALLINT NULL DEFAULT NULL,
	"education" VARCHAR(255) NULL DEFAULT NULL,
	"occupation" VARCHAR(255) NULL DEFAULT NULL,
	"upbringing_and_or_religious_beliefs" VARCHAR(255) NULL DEFAULT NULL,
	"place_of_birth" VARCHAR(255) NULL DEFAULT NULL,
	"region_of_birth" VARCHAR(255) NULL DEFAULT NULL,
	"birthplace_csd_dialect_area" VARCHAR(255) NULL DEFAULT NULL,
	"country_of_birth" VARCHAR(255) NULL DEFAULT NULL,
	"place_of_residence" VARCHAR(255) NULL DEFAULT NULL,
	"region_of_residence" VARCHAR(255) NULL DEFAULT NULL,
	"residence_csd_dialect_area" VARCHAR(255) NULL DEFAULT NULL,
	"country_of_residence" VARCHAR(255) NULL DEFAULT NULL,
	"Father's occupation" VARCHAR(255) NULL DEFAULT NULL,
	"Father's place of birth" VARCHAR(255) NULL DEFAULT NULL,
	"Father's region of birth" VARCHAR(255) NULL DEFAULT NULL,
	"Father's birthplace CSD dialect area" VARCHAR(255) NULL DEFAULT NULL,
	"Father's country of birth" VARCHAR(255) NULL DEFAULT NULL,
	"Mother's occupation" VARCHAR(255) NULL DEFAULT NULL,
	"Mother's place of birth" VARCHAR(255) NULL DEFAULT NULL,
	"Mother's region of birth" VARCHAR(255) NULL DEFAULT NULL,
	"Mother's birthplace CSD dialect area" VARCHAR(255) NULL DEFAULT NULL,
	"Mother's country of birth" VARCHAR(255) NULL DEFAULT NULL,
	"personal_info_misc" VARCHAR(255) NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_people_list";
CREATE TABLE IF NOT EXISTS "tbl_people_list" (
	"person_list_id" INTEGER NULL DEFAULT NULL,
	"person" INTEGER NULL DEFAULT NULL,
	"referenced_from" INTEGER NULL DEFAULT NULL,
	"reference_id" INTEGER NULL DEFAULT NULL,
	"principal_person" BOOLEAN NULL DEFAULT NULL,
	"edit" VARCHAR(255) NULL DEFAULT NULL,
	"editor" BOOLEAN NULL DEFAULT NULL,
	"person_order" SMALLINT NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_publication";
CREATE TABLE IF NOT EXISTS "tbl_publication" (
	"publication_id" INTEGER NULL DEFAULT NULL,
	"title" VARCHAR(255) NULL DEFAULT NULL,
	"medium_old" VARCHAR(255) NULL DEFAULT NULL,
	"medium" VARCHAR(255) NULL DEFAULT NULL,
	"redundant" BOOLEAN NULL DEFAULT NULL,
	"date_of_publication_exact" TIMESTAMP NULL DEFAULT NULL,
	"date_of_publication_descriptive" VARCHAR(255) NULL DEFAULT NULL,
	"edition_number" INTEGER NULL DEFAULT NULL,
	"date_of_edition_exact" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_edition_descriptive" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_composition_exact" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_composition_descriptive" VARCHAR(255) NULL DEFAULT NULL,
	"series_title" VARCHAR(255) NULL DEFAULT NULL,
	"volume_number" INTEGER NULL DEFAULT NULL,
	"issue_identifier" VARCHAR(255) NULL DEFAULT NULL,
	"publisher" VARCHAR(255) NULL DEFAULT NULL,
	"place_of_publication" VARCHAR(255) NULL DEFAULT NULL,
	"isbn" VARCHAR(255) NULL DEFAULT NULL,
	"object_type" INTEGER NULL DEFAULT NULL
);

DROP TABLE IF EXISTS "tbl_quotation";
CREATE TABLE IF NOT EXISTS "tbl_quotation" (
	"quotation_id" INTEGER NULL DEFAULT NULL,
	"quotation" TEXT NULL DEFAULT NULL,
	"source_type" VARCHAR(255) NULL DEFAULT NULL,
	"personal_source" INTEGER NULL DEFAULT NULL,
	"bibliographic_source" INTEGER NULL DEFAULT NULL,
	"used_in_2005_supplement" BOOLEAN NULL DEFAULT NULL,
	"quotation_misc" VARCHAR(255) NULL DEFAULT NULL,
	"date_keyed" VARCHAR(255) NULL DEFAULT NULL,
	"progress" VARCHAR(255) NULL DEFAULT NULL,
	"reported_by" INTEGER NULL DEFAULT NULL,
	"date_of_quotation_exact" VARCHAR(255) NULL DEFAULT NULL,
	"date_of_quotation_descriptive" VARCHAR(255) NULL DEFAULT NULL,
	"page_number" VARCHAR(255) NULL DEFAULT NULL,
	"part_number" VARCHAR(255) NULL DEFAULT NULL,
	"volume_number" VARCHAR(255) NULL DEFAULT NULL,
	"citation_location" VARCHAR(255) NULL DEFAULT NULL
);
