package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.toReturn.WorkerTask;
import api.hsbsms.model.table.EconomicTask;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.EconomicTaskRepository;
import api.hsbsms.repository.WorkerRepository;
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
public class EconomicTaskRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    EconomicTaskRepository economicTaskRepository;

    @GetMapping("api/worker/economic-task/{uuid}")
    public ResponseEntity<?> getWorkerEconomicTasks(@PathVariable() String uuid) throws JsonProcessingException {

        Optional <Worker> workerDB = workerRepository.findByUuid(uuid);
        if (!workerDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (!workerDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<EconomicTask> economicTasks = new ArrayList<>();
        economicTasks = economicTaskRepository.findAllByWorkerUuid(workerDB.get());
        List<WorkerTask> economicTasksToReturn = new ArrayList<>();
        for (EconomicTask task: economicTasks) {
            WorkerTask newTask = new WorkerTask();
            newTask.setUuid(task.getUuid());
            newTask.setTitle(task.getTitle());
            newTask.setDescription(task.getDescription());
            newTask.setDateFrom(task.getDateFrom());
            newTask.setDateTo(task.getDateTo());
            newTask.setWorkerUuid(task.getWorkerUuid().getUuid());
            newTask.setWorkerName(task.getWorkerUuid().getName());
            newTask.setWorkerSurname(task.getWorkerUuid().getSurname());
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(economicTasksToReturn));
    }
}
