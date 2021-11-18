package api.hsbsms.restControllers.admin;


import api.hsbsms.model.forms.fromBody.NewProductPromotion;
import api.hsbsms.model.forms.fromBody.NewServicePromotion;
import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.*;
import api.hsbsms.repository.ProductForSellRepository;
import api.hsbsms.repository.PromotionRepository;
import api.hsbsms.repository.ServiceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminPromotionServiceRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ProductForSellRepository productForSellRepository;

    @Autowired
    PromotionRepository promotionRepository;

    @PutMapping("api/admin/services/promotions")
    public ResponseEntity<?> createNewServicePromotion(@RequestBody NewServicePromotion newServicePromotion) throws JsonProcessingException {
        Promotion newPromotion = new Promotion();
        newPromotion.setDateFrom(newServicePromotion.getDateFrom());
        newPromotion.setDateTo(newServicePromotion.getDateTo());
        newPromotion.setDescription(newServicePromotion.getDescription());
        newPromotion.setName(newServicePromotion.getName());
        newPromotion.setPrecent(newServicePromotion.getPrecent());
        newPromotion.setPrice(newServicePromotion.getPrice());
        promotionRepository.save(newPromotion);
        for (ServiceRef serviceRef : newServicePromotion.getServicesList()) {
            Optional <Service> service = serviceRepository.findById(serviceRef.getUuid());
            if (!service.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                Service serviceToAdd = service.get();
                serviceToAdd.setPromotionUuid(newPromotion);
                serviceRepository.save(serviceToAdd);
            }
        }
        Optional<List<Promotion>> promotionsWithoutAnythingDB = promotionRepository.getPromotionsWithoutProductOrService();
        if (promotionsWithoutAnythingDB.isPresent()) {
            List<Promotion> promotionsWithoutAnything = promotionsWithoutAnythingDB.get();
            for (Promotion removePromotion: promotionsWithoutAnything) {
                promotionRepository.delete(removePromotion);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(newPromotion));
    }

    @PatchMapping("api/admin/services/promotions")
    public ResponseEntity<?> editServicePromotion(@RequestBody ServicePromotionForm data) throws JsonProcessingException {
        Optional<Promotion> promotionDB = promotionRepository.findById(data.getUuid());
        if (!promotionDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Promotion promotionToEdit = promotionDB.get();
        List <Service> serviceList = serviceRepository.getAllByPromotionUuid(promotionToEdit);
        for (Service service: serviceList) {
            service.setPromotionUuid(null);
            serviceRepository.save(service);
        }
        promotionToEdit.setDateFrom(data.getDateFrom());
        promotionToEdit.setDateTo(data.getDateTo());
        promotionToEdit.setDescription(data.getDescription());
        promotionToEdit.setName(data.getName());
        promotionToEdit.setPrecent(data.getPrecent());
        promotionToEdit.setPrice(data.getPrice());
        promotionRepository.save(promotionToEdit);
        for (ServiceRef serviceRef : data.getServicesList()) {
            Optional <Service> service = serviceRepository.findById(serviceRef.getUuid());
            if (!service.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                Service serviceToAdd = service.get();
                serviceToAdd.setPromotionUuid(promotionToEdit);
                serviceRepository.save(serviceToAdd);
            }
        }
        Optional<List<Promotion>> promotionsWithoutAnythingDB = promotionRepository.getPromotionsWithoutProductOrService();
        if (promotionsWithoutAnythingDB.isPresent()) {
            List<Promotion> promotionsWithoutAnything = promotionsWithoutAnythingDB.get();
            for (Promotion removePromotion: promotionsWithoutAnything) {
                promotionRepository.delete(removePromotion);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(promotionToEdit));
    }

    @PutMapping("api/admin/products/promotions")
    public ResponseEntity<?> createNewProductPromotion(@RequestBody NewProductPromotion newProductPromotion) throws JsonProcessingException {
        Promotion newPromotion = new Promotion();
        newPromotion.setDateFrom(newProductPromotion.getDateFrom());
        newPromotion.setDateTo(newProductPromotion.getDateTo());
        newPromotion.setDescription(newProductPromotion.getDescription());
        newPromotion.setName(newProductPromotion.getName());
        newPromotion.setPrecent(newProductPromotion.getPrecent());
        newPromotion.setPrice(newProductPromotion.getPrice());
        promotionRepository.save(newPromotion);
        for (ProductRef productRef : newProductPromotion.getProductList()) {
            Optional <ProductForSell> product = productForSellRepository.findById(productRef.getUuid());
            if (!product.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                ProductForSell productToAdd = product.get();
                productToAdd.setPromotionUuid(newPromotion);
                productForSellRepository.save(productToAdd);
            }
        }
        Optional<List<Promotion>> promotionsWithoutAnythingDB = promotionRepository.getPromotionsWithoutProductOrService();
        if (promotionsWithoutAnythingDB.isPresent()) {
            List<Promotion> promotionsWithoutAnything = promotionsWithoutAnythingDB.get();
            for (Promotion removePromotion: promotionsWithoutAnything) {
                promotionRepository.delete(removePromotion);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(newPromotion));
    }

    @PatchMapping("api/admin/products/promotions")
    public ResponseEntity<?> editProductPromotion(@RequestBody ProductPromotionForm data) throws JsonProcessingException {
        Optional<Promotion> promotionDB = promotionRepository.findById(data.getUuid());
        if (!promotionDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Promotion promotionToEdit = promotionDB.get();
        List <ProductForSell> productList = productForSellRepository.getAllByPromotionUuid(promotionToEdit);
        for (ProductForSell productForSell: productList) {
            productForSell.setPromotionUuid(null);
            productForSellRepository.save(productForSell);
        }
        promotionToEdit.setDateFrom(data.getDateFrom());
        promotionToEdit.setDateTo(data.getDateTo());
        promotionToEdit.setDescription(data.getDescription());
        promotionToEdit.setName(data.getName());
        promotionToEdit.setPrecent(data.getPrecent());
        promotionToEdit.setPrice(data.getPrice());
        promotionRepository.save(promotionToEdit);
        for (ProductRef productRef : data.getProductList()) {
            Optional <ProductForSell> product = productForSellRepository.findById(productRef.getUuid());
            if (!product.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                ProductForSell productForSell = product.get();
                productForSell.setPromotionUuid(promotionToEdit);
                productForSellRepository.save(productForSell);
            }
        }
        Optional<List<Promotion>> promotionsWithoutAnythingDB = promotionRepository.getPromotionsWithoutProductOrService();
        if (promotionsWithoutAnythingDB.isPresent()) {
            List<Promotion> promotionsWithoutAnything = promotionsWithoutAnythingDB.get();
            for (Promotion removePromotion: promotionsWithoutAnything) {
                promotionRepository.delete(removePromotion);
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(promotionToEdit));
    }

    @DeleteMapping("api/admin/services/promotions/{uuid}")
    public void removeServicePromotions(@PathVariable() String uuid) {
        Optional<Promotion> promotionToRemove = promotionRepository.findById(uuid);
        if (promotionToRemove.isPresent()) {
            List<Service> serviceList = serviceRepository.getAllByPromotionUuid(promotionToRemove.get());
            for (Service service : serviceList) {
                service.setPromotionUuid(null);
                serviceRepository.save(service);
            }
            promotionRepository.delete(promotionToRemove.get());
        }
    }

    @DeleteMapping("api/admin/products/promotions/{uuid}")
    public void removeProductPromotions(@PathVariable() String uuid) {
        Optional<Promotion> promotionToRemove = promotionRepository.findById(uuid);
        if (promotionToRemove.isPresent()) {
            List<ProductForSell> productList = productForSellRepository.getAllByPromotionUuid(promotionToRemove.get());
            for (ProductForSell product : productList) {
                product.setPromotionUuid(null);
                productForSellRepository.save(product);
            }
            promotionRepository.delete(promotionToRemove.get());
        }
    }
}
