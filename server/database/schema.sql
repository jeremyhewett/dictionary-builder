CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  first_name character varying COLLATE pg_catalog."default" NOT NULL CHECK (first_name <> ''),
  last_name character varying COLLATE pg_catalog."default" NOT NULL CHECK (last_name <> ''),
  email character varying COLLATE pg_catalog."default" UNIQUE NOT NULL CHECK (email <> ''),
  password_hash character varying COLLATE pg_catalog."default" NOT NULL CHECK (password_hash <> '')
);

CREATE INDEX idx_users_email
ON users(email);

CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name character varying COLLATE pg_catalog."default" CHECK (name <> '')
);

CREATE TABLE IF NOT EXISTS user_role_links (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users,
  role_id BIGINT NOT NULL REFERENCES roles
);

CREATE TABLE IF NOT EXISTS headwords (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword character varying COLLATE pg_catalog."default" NOT NULL UNIQUE CHECK (headword <> '')
);

CREATE INDEX idx_headwords_headword
ON headwords(headword);

CREATE TABLE IF NOT EXISTS entries (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword_id BIGINT NOT NULL REFERENCES headwords UNIQUE,
  first_field character varying COLLATE pg_catalog."default" CHECK (first_field <> ''),
  etymology character varying COLLATE pg_catalog."default" CHECK (etymology <> ''),
  is_public boolean NOT NULL DEFAULT false,
  spelling_variants character varying COLLATE pg_catalog."default" CHECK (spelling_variants <> ''),
  superscript character varying COLLATE pg_catalog."default" CHECK (superscript <> ''),
  dagger boolean NOT NULL DEFAULT false,
  general_labels character varying COLLATE pg_catalog."default" CHECK (general_labels <> ''),
  proofing_status int NOT NULL DEFAULT '0',
  proofing_user character varying COLLATE pg_catalog."default" CHECK (proofing_user <> ''),
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
  entry_id BIGINT NOT NULL REFERENCES entries,
  part_of_speech character varying COLLATE pg_catalog."default" CHECK (part_of_speech <> ''),
  definition character varying COLLATE pg_catalog."default" CHECK (definition <> ''),
  order_num int NOT NULL,
  order_letter character varying COLLATE pg_catalog."default" CHECK (order_letter <> ''),
  usage character varying COLLATE pg_catalog."default" CHECK (usage <> ''),
  canadianism_type character varying COLLATE pg_catalog."default" CHECK (canadianism_type <> ''),
  canadianism_type_comment character varying COLLATE pg_catalog."default" CHECK (canadianism_type_comment <> ''),
  "order" character varying COLLATE pg_catalog."default" CHECK ("order" <> ''),
  dagger boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS citations (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  headword_id BIGINT REFERENCES headwords,
  user_id BIGINT REFERENCES users,
  short_meaning character varying COLLATE pg_catalog."default" CHECK (short_meaning <> ''),
  part_of_speech character varying COLLATE pg_catalog."default" CHECK (part_of_speech <> ''),
  spelling_variant character varying COLLATE pg_catalog."default" CHECK (spelling_variant <> ''),
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
  source_type character varying COLLATE pg_catalog."default"
);

--ALTER TABLE citations
--ADD CONSTRAINT citations_one_source check (
--    (book_id IS NOT NULL)::integer + (periodical_id IS NOT NULL)::integer + (website_id IS NOT NULL)::integer + (utterance_id IS NOT NULL)::integer = 1
--);

CREATE TABLE IF NOT EXISTS citation_meaning_links (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_id BIGINT NOT NULL REFERENCES meanings,
  citation_id BIGINT NOT NULL REFERENCES citations,
  UNIQUE (meaning_id, citation_id)
);

CREATE TABLE IF NOT EXISTS books (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  citation_id BIGINT REFERENCES citations UNIQUE NOT NULL,
  year_published int,
  year_composed character varying COLLATE pg_catalog."default" CHECK (year_composed <> ''),
  author character varying COLLATE pg_catalog."default" CHECK (author <> ''),
  editor character varying COLLATE pg_catalog."default" CHECK (editor <> ''),
  title character varying COLLATE pg_catalog."default" CHECK (title <> ''),
  place character varying COLLATE pg_catalog."default" CHECK (place <> ''),
  publisher character varying COLLATE pg_catalog."default" CHECK (publisher <> ''),
  url character varying COLLATE pg_catalog."default" CHECK (url <> ''),
  url_accessed_at timestamp,
  page character varying COLLATE pg_catalog."default" CHECK (page <> '')
);

CREATE TABLE IF NOT EXISTS periodicals (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  citation_id BIGINT REFERENCES citations UNIQUE NOT NULL,
  author character varying COLLATE pg_catalog."default" CHECK (author <> ''),
  title character varying COLLATE pg_catalog."default" CHECK (title <> ''),
  place character varying COLLATE pg_catalog."default" CHECK (place <> ''),
  issue character varying COLLATE pg_catalog."default" CHECK (issue <> ''),
  issue_date timestamp,
  issue_date_timezone character varying COLLATE pg_catalog."default" CHECK (issue_date_timezone <> ''),
  url character varying COLLATE pg_catalog."default" CHECK (url <> ''),
  url_accessed_at timestamp,
  page character varying COLLATE pg_catalog."default" CHECK (page <> '')
);

CREATE TABLE IF NOT EXISTS websites (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  citation_id BIGINT REFERENCES citations UNIQUE NOT NULL,
  published_date date,
  author character varying COLLATE pg_catalog."default" CHECK (author <> ''),
  title character varying COLLATE pg_catalog."default" CHECK (title <> ''),
  place character varying COLLATE pg_catalog."default" CHECK (place <> ''),
  url character varying COLLATE pg_catalog."default" CHECK (url <> ''),
  url_accessed_at timestamp,
  evidence character varying COLLATE pg_catalog."default" CHECK (evidence <> '')
);

CREATE TABLE IF NOT EXISTS utterances (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  citation_id BIGINT REFERENCES citations UNIQUE NOT NULL,
  year_recorded int,
  uttered_by character varying COLLATE pg_catalog."default" CHECK (uttered_by <> ''),
  utterance_date date,
  utterance_time time,
  media character varying COLLATE pg_catalog."default" CHECK (media <> ''),
  broadcast character varying COLLATE pg_catalog."default" CHECK (broadcast <> ''),
  place character varying COLLATE pg_catalog."default" CHECK (place <> ''),
  witness character varying COLLATE pg_catalog."default" CHECK (witness <> ''),
  url character varying COLLATE pg_catalog."default" CHECK (url <> ''),
  url_accessed_at timestamp
);

CREATE TABLE IF NOT EXISTS "references" (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  short_display character varying COLLATE pg_catalog."default" CHECK (short_display <> ''),
  reference_text character varying COLLATE pg_catalog."default" NOT NULL CHECK (reference_text <> '')
);

CREATE TABLE IF NOT EXISTS meaning_entry_links (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_id BIGINT NOT NULL REFERENCES meanings,
  entry_id BIGINT NOT NULL REFERENCES entries,
  link_note character varying COLLATE pg_catalog."default" CHECK (link_note <> ''),
  UNIQUE (meaning_id, entry_id)
);

CREATE TABLE IF NOT EXISTS entry_reference_links (
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
  "order" int
);

CREATE TABLE IF NOT EXISTS usage_notes (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  meaning_id BIGINT NOT NULL REFERENCES meanings,
  text character varying COLLATE pg_catalog."default" NOT NULL CHECK (text <> '')
);

CREATE TABLE IF NOT EXISTS contents (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  "section" character varying COLLATE pg_catalog."default" NOT NULL CHECK ("section" <> ''),
  text character varying COLLATE pg_catalog."default" CHECK (text <> '')
);
