package api.hsbsms.model.forms.toReturn;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WorkerPermissionData {
   WorkerRef workerRef;
   List<ServiceRef> serviceRef = new ArrayList<>();
}
