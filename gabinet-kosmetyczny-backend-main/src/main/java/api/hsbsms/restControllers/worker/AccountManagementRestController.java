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

    @GetMapping("api/worker/account/account-info/{uuid}")
    public ResponseEntity<?> getAccountData(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Account> workerAccount = accountRepository.findByUuid(uuid);
        if (!workerAccount.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Optional<Worker> workerProfile = workerRepository.findByAccountUuid(workerAccount.get());
        if (!workerProfile.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!workerAccount.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        AccountWorkerInformation accountWorkerInformation = new AccountWorkerInformation();
        Account account = workerAccount.get();
        Worker worker = workerProfile.get();
        accountWorkerInformation.setUuid(worker.getUuid());
        accountWorkerInformation.setAccountUuid(account.getUuid());
        accountWorkerInformation.setName(worker.getName());
        accountWorkerInformation.setEmail(account.getEmail());
        accountWorkerInformation.setSurname(worker.getSurname());
        accountWorkerInformation.setStreet(worker.getStreet());
        accountWorkerInformation.setCode(worker.getCode());
        accountWorkerInformation.setTown(worker.getTown());
        accountWorkerInformation.setBirthday(worker.getBirthday());
        accountWorkerInformation.setPhone(worker.getPhone());
        accountWorkerInformation.setPesel(worker.getPesel());
        accountWorkerInformation.setAccountType(account.getRole().toString());
        accountWorkerInformation.setDateOfEmployment(worker.getDateOfEmployment());
        String certificates = worker.getCertificates();
        if (certificates != null) {
            accountWorkerInformation.setCertificates(certificates);
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(accountWorkerInformation));
    }

    @PatchMapping("api/worker/account/account-info")
    public ResponseEntity<?> updateAccountInfo(@RequestBody AccountWorkerInformation accountWorkerInformation) throws JsonProcessingException {
        Optional <Account> accountFromDB = accountRepository.findByUuid(accountWorkerInformation.getAccountUuid());
        if (!accountFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!accountFromDB.get().isActive()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Optional<Worker> workerFromDB = workerRepository.findByAccountUuid(accountFromDB.get());
        if (!workerFromDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Account accountToEdit = accountFromDB.get();
        Worker workerToEdit = workerFromDB.get();


        if(accountWorkerInformation != null) {
            if (accountWorkerInformation.getName() != null) {
                workerToEdit.setName(accountWorkerInformation.getName());
                accountToEdit.setEmail(accountWorkerInformation.getEmail());
            }
            if (accountWorkerInformation.getSurname() != null) {
                workerToEdit.setSurname(accountWorkerInformation.getSurname());
            }
            if (accountWorkerInformation.getStreet() != null) {
                workerToEdit.setStreet(accountWorkerInformation.getStreet());
            }
            if (accountWorkerInformation.getCode() != null) {
                workerToEdit.setCode(accountWorkerInformation.getCode());
            }
            if (accountWorkerInformation.getTown() != null) {
                workerToEdit.setTown(accountWorkerInformation.getTown());
            }
            if (accountWorkerInformation.getBirthday() != null) {
                workerToEdit.setBirthday(accountWorkerInformation.getBirthday());
            }
            if (accountWorkerInformation.getPhone() != null) {
                workerToEdit.setPhone(accountWorkerInformation.getPhone());
            }
            if (accountWorkerInformation.getDateOfEmployment() != null) {
                workerToEdit.setDateOfEmployment(accountWorkerInformation.getDateOfEmployment());
            }
            if (accountWorkerInformation.getCertificates() != null) {
                workerToEdit.setCertificates(accountWorkerInformation.getCertificates());
            }
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        workerToEdit.setAccountUuid(accountToEdit);

        accountRepository.save(accountToEdit);
        workerRepository.save(workerToEdit);

        return ResponseEntity.ok(objectMapper.writeValueAsString(workerToEdit));
    }

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


