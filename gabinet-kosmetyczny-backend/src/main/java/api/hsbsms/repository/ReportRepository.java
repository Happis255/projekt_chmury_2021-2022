package api.hsbsms.repository;

import api.hsbsms.model.table.MachineReport;
import api.hsbsms.model.table.Report;
import api.hsbsms.model.table.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReportRepository extends JpaRepository<Report, String> {
    List<Report> findAllByOrderByDateAsc();
}
