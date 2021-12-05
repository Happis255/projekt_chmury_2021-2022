package api.hsbsms.restControllers.worker;

import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.repository.ProductForSellRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ProductForSellRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ProductForSellRepository productForSellRepository;

    @PutMapping("api/worker/product-for-sell")
    public ResponseEntity<?> addProductForSell(@RequestBody() ProductForSell productForSell) throws JsonProcessingException {
        productForSellRepository.save(productForSell);
        return ResponseEntity.ok(objectMapper.writeValueAsString(productForSell));
    }

    @PatchMapping("api/worker/product-for-sell")
    public ResponseEntity<?> editProductForSell(@RequestBody() ProductForSell productForSell) throws JsonProcessingException {
        Optional<ProductForSell> productDB = productForSellRepository.findById(productForSell.getUuid());
        if (productDB.isPresent()) {
            ProductForSell productToEdit = productDB.get();
            productToEdit.setAmount(productForSell.getAmount());
            productToEdit.setDescription(productForSell.getDescription());
            productToEdit.setName(productForSell.getName());
            productToEdit.setPrice(productForSell.getPrice());
            productForSellRepository.save(productToEdit);
            return ResponseEntity.ok(objectMapper.writeValueAsString(productToEdit));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/worker/product-for-sell/add-one/{uuid}")
    public void addOneProductForUseAmount(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForSell> productDB = productForSellRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForSell product = productDB.get();
            product.setAmount(product.getAmount() + 1);
            productForSellRepository.save(product);
        }
    }

    @PatchMapping("api/worker/product-for-sell/remove-one/{uuid}")
    public void removeOneProductForUseAmount(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForSell> productDB = productForSellRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForSell product = productDB.get();
            if (product.getAmount() - 1 > -1){
                product.setAmount(product.getAmount() - 1);
            }
            productForSellRepository.save(product);
        }
    }

    @DeleteMapping("api/worker/product-for-sell/{uuid}")
    public void removeProductForUse(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<ProductForSell> productDB = productForSellRepository.findById(uuid);
        if (productDB.isPresent()) {
            ProductForSell product = productDB.get();
            productForSellRepository.delete(product);
        }
    }
}


