package api.hsbsms.repository;

import api.hsbsms.model.table.Bonuses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.Optional;

public interface BonusesRepository extends JpaRepository<Bonuses, String> {
    @Query(value = "CALL COUNT_WORKER_BONUS(:p_date_from, :p_date_to, :p_worker_uuid);", nativeQuery = true)
    Optional<Long> countBonusesThisMonth(@Param("p_date_from") Date dateFrom, @Param("p_date_to") Date dateTo, @Param("p_worker_uuid") String uuid);
}
