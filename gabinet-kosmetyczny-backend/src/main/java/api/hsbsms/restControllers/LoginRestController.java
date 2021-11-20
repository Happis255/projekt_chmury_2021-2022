package api.hsbsms.restControllers;

import api.hsbsms.model.forms.fromBody.AddClientForm;
import api.hsbsms.model.forms.fromBody.LoginForm;
import api.hsbsms.model.forms.fromBody.PasswordRemindForm;
import api.hsbsms.model.forms.toReturn.LoggedInUser;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.ClientRepository;
import api.hsbsms.repository.WorkerRepository;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Optional;

@RestController
public class LoginRestController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MailClient mailClient;

    @PostMapping("api/login")
    public ResponseEntity loginIn(@RequestBody LoginForm loginForm) throws JsonProcessingException {
        Optional<Account> accountFromDB = accountRepository.findByEmail(loginForm.getEmail());
        if (accountFromDB.isEmpty() || _incorrectPassword(accountFromDB.get().getPassword(), loginForm.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        LoggedInUser loggedInUser = new LoggedInUser();
        if (!accountFromDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (accountFromDB.get().getRole().toString().equals("ADMIN") || accountFromDB.get().getRole().toString().equals("WORKER")) {
            Optional<Worker> workerFromDB = workerRepository.findByAccountUuid(accountFromDB.get());
            if (workerFromDB.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            loggedInUser.setUserUuid(workerFromDB.get().getUuid());
            loggedInUser.setAccountUuid(accountFromDB.get().getUuid());
            loggedInUser.setEmail(accountFromDB.get().getEmail());
            loggedInUser.setName(workerFromDB.get().getName());
            loggedInUser.setRole(accountFromDB.get().getRole().toString());
            loggedInUser.setSurname(workerFromDB.get().getSurname());
        } else {
            Optional<Client> clientFromDB = clientRepository.findByAccountUuid(accountFromDB.get());
            if (clientFromDB.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            loggedInUser.setUserUuid(clientFromDB.get().getUuid());
            loggedInUser.setAccountUuid(accountFromDB.get().getUuid());
            loggedInUser.setEmail(accountFromDB.get().getEmail());
            loggedInUser.setName(clientFromDB.get().getName());
            loggedInUser.setRole(accountFromDB.get().getRole().toString());
            loggedInUser.setSurname(clientFromDB.get().getSurname());
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(loggedInUser));
    }

    private boolean _incorrectPassword(String passwordDB, String passwordUser) {
        return !passwordDB.equals(passwordUser);
    }

    @PostMapping("api/login/remind-password")
    public void remindPassword(@RequestBody PasswordRemindForm passwordRemindForm) {
        Optional<Account> accountFromDB = accountRepository.findByEmail(passwordRemindForm.getEmail());
        if (!accountFromDB.isPresent() || !accountFromDB.get().isActive()) {
            return;
        }
        if (accountFromDB.isPresent()) {
            mailClient.prepareAndSendPassword(accountFromDB.get().getEmail(), accountFromDB.get().getPassword());
        } else {
        }
    }

    @GetMapping("api/login/email-taken/{email}")
    public ResponseEntity<?> remindPassword(@PathVariable() String email) throws JsonProcessingException {
        Optional <Account> account = accountRepository.findByEmail(email);
        if (account.isPresent()) {
            return ResponseEntity.ok(objectMapper.writeValueAsString(true));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(false));
        }
    }

    @PutMapping("api/login/add-client")
    public ResponseEntity<?> createClientAccount(@RequestBody AddClientForm addClientForm) throws JsonProcessingException {
        Account newAccount = new Account();
        newAccount.setRole(addClientForm.getRole());
        newAccount.setPassword(addClientForm.getPassword());
        newAccount.setEmail(addClientForm.getEmail());
        newAccount.setActive(addClientForm.isActive());
        Client newClient = new Client();
        newClient.setBirthday(addClientForm.getBirthday());
        newClient.setCode(addClientForm.getCode());
        newClient.setName(addClientForm.getName());
        newClient.setPhone(addClientForm.getPhone());
        newClient.setStreet(addClientForm.getStreet());
        newClient.setSurname(addClientForm.getSurname());
        newClient.setTown(addClientForm.getTown());
        newClient.setAccountUuid(newAccount);

        accountRepository.save(newAccount);
        clientRepository.save(newClient);

        Optional <Client> getClient = clientRepository.findById(newClient.getUuid());

        if (getClient.isPresent()) {
            mailClient.sendNotificationAboutNewAccount(getClient.get());
            return ResponseEntity.ok(objectMapper.writeValueAsString(getClient.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
