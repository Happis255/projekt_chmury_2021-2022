package api.hsbsms.services;

import api.hsbsms.model.table.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
public class MailClient {

    private JavaMailSender mailSender;

    @Autowired
    public MailClient(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Autowired
    public MailContentBuilder mailContentBuilder;

    public void prepareAndSendPassword(String recipient, String message) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);

            messageHelper.setFrom("hsbsms2020@gmail.com");
            messageHelper.setTo(recipient);
            messageHelper.setSubject("[HSBSMS] - Przypomnienie hasła");
            String content = mailContentBuilder.build(message);
            messageHelper.setText(content, true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            System.out.println(e);
        }
    }

    public void sendNotificationAboutNewAccount(Client client) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);

            messageHelper.setFrom("hsbsms2020@gmail.com");
            messageHelper.setTo(client.getAccountUuid().getEmail());
            messageHelper.setSubject("[HSBSMS] - Utworzenie konta");
            String login =
                    "E-Mail: " + client.getAccountUuid().getEmail();
            String password =
                    "Hasło: " + client.getAccountUuid().getPassword();
            String content = mailContentBuilder.buildNewAccountNotification(login, password);
            messageHelper.setText(content, true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            System.out.println(e);
        }
    }

    public void sendNotificationToWorkers(String from, String to, String topic, String message) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("hsbsms2020@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(topic);
            String content = mailContentBuilder.buildMessage(message, from);
            messageHelper.setText(content, true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            System.out.println(e);
        }
    }

    public void sendNotificationAboutVisitStatusChange(String from, String to, String topic, String message) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("hsbsms2020@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(topic);
            String content = mailContentBuilder.buildMessage(message, from);
            messageHelper.setText(content, true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            System.out.println(e);
        }
    }

    public void sendNotificationToClients(String from, String to, String topic, String message) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("hsbsms2020@gmail.com");
            messageHelper.setTo(to);
            messageHelper.setSubject(topic);
            String content = mailContentBuilder.buildMessage(message, from);
            messageHelper.setText(content, true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            System.out.println(e);
        }
    }
}
