package api.hsbsms.restControllers.client;

import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Appoitment;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Notification;
import api.hsbsms.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ClientDatabaseBasicData {

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/client/data-base-basics/notifications-amount/{uuid}")
    public ResponseEntity<?> loadNotificationNumber(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Account> accountOptional = accountRepository.findById(uuid);
        if (accountOptional.isPresent()) {
            Optional <Client> clientOptional = clientRepository.findByAccountUuid(accountOptional.get());
            if (clientOptional.isPresent()) {
                List <Notification> notificationList = notificationRepository.getAllNotificationsForClient(uuid);
                return ResponseEntity.ok(objectMapper.writeValueAsString(notificationList.size()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("api/client/data-base-basics/visits-amount/{uuid}")
    public ResponseEntity<?> loadVisitsNumber(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Account> accountOptional = accountRepository.findById(uuid);
        if (accountOptional.isPresent()) {
            Optional <Client> clientOptional = clientRepository.findByAccountUuid(accountOptional.get());
            if (clientOptional.isPresent()) {
                List<Appoitment> appoitmentList = appoitmentRepository.getClientsValidAppointments(clientOptional.get().getUuid());
                return ResponseEntity.ok(objectMapper.writeValueAsString(appoitmentList.size()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
