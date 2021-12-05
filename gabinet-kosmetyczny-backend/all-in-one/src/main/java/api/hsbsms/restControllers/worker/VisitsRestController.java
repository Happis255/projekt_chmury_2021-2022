package api.hsbsms.restControllers.worker;

import api.hsbsms.model.AppoitmentDay;
import api.hsbsms.model.HourAvailability;
import api.hsbsms.model.forms.fromBody.NewAppointmentBody;
import api.hsbsms.model.forms.fromBody.VisitStatusToChangeForm;
import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.*;
import api.hsbsms.repository.*;
import api.hsbsms.services.AppointmentService;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
public class VisitsRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MailClient mailClient;

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    UnregisteredClientRepository unregisteredClientRepository;

    @GetMapping("api/worker/visits/date-controller/{date}")
    public ResponseEntity<?> getVisitsDateController(@PathVariable() String date) throws JsonProcessingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        if (localDate != null) {
            TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
            PromotionsDateControllerModel dateToReturn = new PromotionsDateControllerModel();
            dateToReturn.setMondayDate(localDate.with(fieldISO, 1).toString());
            dateToReturn.setTuesdayDate(localDate.with(fieldISO, 2).toString());
            dateToReturn.setWednesdayDate(localDate.with(fieldISO, 3).toString());
            dateToReturn.setThursdayDate(localDate.with(fieldISO, 4).toString());
            dateToReturn.setFridayDate(localDate.with(fieldISO, 5).toString());
            dateToReturn.setMonthTitle(localDate.getMonth().toString());
            dateToReturn.setTodayDate(date);

            return ResponseEntity.ok(objectMapper.writeValueAsString(dateToReturn));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public Appoitment findAppointment(List<Appoitment> appoinmentList,  LocalTime time) {
        org.joda.time.format.DateTimeFormatter simpleDateFormat = DateTimeFormat.forPattern("HH:mm:SS");
        LocalTime appointmentTime;
        for (Appoitment appoitment: appoinmentList) {
            appointmentTime = simpleDateFormat.parseLocalTime((appoitment.getHour().toString()));
            if (time.equals(appointmentTime)) {
                return appoitment;
            }
        }

        return null;
    }

    @GetMapping("api/worker/appointment/{uuid}/{date}")
    public ResponseEntity<?> getWorkerServiceDayInfo(@PathVariable() String uuid, @PathVariable() Date date) throws JsonProcessingException {

        List<Appoitment> appoinmentList = appoitmentRepository.getWorkerAppointmentsInDate(uuid, date);
        org.joda.time.format.DateTimeFormatter simpleDateFormat = DateTimeFormat.forPattern("HH:mm:SS");
        LocalTime time = simpleDateFormat.parseLocalTime("10:00:00");

        List<CalendarDay> calendarDays = new ArrayList<>();
        CalendarDay newElement;

        for (int i = 0; i < 32;) {
            newElement = new CalendarDay();
            Appoitment appoitmentToAdd = findAppointment(appoinmentList, time);
            if (appoitmentToAdd != null) {
                newElement.setAppoitment(true);
                newElement.setVisitUuid(appoitmentToAdd.getUuid());
                newElement.setTime(appoitmentToAdd.getHour().toString());
                if (appoitmentToAdd.getClientUuid() != null) {
                    newElement.setClientRegistered(true);
                    newElement.setClientRef(new ClientRef(
                            appoitmentToAdd.getClientUuid().getUuid(),
                            appoitmentToAdd.getClientUuid().getName(),
                            appoitmentToAdd.getClientUuid().getSurname(),
                            appoitmentToAdd.getClientUuid().getPhone()
                    ));
                } else {
                    newElement.setClientRegistered(false);
                    newElement.setUnregisteredClientRef(new UnregisteredClientRef(
                            appoitmentToAdd.getUnregisteredClientUuid().getUuid(),
                            appoitmentToAdd.getUnregisteredClientUuid().getName(),
                            appoitmentToAdd.getUnregisteredClientUuid().getSurname(),
                            appoitmentToAdd.getUnregisteredClientUuid().getPhone()
                    ));
                }
                newElement.setServiceRef(new ServiceRef(
                        appoitmentToAdd.getServiceUuid().getUuid(),
                        appoitmentToAdd.getServiceUuid().getType(),
                        appoitmentToAdd.getServiceUuid().getName()
                ));
                newElement.setWorkerRef(new WorkerRef(
                        appoitmentToAdd.getWorkerUuid().getUuid(),
                        appoitmentToAdd.getWorkerUuid().getName(),
                        appoitmentToAdd.getWorkerUuid().getSurname()
                ));
                newElement.setWidthTimes(appoitmentToAdd.getServiceUuid().getTime()/15);
                newElement.setStatus(appoitmentToAdd.getStatus());
                newElement.setPrice(appoitmentToAdd.getServiceUuid().getPrice());
                calendarDays.add(newElement);
                time = time.plusMinutes(appoitmentToAdd.getServiceUuid().getTime());
                i += appoitmentToAdd.getServiceUuid().getTime()/15;
            } else {
                newElement.setAppoitment(false);
                newElement.setTime(time.toString());
                calendarDays.add(newElement);
                time = time.plusMinutes(15);
                i += 1;
            }
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(calendarDays));
    }

    @PutMapping("api/worker/appointment")
    public ResponseEntity<?> createAppointment(@RequestBody() NewAppointmentBody newAppointmentBody) throws JsonProcessingException {
        Optional<Service> serviceDB = serviceRepository.findById(newAppointmentBody.getServiceUuid());
            if (serviceDB.isPresent()) {
                Optional<Worker> workerDB = workerRepository.findById(newAppointmentBody.getWorkerUuid());
                if (workerDB.isPresent()) {
                    java.util.Date newHourDate = new java.util.Date();
                    newHourDate.setHours(new Integer(newAppointmentBody.getHour().substring(0,2)));
                    newHourDate.setMinutes(new Integer(newAppointmentBody.getHour().substring(3,5)));
                    newHourDate.setSeconds(0);
                    Worker worker = workerDB.get();
                    Service service = serviceDB.get();
                    Appoitment appoitment = new Appoitment();
                    appoitment.setStatus(Appoitment.Status.TO_ACCEPT);
                    appoitment.setDate(newAppointmentBody.getDate());
                    appoitment.setHour(newHourDate);
                    appoitment.setPrice(service.getPrice());
                    appoitment.setWorkerUuid(worker);
                    appoitment.setServiceUuid(service);
                    if (newAppointmentBody.getIsItClient()) {
                        Optional<Client> clientDB = clientRepository.findById(newAppointmentBody.getClientUuid());
                        if (clientDB.isPresent()) {
                            appoitment.setClientUuid(clientDB.get());
                            appoitment.setUnregisteredClientUuid(null);
                        } else {
                            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                        }
                    } else {
                        UnregisteredClient unregisteredClient = new UnregisteredClient();
                        unregisteredClient.setName(newAppointmentBody.getUnregisteredClient().getName());
                        unregisteredClient.setPhone(newAppointmentBody.getUnregisteredClient().getPhone());
                        unregisteredClient.setSurname(newAppointmentBody.getUnregisteredClient().getSurname());
                        unregisteredClient.setEMail(newAppointmentBody.getUnregisteredClient().getEMail());
                        unregisteredClientRepository.save(unregisteredClient);
                        appoitment.setUnregisteredClientUuid(unregisteredClient);
                        appoitment.setClientUuid(null);
                    }
                    appoitmentRepository.save(appoitment);
                    return ResponseEntity.ok(objectMapper.writeValueAsString(appoitment));
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/worker/appointment")
    public ResponseEntity<?> changeAppointmentStatus(@RequestBody() VisitStatusToChangeForm visitToChange) throws JsonProcessingException {
        Optional<Appoitment> appoitmentDB = appoitmentRepository.findById(visitToChange.getVisitUuid());
        if (appoitmentDB.isPresent()) {
            Appoitment appoitment = appoitmentDB.get();
            appoitment.setStatus(visitToChange.getStatus());
            appoitmentRepository.save(appoitment);

            String status = "";
            switch (appoitment.getStatus()) {
                case FINISHED: status = "\"Zakończone\""; break;
                case REJECTED: status = "\"Odrzucone\""; break;
                case CANCELLED: status = "\"Odwołane\""; break;
                case CONFIRMED: status = "\"Potwierdzone\""; break;
                case TO_ACCEPT: status = "\"Oczekuje na potwierdzenie\""; break;
            }

            if (appoitment.getUnregisteredClientUuid() == null ){
                mailClient.sendNotificationToClients(
                        appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname(),
                        appoitment.getClientUuid().getAccountUuid().getEmail(),
                        "[BSMS] - Zmiana statusu wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour() + " na " + status,
                        "Zmieniono status twojej wizyty u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                " dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " na " + status + ". Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
                mailClient.sendNotificationToClients(
                        "SYSTEM",
                        appoitment.getWorkerUuid().getAccountUuid().getEmail(),
                        "[BSMS] - Zmiana statusu wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour() + " na " + status,
                        "Zmieniono status twojej wizyty u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                " dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " na " + status + ". Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
            } else {
                mailClient.sendNotificationToClients(
                        appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname(),
                        appoitment.getUnregisteredClientUuid().getEMail(),
                        "[BSMS] - Zmiana statusu wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour() + " na " + status,
                        "Zmieniono status twojej wizyty u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                " dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " na " + status + ". Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
                mailClient.sendNotificationToClients(
                        "SYSTEM",
                        appoitment.getWorkerUuid().getAccountUuid().getEmail(),
                        "[BSMS] - Zmiana statusu wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour() + " na " + status,
                        "Zmieniono status twojej wizyty u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                " dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " na " + status + ". Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(appoitment));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("api/worker/appointment/{uuid}")
    public void removeAppointemntPerma(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Appoitment> appoitmentDB = appoitmentRepository.findById(uuid);
        if (appoitmentDB.isPresent()) {
            Appoitment appoitment = appoitmentDB.get();
            if (appoitment.getUnregisteredClientUuid() == null ){
                mailClient.sendNotificationToClients(
                        appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname(),
                        appoitment.getClientUuid().getAccountUuid().getEmail(),
                        "[BSMS] - Odwołanie wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour(),
                        "Twoja wizyta u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                "dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " została odwołana. Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
                mailClient.sendNotificationToClients(
                        "SYSTEM",
                        appoitment.getWorkerUuid().getAccountUuid().getEmail(),
                        "[BSMS] - Odwołanie wizyty z dnia " + appoitment.getDate() + " o " + appoitment.getHour(),
                        "Twoja wizyta u pracownika " + appoitment.getWorkerUuid().getName() + " " + appoitment.getWorkerUuid().getSurname() +
                                "dnia "+ appoitment.getDate() + " o " + appoitment.getHour() + " została odwołana. Wizyta dotyczy usługi: " +
                                appoitment.getServiceUuid().getType() + " - " + appoitment.getServiceUuid().getName()
                );
            }
            appoitmentRepository.delete(appoitmentDB.get());
        }
    }
}
