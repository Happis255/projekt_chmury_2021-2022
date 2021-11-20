package api.hsbsms.repository;

import api.hsbsms.model.table.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, String> {

    @Query(value = "CALL GET_ABSENCES_FROM_DATE(:p_date);", nativeQuery = true)
    List<Absence> getAbsencesFromDate(@Param("p_date")String date);
}
