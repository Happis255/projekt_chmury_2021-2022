package api.hsbsms.repository;

import api.hsbsms.model.table.Appoitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface AppoitmentRepository extends JpaRepository<Appoitment, String> {

    @Query(value = "CALL CHECK_SERVICE_DURATION(:p_time, :p_date, :p_worker_uuid);", nativeQuery = true)
    Integer checkServiceDuration(@Param("p_time") String time, @Param("p_date") Date date, @Param("p_worker_uuid") String workerUuid);

    @Query(value = "CALL COUNT_APPOINTMENTS_FROM_TO(:p_date_from, :p_date_to);", nativeQuery = true)
    Integer countAppoitmentFromDateToDate(@Param("p_date_from") Date dateFrom, @Param("p_date_to") Date dateTo);

    @Query(value = "CALL COUNT_ALL_VALID_APPOITMENT();", nativeQuery = true)
    Integer countAllValidAppoitment();

    @Query(value = "CALL COUNT_MONEY_FROM_VISITS(:p_date_from, :p_date_to);", nativeQuery = true)
    Optional <Long> countAppoitmentIncomeFromDateToDate(@Param("p_date_from") Date dateFrom, @Param("p_date_to") Date dateTo);

    @Query(value = "CALL COUNT_WORKER_MONEY(:p_date_from, :p_date_to, :p_wroker_uuid);", nativeQuery = true)
    Optional<Long> countWorkersIncomeFromDateToDate(@Param("p_date_from")Date dateFrom, @Param("p_date_to") Date dateTo, @Param("p_wroker_uuid") String uuid);

    @Query(value = "CALL GET_WORKER_APPOINTMENTS_IN_DATE(:p_wroker_uuid, :p_date);", nativeQuery = true)
    List<Appoitment> getWorkerAppointmentsInDate(@Param("p_wroker_uuid") String uuid, @Param("p_date")Date date);

    @Query(value = "CALL GET_CLIENT_VALID_APPOINTMENTS(:p_client_uuid);", nativeQuery = true)
    List<Appoitment> getClientsValidAppointments(@Param("p_client_uuid") String uuid);

    @Query(value = "CALL GET_CLIENT_LATES_VALID_APPOINTMENTS(:p_client_uuid);", nativeQuery = true)
    List<Appoitment> getClientsLatesValidAppointments(@Param("p_client_uuid") String uuid);
}
