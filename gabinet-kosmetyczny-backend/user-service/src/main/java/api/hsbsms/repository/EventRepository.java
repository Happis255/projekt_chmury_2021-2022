package api.hsbsms.repository;

import api.hsbsms.model.table.EventForWorkers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EventRepository extends JpaRepository<EventForWorkers, String> {

    @Modifying
    @Transactional
    @Query(value = "CALL REMOVE_ALL_WORKERS_FROM_EVENT(:p_event_uuid);", nativeQuery = true)
    void removeAllWorkersFromEvent(@Param("p_event_uuid")String eventUuid);

    @Modifying
    @Transactional
    @Query(value = "CALL SET_WORKER_FOR_EVENT(:p_event_uuid, :p_worker_uuid);", nativeQuery = true)
    void addWorkerToEvent(@Param("p_event_uuid")String eventUuid, @Param("p_worker_uuid")String workerUuid);

    @Modifying
    @Transactional
    @Query(value = "CALL REMOVE_WORKER_FROM_EVENT(:p_event_uuid, :p_worker_uuid);", nativeQuery = true)
    void removeWorkerFromEvent(@Param("p_event_uuid")String eventUuid, @Param("p_worker_uuid")String workerUuid);

    @Query(value = "CALL GET_WORKERS_LIST_FROM_EVENT(:p_event_uuid);", nativeQuery = true)
    List<String> getAllWorkersFromEvent(@Param("p_event_uuid")String eventUuid);

    @Query(value = "CALL GET_EVENTS_FROM_DATE(:p_date);", nativeQuery = true)
    List<EventForWorkers> getEventsFromDate(@Param("p_date")String date);
}
