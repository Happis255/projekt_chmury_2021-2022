package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.Absence;
import api.hsbsms.model.table.EconomicTask;
import api.hsbsms.model.table.EventForWorkers;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.EconomicTaskRepository;
import api.hsbsms.repository.EventRepository;
import api.hsbsms.repository.WorkerRepository;
import api.hsbsms.restControllers.admin.EventForWorkerAdminRestController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
public class EventForWorkerRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    EventRepository eventRepository;

    @GetMapping("api/worker/events/date-controller/{date}")
    public ResponseEntity<?> getEventForWorkerDateController(@PathVariable() String date) throws JsonProcessingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        if (localDate != null) {
            TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
            EventDateControllerModel dateToReturn = new EventDateControllerModel();
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

    @GetMapping("api/worker/events/{date}")
    public ResponseEntity<?> getEventsFromDate(@PathVariable() String date) throws JsonProcessingException {
        List<EventForWorkers> eventDBList = eventRepository.getEventsFromDate(date);
        if (eventDBList != null) {
            List <EventForWorkersForm> eventList = new ArrayList<>();
            for (EventForWorkers eventToAdd: eventDBList) {
                EventForWorkersForm event = new EventForWorkersForm();
                event.setCode(eventToAdd.getCode());
                event.setDateFrom(eventToAdd.getDateFrom());
                event.setDateTo(eventToAdd.getDateTo());
                event.setDescription(eventToAdd.getDescription());
                event.setName(eventToAdd.getName());
                event.setPrice(eventToAdd.getPrice());
                event.setStreet(eventToAdd.getStreet());
                event.setTown(eventToAdd.getTown());
                event.setType(eventToAdd.getType());
                event.setUuid(eventToAdd.getUuid());

                List<String> workersList = eventRepository.getAllWorkersFromEvent(eventToAdd.getUuid());
                List<WorkerRef> workerRefList = new ArrayList<>();
                for (String workerUuid: workersList) {
                    Optional <Worker> worker = workerRepository.findById(workerUuid);
                    if (worker.isPresent()) {
                        WorkerRef workerRef = new WorkerRef(worker.get().getUuid(), worker.get().getName(), worker.get().getSurname());
                        workerRefList.add(workerRef);
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    }
                }
                event.setWorkerRefList(workerRefList);
                eventList.add(event);
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(eventList));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        }
    }

    @PatchMapping("api/worker/event")
    public ResponseEntity<?> signWorkerForEvent(@RequestBody() WorkerEventRef workerEventRef) throws JsonProcessingException {
        Optional<EventForWorkers> event = eventRepository.findById(workerEventRef.getEventUuid());
        if (event.isPresent()) {
            Optional <Worker> worker = workerRepository.findById(workerEventRef.getWorkerUuid());
            if (worker.isPresent()) {
                eventRepository.addWorkerToEvent(workerEventRef.getEventUuid(), workerEventRef.getWorkerUuid());
                return ResponseEntity.ok(objectMapper.writeValueAsString(event.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/worker/event/remove-worker")
    public ResponseEntity<?> removeWorkerFromEvent(@RequestBody() WorkerEventRef workerEventRef) throws JsonProcessingException {
        Optional<EventForWorkers> event = eventRepository.findById(workerEventRef.getEventUuid());
        if (event.isPresent()) {
            Optional <Worker> worker = workerRepository.findById(workerEventRef.getWorkerUuid());
            if (worker.isPresent()) {
                eventRepository.removeWorkerFromEvent(workerEventRef.getEventUuid(), workerEventRef.getWorkerUuid());
                return ResponseEntity.ok(objectMapper.writeValueAsString(event.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
