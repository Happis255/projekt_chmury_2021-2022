package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.AccountType;
import api.hsbsms.model.forms.toReturn.AccountTypeAmount;
import api.hsbsms.model.forms.toReturn.IncomeServicePerMonth;
import api.hsbsms.model.forms.toReturn.IncomeServicePerWorker;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import api.hsbsms.model.table.Account;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RestController
public class DatabaseInformationRestController {

    @Autowired
    AppoitmentRepository appoitmentRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    UnregisteredClientRepository unregisteredClientRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/admin/database/information/accounts-amount/workers")
    public ResponseEntity<?> retrieveWorkersAmount() throws JsonProcessingException {
        long amount = workerRepository.countActiveWorkers();
        return ResponseEntity.ok(objectMapper.writeValueAsString(new AccountTypeAmount(amount)));
    }

    @GetMapping("api/admin/database/information/accounts-amount/clients")
    public ResponseEntity<?> retrieveClientsAmount() throws JsonProcessingException {
        List <Client> clientList = clientRepository.findAll();
        clientList.removeIf(client -> !client.getAccountUuid().isActive());
        long amount2 = unregisteredClientRepository.count();
        return ResponseEntity.ok(objectMapper.writeValueAsString(new AccountTypeAmount(clientList.size() + amount2)));
    }

    @GetMapping("api/admin/database/information/visits-amount")
    public ResponseEntity<?> retrieveVisitsAmount() throws JsonProcessingException {
        long amount = appoitmentRepository.countAllValidAppoitment();
        return ResponseEntity.ok(objectMapper.writeValueAsString(new AccountTypeAmount(amount)));
    }

    @GetMapping("api/admin/database/information/visits-amount/current-month")
    public ResponseEntity<?> retrieveVisitsInThisMonthAmount() throws JsonProcessingException {
        DateTime dateTime = DateTime.now();
        DateTime lastDate = dateTime.dayOfMonth().withMaximumValue();
        DateTime firstDate = dateTime.dayOfMonth().withMinimumValue();
        java.sql.Date sqlLastDate = new java.sql.Date( lastDate.getMillis() );
        java.sql.Date sqlFirstDate = new java.sql.Date( firstDate.getMillis() );
        long amount = appoitmentRepository.countAppoitmentFromDateToDate(sqlFirstDate, sqlLastDate);
        return ResponseEntity.ok(objectMapper.writeValueAsString(new AccountTypeAmount(amount)));
    }

    @GetMapping("api/admin/database/information/income-amount/visits")
    public ResponseEntity<?> countIncomeFromVisitsThisMonth() throws JsonProcessingException {
        Optional<Long> amount;
        DateTime dateTime = DateTime.now();
        DateTime lastDate = dateTime.dayOfMonth().withMaximumValue();
        DateTime firstDate = dateTime.dayOfMonth().withMinimumValue();
        IncomeServicePerMonth[] incomeServicePerMonth = new IncomeServicePerMonth[12];

        for (int i = 0; i < 12; i++) {
            amount = appoitmentRepository.countAppoitmentIncomeFromDateToDate(
                    new java.sql.Date(firstDate.minusMonths(i).getMillis()),
                    new java.sql.Date(lastDate.minusMonths(i).getMillis()));
            if (amount.isPresent()) {
                incomeServicePerMonth[i] = new IncomeServicePerMonth(amount.get(), monthNames[lastDate.minusMonths(i).getMonthOfYear()-1], lastDate.minusMonths(i).getYear());
            } else {
                incomeServicePerMonth[i] = new IncomeServicePerMonth(0, monthNames[lastDate.minusMonths(i).getMonthOfYear()-1], lastDate.minusMonths(i).getYear());
            }
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(incomeServicePerMonth));
    }

    @GetMapping("api/admin/database/information/income-amount/workers")
    public ResponseEntity<?> countIncomePerWorker() throws JsonProcessingException {
        List<Worker> workerList = workerRepository.findAll();
        Optional<Long> amount;
        DateTime dateTime = DateTime.now();
        DateTime lastDate = dateTime.dayOfMonth().withMaximumValue();
        DateTime firstDate = dateTime.dayOfMonth().withMinimumValue();
        java.sql.Date sqlLastDate = new java.sql.Date( lastDate.getMillis() );
        java.sql.Date sqlFirstDate = new java.sql.Date( firstDate.getMillis() );
        List<IncomeServicePerWorker> incomeServicePerMonth = new ArrayList<IncomeServicePerWorker>();
        for (Worker worker: workerList) {
            if (worker.isActive()) {
                amount = appoitmentRepository.countWorkersIncomeFromDateToDate(
                        sqlFirstDate,
                        sqlLastDate,
                        worker.getUuid()
                );
                if (amount.isPresent()) {
                    incomeServicePerMonth.add(new IncomeServicePerWorker(amount.get(), worker.getName(), worker.getSurname()));
                } else {
                    incomeServicePerMonth.add(new IncomeServicePerWorker(0, worker.getName(), worker.getSurname()));
                }
            }
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(incomeServicePerMonth));
    }

    String monthNames [] = {"january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"};
}
