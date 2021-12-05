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
}
