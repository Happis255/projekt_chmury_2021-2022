package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.fromBody.ServiceToAddForm;
import api.hsbsms.model.forms.fromBody.Uuid;
import api.hsbsms.model.forms.toReturn.*;
import api.hsbsms.model.table.Absence;
import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.model.table.Promotion;
import api.hsbsms.model.table.Service;
import api.hsbsms.repository.ProductForSellRepository;
import api.hsbsms.repository.PromotionRepository;
import api.hsbsms.repository.ServiceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
public class PromotionServiceRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ProductForSellRepository productForSellRepository;

    @Autowired
    PromotionRepository promotionRepository;

    @GetMapping("api/worker/services/promotions/date-controller/{date}")
    public ResponseEntity<?> getDaysOfTheWeekPromotions(@PathVariable() String date) throws JsonProcessingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        if (localDate != null) {
            TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
            PromotionsDateControllerModel dateToReturn = new PromotionsDateControllerModel();
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

    @GetMapping("api/worker/products/promotions/date-controller/{date}")
    public ResponseEntity<?> getProductsDaysOfController(@PathVariable() String date) throws JsonProcessingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        if (localDate != null) {
            TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
            PromotionsDateControllerModel dateToReturn = new PromotionsDateControllerModel();
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

    @GetMapping("api/worker/services/promotions/{date}")
    public ResponseEntity<?> getServicePromotionsFromDate(@PathVariable() String date) throws JsonProcessingException {
        List<Promotion> promotionsList = promotionRepository.getServicesPromotionsWithDate(date);
        if (promotionsList != null) {
            List<ServicePromotionForm> servicePromotionForms = new ArrayList<>();
            for (Promotion promotionFromDB : promotionsList) {
                ServicePromotionForm promotionToAdd = new ServicePromotionForm();
                promotionToAdd.setDateFrom(promotionFromDB.getDateFrom());
                promotionToAdd.setDateTo(promotionFromDB.getDateTo());
                promotionToAdd.setDescription(promotionFromDB.getDescription());
                promotionToAdd.setName(promotionFromDB.getName());
                if (promotionFromDB.getPrecent() != null) {
                    promotionToAdd.setPrecent(promotionFromDB.getPrecent());
                }
                if (promotionFromDB.getPrice() != null) {
                    promotionToAdd.setPrice(promotionFromDB.getPrice());
                }
                promotionToAdd.setUuid(promotionFromDB.getUuid());
                List<Service> servicesWithPromotion = serviceRepository.getAllByPromotionUuid(promotionFromDB);
                List<ServiceRef> serviceRefs = new ArrayList<>();
                for (Service serviceFromDB: servicesWithPromotion) {
                    serviceRefs.add(new ServiceRef(serviceFromDB.getUuid(), serviceFromDB.getName(), serviceFromDB.getType()));
                }
                promotionToAdd.setServicesList(serviceRefs);
                servicePromotionForms.add(promotionToAdd);
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(servicePromotionForms));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        }
    }

    @GetMapping("api/worker/products/promotions/{date}")
    public ResponseEntity<?> getProductsPromotionsFromDate(@PathVariable() String date) throws JsonProcessingException {
        List<Promotion> promotionsList = promotionRepository.getProductsPromotionsWithDate(date);
        if (promotionsList != null) {
            List<ProductPromotionForm> productPromotionForms = new ArrayList<>();
            for (Promotion promotionFromDB : promotionsList) {
                ProductPromotionForm promotionToAdd = new ProductPromotionForm();
                promotionToAdd.setDateFrom(promotionFromDB.getDateFrom());
                promotionToAdd.setDateTo(promotionFromDB.getDateTo());
                promotionToAdd.setDescription(promotionFromDB.getDescription());
                promotionToAdd.setName(promotionFromDB.getName());
                if (promotionFromDB.getPrecent() != null) {
                    promotionToAdd.setPrecent(promotionFromDB.getPrecent());
                }
                if (promotionFromDB.getPrice() != null) {
                    promotionToAdd.setPrice(promotionFromDB.getPrice());
                }
                promotionToAdd.setUuid(promotionFromDB.getUuid());
                List<ProductForSell> productsWithPromotion = productForSellRepository.getAllByPromotionUuid(promotionFromDB);
                List<ProductRef> productRefs = new ArrayList<>();
                for (ProductForSell serviceFromDB: productsWithPromotion) {
                    productRefs.add(new ProductRef(serviceFromDB.getUuid(), serviceFromDB.getName()));
                }
                promotionToAdd.setProductList(productRefs);
                productPromotionForms.add(promotionToAdd);
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(productPromotionForms));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        }
    }
}
