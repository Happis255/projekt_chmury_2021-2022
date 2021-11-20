package api.hsbsms.repository;

import api.hsbsms.model.table.UnregisteredClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnregisteredClientRepository extends JpaRepository<UnregisteredClient, String> {
}
