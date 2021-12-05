package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.fromBody.*;
import api.hsbsms.model.forms.toReturn.ClientInformation;
import api.hsbsms.model.forms.toReturn.ClientInformationRef;
import api.hsbsms.model.forms.toReturn.ServiceRef;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Notification;
import api.hsbsms.model.table.Service;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.ClientRepository;
import api.hsbsms.repository.NotificationRepository;
import api.hsbsms.repository.ServiceRepository;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ClientsRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    private MailClient mailClient;

    @GetMapping("api/worker/clients")
    public ResponseEntity<?> getClientsList() throws JsonProcessingException {

        List <Client> clientsList = clientRepository.findAll();
        List <ClientInformation> clientsInformations = new ArrayList<>();
        for (Client client: clientsList) {
            if (client.getAccountUuid().isActive()) {
                ClientInformation newClient = new ClientInformation();
                newClient.setAccountUuid(client.getAccountUuid().getUuid());
                newClient.setBirthday(client.getBirthday());
                newClient.setClientUuid(client.getUuid());
                newClient.setCode(client.getCode());
                newClient.setEmail(client.getAccountUuid().getEmail());
                newClient.setName(client.getName());
                newClient.setPhone(client.getPhone());
                newClient.setStreet(client.getStreet());
                newClient.setSurname(client.getSurname());
                newClient.setTown(client.getTown());
                clientsInformations.add(newClient);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(clientsInformations));
    }

    @GetMapping("api/worker/clients/ref")
    public ResponseEntity<?> getClientsRefList() throws JsonProcessingException {

        List <Client> clientsList = clientRepository.findAllByOrderBySurnameAscNameAsc();
        List <ClientInformationRef> clientsInformations = new ArrayList<>();
        for (Client client: clientsList) {
            if (client.getAccountUuid().isActive()) {
                ClientInformationRef newClient = new ClientInformationRef();
                newClient.setAccountUuid(client.getAccountUuid().getUuid());
                newClient.setClientUuid(client.getUuid());
                newClient.setName(client.getName());
                newClient.setSurname(client.getSurname());
                clientsInformations.add(newClient);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(clientsInformations));
    }

    @PutMapping("api/worker/client")
    public ResponseEntity<?> addClient(@RequestBody AddClientForm addClientForm) throws JsonProcessingException {
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

    @PatchMapping("api/worker/client")
    public ResponseEntity<?> editClient(@RequestBody EditClientForm editClientFrom) throws JsonProcessingException {
        Optional <Account> accountToEdit = accountRepository.findById(editClientFrom.getAccountUuid());
        Optional <Client> clientToEdit = clientRepository.findById(editClientFrom.getClientUuid());
        if (!clientToEdit.isPresent() || !accountToEdit.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Account account = accountToEdit.get();
        Client client = clientToEdit.get();

        account.setRole(Account.Role.CLIENT);
        account.setPassword(editClientFrom.getPassword());
        account.setEmail(editClientFrom.getEmail());
        account.setActive(true);

        client.setBirthday(editClientFrom.getBirthday());
        client.setCode(editClientFrom.getCode());
        client.setName(editClientFrom.getName());
        client.setPhone(editClientFrom.getPhone());
        client.setStreet(editClientFrom.getStreet());
        client.setSurname(editClientFrom.getSurname());
        client.setTown(editClientFrom.getTown());
        client.setAccountUuid(account);

        accountRepository.save(account);
        clientRepository.save(client);
        return ResponseEntity.ok(objectMapper.writeValueAsString(client));
    }

    @DeleteMapping("api/worker/client/{uuid}")
    public void deleteClient(@PathVariable String uuid) throws JsonProcessingException {
        Optional <Client> clientToRemove = clientRepository.findById(uuid);
        if (clientToRemove.isPresent()) {
            Optional <Account> accountToRemove = accountRepository.findById(clientToRemove.get().getAccountUuid().getUuid());
            if (accountToRemove.isPresent()) {
                Account account = accountToRemove.get();
                account.setActive(false);
                account.setPassword("---");
                account.setEmail("---");
                accountRepository.save(account);
            }
        }
    }

    @PutMapping("api/worker/client/send-messages")
    public void sendMessegesToClients(@RequestBody() ClientsMessages clientsMessages) throws JsonProcessingException {
        Optional<Account> accountFrom = accountRepository.findById(clientsMessages.getUuidFrom());
        if (accountFrom.isPresent()) {
            if (accountFrom.get().isActive()) {
                Date dateTime = new Date();
                List <Account> accountList = new ArrayList<>();
                for (String uuid : clientsMessages.getUuid()) {
                    Notification notification = new Notification();
                    notification.setFromAccountUuid(accountFrom.get());
                    notification.setDate(dateTime);
                    notification.setStatus(Notification.Status.NOT_CONFIRMED);
                    notification.setNotificationText(clientsMessages.getMessageText());
                    notification.setType(Notification.Type.FROM_USER);
                    Optional<Account> accountTo = accountRepository.findById(uuid);
                    if (accountFrom.isPresent()) {
                        accountList.add(accountTo.get());
                        notification.setToAccountUuid(accountTo.get());
                    }
                    notificationRepository.save(notification);
                }

                for (Account accountToSend : accountList) {
                    mailClient.sendNotificationToClients(
                            accountFrom.get().getEmail(),
                            accountToSend.getEmail(),
                            clientsMessages.getTopic(),
                            clientsMessages.getMessageText()
                    );
                }
            }
        }
    }
}
