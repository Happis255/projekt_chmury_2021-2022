package api.hsbsms.model.forms.fromBody;

import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Worker;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewWorker {

    String email;
    String password;
    Account.Role role;
    String name;
    String surname;
    String street;
    String code;
    String town;
    Date birthday;
    String phone;
    String pesel;
    Date dateOfEmployment;
    String certificates;
    private boolean pacemaker;
    private boolean hermophilia;
    private boolean psoriasis;
    private String allergies;
    private boolean infectiousDiseases;
    private boolean discoloration;
    private boolean bloodCirculationDisorders;
    private boolean herpes;
    private boolean fever;
    private boolean pregnancy;
    private boolean weakness;
}
