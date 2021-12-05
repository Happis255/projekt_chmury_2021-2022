package api.hsbsms.repository;

import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, String> {
    Optional <Worker> findByAccountUuid(Account accountUuid);
    Optional <Worker> findByUuid(String uuid);

    @Query(value = "CALL FIND_ALL_AVAIBLE_WORKERS_FOR_SERVICE_AND_TIME(:p_service_uuid, :p_date);", nativeQuery = true)
    List <String> findAllAvaibleWorkersForServiceAndTime(@Param("p_service_uuid")String service_uuid, @Param("p_date")Date date);

    @Query(value = "CALL COUNT_ACTIVE_WORKERS();", nativeQuery = true)
    long countActiveWorkers();
}
