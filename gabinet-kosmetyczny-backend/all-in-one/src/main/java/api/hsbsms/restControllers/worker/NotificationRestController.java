package api.hsbsms.restControllers.worker;

import api.hsbsms.model.forms.fromBody.NotificationsFor;
import api.hsbsms.model.forms.fromBody.Uuid;
import api.hsbsms.model.forms.toReturn.NotificationFromUser;
import api.hsbsms.model.forms.toReturn.NotificationSystem;
import api.hsbsms.model.table.Account;
import api.hsbsms.model.table.Client;
import api.hsbsms.model.table.Notification;
import api.hsbsms.model.table.Worker;
import api.hsbsms.repository.AccountRepository;
import api.hsbsms.repository.ClientRepository;
import api.hsbsms.repository.NotificationRepository;
import api.hsbsms.repository.WorkerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class NotificationRestController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    WorkerRepository workerRepository;

    @Autowired
    ClientRepository clientRepository;

    @PostMapping("api/wroker/notifications")
    public ResponseEntity<?> getAllNotificationsForWorker(@RequestBody NotificationsFor notificationsFor) throws JsonProcessingException {
        List<Notification> notifications = notificationRepository.getAllNotificationsForWorker(notificationsFor.getAccountUuid(), notificationsFor.getType());
        if (notifications != null | notifications.isEmpty()) {
            List<NotificationFromUser> notificationFromUser = new ArrayList<>();
            for (Notification notification : notifications) {
                if ("CLIENT".equals(notification.getFromAccountUuid().getRole().toString())) {
                    Optional<Client> client = clientRepository.findByAccountUuid(notification.getFromAccountUuid());
                    if (!client.isPresent()) {
                         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    } else {
                        notificationFromUser.add(new NotificationFromUser(
                                notification.getUuid(),
                                notification.getNotificationText(),
                                notification.getStatus().toString(),
                                notification.getDate(),
                                client.get().getName(),
                                client.get().getSurname()
                        ));
                    }
                } else {
                    Optional<Worker> worker = workerRepository.findByAccountUuid(notification.getFromAccountUuid());
                    if (!worker.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    } else {
                        if (worker.get().isActive()) {
                            notificationFromUser.add(new NotificationFromUser(
                                    notification.getUuid(),
                                    notification.getNotificationText(),
                                    notification.getStatus().toString(),
                                    notification.getDate(),
                                    worker.get().getName(),
                                    worker.get().getSurname()
                            ));
                        }
                    }
                }
            }
            return ResponseEntity.ok(objectMapper.writeValueAsString(notificationFromUser));
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @PatchMapping("api/wroker/notifications/remove")
    public void deleteNotification(@RequestBody Uuid uuid) {
        notificationRepository.deleteNotificationByUuid(uuid.getUuid());
    }

    @PatchMapping("api/wroker/notifications/readed")
    public void markAsSeenNotification(@RequestBody Uuid uuid) {
        notificationRepository.markAsSeen(uuid.getUuid());
    }
}
