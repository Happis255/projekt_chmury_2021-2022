package api.hsbsms.repository;

import api.hsbsms.model.table.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    Optional<Account> findByUuid(String email);
    List<Account> findAllByOrderByRoleAscEmailAsc();
}
