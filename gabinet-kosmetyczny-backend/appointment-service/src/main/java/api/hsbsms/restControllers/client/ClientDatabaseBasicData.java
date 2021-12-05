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

    @GetMapping("api/client/data-base-basics/latest-visits/{uuid}")
    public ResponseEntity<?> loadLastVisits(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Account> accountOptional = accountRepository.findById(uuid);
        if (accountOptional.isPresent()) {
            Optional <Client> clientOptional = clientRepository.findByAccountUuid(accountOptional.get());
            if (clientOptional.isPresent()) {
                List<Appoitment> appoitmentList = appoitmentRepository.getClientsLatesValidAppointments(clientOptional.get().getUuid());
                List<ClientVisit> clientVisits = new ArrayList<>();
                for (Appoitment appoitment: appoitmentList) {
                    ClientVisit clientVisit = new ClientVisit();
                    clientVisit.setVisitUuid(appoitment.getUuid());
                    clientVisit.setTime(appoitment.getHour().toString());
                    clientVisit.setClientRef(new ClientRef(
                            appoitment.getClientUuid().getUuid(),
                            appoitment.getClientUuid().getName(),
                            appoitment.getClientUuid().getSurname(),
                            appoitment.getClientUuid().getPhone()
                    ));
                    clientVisit.setServiceRef(new ServiceRef(
                            appoitment.getServiceUuid().getUuid(),
                            appoitment.getServiceUuid().getType(),
                            appoitment.getServiceUuid().getName()
                    ));
                    clientVisit.setWorkerRef(new WorkerRef(
                            appoitment.getWorkerUuid().getUuid(),
                            appoitment.getWorkerUuid().getName(),
                            appoitment.getWorkerUuid().getSurname()
                    ));
                    clientVisit.setStatus(appoitment.getStatus());
                    clientVisit.setDate(appoitment.getDate());
                    clientVisit.setPrice(appoitment.getServiceUuid().getPrice());
                    clientVisits.add(clientVisit);
                }
                return ResponseEntity.ok(objectMapper.writeValueAsString(clientVisits));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
