DROP TABLE IF EXISTS "contents";
DROP TABLE IF EXISTS "images";
DROP TABLE IF EXISTS "reference_displays";
DROP TABLE IF EXISTS "references";
DROP TABLE IF EXISTS "citation_displays";
DROP TABLE IF EXISTS "related_meaning_displays";
DROP TABLE IF EXISTS "meaning_display_notes";
DROP TABLE IF EXISTS "meaning_displays";
DROP TABLE IF EXISTS "citations";
DROP TABLE IF EXISTS "medium_fields";
DROP TABLE IF EXISTS "source_values";
DROP TABLE IF EXISTS "source_fields";
DROP TABLE IF EXISTS "sources";
DROP TABLE IF EXISTS "genres";
DROP TABLE IF EXISTS "mediums";
DROP TABLE IF EXISTS "authors";
DROP TABLE IF EXISTS "meanings";
DROP TABLE IF EXISTS "entries";
DROP TABLE IF EXISTS "spelling_variants";
DROP TABLE IF EXISTS "headwords";
DROP TABLE IF EXISTS "user_roles";
DROP TABLE IF EXISTS "roles";
DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  first_name character varying COLLATE pg_catalog."default" NOT NULL CHECK (first_name <> ''),
  last_name character varying COLLATE pg_catalog."default" NOT NULL CHECK (last_name <> ''),
  email character varying COLLATE pg_catalog."default" UNIQUE NOT NULL CHECK (email <> ''),
  password_hash character varying COLLATE pg_catalog."default" NOT NULL CHECK (password_hash <> ''),
  created_at timestamp NOT NULL
);

CREATE INDEX idx_users_email
ON users(email);

CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name character varying COLLATE pg_catalog."default" CHECK (name <> '')
);

CREATE TABLE IF NOT EXISTS user_roles (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users,
  role_id BIGINT NOT NULL REFERENCES roles,
  UNIQUE (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS headwords (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword character varying COLLATE pg_catalog."default" NOT NULL UNIQUE CHECK (headword <> '')
);

CREATE TABLE IF NOT EXISTS spelling_variants (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword_id BIGINT NOT NULL REFERENCES headwords,
  spelling_variant character varying COLLATE pg_catalog."default" NOT NULL UNIQUE CHECK (spelling_variant <> '')
);

CREATE INDEX idx_headwords_headword
ON headwords(headword);

CREATE TABLE IF NOT EXISTS entries (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword_id BIGINT NOT NULL REFERENCES headwords UNIQUE,
  first_field character varying COLLATE pg_catalog."default" CHECK (first_field <> ''),
  etymology character varying COLLATE pg_catalog."default" CHECK (etymology <> ''),
  is_public boolean NOT NULL DEFAULT false,
  superscript character varying COLLATE pg_catalog."default" CHECK (superscript <> ''),
  is_archaic boolean NOT NULL DEFAULT false,
  general_labels character varying COLLATE pg_catalog."default" CHECK (general_labels <> ''),
  proofing_status int NOT NULL DEFAULT '0',
  proofing_user_id BIGINT NOT NULL REFERENCES users,
  fist_note character varying COLLATE pg_catalog."default" CHECK (fist_note <> ''),
  image_file_name character varying COLLATE pg_catalog."default" CHECK (image_file_name <> ''),
  comment character varying COLLATE pg_catalog."default" CHECK (comment <> ''),
  first_draft boolean NOT NULL DEFAULT false,
  revised_draft boolean NOT NULL DEFAULT false,
  semantically_revised boolean NOT NULL DEFAULT false,
  edited_for_style boolean NOT NULL DEFAULT false,
  proofread boolean NOT NULL DEFAULT false,
  chief_editor_ok boolean NOT NULL DEFAULT false,
  final_proofing boolean NOT NULL DEFAULT false,
  edit_status_comment character varying COLLATE pg_catalog."default" CHECK (edit_status_comment <> '')
);

CREATE TABLE IF NOT EXISTS meanings (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword_id BIGINT NOT NULL REFERENCES headwords,
  part_of_speech character varying COLLATE pg_catalog."default" CHECK (part_of_speech <> ''),
  usage character varying COLLATE pg_catalog."default" CHECK (usage <> ''),
  short_meaning character varying COLLATE pg_catalog."default" CHECK (short_meaning <> ''),
  definition character varying COLLATE pg_catalog."default" CHECK (definition <> ''),
  is_archaic boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS authors (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  surname character varying COLLATE pg_catalog."default" NOT NULL CHECK (surname <> ''),
  forenames character varying COLLATE pg_catalog."default" CHECK (forenames <> ''),
  title character varying COLLATE pg_catalog."default" CHECK (title <> ''),
  year_of_birth integer,
  education character varying COLLATE pg_catalog."default" CHECK (education <> ''),
  occupation character varying COLLATE pg_catalog."default" CHECK (occupation <> ''),
  place_of_birth character varying COLLATE pg_catalog."default" CHECK (place_of_birth <> '')
);

CREATE TABLE IF NOT EXISTS mediums (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name character varying COLLATE pg_catalog."default" CHECK (name <> '') -- book, periodical, website, email, etc.
);

CREATE TABLE IF NOT EXISTS genres (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name character varying COLLATE pg_catalog."default" CHECK (name <> '') -- biography, novel, advertisement, etc.
);

CREATE TABLE IF NOT EXISTS sources (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  medium_id BIGINT NOT NULL REFERENCES mediums,
  genre_id BIGINT REFERENCES genres,
  author_id BIGINT REFERENCES authors,
  year_published integer CHECK (year_published IS NULL OR date_published IS NULL),
  date_published timestamp CHECK (year_published IS NULL OR date_published IS NULL),
  title_of_work character varying COLLATE pg_catalog."default" CHECK (title_of_work <> ''),
  title_of_publication character varying COLLATE pg_catalog."default" CHECK (title_of_publication <> ''),
  location character varying COLLATE pg_catalog."default" CHECK (location <> ''),
  publisher character varying COLLATE pg_catalog."default" CHECK (publisher <> ''),
  volume_number character varying COLLATE pg_catalog."default" CHECK (volume_number <> ''),
  issue_number character varying COLLATE pg_catalog."default" CHECK (issue_number <> ''),
  page_range character varying COLLATE pg_catalog."default" CHECK (page_range <> ''),
  url character varying COLLATE pg_catalog."default" CHECK (url <> '')
);

CREATE TABLE IF NOT EXISTS source_fields (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name character varying COLLATE pg_catalog."default" NOT NULL CHECK (name <> ''), -- year_published
  label character varying COLLATE pg_catalog."default" NOT NULL CHECK (label <> '') -- 'Year Uttered'
);

CREATE TABLE IF NOT EXISTS source_values (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  source_id BIGINT NOT NULL REFERENCES sources,
  source_field_id BIGINT NOT NULL REFERENCES source_fields,
  "value" character varying COLLATE pg_catalog."default" CHECK ("value" <> ''),
  UNIQUE (source_id, source_field_id)
);

CREATE TABLE IF NOT EXISTS medium_fields (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  medium_id BIGINT NOT NULL REFERENCES mediums,
  source_field_id BIGINT NOT NULL REFERENCES source_fields
);

--CREATE TABLE IF NOT EXISTS sources (
--  id BIGSERIAL PRIMARY KEY NOT NULL,
--  source_type character varying COLLATE pg_catalog."default" CHECK (source_type = 'book' OR source_type = 'periodical' OR source_type = 'website' OR source_type = 'utterance'),
--  date_published timestamp,
--  date_composed character varying COLLATE pg_catalog."default" CHECK (date_composed <> ''),
--  author character varying COLLATE pg_catalog."default" CHECK (author <> ''),
--  editor character varying COLLATE pg_catalog."default" CHECK (editor <> ''),
--  title character varying COLLATE pg_catalog."default" CHECK (title <> ''),
--  location character varying COLLATE pg_catalog."default" CHECK (location <> ''),
--  publisher character varying COLLATE pg_catalog."default" CHECK (publisher <> ''),
--  url character varying COLLATE pg_catalog."default" CHECK (url <> ''),
--  url_accessed_at timestamp,
--  page character varying COLLATE pg_catalog."default" CHECK (page <> ''),
--  issue character varying COLLATE pg_catalog."default" CHECK (issue <> ''),
--  evidence character varying COLLATE pg_catalog."default" CHECK (evidence <> '')
--);

CREATE TABLE IF NOT EXISTS citations (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_id BIGINT REFERENCES meanings,
  user_id BIGINT REFERENCES users,
  spelling_variant_id BIGINT REFERENCES spelling_variants,
  text character varying COLLATE pg_catalog."default" CHECK (text <> ''),
  created_at timestamp,
  modified_at timestamp,
  modified_user_id BIGINT REFERENCES users,
  legacy_id BIGINT,
  is_incomplete boolean NOT NULL DEFAULT false,
  memo character varying COLLATE pg_catalog."default" CHECK (memo <> ''),
  clip_start int,
  clip_end int,
  clipped_text character varying COLLATE pg_catalog."default" CHECK (clipped_text <> ''),
  source_id BIGINT REFERENCES sources UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS meaning_displays (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  entry_id BIGINT NOT NULL REFERENCES entries,
  meaning_id BIGINT NOT NULL REFERENCES meanings,
  sort_order int NOT NULL,
  list_label character varying COLLATE pg_catalog."default" CHECK (list_label <> ''),
  canadianism_type character varying COLLATE pg_catalog."default" CHECK (canadianism_type <> ''),
  canadianism_type_comment character varying COLLATE pg_catalog."default" CHECK (canadianism_type_comment <> '')
);

CREATE TABLE IF NOT EXISTS meaning_display_notes (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_display_id BIGINT NOT NULL REFERENCES meaning_displays,
  text character varying COLLATE pg_catalog."default" NOT NULL CHECK (text <> '')
);

CREATE TABLE IF NOT EXISTS related_meaning_displays (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  from_meaning_display_id BIGINT NOT NULL REFERENCES meaning_displays,
  to_meaning_display_id BIGINT NOT NULL REFERENCES meaning_displays,
  link_note character varying COLLATE pg_catalog."default" CHECK (link_note <> ''),
  UNIQUE (from_meaning_display_id, to_meaning_display_id)
);

CREATE TABLE IF NOT EXISTS citation_displays (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_display_id BIGINT NOT NULL REFERENCES meaning_displays,
  citation_id BIGINT NOT NULL REFERENCES citations,
  UNIQUE (meaning_display_id, citation_id)
);

CREATE TABLE IF NOT EXISTS "references" (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  short_display character varying COLLATE pg_catalog."default" CHECK (short_display <> ''),
  reference_text character varying COLLATE pg_catalog."default" NOT NULL CHECK (reference_text <> '')
);

CREATE TABLE IF NOT EXISTS reference_displays (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  entry_id BIGINT NOT NULL REFERENCES entries,
  reference_id BIGINT NOT NULL REFERENCES "references",
  UNIQUE (entry_id, reference_id),
  sv_text character varying COLLATE pg_catalog."default" CHECK (sv_text <> ''),
  link_text character varying COLLATE pg_catalog."default" CHECK (link_text <> ''),
  link_target character varying COLLATE pg_catalog."default" CHECK (link_target <> ''),
  accessed_at timestamp
);

CREATE TABLE IF NOT EXISTS images (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  entry_id BIGINT NOT NULL REFERENCES entries,
  caption character varying COLLATE pg_catalog."default" CHECK (caption <> ''),
  path character varying COLLATE pg_catalog."default" CHECK (path <> ''),
  scale real,
  sort_order int
);

CREATE TABLE IF NOT EXISTS contents (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  "section" character varying COLLATE pg_catalog."default" NOT NULL CHECK ("section" <> ''),
  text character varying COLLATE pg_catalog."default" CHECK (text <> '')
);
