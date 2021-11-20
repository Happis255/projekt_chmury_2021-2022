package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.Uuid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import api.hsbsms.model.table.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import api.hsbsms.repository.AccountRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class AccountRestController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/admin/accounts")
    public ResponseEntity<?> getAccounts() throws JsonProcessingException {
        List<Account> accounts = accountRepository.findAllByOrderByRoleAscEmailAsc();
        return ResponseEntity.ok(objectMapper.writeValueAsString(accounts));
    }

    @GetMapping("api/admin/account")
    public ResponseEntity<?> getCurrentAccount(@RequestBody() Uuid uuid) throws JsonProcessingException {
        Optional <Account> accountFromDB = accountRepository.findByUuid(uuid.getUuid());
        if (!accountFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!accountFromDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(accountFromDB.get()));
    }

    @PostMapping("api/admin/account")
    public ResponseEntity<?> addAccount(@RequestBody Account account) throws JsonProcessingException {
        Optional<Account> accountsListFromDB = accountRepository.findByEmail(account.getEmail());
        if (accountsListFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
        Account createdAccount = accountRepository.save(account);

        return ResponseEntity.ok(objectMapper.writeValueAsString(createdAccount));
    }

    @GetMapping("api/admin/account/{uuid}")
    public ResponseEntity<?> getAccountByUrlUuid(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Account> accountFromDB = accountRepository.findByUuid(uuid);
        if (!accountFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!accountFromDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(accountFromDB.get()));
    }

    @PatchMapping("api/admin/user")
    public ResponseEntity<?> getAccountByUuid(@RequestBody Account account) throws JsonProcessingException {
        Optional <Account> accountFromDB = accountRepository.findByUuid(account.getUuid());
        if (!accountFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        Optional<Account> accountsListFromDB = accountRepository.findByEmail(account.getEmail());
        if (accountsListFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        if (!accountFromDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Account accountToEdit = accountFromDB.get();

        if(account != null) {
            if (!account.getEmail().isEmpty()) {
                accountToEdit.setEmail(account.getEmail());
            }
            if (!account.getPassword().isEmpty()) {
                accountToEdit.setPassword(account.getPassword());
            }
        }
        accountRepository.save(accountToEdit);
        return ResponseEntity.ok(objectMapper.writeValueAsString(accountToEdit));
    }
}
