create table public.vivienne_torah_highlight_groups_v1 (
id bigint generated always as identity primary key,
passage_key text not null check (passage_key = 'deuteronomy-8-11-20-9-1-10'),
verse smallint not null check (verse between 1 and 20),
start_word smallint not null check(start_word >= 0), end_word smallint not null check(end_word >= start_word),
color smallint not null check(color in (1,2)), unique(passage_key,verse,start_word,end_word));
alter table public.vivienne_torah_highlight_groups_v1 enable row level security;
grant select,insert,delete on public.vivienne_torah_highlight_groups_v1 to anon;
grant usage,select on sequence public.vivienne_torah_highlight_groups_v1_id_seq to anon;
create policy public_read on public.vivienne_torah_highlight_groups_v1 for select to anon using(true);
create policy public_create on public.vivienne_torah_highlight_groups_v1 for insert to anon with check(passage_key = 'deuteronomy-8-11-20-9-1-10');
create policy public_delete on public.vivienne_torah_highlight_groups_v1 for delete to anon using(passage_key = 'deuteronomy-8-11-20-9-1-10');
create table public.vivienne_torah_group_recordings_v1 (
highlight_group_id bigint primary key references public.vivienne_torah_highlight_groups_v1(id) on delete cascade,
object_path text not null check(object_path ~ '^groups/[0-9]+\.(webm|ogg|mp4)$'),
mime_type text not null check(mime_type in ('audio/webm','audio/ogg','audio/mp4')),
byte_size bigint not null check(byte_size between 1 and 52428800), updated_at timestamptz not null default now());
alter table public.vivienne_torah_group_recordings_v1 enable row level security;
grant select,insert,update,delete on public.vivienne_torah_group_recordings_v1 to anon;
create policy shared_phrase_recordings on public.vivienne_torah_group_recordings_v1 for all to anon using(true) with check(true);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('vivienne-torah-group-recordings-v1','vivienne-torah-group-recordings-v1',true,52428800,array['audio/webm','audio/ogg','audio/mp4']);
create policy vivienne_phrase_audio on storage.objects for all to anon
using(bucket_id='vivienne-torah-group-recordings-v1')
with check(bucket_id='vivienne-torah-group-recordings-v1' and name ~ '^groups/[0-9]+\.(webm|ogg|mp4)$');
create table public.vivienne_torah_passage_recordings_v1 (
id uuid primary key, name text not null default 'Vivienne' check(name='Vivienne'), start_time timestamptz not null,
passage_key text not null default 'deuteronomy-8-11-20-9-1-10' check(passage_key='deuteronomy-8-11-20-9-1-10'),
mime_type text not null check(mime_type in ('audio/webm','audio/ogg','audio/mp4')),
audio_base64 text not null check(char_length(audio_base64) between 1 and 12000000),
start_time_pacific timestamp generated always as (start_time at time zone 'America/Los_Angeles') stored,
playback_url text generated always as ('https://esemmelman.github.io/viviennetorah/recording.html#' || id::text) stored);
alter table public.vivienne_torah_passage_recordings_v1 enable row level security;
grant select,insert,update,delete on public.vivienne_torah_passage_recordings_v1 to anon;
create policy current_recording_only on public.vivienne_torah_passage_recordings_v1 for all to anon
using(id::text=(current_setting('request.headers',true)::jsonb->>'x-recording-id'))
with check(id::text=(current_setting('request.headers',true)::jsonb->>'x-recording-id'));
