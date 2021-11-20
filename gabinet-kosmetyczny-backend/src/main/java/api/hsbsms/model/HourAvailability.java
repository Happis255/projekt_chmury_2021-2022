package api.hsbsms.model;

public class HourAvailability {

    private boolean booked = false;
    private boolean canfit = true;
    private String  hours = "";

    public HourAvailability(String hours) {
        this.hours = hours;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean _booked) {
        this.booked = _booked;
    }

    public boolean isCanfit() {
        return canfit;
    }

    public void setCanfit(boolean _canfit) {
        this.canfit = _canfit;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String _hours) {
        this.hours = _hours;
    }
}
