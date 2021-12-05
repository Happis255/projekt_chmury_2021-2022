package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.toReturn.WorkerTask;
import api.hsbsms.model.table.EconomicTask;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.EconomicTaskRepository;
import api.hsbsms.repository.WorkerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.util.*;

@RestController
public class EconomicTaskRestFullController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    EconomicTaskRepository economicTaskRepository;

    @GetMapping("api/admin/economic-tasks")
    public ResponseEntity<?> getAllEconomicTasks() throws JsonProcessingException {

        List<EconomicTask> economicTasks = new ArrayList<>();
        economicTasks = economicTaskRepository.findAllByOrderByTitleAscDateFromAscDateToAsc();
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
            economicTasksToReturn.add(newTask);
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(economicTasksToReturn));
    }

    @PutMapping("api/admin/economic-task")
    public ResponseEntity<?> addEconomicTask(@RequestBody WorkerTask newTask) throws JsonProcessingException {
        EconomicTask economicTask = new EconomicTask();
        Optional <Worker> workerDB = workerRepository.findById(newTask.getWorkerUuid());
        if (!workerDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (!workerDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        economicTask.setTitle(newTask.getTitle());
        economicTask.setDescription(newTask.getDescription());
        economicTask.setDateTo(newTask.getDateTo());
        economicTask.setDateFrom(newTask.getDateTo());
        economicTask.setWorkerUuid(workerDB.get());
        economicTaskRepository.save(economicTask);

        return ResponseEntity.ok(objectMapper.writeValueAsString(economicTask));
    }

    @PatchMapping("api/admin/economic-task")
    public ResponseEntity<?> modifyEconomicTask(@RequestBody WorkerTask newTask) throws JsonProcessingException {

        Optional <EconomicTask> economicTaskDB = economicTaskRepository.findById(newTask.getUuid());
        if (!economicTaskDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        EconomicTask economicTask = economicTaskDB.get();
        if (newTask.getWorkerUuid() != null) {
            Optional <Worker> workerDB = workerRepository.findById(newTask.getWorkerUuid());
            if (!workerDB.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            if (!workerDB.get().isActive()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            economicTask.setWorkerUuid(workerDB.get());
        }
        if (newTask.getTitle() != null) {
            economicTask.setTitle(newTask.getTitle());
        }
        if (newTask.getDescription() != null) {
            economicTask.setDescription(newTask.getDescription());
        }
        if (newTask.getDateTo() != null) {
            economicTask.setDateTo(newTask.getDateTo());
        }
        if (newTask.getDateTo() != null) {
            economicTask.setDateFrom(newTask.getDateTo());
        }
        economicTaskRepository.save(economicTask);

        return ResponseEntity.ok(objectMapper.writeValueAsString(economicTask));
    }

    @DeleteMapping("api/admin/economic-task/{uuid}")
    public void removeEconomicTask(@PathVariable() String uuid) throws JsonProcessingException {
        Optional <EconomicTask> economicTaskDB = economicTaskRepository.findById(uuid);
        if (economicTaskDB.isPresent()) {
            EconomicTask economicTask = economicTaskDB.get();
            economicTaskRepository.delete(economicTask);
        }
    }
}
