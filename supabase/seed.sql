-- seed data generated from y2025 syllabus

-- campus
insert into campuses (id, name, pin) values
  (1, '多摩キャンパス', 'none');

-- buildings (部屋番号の先頭1文字から)
insert into buildings (id, campus_id, name, pin) values
  (1, 1, '2号館', 'none'),
  (2, 1, '3号館', 'none'),
  (3, 1, 'ForestGateWay', 'none'),
  (4, 1, 'G棟', 'none');

-- rooms (floor は部屋番号の2桁目から導出)
insert into rooms (id, building_id, floor, name, pin) values
  -- 2号館
  (1, 1, 1, '2120', 'none'),
  -- 3号館1階
  (2, 2, 1, '3102', 'none'),
  (3, 2, 1, '3103', 'none'),
  (4, 2, 1, '3104', 'none'),
  (5, 2, 1, '3105', 'none'),
  (6, 2, 1, '3106', 'none'),
  (7, 2, 1, '3111', 'none'),
  (8, 2, 1, '3113', 'none'),
  (9, 2, 1, '3156', 'none'),
  (10, 2, 1, '3157', 'none'),
  (11, 2, 1, '3159', 'none'),
  -- 3号館2階
  (12, 2, 2, '3201', 'none'),
  (13, 2, 2, '3203', 'none'),
  (14, 2, 2, '3204', 'none'),
  (15, 2, 2, '3205', 'none'),
  (16, 2, 2, '3207', 'none'),
  (17, 2, 2, '3208', 'none'),
  (18, 2, 2, '3251', 'none'),
  (19, 2, 2, '3255', 'none'),
  (20, 2, 2, '3256', 'none'),
  (21, 2, 2, '3257', 'none'),
  (22, 2, 2, '3259', 'none'),
  (23, 2, 2, '3260', 'none'),
  -- 3号館3階
  (24, 2, 3, '3352', 'none'),
  -- 3号館4階
  (25, 2, 4, '3451', 'none'),
  (26, 2, 4, '3454', 'none'),
  -- 3号館5階
  (27, 2, 5, '3551', 'none'),
  -- ForestGateWay 5階
  (28, 3, 5, 'F505', 'none'),
  -- G棟6階
  (29, 4, 6, 'GG601', 'none');

-- terms
insert into terms (id, year, term, start_date, end_date) values
  (1, 2025, '前期', '2025-04-01', '2025-09-30'),
  (2, 2025, '後期', '2025-10-01', '2026-03-31'),
  (3, 2025, '通年', '2025-04-01', '2026-03-31');

-- reset sequences
select setval('campuses_id_seq', (select max(id) from campuses));
select setval('buildings_id_seq', (select max(id) from buildings));
select setval('rooms_id_seq', (select max(id) from rooms));
select setval('terms_id_seq', (select max(id) from terms));
