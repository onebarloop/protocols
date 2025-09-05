create table protocols (
  id bigint primary key generated always as identity,
  html text,
  created_at timestamptz default now()
);