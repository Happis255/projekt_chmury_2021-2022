package api.hsbsms.restControllers.client;

import api.hsbsms.model.forms.toReturn.ClientRef;
import api.hsbsms.model.forms.toReturn.ClientVisit;
import api.hsbsms.model.forms.toReturn.ServiceRef;
import api.hsbsms.model.forms.toReturn.WorkerRef;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Appoitment;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Notification;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.AppoitmentRepository;
import api.hsbsms.repository.ClientRepository;
import api.hsbsms.repository.NotificationRepository;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ClientAppointmentRestController {

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MailClient mailClient;

    @GetMapping("api/client/visits/{uuid}")
    public ResponseEntity<?> loadVisits(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <Account> accountOptional = accountRepository.findById(uuid);
        if (accountOptional.isPresent()) {
            Optional <Client> clientOptional = clientRepository.findByAccountUuid(accountOptional.get());
            if (clientOptional.isPresent()) {
                List<Appoitment> appoitmentList = appoitmentRepository.getClientsValidAppointments(clientOptional.get().getUuid());
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
                    clientVisit.setPrice(appoitment.getServiceUuid().getPrice());
                    clientVisit.setDate(appoitment.getDate());
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

    @PatchMapping("api/client/visit/{uuid}/set-status/{status}")
    public ResponseEntity<?> setVisitStatus(@PathVariable() String uuid, @PathVariable() String status) throws JsonProcessingException {
        Optional <Appoitment> appoitmentOptional = appoitmentRepository.findById(uuid);
        if (appoitmentOptional.isPresent()) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
            Appoitment appoitment = appoitmentOptional.get();
            appoitment.setStatus(Appoitment.Status.valueOf(status));
            appoitmentRepository.save(appoitment);
            mailClient.sendNotificationAboutVisitStatusChange(
                    appoitment.getClientUuid().getAccountUuid().getEmail(),
                    appoitment.getWorkerUuid().getAccountUuid().getEmail(),
                    "Zmiana statusu wizyty",
                    "Wizyta z dnia " +  dateFormat.format(appoitment.getDate()) + " o godzinie " + timeFormat.format(appoitment.getHour()) +
                            " otrzymała status - " + appoitment.getStatus());
            mailClient.sendNotificationAboutVisitStatusChange(
                    appoitment.getWorkerUuid().getAccountUuid().getEmail(),
                    appoitment.getClientUuid().getAccountUuid().getEmail(),
                    "Zmiana statusu wizyty",
                    "Wizyta z dnia " +  dateFormat.format(appoitment.getDate()) + " o godzinie " + timeFormat.format(appoitment.getHour()) +
                            " otrzymała status - " + appoitment.getStatus());
            return ResponseEntity.ok(objectMapper.writeValueAsString(status));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
