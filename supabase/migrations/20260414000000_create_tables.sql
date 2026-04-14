-- campuses
create table campuses (
  id serial primary key,
  name text not null unique,
  pin text not null default 'none' check (pin in ('first', 'none', 'last'))
);

-- buildings
create table buildings (
  id serial primary key,
  campus_id int not null references campuses (id) on delete cascade,
  name text not null unique,
  pin text not null default 'none' check (pin in ('first', 'none', 'last'))
);

-- rooms
create table rooms (
  id serial primary key,
  building_id int not null references buildings (id) on delete cascade,
  floor smallint not null,
  name text not null unique,
  pin text not null default 'none' check (pin in ('first', 'none', 'last'))
);

-- terms
create table terms (
  id serial primary key,
  year smallint not null,
  term text not null,
  start_date date not null,
  end_date date not null
);

-- lectures
create table lectures (
  id serial primary key,
  name text not null,
  instructor text,
  faculty text,
  url text
);

-- schedules (行がある = 使用中)
create table schedules (
  id serial primary key,
  room_id int not null references rooms (id) on delete cascade,
  term_id int not null references terms (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 4),
  period smallint not null check (period between 1 and 6),
  lecture_id int references lectures (id) on delete set null,
  label text,
  unique (room_id, term_id, day_of_week, period)
);

-- RLS
alter table campuses enable row level security;
alter table buildings enable row level security;
alter table rooms enable row level security;
alter table terms enable row level security;
alter table lectures enable row level security;
alter table schedules enable row level security;

create policy "anyone can read campuses" on campuses for select using (true);
create policy "anyone can read buildings" on buildings for select using (true);
create policy "anyone can read rooms" on rooms for select using (true);
create policy "anyone can read terms" on terms for select using (true);
create policy "authenticated can read lectures" on lectures for select using (auth.role() = 'authenticated');
create policy "anyone can read schedules" on schedules for select using (true);
