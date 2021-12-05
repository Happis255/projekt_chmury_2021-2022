package api.hsbsms.restControllers.admin;

import api.hsbsms.model.AppoitmentDay;
import api.hsbsms.model.HourAvailability;
import api.hsbsms.model.forms.fromBody.AppoitmentClientForm;
import api.hsbsms.model.forms.toReturn.ProductRef;
import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.model.table.ProductForUse;
import api.hsbsms.model.table.Service;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.ProductForSellRepository;
import api.hsbsms.repository.ProductForUseRepository;
import api.hsbsms.repository.ServiceRepository;
import api.hsbsms.repository.WorkerRepository;
import api.hsbsms.services.AppointmentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ProductsRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ProductForSellRepository productForSellRepository;

    @Autowired
    ProductForUseRepository productForUseRepository;

    @GetMapping("api/worker/products/for-use")
    public ResponseEntity<?> getAllProductsForUse() throws JsonProcessingException {
        List<ProductForUse> productForUseList = productForUseRepository.findAll();
        if (productForUseList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(productForUseList));
        }
    }

    @GetMapping("api/worker/products/for-sell")
    public ResponseEntity<?> getAllProductsForSell() throws JsonProcessingException {
        List<ProductForSell> productForSellList = productForSellRepository.findAll();
        if (productForSellList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(productForSellList));
        }
    }

    @GetMapping("api/worker/products/for-sell/ref")
    public ResponseEntity<?> getAllProductsRefForSell() throws JsonProcessingException {
        List<ProductForSell> productForSellList = productForSellRepository.findAll();
        List<ProductRef> productRefs = new ArrayList<>();
        if (productForSellList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            for (ProductForSell productForSell: productForSellList) {
                productRefs.add(new ProductRef(productForSell.getUuid(), productForSell.getName()));
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(productRefs));
        }
    }
}
