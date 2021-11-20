package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.toReturn.AccountWorkerInformation;
import api.hsbsms.model.forms.toReturn.ServiceRef;
import api.hsbsms.model.forms.toReturn.WorkerPermissionData;
import api.hsbsms.model.forms.toReturn.WorkerRef;
import api.hsbsms.model.table.*;
import api.hsbsms.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class WorkerPermissionRestController {

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/admin/premissions")
    public ResponseEntity<?> getActiceWorkersPermissionList() throws JsonProcessingException {
        List<Worker> workers = workerRepository.findAll();
        if (workers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<WorkerPermissionData> workerPermissionData = new ArrayList<>();
        for (Worker worker : workers) {
            if (worker.isActive()) {
                WorkerPermissionData workerData = new WorkerPermissionData();
                workerData.setWorkerRef(new WorkerRef(
                        worker.getUuid(),
                        worker.getName(),
                        worker.getSurname()
                ));
                List<String> workerServices = serviceRepository.getAllWorkerServicesUuid(worker.getUuid());
                List <ServiceRef> workerServicesThatCanDo = new ArrayList<>();
                for (String serviceUuid: workerServices) {
                    Optional <Service> serviceToAdd = serviceRepository.findByUuid(serviceUuid);
                    serviceToAdd.ifPresent(service -> workerServicesThatCanDo.add(new ServiceRef(
                            service.getUuid(),
                            service.getType(),
                            service.getName()
                    )));
                }
                workerData.setServiceRef(workerServicesThatCanDo);
                workerPermissionData.add(workerData);
            }
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(workerPermissionData));
    }

    @PatchMapping("api/admin/premissions")
    public ResponseEntity<?> setWorkerNewPermissions(@RequestBody WorkerPermissionData workerPermissionData) throws JsonProcessingException {
        Optional <Worker> workerDB = workerRepository.findById(workerPermissionData.getWorkerRef().getUuid());
        if (!workerDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        serviceRepository.clearWorkerPermissions(workerDB.get().getUuid());
        for (ServiceRef serviceUuid: workerPermissionData.getServiceRef()) {
            serviceRepository.putWorkerPermissions(workerDB.get().getUuid(), serviceUuid.getUuid());
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(workerPermissionData));
    }
}
