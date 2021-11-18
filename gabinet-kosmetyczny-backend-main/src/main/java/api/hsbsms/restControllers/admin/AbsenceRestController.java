package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.AbsenceChangeStatusForm;
import api.hsbsms.model.forms.fromBody.LoginForm;
import api.hsbsms.model.forms.toReturn.AbsenceDateControllerModel;
import api.hsbsms.model.forms.toReturn.AbsenceInformation;
import api.hsbsms.model.table.Absence;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.AbsenceRepository;
import api.hsbsms.repository.WorkerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
public class AbsenceRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    AbsenceRepository absenceRepository;

    @Autowired
    WorkerRepository workerRepository;

    @GetMapping("api/admin/absences/date-controller/{date}")
    public ResponseEntity<?> getDaysOfTheWeek(@PathVariable() String date) throws JsonProcessingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);

        if (localDate != null) {
            TemporalField fieldISO = WeekFields.of(Locale.FRANCE).dayOfWeek();
            AbsenceDateControllerModel dateToReturn = new AbsenceDateControllerModel();
            dateToReturn.setMondayDate(localDate.with(fieldISO, 1).toString());
            dateToReturn.setTuesdayDate(localDate.with(fieldISO, 2).toString());
            dateToReturn.setWednesdayDate(localDate.with(fieldISO, 3).toString());
            dateToReturn.setThursdayDate(localDate.with(fieldISO, 4).toString());
            dateToReturn.setFridayDate(localDate.with(fieldISO, 5).toString());
            dateToReturn.setMonthTitle(localDate.getMonth().toString());
            dateToReturn.setTodayDate(date);

            return ResponseEntity.ok(objectMapper.writeValueAsString(dateToReturn));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("api/admin/absences/{date}")
    public ResponseEntity<?> getAbsencesFromDate(@PathVariable() String date) throws JsonProcessingException {
        List<Absence> absenceList = absenceRepository.getAbsencesFromDate(date);
        if (absenceList != null) {
            List <AbsenceInformation> absenceInformationList = new ArrayList<>();
            for (Absence absence: absenceList) {
                AbsenceInformation absenceToAdd = new AbsenceInformation();
                absenceToAdd.setDateFrom(absence.getDateFrom());
                absenceToAdd.setDateTo(absence.getDateTo());
                absenceToAdd.setReason(absence.getReason());
                absenceToAdd.setStatus(absence.getStatus().toString());
                absenceToAdd.setTitle(absence.getTitle());
                absenceToAdd.setUuid(absence.getUuid());
                absenceToAdd.setWorkerName(absence.getWorkerUuid().getName());
                absenceToAdd.setWorkerSurname(absence.getWorkerUuid().getSurname());
                absenceToAdd.setWorkerUuid(absence.getWorkerUuid().getUuid());
                absenceInformationList.add(absenceToAdd);
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(absenceInformationList));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        }
    }

    @PutMapping("api/admin/absence")
    public ResponseEntity<?> createNewAbsence(@RequestBody AbsenceInformation newAbsence) throws JsonProcessingException {
        Absence absence = new Absence();
        Optional <Worker> workerDB = workerRepository.findById(newAbsence.getWorkerUuid());
        if (!workerDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            absence.setStatus(Absence.Status.NOT_CONFIRMED);
            absence.setDateFrom(newAbsence.getDateFrom());
            absence.setDateTo(newAbsence.getDateTo());
            absence.setReason(newAbsence.getReason());
            absence.setTitle(newAbsence.getTitle());
            absence.setWorkerUuid(workerDB.get());
            absenceRepository.save(absence);
            return ResponseEntity.ok(objectMapper.writeValueAsString(absence));
        }
    }

    @PatchMapping("api/admin/absence")
    public void changeAbsenceStatus(@RequestBody AbsenceChangeStatusForm absenceForm) {
        Optional<Absence> absenceToUpdate = absenceRepository.findById(absenceForm.getUuid());
        if (absenceToUpdate.isPresent()) {
            Absence absence = absenceToUpdate.get();
            absence.setStatus(absenceForm.getStatus());
            absenceRepository.save(absence);
        }
    }

    @DeleteMapping("api/admin/absence/{uuid}")
    public void removeAbsence(@PathVariable() String uuid) {
        Optional <Absence> absenceDB = absenceRepository.findById(uuid);
        absenceDB.ifPresent(absence -> absenceRepository.delete(absence));
    }
}
