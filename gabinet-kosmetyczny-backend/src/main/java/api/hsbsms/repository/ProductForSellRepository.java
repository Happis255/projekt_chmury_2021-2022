package api.hsbsms.repository;

import api.hsbsms.model.table.ProductForSell;
import api.hsbsms.model.table.Promotion;
import api.hsbsms.model.table.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductForSellRepository extends JpaRepository<ProductForSell, String> {
    List<ProductForSell> getAllByPromotionUuid(Promotion promotion);
}
