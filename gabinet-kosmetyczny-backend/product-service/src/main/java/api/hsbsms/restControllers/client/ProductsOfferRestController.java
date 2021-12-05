package api.hsbsms.restControllers.client;

import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.repository.ProductForSellRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ProductsOfferRestController {

    @Autowired
    ProductForSellRepository productForSellRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/client/product-offers")
    public ResponseEntity<?> loadProducts() throws JsonProcessingException {
        List<ProductForSell> productForSells = productForSellRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(productForSells));
    }
}
