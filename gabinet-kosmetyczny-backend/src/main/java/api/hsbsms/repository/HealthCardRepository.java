package api.hsbsms.repository;

import api.hsbsms.model.table.HealthCard;
import api.hsbsms.model.table.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HealthCardRepository extends JpaRepository<HealthCard, String> {
    Optional<HealthCard> findByWorkerUuid(Worker worker);
}
