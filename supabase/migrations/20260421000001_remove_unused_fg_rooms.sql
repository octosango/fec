-- Remove FG館 rooms that are always locked, absorbed into punched-through
-- parent rooms, or otherwise never scheduled. Keep F307 only.
delete from rooms where building_id = 2 and name in (
  -- never used
  'F101', 'F102', 'F103', 'F104', 'F105',
  -- always locked
  'F302', 'F303', 'F304', 'F305', 'F306', 'F312',
  'F401', 'F402', 'F407',
  'F501', 'F503', 'F506', 'F510',
  -- absorbed into punched-through parent room
  'F309', 'F311',
  'F406', 'F409', 'F411',
  'F508', 'F509', 'F512', 'F513',
  'F606', 'F608'
);
