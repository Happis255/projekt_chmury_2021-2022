SELECT a.uuid from worker a WHERE 
    a.uuid IN (SELECT b.worker_uuid FROM service_worker b WHERE b.service_uuid = "029c34b1-cb46-4e7e-93a7-ca8b124d6de2") 
    AND a.uuid NOT IN(SELECT c.worker_uuid FROM absence c WHERE c.date_from < '2020-10-14' AND c.date_to > '2020-10-14' AND c.status = "CONFIRMED");
SELECT b.time FROM service b WHERE b.uuid IN (
SELECT a.service_uuid FROM appointment a WHERE a.date = "2020-10-14" AND a.hour = "10:00" AND a.worker_uuid = "b3ad495d-3acd-47e0-84a5-6c9e4c8417a9" AND a.status != "REJECTED")
SELECT COUNT(*) FROM appointment a WHERE a.date > p_date_from AND a.date < p_date_to;
SELECT COUNT(*) FROM appointment a WHERE NOT a.status = "REJECTED" AND NOT a.status = "CANCELED"