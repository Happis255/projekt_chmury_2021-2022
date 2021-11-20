package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.AddMachineRaportForm;
import api.hsbsms.model.forms.fromBody.AddRaportForm;
import api.hsbsms.model.forms.fromBody.AddTrashesRaportForm;
import api.hsbsms.model.forms.toReturn.MachineReportForm;
import api.hsbsms.model.forms.toReturn.ReportForm;
import api.hsbsms.model.forms.toReturn.TrashesReportForm;
import api.hsbsms.model.table.MachineReport;
import api.hsbsms.model.table.Report;
import api.hsbsms.model.table.TrashesReport;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.MachineReportRepository;
import api.hsbsms.repository.ReportRepository;
import api.hsbsms.repository.TrashesReportRepository;
import api.hsbsms.repository.WorkerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ReportsRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MachineReportRepository machineReportRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    TrashesReportRepository trashesReportRepository;

    @GetMapping("api/admin/reports/trashes-reports")
    public ResponseEntity<?> getAllTrashesReportsWithUsersName() throws JsonProcessingException {
        List<TrashesReport> trashesReportsList = new ArrayList<>();
        List<TrashesReportForm> reportsList = new ArrayList<>();
        trashesReportsList = trashesReportRepository.findAllByOrderByDateAsc();
        for (TrashesReport reportElement: trashesReportsList) {
            TrashesReportForm newReport = new TrashesReportForm();
            newReport.setUuid(reportElement.getUuid());
            newReport.setTitle(reportElement.getTitle());
            newReport.setType(reportElement.getType());
            newReport.setDate(reportElement.getDate());
            newReport.setAmount(reportElement.getAmount());
            newReport.setCost(reportElement.getCost());
            newReport.setWorkerUuid(reportElement.getWorkerUuid().getUuid());
            newReport.setName(reportElement.getWorkerUuid().getName());
            newReport.setSurname(reportElement.getWorkerUuid().getSurname());
            reportsList.add(newReport);
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(reportsList));
    }

    @GetMapping("api/admin/reports")
    public ResponseEntity<?> getAllReportsWithUserName() throws JsonProcessingException {
        List<Report> reportsListDB = new ArrayList<>();
        List<ReportForm> reportsList = new ArrayList<>();
        reportsListDB = reportRepository.findAllByOrderByDateAsc();
        for (Report reportElement: reportsListDB) {
            ReportForm newReport = new ReportForm();
            newReport.setUuid(reportElement.getUuid());
            newReport.setTitle(reportElement.getTitle());
            newReport.setType(reportElement.getType().toString());
            newReport.setDescription(reportElement.getDescription());
            newReport.setDate(reportElement.getDate());
            newReport.setWorkerUuid(reportElement.getWorkerUuid().getUuid());
            newReport.setName(reportElement.getWorkerUuid().getName());
            newReport.setSurname(reportElement.getWorkerUuid().getSurname());
            reportsList.add(newReport);
        }
        return ResponseEntity.ok(objectMapper.writeValueAsString(reportsList));
    }

    @GetMapping("api/admin/reports/machine-reports")
    public ResponseEntity<?> getAllMachineReportsWithUserName() throws JsonProcessingException {
        List<MachineReport> machineReportList = new ArrayList<>();
        List<MachineReportForm> reportsList = new ArrayList<>();

        machineReportList = machineReportRepository.findAllByOrderByDateAsc();
        for (MachineReport reportElement: machineReportList) {
            MachineReportForm newReport = new MachineReportForm();
            newReport.setUuid(reportElement.getUuid());
            newReport.setTitle(reportElement.getTitle());
            newReport.setDescription(reportElement.getDescription());
            newReport.setDate(reportElement.getDate());
            newReport.setWorkerUuid(reportElement.getWorkerUuid().getUuid());
            newReport.setName(reportElement.getWorkerUuid().getName());
            newReport.setSurname(reportElement.getWorkerUuid().getSurname());
            reportsList.add(newReport);
        }

        return ResponseEntity.ok(objectMapper.writeValueAsString(reportsList));
    }

    @DeleteMapping("api/admin/reports/machine-reports/{uuid}")
    public void deleteMachineReport(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<MachineReport> machineReportDB = machineReportRepository.findById(uuid);
        if (machineReportDB.isPresent()) {
            machineReportRepository.delete(machineReportDB.get());
        }
    }

    @DeleteMapping("api/admin/reports/{uuid}")
    public void deleteReport(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<Report> reportDB = reportRepository.findById(uuid);
        if (reportDB.isPresent()) {
            reportRepository.delete(reportDB.get());
        }
    }

    @DeleteMapping("api/admin/reports/trashes-reports/{uuid}")
    public void deleteTrashesReport(@PathVariable() String uuid) throws JsonProcessingException {
        Optional<TrashesReport> trashesReport = trashesReportRepository.findById(uuid);
        if (trashesReport.isPresent()) {
            trashesReportRepository.delete(trashesReport.get());
        }
    }

    @PutMapping("api/admin/reports/machine-reports")
    public ResponseEntity<?> addMachineReport(@RequestBody() AddMachineRaportForm newMachineRaportForm) throws JsonProcessingException {
        Optional <Worker> workerDB = workerRepository.findById(newMachineRaportForm.getWorkerUuid());
        if (workerDB.isPresent()) {
            Worker worker = workerDB.get();
            MachineReport machineReport = new MachineReport();
            machineReport.setDate(newMachineRaportForm.getDate());
            machineReport.setTitle(newMachineRaportForm.getTitle());
            machineReport.setDescription(newMachineRaportForm.getDescription());
            machineReport.setWorkerUuid(worker);
            machineReportRepository.save(machineReport);
            return ResponseEntity.ok(objectMapper.writeValueAsString(machineReport));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("api/admin/reports")
    public ResponseEntity<?> addReport(@RequestBody() AddRaportForm addRaportForm) throws JsonProcessingException {
        Optional <Worker> workerDB = workerRepository.findById(addRaportForm.getWorkerUuid());
        if (workerDB.isPresent()) {
            Worker worker = workerDB.get();
            Report report = new Report();
            report.setDate(addRaportForm.getDate());
            report.setTitle(addRaportForm.getTitle());
            report.setDescription(addRaportForm.getDescription());
            report.setWorkerUuid(worker);
            report.setType(addRaportForm.getType());
            reportRepository.save(report);
            return ResponseEntity.ok(objectMapper.writeValueAsString(report));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("api/admin/reports/trashes-reports")
    public ResponseEntity<?> addTrashesReport(@RequestBody() AddTrashesRaportForm addTrashesRaportForm) throws JsonProcessingException {
        Optional <Worker> workerDB = workerRepository.findById(addTrashesRaportForm.getWorkerUuid());
        if (workerDB.isPresent()) {
            Worker worker = workerDB.get();
            TrashesReport trashesReport = new TrashesReport();
            trashesReport.setDate(addTrashesRaportForm.getDate());
            trashesReport.setTitle(addTrashesRaportForm.getTitle());
            trashesReport.setAmount(addTrashesRaportForm.getAmount());
            trashesReport.setCost(addTrashesRaportForm.getCost());
            trashesReport.setType(addTrashesRaportForm.getType());
            trashesReport.setWorkerUuid(worker);
            trashesReportRepository.save(trashesReport);
            return ResponseEntity.ok(objectMapper.writeValueAsString(trashesReport));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
