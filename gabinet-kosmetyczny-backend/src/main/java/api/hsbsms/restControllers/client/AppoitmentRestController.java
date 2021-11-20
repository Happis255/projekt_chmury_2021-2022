package api.hsbsms.restControllers.client;

import api.hsbsms.model.AppoitmentDay;
import api.hsbsms.model.HourAvailability;
import api.hsbsms.model.forms.fromBody.AppoitmentClientForm;
import api.hsbsms.model.table.Service;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.AppoitmentRepository;
import api.hsbsms.repository.ServiceRepository;
import api.hsbsms.repository.WorkerRepository;
import api.hsbsms.services.AppointmentService;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AppoitmentRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    private AppointmentService _appoitmentService;

    @PostMapping("api/client/appointments/hours")
    public ResponseEntity<?> getAvaibleHours(@RequestBody AppoitmentClientForm appoitmentClientForm) throws JsonProcessingException {
        java.sql.Date sqlDate = new java.sql.Date(appoitmentClientForm.getDate().getTime());
        List<String> stringUuidList = workerRepository.findAllAvaibleWorkersForServiceAndTime(appoitmentClientForm.getServiceUuid(), sqlDate);
        if (stringUuidList.isEmpty()) {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        } else {
            List <AppoitmentDay> appoitmentDays = new ArrayList<AppoitmentDay>();
            Optional<Service> service = serviceRepository.findByUuid(appoitmentClientForm.getServiceUuid());
            for (String temp : stringUuidList) {
                Optional<Worker> worker = workerRepository.findById(temp);
                if (!worker.isPresent() || !service.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
                appoitmentDays.add(new AppoitmentDay(worker.get().getUuid(), worker.get().getName(), worker.get().getSurname()));
            }
            for (AppoitmentDay appoitment : appoitmentDays) {
                HourAvailability[] hourAvailabilityTab = appoitment.getHourAvailabilityList();
                _appoitmentService.setHourAvailability(hourAvailabilityTab, sqlDate, appoitment.getWorkerUuid());
                _appoitmentService.checkIfCanFit(hourAvailabilityTab, service.get().getTime() / 15);
            }

            return ResponseEntity.ok(objectMapper.writeValueAsString(appoitmentDays));
        }
    }
}
