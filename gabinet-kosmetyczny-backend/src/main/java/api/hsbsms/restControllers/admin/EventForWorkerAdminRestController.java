package api.hsbsms.restControllers.admin;

import api.hsbsms.model.table.EventForWorkers;
import api.hsbsms.repository.EventRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class EventForWorkerAdminRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    EventRepository eventRepository;

    @PostMapping("api/admin/event")
    public ResponseEntity<?> createNewEvent(@RequestBody() EventForWorkers eventForWorkers) throws JsonProcessingException {
        eventRepository.save(eventForWorkers);
        return ResponseEntity.ok(objectMapper.writeValueAsString(eventForWorkers));
    }

    @DeleteMapping("api/admin/event/{uuid}")
    public void removeEvent(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<EventForWorkers> eventForWorkersDB = eventRepository.findById(uuid);
        if (eventForWorkersDB.isPresent()) {
            eventRepository.removeAllWorkersFromEvent(uuid);
            eventRepository.delete(eventForWorkersDB.get());
        }
    }
}
