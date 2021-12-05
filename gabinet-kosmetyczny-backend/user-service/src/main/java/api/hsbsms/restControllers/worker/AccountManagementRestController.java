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
}


