---
title: Database
description: Database schema and structure breakdowns
---

```sql
-- Extensions
create extension if not exists "uuid-ossp";

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- HABIT TRACKER -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- Habits
create table public.habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  tracking_type text default 'boolean' not null, -- boolean | count | duration
  metadata jsonb default '{}'::jsonb not null,
  current_streak integer default 0 not null,
  longest_streak integer default 0 not null,
  last_logged_date date,
  created_at timestamptz default now() not null
);

-- Habit logs
create table public.habit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  habit_id uuid references public.habits(id) on delete cascade not null,
  entry_date date not null,
  value numeric default 0 not null,
  note text,
  updated_at timestamptz default now() not null,
  unique (user_id, habit_id, entry_date)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- NOTEBOOK APP -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- Folders: 
create table public.folders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  icon text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Documents: 
create table public.documents (
  id uuid primary key default uuid_generate_v4(),  
  user_id uuid references auth.users(id) on delete cascade not null,
  folder_id uuid references public.folders(id) on delete set null,
  title text default 'Untitled' not null,

  -- [{ id, type, content }]
  content_blocks jsonb default '[]'::jsonb not null,
  preview text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Flat document index
create or replace view public.document_index as
select
  id,
  user_id,
  folder_id,
  title,
  preview,
  updated_at
from public.documents
order by updated_at desc;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- TAGS  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- List of tags available
create table public.tags (
  id uuid primary key default uuid_generate_v4(),  
  user_id uuid references auth.users(id) on delete cascade not null,  
  name text not null,
  color text,
  unique(user_id, name)
);

-- Document ↔ Tags
create table public.document_tag_map (
  document_id uuid references public.documents(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (document_id, tag_id)
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- RLS -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- RLS
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.folders enable row level security;
alter table public.documents enable row level security;
alter table public.tags enable row level security;
alter table public.document_tag_map enable row level security;

-- Habits policies
create policy "Users can access their own habits"
on public.habits
for all
using (auth.uid() = user_id);

create policy "Users can access their own habit logs"
on public.habit_logs
for all
using (auth.uid() = user_id);

-- Folder policies
create policy "Users can access their own folders"
on public.folders
for all
using (auth.uid() = user_id);

-- Document policies
create policy "Users can access their own documents"
on public.documents
for all
using (auth.uid() = user_id);

-- Tag policies
create policy "Users can access their own tags"
on public.tags
for all
using (auth.uid() = user_id);

-- Document tag map policies
create policy "Users can access their own document tag maps"
on public.document_tag_map
for all
using (
  exists (
    select 1
    from public.documents d
    where d.id = document_tag_map.document_id
      and d.user_id = auth.uid()
  )
);