package api.hsbsms.repository;

import api.hsbsms.model.table.Promotion;
import api.hsbsms.model.table.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service, String> {
    Optional<Service> findByUuid(String uuid);

    @Query(value = "CALL GET_ALL_SERVICES_WITH_TYPE(:p_type);", nativeQuery = true)
    List<Service> getAllServicesByType(@Param("p_type") String type);

    @Query(value = "CALL GET_ALL_SERVICES_TYPE();", nativeQuery = true)
    List<String> getAllServicesType();
    List<Service> getAllByPromotionUuid(Promotion promotion);
    List<Service> findAllByOrderByTypeAscNameAsc();

    @Query(value = "CALL GET_ALL_WORKER_SERVICES(:p_uuid);", nativeQuery = true)
    List<String> getAllWorkerServicesUuid(@Param("p_uuid") String uuid);

    @Transactional
    @Modifying
    @Query(value = "CALL REMOVE_WORKER_SERVICE_RELATION(:p_worker_uuid);", nativeQuery = true)
    void clearWorkerPermissions(@Param("p_worker_uuid") String workerUuid);

    @Transactional
    @Modifying
    @Query(value = "CALL ADD_WORKER_SERVICE_RELATION(:p_worker_uuid, :p_service_uuid);", nativeQuery = true)
    void putWorkerPermissions(@Param("p_worker_uuid") String workerUuid, @Param("p_service_uuid") String serviceUuid);
}
