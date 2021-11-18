package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.fromBody.ServiceToAddForm;
import api.hsbsms.model.forms.fromBody.Uuid;
import api.hsbsms.model.forms.toReturn.ServiceRef;
import api.hsbsms.model.table.Appoitment;
import api.hsbsms.model.table.Service;
import api.hsbsms.repository.AppoitmentRepository;
import api.hsbsms.repository.ServiceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ServiceRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @GetMapping("api/worker/services/type")
    public ResponseEntity<?> getServicesTypes() throws JsonProcessingException {

        List <String> servicesTypeList = serviceRepository.getAllServicesType();
        return ResponseEntity.ok(objectMapper.writeValueAsString(servicesTypeList));
    }

    @GetMapping("api/worker/services/ref")
    public ResponseEntity<?> getServicesRef() throws JsonProcessingException {

        List <Service> serviceList = serviceRepository.findAllByOrderByTypeAscNameAsc();
        List <ServiceRef> serviceRefs = new ArrayList<>();
        for (Service service: serviceList) {
            if (service.getActive()) {
                serviceRefs.add(new ServiceRef(
                        service.getUuid(),
                        service.getName(),
                        service.getType()
                ));
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(serviceRefs));
    }

    @GetMapping("api/worker/services/{type}")
    public ResponseEntity<?> getServicesList(@PathVariable() String type) throws JsonProcessingException {

        List <Service> servicesTypeList = serviceRepository.getAllServicesByType(type);
        return ResponseEntity.ok(objectMapper.writeValueAsString(servicesTypeList));
    }

    @PutMapping("api/worker/service")
    public ResponseEntity<?> getServicesList(@RequestBody ServiceToAddForm serviceToAdd) throws JsonProcessingException {
        System.out.println(serviceToAdd);
        Service service = new Service();
        service.setName(serviceToAdd.getName());
        service.setType(serviceToAdd.getType());
        service.setPrice(serviceToAdd.getPrice());
        service.setTime(serviceToAdd.getTime());
        if (serviceToAdd.getAdvices().length() > 0) {
            service.setAdvices(serviceToAdd.getAdvices());
        }
        if (serviceToAdd.getDescription().length() > 0) {
            service.setDescription(serviceToAdd.getDescription());
        }
        serviceRepository.save(service);
        return ResponseEntity.ok(objectMapper.writeValueAsString(service));
    }

    @PatchMapping("api/worker/service/status")
    public ResponseEntity<?> getServicesList(@RequestBody Uuid uuid) throws JsonProcessingException {

        Optional<Service> service = serviceRepository.findById(uuid.getUuid());
        if (!service.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Service serviceToSwtich = service.get();
        serviceToSwtich.setActive(!serviceToSwtich.getActive());
        serviceRepository.save(serviceToSwtich);
        return ResponseEntity.ok(objectMapper.writeValueAsString(serviceToSwtich));
    }

    @PatchMapping("api/worker/service")
    public ResponseEntity<?> editService(@RequestBody Service service) throws JsonProcessingException {

        Optional<Service> serviceToEditDB = serviceRepository.findById(service.getUuid());
        if (!serviceToEditDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Service serviceToEdit = serviceToEditDB.get();
        serviceToEdit.setActive(service.getActive());
        serviceToEdit.setDescription(service.getDescription());
        serviceToEdit.setAdvices(service.getAdvices());
        serviceToEdit.setTime(service.getTime());
        serviceToEdit.setPrice(service.getPrice());
        serviceToEdit.setType(service.getType());
        serviceToEdit.setName(service.getName());
        serviceRepository.save(serviceToEdit);
        return ResponseEntity.ok(objectMapper.writeValueAsString(serviceToEdit));
    }
}
