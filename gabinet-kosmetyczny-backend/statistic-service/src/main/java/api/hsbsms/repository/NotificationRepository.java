package api.hsbsms.repository;

import api.hsbsms.model.table.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, String> {

    @Query(value = "CALL GET_ALL_NOTIFICATIONS_FOR_ADMIN_FROM_SYSTEM();", nativeQuery = true)
    List<Notification> getAllNotificationsFromSystem();

    @Query(value = "CALL GET_ALL_NOTIFICATIONS_FOR_WORKER(:p_worker_uuid, :p_type);", nativeQuery = true)
    List<Notification> getAllNotificationsForWorker(@Param("p_worker_uuid")String workerUuid, @Param("p_type")String type);

    @Query(value = "CALL GET_ALL_NOTIFICATIONS_FOR_CLIENT(:p_client_uuid);", nativeQuery = true)
    List<Notification> getAllNotificationsForClient(@Param("p_client_uuid")String clientUuid);

    @Modifying
    @Transactional
    @Query(value = "CALL DELETE_NOTIFICATION(:p_notification_uuid);", nativeQuery = true)
    void deleteNotificationByUuid(@Param("p_notification_uuid")String notificationUuid);

    @Modifying
    @Transactional
    @Query(value = "CALL MARK_AS_SEEN(:p_notification_uuid);", nativeQuery = true)
    void markAsSeen(@Param("p_notification_uuid")String notificationUuid);
}


