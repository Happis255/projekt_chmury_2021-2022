package api.hsbsms.repository;

import api.hsbsms.model.table.MachineReport;
import api.hsbsms.model.table.TrashesReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrashesReportRepository extends JpaRepository<TrashesReport, String> {
    List<TrashesReport> findAllByOrderByDateAsc();
}
