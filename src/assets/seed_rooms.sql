-- seed_rooms.sql
-- Insert 100 rooms into the `rooms` table for local development
-- Based on the `rooms` table definition in src/assets/schema.sql

BEGIN;

-- If you want created_by to reference the admin user created by schema.sql,
-- this subquery will return that user's id or NULL if it does not exist.
-- We leave id generation to the sequence (BIGSERIAL).

INSERT INTO rooms (building_id, name, code, capacity, description, is_active, created_by, created_at, updated_at, room_type_id)
VALUES

-- 1..10
(NULL, 'Salle 001', 'R-001', 4, 'Salle de réunion 001', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 002', 'R-002', 6, 'Salle de réunion 002', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 003', 'R-003', 8, 'Salle de réunion 003', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 004', 'R-004', 10, 'Salle de réunion 004', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 005', 'R-005', 12, 'Salle de réunion 005', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 006', 'R-006', 4, 'Salle de réunion 006', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 007', 'R-007', 6, 'Salle de réunion 007', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 008', 'R-008', 8, 'Salle de réunion 008', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 009', 'R-009', 10, 'Salle de réunion 009', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 010', 'R-010', 12, 'Salle de réunion 010', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 11..20
(NULL, 'Salle 011', 'R-011', 4, 'Salle de réunion 011', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 012', 'R-012', 6, 'Salle de réunion 012', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 013', 'R-013', 8, 'Salle de réunion 013', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 014', 'R-014', 10, 'Salle de réunion 014', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 015', 'R-015', 12, 'Salle de réunion 015', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 016', 'R-016', 16, 'Salle de réunion 016', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 017', 'R-017', 20, 'Salle de réunion 017', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 018', 'R-018', 4, 'Salle de réunion 018', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 019', 'R-019', 6, 'Salle de réunion 019', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 020', 'R-020', 8, 'Salle de réunion 020', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 21..30
(NULL, 'Salle 021', 'R-021', 10, 'Salle de réunion 021', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 022', 'R-022', 12, 'Salle de réunion 022', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 023', 'R-023', 4, 'Salle de réunion 023', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 024', 'R-024', 6, 'Salle de réunion 024', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 025', 'R-025', 8, 'Salle de réunion 025', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 026', 'R-026', 10, 'Salle de réunion 026', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 027', 'R-027', 12, 'Salle de réunion 027', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 028', 'R-028', 16, 'Salle de réunion 028', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 029', 'R-029', 20, 'Salle de réunion 029', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 030', 'R-030', 4, 'Salle de réunion 030', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 31..40
(NULL, 'Salle 031', 'R-031', 6, 'Salle de réunion 031', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 032', 'R-032', 8, 'Salle de réunion 032', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 033', 'R-033', 10, 'Salle de réunion 033', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 034', 'R-034', 12, 'Salle de réunion 034', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 035', 'R-035', 4, 'Salle de réunion 035', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 036', 'R-036', 6, 'Salle de réunion 036', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 037', 'R-037', 8, 'Salle de réunion 037', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 038', 'R-038', 10, 'Salle de réunion 038', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 039', 'R-039', 12, 'Salle de réunion 039', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 040', 'R-040', 16, 'Salle de réunion 040', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 41..50
(NULL, 'Salle 041', 'R-041', 20, 'Salle de réunion 041', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 042', 'R-042', 4, 'Salle de réunion 042', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 043', 'R-043', 6, 'Salle de réunion 043', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 044', 'R-044', 8, 'Salle de réunion 044', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 045', 'R-045', 10, 'Salle de réunion 045', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 046', 'R-046', 12, 'Salle de réunion 046', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 047', 'R-047', 16, 'Salle de réunion 047', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 048', 'R-048', 20, 'Salle de réunion 048', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 049', 'R-049', 4, 'Salle de réunion 049', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 050', 'R-050', 6, 'Salle de réunion 050', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 51..60
(NULL, 'Salle 051', 'R-051', 8, 'Salle de réunion 051', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 052', 'R-052', 10, 'Salle de réunion 052', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 053', 'R-053', 12, 'Salle de réunion 053', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 054', 'R-054', 16, 'Salle de réunion 054', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 055', 'R-055', 20, 'Salle de réunion 055', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 056', 'R-056', 4, 'Salle de réunion 056', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 057', 'R-057', 6, 'Salle de réunion 057', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 058', 'R-058', 8, 'Salle de réunion 058', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 059', 'R-059', 10, 'Salle de réunion 059', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 060', 'R-060', 12, 'Salle de réunion 060', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 61..70
(NULL, 'Salle 061', 'R-061', 16, 'Salle de réunion 061', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 062', 'R-062', 20, 'Salle de réunion 062', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 063', 'R-063', 4, 'Salle de réunion 063', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 064', 'R-064', 6, 'Salle de réunion 064', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 065', 'R-065', 8, 'Salle de réunion 065', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 066', 'R-066', 10, 'Salle de réunion 066', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 067', 'R-067', 12, 'Salle de réunion 067', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 068', 'R-068', 16, 'Salle de réunion 068', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 069', 'R-069', 20, 'Salle de réunion 069', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 070', 'R-070', 4, 'Salle de réunion 070', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 71..80
(NULL, 'Salle 071', 'R-071', 6, 'Salle de réunion 071', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 072', 'R-072', 8, 'Salle de réunion 072', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 073', 'R-073', 10, 'Salle de réunion 073', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 074', 'R-074', 12, 'Salle de réunion 074', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 075', 'R-075', 16, 'Salle de réunion 075', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 076', 'R-076', 20, 'Salle de réunion 076', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 077', 'R-077', 4, 'Salle de réunion 077', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 078', 'R-078', 6, 'Salle de réunion 078', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 079', 'R-079', 8, 'Salle de réunion 079', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 080', 'R-080', 10, 'Salle de réunion 080', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 81..90
(NULL, 'Salle 081', 'R-081', 12, 'Salle de réunion 081', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 082', 'R-082', 16, 'Salle de réunion 082', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 083', 'R-083', 20, 'Salle de réunion 083', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 084', 'R-084', 4, 'Salle de réunion 084', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 085', 'R-085', 6, 'Salle de réunion 085', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 086', 'R-086', 8, 'Salle de réunion 086', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 087', 'R-087', 10, 'Salle de réunion 087', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 088', 'R-088', 12, 'Salle de réunion 088', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 089', 'R-089', 16, 'Salle de réunion 089', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 090', 'R-090', 20, 'Salle de réunion 090', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),

-- 91..100
(NULL, 'Salle 091', 'R-091', 4, 'Salle de réunion 091', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 092', 'R-092', 6, 'Salle de réunion 092', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 093', 'R-093', 8, 'Salle de réunion 093', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 094', 'R-094', 10, 'Salle de réunion 094', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 095', 'R-095', 12, 'Salle de réunion 095', FALSE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 096', 'R-096', 16, 'Salle de réunion 096', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 097', 'R-097', 20, 'Salle de réunion 097', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 098', 'R-098', 4, 'Salle de réunion 098', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 099', 'R-099', 6, 'Salle de réunion 099', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL),
(NULL, 'Salle 100', 'R-100', 8, 'Salle de réunion 100', TRUE, (SELECT id FROM users WHERE username='admin'), now(), now(), NULL)
;

COMMIT;

-- Notes:
-- - This file assumes the `rooms` table and referenced `users` row exist (the schema.sql inserts an admin user named 'admin').
-- - If you want deterministic `created_by` ids, replace the subquery with a numeric id.
-- - Run with: psql -d yourdb -f src/assets/seed_rooms.sql
