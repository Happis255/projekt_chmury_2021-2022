package api.hsbsms.repository;

import api.hsbsms.model.table.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PromotionRepository extends JpaRepository<Promotion, String> {

    @Query(value = "CALL GET_SERVICES_PROMOTIONS_WITH_DATE(:p_date);", nativeQuery = true)
    List<Promotion> getServicesPromotionsWithDate(@Param("p_date")String date);

    @Query(value = "CALL GET_PRODUCTS_PROMOTIONS_WITH_DATE(:p_date);", nativeQuery = true)
    List<Promotion> getProductsPromotionsWithDate(@Param("p_date")String date);

    @Query(value = "CALL GET_PROMOTIONS_WITHOUT_PRODUCT_OR_SERVICE();", nativeQuery = true)
    Optional<List<Promotion>> getPromotionsWithoutProductOrService();
}


