package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.toReturn.EquipmentToReturnForm;
import api.hsbsms.model.table.Equipment;
import api.hsbsms.repository.EquipmentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class EquipmentRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    EquipmentRepository equipmentRepository;

    @GetMapping("api/admin/equipments")
    public ResponseEntity<?> getEquipmentList() throws JsonProcessingException {
        List<Equipment> equipmentList = equipmentRepository.findAll();
        if (equipmentList.size() == 0) {
            return ResponseEntity.ok(objectMapper.writeValueAsString(new ArrayList<>()));
        }
        List <EquipmentToReturnForm> equipmentToReturnFormList = new ArrayList<>();
        for (Equipment equipment: equipmentList) {
            EquipmentToReturnForm newEquipment = new EquipmentToReturnForm();
            newEquipment.setComments(equipment.getComments());
            newEquipment.setDescription(equipment.getDescription());
            newEquipment.setGetDate(equipment.getGetDate());
            newEquipment.setName(equipment.getName());
            newEquipment.setUuid(equipment.getUuid());
            newEquipment.setWarrantyDate(equipment.getWarrantyDate());
            newEquipment.setLastCheckDate(equipment.getLastCheckDate());
            Date date = newEquipment.getLastCheckDate();
            LocalDate dateBefore = LocalDate.parse(date.toString());
            LocalDate dateAfter = LocalDate.now();
            long noOfDaysBetween = ChronoUnit.DAYS.between(dateBefore, dateAfter);
            newEquipment.setToCheck(noOfDaysBetween > 30);

            equipmentToReturnFormList.add(newEquipment);
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(equipmentToReturnFormList));
    }

    @DeleteMapping("api/admin/equipment/{uuid}")
    public void deleteEquipment(@PathVariable() String uuid) {
        Optional<Equipment> equipmentOptional = equipmentRepository.findById(uuid);
        if (equipmentOptional.isPresent()) {
            equipmentRepository.delete(equipmentOptional.get());
        }
    }

    @PutMapping("api/admin/equipment")
    public ResponseEntity<?> addEquipment(@RequestBody Equipment equipment) throws JsonProcessingException {
        equipment.setLastCheckDate(new Date());
        equipmentRepository.save(equipment);
        return ResponseEntity.ok(objectMapper.writeValueAsString(equipment));
    }

    @PatchMapping("api/admin/equipment")
    public ResponseEntity<?> editEquipment(@RequestBody Equipment equipmentDataToEdit) throws JsonProcessingException {
        Optional <Equipment> equipmentDB = equipmentRepository.findById(equipmentDataToEdit.getUuid());
        if (equipmentDB.isPresent()) {
            Equipment equipment = equipmentDB.get();
            equipment.setComments(equipmentDataToEdit.getComments());
            equipment.setDescription(equipmentDataToEdit.getDescription());
            equipment.setGetDate(equipmentDataToEdit.getGetDate());
            equipment.setName(equipmentDataToEdit.getName());
            equipment.setWarrantyDate(equipmentDataToEdit.getWarrantyDate());
            equipmentRepository.save(equipment);

            return ResponseEntity.ok(objectMapper.writeValueAsString(equipment));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("api/admin/equipment/{uuid}")
    public ResponseEntity<?> markAsChecked(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Equipment> equipmentOptional = equipmentRepository.findById(uuid);
        if (equipmentOptional.isPresent()) {
            Equipment equipment = equipmentOptional.get();
            equipment.setLastCheckDate(new Date());
            equipmentRepository.save(equipment);
            return ResponseEntity.ok(objectMapper.writeValueAsString(equipment));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}


