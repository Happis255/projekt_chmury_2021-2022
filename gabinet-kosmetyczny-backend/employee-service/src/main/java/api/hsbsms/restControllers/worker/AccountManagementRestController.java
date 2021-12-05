package api.hsbsms.restControllers.worker;


import api.hsbsms.model.forms.toReturn.AccountWorkerInformation;
import api.hsbsms.model.forms.toReturn.WorkerHealthCard;
import api.hsbsms.model.forms.toReturn.WorkerPayment;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.HealthCard;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
public class AccountManagementRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    BonusesRepository bonusesRepository;

    @Autowired
    HealthCardRepository healthCardRepository;

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @GetMapping("api/worker/health-card/{uuid}")
    public ResponseEntity<?> getHealthCardData(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Worker> workerProfile = workerRepository.findById(uuid);
        if (!workerProfile.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!workerProfile.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Optional<HealthCard> healthCard = healthCardRepository.findByWorkerUuid(workerProfile.get());
        if (!healthCard.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        WorkerHealthCard workerHealthCard = new WorkerHealthCard();
        HealthCard healthCardFromDB = healthCard.get();
        workerHealthCard.setUuid(healthCardFromDB.getUuid());
        workerHealthCard.setPacemaker(healthCardFromDB.isPacemaker());
        workerHealthCard.setHermophilia(healthCardFromDB.isHermophilia());
        workerHealthCard.setPsoriasis(healthCardFromDB.isPsoriasis());
        workerHealthCard.setAllergies(healthCardFromDB.getAllergies());
        workerHealthCard.setDiscoloration(healthCardFromDB.isDiscoloration());
        workerHealthCard.setBloodCirculationDisorders(healthCardFromDB.isBloodCirculationDisorders());
        workerHealthCard.setInfectiousDiseases(healthCardFromDB.isInfectiousDiseases());
        workerHealthCard.setHerpes(healthCardFromDB.isHerpes());
        workerHealthCard.setFever(healthCardFromDB.isFever());
        workerHealthCard.setPregnancy(healthCardFromDB.isPregnancy());
        workerHealthCard.setWeakness(healthCardFromDB.isWeakness());
        Date dateCard = healthCard.get().getEditDate();
        LocalDate dateBefore = LocalDate.parse(dateCard.toString());
        LocalDate dateAfter = LocalDate.now();
        long noOfDaysBetween = ChronoUnit.DAYS.between(dateBefore, dateAfter);
        workerHealthCard.setNeedsUpdate(noOfDaysBetween > 30);
        return ResponseEntity.ok(objectMapper.writeValueAsString(workerHealthCard));
    }

    @PatchMapping("api/worker/health-card")
    public ResponseEntity<?> updateHealthCard(@RequestBody WorkerHealthCard workerHealthCard) throws JsonProcessingException {
        Optional<HealthCard> healthCard = healthCardRepository.findById(workerHealthCard.getUuid());
        if (!healthCard.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        HealthCard healthCardToEdit = healthCard.get();
        healthCardToEdit.setEditDate(java.sql.Date.valueOf(LocalDate.now()));
        healthCardToEdit.setAllergies(workerHealthCard.getAllergies());
        healthCardToEdit.setPacemaker(workerHealthCard.isPacemaker());
        healthCardToEdit.setHermophilia(workerHealthCard.isHermophilia());
        healthCardToEdit.setPsoriasis(workerHealthCard.isPsoriasis());
        healthCardToEdit.setDiscoloration(workerHealthCard.isDiscoloration());
        healthCardToEdit.setInfectiousDiseases(workerHealthCard.isInfectiousDiseases());
        healthCardToEdit.setBloodCirculationDisorders(workerHealthCard.isBloodCirculationDisorders());
        healthCardToEdit.setHerpes(workerHealthCard.isHerpes());
        healthCardToEdit.setFever(workerHealthCard.isFever());
        healthCardToEdit.setPregnancy(workerHealthCard.isPregnancy());
        healthCardToEdit.setWeakness(workerHealthCard.isWeakness());
        healthCardRepository.save(healthCardToEdit);
        return ResponseEntity.ok(objectMapper.writeValueAsString(healthCardToEdit));
    }

    @GetMapping("api/worker/payment-info/{uuid}")
    public ResponseEntity<?> getWorkerIncome(@PathVariable() String uuid) throws JsonProcessingException {
        DateTime dateTime = DateTime.now();
        DateTime lastDate = dateTime.dayOfMonth().withMaximumValue();
        DateTime firstDate = dateTime.dayOfMonth().withMinimumValue();
        java.sql.Date sqlLastDate = new java.sql.Date( lastDate.getMillis() );
        java.sql.Date sqlFirstDate = new java.sql.Date( firstDate.getMillis() );
        Optional<Long> bonus = bonusesRepository.countBonusesThisMonth(sqlFirstDate, sqlLastDate, uuid);
        WorkerPayment workerPayment = new WorkerPayment();
        if (bonus.isPresent()) {
            workerPayment.setBonus(bonus.get());
        } else {
            workerPayment.setBonus(0);
        }
        Optional<Long> income =  appoitmentRepository.countWorkersIncomeFromDateToDate(sqlFirstDate, sqlLastDate, uuid);
        if (income.isPresent()) {
            float incomeFromDB = income.get();
            if (incomeFromDB < 3000) {
                workerPayment.setAmount(2600);
            } else {
                workerPayment.setAmount(3000 + ((incomeFromDB - 3000) / 2));
            }
        } else {
            workerPayment.setAmount(2600);
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(workerPayment));
    }
}


