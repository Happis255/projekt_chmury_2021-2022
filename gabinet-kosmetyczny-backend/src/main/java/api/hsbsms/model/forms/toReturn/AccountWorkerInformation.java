package api.hsbsms.model.forms.toReturn;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AccountWorkerInformation {

    @JsonProperty("uuid")
    String uuid;

    @JsonProperty("accountUuid")
    String accountUuid;

    @JsonProperty("name")
    String name;

    @JsonProperty("email")
    String email;

    @JsonProperty("surname")
    String surname;

    @JsonProperty("street")
    String street;

    @JsonProperty("code")
    String code;

    @JsonProperty("town")
    String town;

    @JsonProperty("birthday")
    Date birthday;

    @JsonProperty("phone")
    String phone;

    @JsonProperty("pesel")
    String pesel;

    @JsonProperty("accountType")
    String accountType;

    @JsonProperty("dateOfEmployment")
    Date dateOfEmployment;

    @JsonProperty("certificates")
    String certificates;
}
