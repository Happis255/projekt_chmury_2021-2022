package api.hsbsms.repository;

import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, String> {
    Optional<Client> findByAccountUuid(Account accountUuid);
    Optional<Client> findByUuid(String uuid);
    List<Client> findAllByOrderBySurnameAscNameAsc();
}
