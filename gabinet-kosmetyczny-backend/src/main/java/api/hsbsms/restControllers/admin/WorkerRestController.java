package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.NewWorker;
import api.hsbsms.model.forms.fromBody.WorkersMessages;
import api.hsbsms.model.forms.toReturn.AccountWorkerInformation;
import api.hsbsms.model.forms.toReturn.IncomeServicePerMonth;
import api.hsbsms.model.forms.toReturn.WorkerPayment;
import api.hsbsms.model.forms.toReturn.WorkerRef;
import api.hsbsms.model.table.*;
import api.hsbsms.repository.*;
import api.hsbsms.services.MailClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class WorkerRestController {

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    BonusesRepository bonusesRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    HealthCardRepository healthCardRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MailClient mailClient;

    @GetMapping("api/admin/workers")
    public ResponseEntity<?> getWorkersInSystem() throws JsonProcessingException {
        List<Worker> workers = workerRepository.findAll();
        if (workers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<AccountWorkerInformation> accountWorkerInformation = new ArrayList<>();
        for (Worker worker : workers) {
            if (worker.isActive()) {
                AccountWorkerInformation newAccount = new AccountWorkerInformation();
                newAccount.setUuid(worker.getUuid());
                newAccount.setAccountUuid(worker.getAccountUuid().getUuid());
                newAccount.setName(worker.getName());
                newAccount.setEmail(worker.getAccountUuid().getEmail());
                newAccount.setSurname(worker.getSurname());
                newAccount.setStreet(worker.getStreet());
                newAccount.setCode(worker.getCode());
                newAccount.setTown(worker.getTown());
                newAccount.setBirthday(worker.getBirthday());
                newAccount.setPhone(worker.getPhone());
                newAccount.setPesel(worker.getPesel());
                newAccount.setDateOfEmployment(worker.getDateOfEmployment());
                String certificates = worker.getCertificates();
                if (certificates != null) {
                    newAccount.setCertificates(certificates);
                }
                accountWorkerInformation.add(newAccount);
            }
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(accountWorkerInformation));
    }

    @GetMapping("api/admin/workers/ref")
    public ResponseEntity<?> getWorkersRefInSystem() throws JsonProcessingException {
        List<Worker> workers = workerRepository.findAll();
        if (workers == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<WorkerRef> accountWorkerInformation = new ArrayList<>();
        for (Worker worker : workers) {
            if (worker.isActive()) {
                WorkerRef newAccount = new WorkerRef();
                newAccount.setUuid(worker.getUuid());
                newAccount.setName(worker.getName());
                newAccount.setSurname(worker.getSurname());
                accountWorkerInformation.add(newAccount);
            }
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(accountWorkerInformation));
    }


    @GetMapping("api/admin/accounts/emails")
    public ResponseEntity<?> getEmailList() throws JsonProcessingException {
        List<Account> accounts = accountRepository.findAll();
        if (accounts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<String> workersEmails = new ArrayList<>();
        for (Account account : accounts) {
            if (account.isActive()) {
                workersEmails.add(account.getEmail());
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(workersEmails));
    }

    @PutMapping("api/admin/worker/give-bonus")
    public void giveWorkerMoneyBonus(@RequestBody() WorkerPayment bonus) throws JsonProcessingException {
        Optional<Worker> worker = workerRepository.findById(bonus.getUuid());
        if (worker.isPresent()) {
            Bonuses bonusForDB = new Bonuses();
            bonusForDB.setWorkerUuid(worker.get());
            bonusForDB.setAmount(bonus.getBonus());
            bonusForDB.setDateGiven(Calendar.getInstance().getTime());
            bonusesRepository.save(bonusForDB);
        }
    }

    @PutMapping("api/admin/worker/create-new")
    public ResponseEntity<?> createNewWorker(@RequestBody() NewWorker newWorker) throws JsonProcessingException {

        Account account = new Account();
        Worker worker = new Worker();
        HealthCard healthCard = new HealthCard();

        account.setActive(true);
        account.setEmail(newWorker.getEmail());
        account.setPassword(newWorker.getPassword());
        account.setRole(newWorker.getRole());
        accountRepository.save(account);

        Date today = Calendar.getInstance().getTime();
        worker.setActive(true);
        worker.setName(newWorker.getName());
        worker.setSurname(newWorker.getSurname());
        worker.setStreet(newWorker.getStreet());
        worker.setTown(newWorker.getTown());
        worker.setCode(newWorker.getCode());
        worker.setBirthday(newWorker.getBirthday());
        worker.setPhone(newWorker.getPhone());
        worker.setPesel(newWorker.getPesel());
        worker.setAccountUuid(account);
        worker.setDateOfEmployment(today);
        if (newWorker.getCertificates() != null) {
            worker.setCertificates(newWorker.getCertificates());
        }
        workerRepository.save(worker);

        healthCard.setWorkerUuid(worker);
        healthCard.setPacemaker(newWorker.isPacemaker());
        healthCard.setHermophilia(newWorker.isHermophilia());
        healthCard.setPsoriasis(newWorker.isPsoriasis());
        healthCard.setAllergies(newWorker.getAllergies());
        healthCard.setInfectiousDiseases(newWorker.isInfectiousDiseases());
        healthCard.setDiscoloration(newWorker.isDiscoloration());
        healthCard.setBloodCirculationDisorders(newWorker.isBloodCirculationDisorders());
        healthCard.setHerpes(newWorker.isHerpes());
        healthCard.setFever(newWorker.isFever());
        healthCard.setPregnancy(newWorker.isPregnancy());
        healthCard.setWeakness(newWorker.isWeakness());
        healthCard.setEditDate(today);
        healthCardRepository.save(healthCard);

        return ResponseEntity.ok(objectMapper.writeValueAsString(worker));
    }

    @DeleteMapping("api/admin//worker/fire-worker-out/{uuid}")
    public void setWorkerAsInactive(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Worker> worker = workerRepository.findById(uuid);
        if (worker.isPresent()) {
            Optional<Account> account = accountRepository.findById(worker.get().getAccountUuid().getUuid());
            if (account.isPresent()) {
                Worker workerToRemove = worker.get();
                Account accountToRemove = account.get();
                accountToRemove.setActive(false);
                workerToRemove.setActive(false);
                workerToRemove.setAccountUuid(accountToRemove);
                accountRepository.save(accountToRemove);
                workerRepository.save(workerToRemove);
            }
        }
    }

    @PutMapping("api/admin/send-messages-to-workers")
    public void sendMessagesToWorkers(@RequestBody() WorkersMessages workersMessagesList) throws JsonProcessingException {

        Optional<Account> accountFrom = accountRepository.findById(workersMessagesList.getUuidFrom());
        Date date = new Date();

        if (accountFrom.isPresent()) {
            if (accountFrom.get().isActive()) {
                Date dateTime = new Date();
                List <Account> accountList = new ArrayList<>();
                for (String uuid : workersMessagesList.getUuid()) {
                    Notification notification = new Notification();
                    notification.setFromAccountUuid(accountFrom.get());
                    notification.setDate(dateTime);
                    notification.setStatus(Notification.Status.NOT_CONFIRMED);
                    notification.setNotificationText(workersMessagesList.getMessageText());
                    notification.setType(Notification.Type.FROM_USER);
                    Optional<Account> accountTo = accountRepository.findById(uuid);
                    if (accountFrom.isPresent()) {
                        accountList.add(accountTo.get());
                        notification.setToAccountUuid(accountTo.get());
                    }
                    notificationRepository.save(notification);
                }

                for (Account accountToSend : accountList) {
                    mailClient.sendNotificationToWorkers(
                            accountFrom.get().getEmail(),
                            accountToSend.getEmail(),
                            workersMessagesList.getTopic(),
                            workersMessagesList.getMessageText()
                    );
                }
            }
        }
    }
}
