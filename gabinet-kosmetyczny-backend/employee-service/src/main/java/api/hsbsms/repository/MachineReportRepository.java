package api.hsbsms.repository;

import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.MachineReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MachineReportRepository extends JpaRepository<MachineReport, String> {
    List<MachineReport> findAllByOrderByDateAsc();
}
