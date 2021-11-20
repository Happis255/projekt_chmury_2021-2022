package api.hsbsms.repository;

import api.hsbsms.model.table.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, String> {

}
