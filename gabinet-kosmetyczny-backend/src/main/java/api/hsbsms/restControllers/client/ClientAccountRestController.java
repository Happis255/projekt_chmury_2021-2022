package api.hsbsms.restControllers.client;

import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Appoitment;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Notification;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.AppoitmentRepository;
import api.hsbsms.repository.ClientRepository;
import api.hsbsms.repository.NotificationRepository;
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
public class ClientAccountRestController {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/client/account-data/{uuid}")
    public ResponseEntity<?> loadClientAccountInformation(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Client> clientOptional = clientRepository.findById(uuid);
        if (clientOptional.isPresent()) {
            Optional <Account> accountOptional = accountRepository.findById(clientOptional.get().getAccountUuid().getUuid());
            if (accountOptional.isPresent()) {
                Client clientToSend = clientOptional.get();
                Account accountToSend = accountOptional.get();
                ClientAccountData clientAccountData = new ClientAccountData(
                        clientToSend.getUuid(),
                        accountToSend.getEmail(),
                        accountToSend.getPassword(),
                        clientToSend.getName(),
                        clientToSend.getSurname(),
                        clientToSend.getStreet(),
                        clientToSend.getCode(),
                        clientToSend.getTown(),
                        clientToSend.getBirthday(),
                        clientToSend.getPhone()
                );
                return ResponseEntity.ok(objectMapper.writeValueAsString(clientAccountData));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/client/account-data")
    public ResponseEntity<?> editClientAccountData(@RequestBody() ClientAccountData clientAccountData) throws JsonProcessingException {
        Optional <Client> clientOptional = clientRepository.findById(clientAccountData.getUuid());
        if (clientOptional.isPresent()) {
            Optional <Account> accountOptional = accountRepository.findById(clientOptional.get().getAccountUuid().getUuid());
            if (accountOptional.isPresent()) {
                Client clientToEdit = clientOptional.get();
                Account accountToEdit = accountOptional.get();
                clientToEdit.setBirthday(clientAccountData.getBirthday());
                clientToEdit.setCode(clientAccountData.getCode());
                clientToEdit.setName(clientAccountData.getName());
                clientToEdit.setPhone(clientAccountData.getPhone());
                clientToEdit.setStreet(clientAccountData.getStreet());
                clientToEdit.setSurname(clientAccountData.getSurname());
                clientToEdit.setTown(clientAccountData.getTown());
                accountToEdit.setEmail(clientAccountData.getEmail());
                accountToEdit.setPassword(clientAccountData.getPassword());
                clientToEdit.setAccountUuid(accountToEdit);
                accountRepository.save(accountToEdit);
                clientRepository.save(clientToEdit);
                return ResponseEntity.ok(objectMapper.writeValueAsString(clientAccountData));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
