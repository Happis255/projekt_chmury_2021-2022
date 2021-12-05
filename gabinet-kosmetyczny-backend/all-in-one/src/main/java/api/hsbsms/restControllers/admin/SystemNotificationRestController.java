package api.hsbsms.restControllers.admin;

import api.hsbsms.model.forms.fromBody.Uuid;
import api.hsbsms.model.forms.toReturn.NotificationSystem;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Notification;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.NotificationRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SystemNotificationRestController {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    ObjectMapper objectMapper;

    @GetMapping("api/admin/notification/system-notifications")
    public ResponseEntity<?> getAdminSystemNotifications() throws JsonProcessingException {

        List <Notification> notifications = new ArrayList <>();
        notifications = notificationRepository.getAllNotificationsFromSystem();
        if (notifications != null | notifications.isEmpty()) {

            List <NotificationSystem> notificationSystems = new ArrayList<>();
            for (Notification notification : notifications) {
                notificationSystems.add(new NotificationSystem(
                        notification.getUuid(),
                        notification.getNotificationText(),
                        notification.getStatus().toString(),
                        notification.getDate()
                ));
            }

            return ResponseEntity.ok(objectMapper.writeValueAsString(notificationSystems));
        } else {
            return ResponseEntity.ok(objectMapper.writeValueAsString(null));
        }
    }
}
