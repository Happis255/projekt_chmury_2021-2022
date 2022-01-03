USE gabinetkosmetycznydb;

DELIMITER //
CREATE PROCEDURE FIND_ALL_AVAIBLE_WORKERS_FOR_SERVICE_AND_TIME (
    p_service_uuid CHAR(255),
    p_date DATE
)
BEGIN
SELECT a.uuid from worker a WHERE 
    a.uuid IN (SELECT b.worker_uuid FROM service_worker b WHERE b.service_uuid = p_service_uuid) 
    AND a.uuid NOT IN(SELECT c.worker_uuid FROM absence c WHERE c.date_from < p_date AND c.date_to > p_date AND c.status = "CONFIRMED");
END //

DELIMITER //
CREATE PROCEDURE CHECK_SERVICE_DURATION(
    p_time TIME,
    p_date DATE,
    p_worker_uuid CHAR(255)
)
BEGIN
SELECT b.time FROM service b WHERE b.uuid IN (
SELECT a.service_uuid FROM appointment a WHERE a.date = p_date AND a.hour = p_time AND a.worker_uuid = p_worker_uuid AND NOT a.status = "REJECTED" AND NOT a.status = "CANCELLED");
END //

DELIMITER //
CREATE PROCEDURE COUNT_APPOINTMENTS_FROM_TO(
    p_date_from DATE,
    p_date_to DATE
)
BEGIN
SELECT COUNT(*) FROM appointment a WHERE a.date >= p_date_from AND a.date <= p_date_to AND NOT a.status = "REJECTED" AND NOT a.status = "CANCELLED";
END //

DELIMITER //
CREATE PROCEDURE COUNT_ALL_VALID_APPOITMENT(
)
BEGIN
SELECT COUNT(*) FROM appointment a WHERE NOT a.status = "REJECTED" AND NOT a.status = "CANCELED";
END //

DELIMITER //
CREATE PROCEDURE COUNT_WORKER_MONEY(
    p_date_from DATE,
    p_date_to DATE,
    p_wroker_uuid CHAR(255)
) 
BEGIN  
    SELECT SUM(a.price) FROM appointment a WHERE a.date >= p_date_from AND a.date <= p_date_to AND a.status = 'FINISHED' AND a.worker_uuid = p_wroker_uuid;
END //

DELIMITER //
CREATE PROCEDURE COUNT_MONEY_FROM_VISITS(
    p_date_from DATE,
    p_date_to DATE
) 
BEGIN  
    SELECT SUM(a.price) FROM appointment a WHERE a.date >= p_date_from AND a.date <= p_date_to AND a.status = 'FINISHED';
END //

DELIMITER //
CREATE PROCEDURE GET_ALL_NOTIFICATIONS_FOR_ADMIN_FROM_SYSTEM(
) 
BEGIN  
    SELECT * FROM notification a WHERE a.type = "SYSTEM" and not a.status = "DELETED" ORDER BY a.date DESC;
END //

DELIMITER //
CREATE PROCEDURE GET_ALL_NOTIFICATIONS_FOR_WORKER(
    p_wroker_uuid CHAR(255),
    p_type ENUM('FROM_CLIENT', 'FROM_USER', 'SYSTEM')
) 
BEGIN  
    SELECT * FROM notification a WHERE a.type = p_type and a.to_account_uuid = p_wroker_uuid and not a.status = "DELETED" ORDER BY a.date DESC;
END //


DELIMITER //
CREATE PROCEDURE DELETE_NOTIFICATION(
    p_notification_uuid CHAR(255)
) 
BEGIN  
    UPDATE notification SET notification.status = "DELETED" WHERE notification.uuid  = p_notification_uuid;
END //


DELIMITER //
CREATE PROCEDURE MARK_AS_SEEN(
    p_notification_uuid CHAR(255)
) 
BEGIN  
    UPDATE notification SET notification.status = "CONFIRMED" WHERE notification.uuid  = p_notification_uuid;
END //

DELIMITER //
CREATE PROCEDURE COUNT_WORKER_BONUS(
    p_date_from DATE,
    p_date_to DATE,
    p_wroker_uuid CHAR(255)
) 
BEGIN  
SELECT SUM(bonuses.amount) FROM bonuses WHERE bonuses.date_given >= p_date_from AND bonuses.date_given <= p_date_to AND bonuses.worker_uuid = p_wroker_uuid;
END //

DELIMITER //
CREATE PROCEDURE COUNT_ACTIVE_WORKERS(
) 
BEGIN  
SELECT COUNT(*) FROM worker WHERE worker.is_active != 0;
END //

DELIMITER //
CREATE PROCEDURE GET_ABSENCES_FROM_DATE(
    p_date DATE
)
BEGIN  
SELECT * FROM absence WHERE absence.date_from <= p_date AND absence.date_to >= p_date ORDER BY absence.uuid;
END //

DELIMITER //
CREATE PROCEDURE GET_ALL_SERVICES_TYPE(
)
BEGIN  
SELECT DISTINCT service.type FROM service;
END //

DELIMITER //
CREATE PROCEDURE GET_ALL_SERVICES_WITH_TYPE(
    p_type CHAR(255)
)
BEGIN  
SELECT * FROM service WHERE TYPE = p_type ORDER BY service.active DESC;
END //

DELIMITER //
CREATE PROCEDURE GET_SERVICES_PROMOTIONS_WITH_DATE(
    p_date DATE
)
BEGIN  
SELECT * FROM promotion WHERE promotion.date_from <= p_date AND promotion.date_to >= p_date AND promotion.uuid IN (SELECT service.promotion_uuid FROM service) ORDER BY promotion.uuid;
END //

DELIMITER //
CREATE PROCEDURE GET_PROMOTIONS_WITHOUT_PRODUCT_OR_SERVICE(
)
BEGIN  
SELECT * FROM promotion WHERE promotion.uuid NOT IN (SELECT service.promotion_uuid FROM service) OR promotion.uuid NOT IN (SELECT product_for_sell.promotion_uuid FROM product_for_sell);
END //


DELIMITER //
CREATE PROCEDURE GET_ALL_WORKER_SERVICES(
    p_uuid CHAR(255)
)
BEGIN  
SELECT a.service_uuid FROM service_worker a WHERE a.worker_uuid = p_uuid;
END //

DELIMITER //
CREATE PROCEDURE REMOVE_WORKER_SERVICE_RELATION(
    p_worker_uuid CHAR(255)
)
BEGIN  
DELETE FROM service_worker WHERE service_worker.worker_uuid = p_worker_uuid;
END //

DELIMITER //
CREATE PROCEDURE ADD_WORKER_SERVICE_RELATION(
    p_worker_uuid CHAR(255),
    p_service_uuid CHAR(255)
)
BEGIN  
INSERT INTO service_worker (service_worker.worker_uuid, service_worker.service_uuid) VALUES (p_worker_uuid, p_service_uuid);
END //

DELIMITER //
CREATE PROCEDURE GET_WORKER_APPOINTMENTS_IN_DATE(
        p_worker_uuid CHAR(255),
        p_date DATE
)
BEGIN  
SELECT * FROM appointment a WHERE a.date = p_date and a.worker_uuid = p_worker_uuid ORDER BY a.hour ASC;
END //

DELIMITER //
CREATE PROCEDURE GET_PRODUCTS_PROMOTIONS_WITH_DATE(
    p_date DATE
)
BEGIN  
SELECT * FROM promotion WHERE promotion.date_from <= p_date AND promotion.date_to >= p_date AND promotion.uuid IN (SELECT product_for_sell.promotion_uuid FROM product_for_sell) ORDER BY promotion.uuid;
END //

DELIMITER //
CREATE PROCEDURE GET_WORKERS_LIST_FROM_EVENT(
    p_event_uuid CHAR(255)
)
BEGIN  
SELECT a.uuid FROM worker a where a.uuid IN (SELECT b.worker_uuid FROM worker_event_for_workers b WHERE b.event_uuid = p_event_uuid);
END //

DELIMITER //
CREATE PROCEDURE SET_WORKER_FOR_EVENT(
    p_event_uuid CHAR(255),
    p_worker_uuid CHAR(255)
)
BEGIN  
INSERT INTO worker_event_for_workers (worker_event_for_workers.event_uuid, worker_event_for_workers.worker_uuid) VALUES (p_event_uuid, p_worker_uuid);
END //

DELIMITER //
CREATE PROCEDURE REMOVE_ALL_WORKERS_FROM_EVENT(
    p_event_uuid CHAR(255)
)
BEGIN  
DELETE FROM worker_event_for_workers WHERE worker_event_for_workers.event_uuid = p_event_uuid;
END //

DELIMITER //
CREATE PROCEDURE GET_EVENTS_FROM_DATE(
    p_date DATE
)
BEGIN  
SELECT * FROM event_for_workers WHERE event_for_workers.date_from <= p_date AND event_for_workers.date_to >= p_date ORDER BY event_for_workers.uuid;
END //

DELIMITER //
CREATE PROCEDURE REMOVE_WORKER_FROM_EVENT(
    p_event_uuid CHAR(255),
    p_worker_uuid CHAR(255)
)
BEGIN  
DELETE FROM worker_event_for_workers WHERE worker_event_for_workers.event_uuid = p_event_uuid AND worker_event_for_workers.worker_uuid = p_worker_uuid;
END //

DELIMITER //
CREATE PROCEDURE GET_ALL_NOTIFICATIONS_FOR_CLIENT(
    p_client_uuid CHAR(255)
) 
BEGIN  
    SELECT * FROM notification a WHERE a.to_account_uuid = p_client_uuid and not a.status = "DELETED" ORDER BY a.date DESC;
END //

DELIMITER //
CREATE PROCEDURE 
GET_CLIENT_VALID_APPOINTMENTS(
    p_client_uuid CHAR(255)
)
BEGIN  
    SELECT * FROM appointment a WHERE a.client_uuid = p_client_uuid AND not a.status = "REJECTED" AND not a.status = "FINISHED" ORDER BY a.date DESC;
END //

DELIMITER //
CREATE PROCEDURE 
GET_CLIENT_LATES_VALID_APPOINTMENTS(
        p_client_uuid CHAR(255)
)
BEGIN  
    SELECT * FROM appointment a WHERE a.client_uuid = p_client_uuid AND not a.status = "REJECTED" ORDER BY a.date DESC, a.hour DESC LIMIT 5;
END //