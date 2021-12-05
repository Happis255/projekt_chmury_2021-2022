package api.hsbsms.model;

import org.joda.time.LocalTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class AppoitmentDay {

    private String workerUuid;
    private String workerName;
    private String workerSurname;
    private HourAvailability[] hourAvailabilityList = new HourAvailability[32];

    public AppoitmentDay(String workerUuid, String workerName, String workerSurname) {
        this.workerUuid = workerUuid;
        this.workerName = workerName;
        this.workerSurname = workerSurname;
        DateTimeFormatter simpleDateFormat = DateTimeFormat.forPattern("HH:mm");
        LocalTime time = simpleDateFormat.parseLocalTime("10:00");
        for (int i = 0; i < 32; i++) {
            this.hourAvailabilityList[i] = new HourAvailability(time.getHourOfDay() + ":" + time.getMinuteOfHour());
            time = time.plusMinutes(15);
        }
    }

    public String getWorkerUuid() {
        return workerUuid;
    }

    public void setWorkerUuid(String _worker_uuid) {
        this.workerUuid = _worker_uuid;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String _worker_name) {
        this.workerName = _worker_name;
    }

    public String getWorkerSurname() {
        return workerSurname;
    }

    public void setWorkerSurname(String _worker_surname) {
        this.workerSurname = _worker_surname;
    }

    public HourAvailability[] getHourAvailabilityList() {
        return hourAvailabilityList;
    }

    public void seHourAvailabilityList(HourAvailability[] _hourAvailabilityList) {
        this.hourAvailabilityList = _hourAvailabilityList;
    }
}
