package api.hsbsms.restControllers.client;

import api.hsbsms.model.forms.fromBody.VisitClientCreate;
import api.hsbsms.model.forms.toReturn.ServiceCategory;
import api.hsbsms.model.forms.toReturn.ServiceCategoryOffer;
import api.hsbsms.model.forms.toReturn.ServiceRef;
import api.hsbsms.model.forms.toReturn.ServiceRefWithPromo;
import api.hsbsms.model.table.Appoitment;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Service;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.*;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ClientServiceOfferRestController {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MailClient mailClient;

    @GetMapping("api/client/service-offers")
    public ResponseEntity<?> loadServices() throws JsonProcessingException {
        List<String> servicesTypeList = serviceRepository.getAllServicesType();
        List<ServiceCategory> serviceCategoryList = new ArrayList<>();
        for (String serviceType: servicesTypeList) {
            ServiceCategory serviceCategory = new ServiceCategory();
            serviceCategory.setCategoryName(serviceType);
            List<Service> serviceList = serviceRepository.getAllServicesByType(serviceType);
            List<ServiceCategoryOffer> services = new ArrayList<>();
            for (Service service: serviceList) {
                if (service.getActive()) {
                    ServiceCategoryOffer serviceCategoryOffer = new ServiceCategoryOffer();
                    serviceCategoryOffer.setName(service.getName());
                    serviceCategoryOffer.setDescription(service.getDescription());
                    serviceCategoryOffer.setPrice(service.getPrice());
                    serviceCategoryOffer.setPromotion(service.getPromotionUuid());
                    serviceCategoryOffer.setTime(service.getTime());
                    services.add(serviceCategoryOffer);
                }
            }
            serviceCategory.setServices(services);
            serviceCategoryList.add(serviceCategory);
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(serviceCategoryList));
    }

    @GetMapping("api/client/services/ref")
    public  ResponseEntity<?> loadClientServiceListRef() throws JsonProcessingException {
        List <Service> serviceList = serviceRepository.findAllByOrderByTypeAscNameAsc();
        List <ServiceRefWithPromo> serviceRefWithPromoList = new ArrayList<>();
        for (Service service: serviceList) {
            if (service.getActive()) {
                serviceRefWithPromoList.add(new ServiceRefWithPromo(
                        service.getUuid(),
                        service.getName(),
                        service.getPrice(),
                        service.getTime(),
                        service.getType(),
                        service.getPromotionUuid()
                ));
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(serviceRefWithPromoList));
    }

    @PutMapping("api/client/visit-create")
    public  ResponseEntity<?> createVisit(@RequestBody() VisitClientCreate visitClientCreate) throws JsonProcessingException {
        Appoitment appoitment = new Appoitment();
        Optional<Client> clientDB = clientRepository.findById(visitClientCreate.getClientUuid());
        Optional<Service> serviceDB = serviceRepository.findById(visitClientCreate.getServiceUuid());
        Optional<Worker> workerDB = workerRepository.findById(visitClientCreate.getWorkerUuid());
        if (clientDB.isPresent() && serviceDB.isPresent() && workerDB.isPresent()) {
            appoitment.setStatus(Appoitment.Status.TO_ACCEPT);
            appoitment.setClientUuid(clientDB.get());
            appoitment.setDate(visitClientCreate.getDate());
            java.util.Date newHourDate = new java.util.Date();
            newHourDate.setHours(new Integer(visitClientCreate.getHour().substring(0,2)));
            newHourDate.setMinutes(new Integer(visitClientCreate.getHour().substring(3,5)));
            newHourDate.setSeconds(0);
            appoitment.setHour(newHourDate);
            appoitment.setPrice(visitClientCreate.getPrice());
            appoitment.setServiceUuid(serviceDB.get());
            appoitment.setWorkerUuid(workerDB.get());
            appoitmentRepository.save(appoitment);

            mailClient.sendNotificationToWorkers("SYSTEM", workerDB.get().getAccountUuid().getEmail(), "Wizyta - prośba o potwierdzenie",
                    "Klient " + clientDB.get().getName() + " " + clientDB.get().getSurname() + " utworzył wizytę na dzień" +
                            new SimpleDateFormat("dd-MM-yyyy").format(appoitment.getDate()) + " o godzinie " + new SimpleDateFormat("HH:mm").format(appoitment.getHour()) + ". Potwierdź wizytę bądź ją odwołaj.");
            return ResponseEntity.ok(objectMapper.writeValueAsString(appoitment.getUuid()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
