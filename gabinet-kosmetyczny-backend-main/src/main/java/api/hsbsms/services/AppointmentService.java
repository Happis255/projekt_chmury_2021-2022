package api.hsbsms.services;

import api.hsbsms.model.HourAvailability;
import api.hsbsms.repository.AppoitmentRepository;
import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class AppointmentService {

    @Autowired
    AppoitmentRepository appoitmentRepository;

    public void checkIfCanFit(HourAvailability[] hourAvailabilityList, int howMany) {
        for (int i = 0; i < 32; i++) {
            if (!hourAvailabilityList[i].isBooked()) {
                if (howMany > 1 && howMany+i >= 32) {
                    hourAvailabilityList[i].setCanfit(false);
                } else {
                    boolean canFit = true;
                    for (int j = i; j < howMany+i && j < 32; j++) {
                        if (hourAvailabilityList[j].isBooked()) {
                            canFit = false;
                            break;
                        }
                    }
                    hourAvailabilityList[i].setCanfit(canFit);
                }
            } else {
                hourAvailabilityList[i].setCanfit(false);
            }
        }
    }

    public void setAsBooked(HourAvailability hourAvailability) {
        hourAvailability.setBooked(true);
        hourAvailability.setCanfit(false);
    }

    public void checkIfBooked(HourAvailability[] hourAvailabilityTab, int index, LocalTime time, Date date, String workerUuid) {

        /* Warunek zakończenia sprawdzania */
        if (time.getHourOfDay() == 18 && time.getMinuteOfHour() == 00 || index > hourAvailabilityTab.length) {
            return;
        }

        Integer reservedTime = appoitmentRepository.checkServiceDuration(time.toString(), date, workerUuid);
        if (reservedTime != null) {
            int howMuch = reservedTime / 15;
            for (int i = 0; i < howMuch; i++) {
                if (index+i < 32) {
                    setAsBooked(hourAvailabilityTab[index+i]);
                }
            }
            // System.out.println("Pracownik ma zarezrwowane: " + howMuch + " minut");
            time = time.plusMinutes(reservedTime);
            checkIfBooked(hourAvailabilityTab, index+howMuch, time, date, workerUuid);
        } else {
            time = time.plusMinutes(15);
            checkIfBooked(hourAvailabilityTab, index+1, time, date, workerUuid);
        }
    }

    public void setHourAvailability(HourAvailability[] hourAvailabilityList, Date date, String workerUuid) {
        DateTimeFormatter simpleDateFormat = DateTimeFormat.forPattern("HH:mm");
        LocalTime time = simpleDateFormat.parseLocalTime("10:00");
        checkIfBooked(hourAvailabilityList, 0, time, date, workerUuid);
    }
}
