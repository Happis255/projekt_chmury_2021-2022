package api.hsbsms.restControllers.worker;

import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.model.table.ProductForUse;
import api.hsbsms.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ProductForUseRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ProductForUseRepository productForUseRepository;

    @PutMapping("api/worker/product-for-use")
    public ResponseEntity<?> addProductForUse(@RequestBody() ProductForUse productForUse) throws JsonProcessingException {
        productForUseRepository.save(productForUse);
        return ResponseEntity.ok(objectMapper.writeValueAsString(productForUse));
    }

    @PatchMapping("api/worker/product-for-use")
    public ResponseEntity<?> editProductForUse(@RequestBody() ProductForUse productForUse) throws JsonProcessingException {
        Optional<ProductForUse> productDB = productForUseRepository.findById(productForUse.getUuid());
        if (productDB.isPresent()) {
            ProductForUse productToEdit = productDB.get();
            productToEdit.setAmount(productForUse.getAmount());
            productToEdit.setDescription(productForUse.getDescription());
            productToEdit.setName(productForUse.getName());
            productToEdit.setPrice(productForUse.getPrice());
            productToEdit.setCode(productForUse.getCode());
            productForUseRepository.save(productToEdit);
            return ResponseEntity.ok(objectMapper.writeValueAsString(productToEdit));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/worker/product-for-use/add-one/{uuid}")
    public void addOneProductForUseAmount(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForUse> productDB = productForUseRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForUse product = productDB.get();
            product.setAmount(product.getAmount() + 1);
            productForUseRepository.save(product);
        }
    }

    @PatchMapping("api/worker/product-for-use/remove-one/{uuid}")
    public void removeOneProductForUseAmount(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForUse> productDB = productForUseRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForUse product = productDB.get();
            if (product.getAmount() - 1 > -1){
                product.setAmount(product.getAmount() - 1);
            }
            productForUseRepository.save(product);
        }
    }

    @DeleteMapping("api/worker/product-for-use/{uuid}")
    public void removeProductForUse(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForUse> productDB = productForUseRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForUse product = productDB.get();
            productForUseRepository.delete(product);
        }
    }
}


