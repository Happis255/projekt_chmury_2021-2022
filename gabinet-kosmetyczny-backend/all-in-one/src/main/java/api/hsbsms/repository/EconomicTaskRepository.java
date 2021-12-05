package api.hsbsms.repository;

import api.hsbsms.model.table.EconomicTask;
import api.hsbsms.model.table.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EconomicTaskRepository extends JpaRepository<EconomicTask, String> {
    List<EconomicTask> findAllByWorkerUuid(Worker worker);
    List<EconomicTask> findAllByOrderByTitleAscDateFromAscDateToAsc();
}
