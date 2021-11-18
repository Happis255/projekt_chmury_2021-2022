package api.hsbsms.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {

    private TemplateEngine templateEngine;

    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String build(String message) {
        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("remindPasswordTemplate", context);
    }

    public String buildMessage(String message, String from) {
        Context context = new Context();
        context.setVariable("message", message);
        context.setVariable("from", from);
        return templateEngine.process("messageTemplate", context);
    }

    public String buildNewAccountNotification(String login, String password) {
        Context context = new Context();
        context.setVariable("login", login);
        context.setVariable("password", password);
        return templateEngine.process("newAccountNotificationTemplate", context);
    }
}
