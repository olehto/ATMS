package com.atms.notify.impl;

import com.atms.model.Task;
import com.atms.notify.Notifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

/**
 * @author Alex Kazanovskiy.
 */
@Service
public class NotifierImpl implements Notifier {
    private final MailSender mailSender;

    @Autowired
    public NotifierImpl(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void notifyDeveloper(Task task) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ATMS");
        message.setTo(task.getDeveloper().getEmail());
        message.setSubject("New task: " + task.getTitle());
        StringBuilder sb = new StringBuilder();
        sb.append("\nProject: ").append(task.getSprint().getProject().getTitle());
        sb.append("Description: ").append(task.getDescription());
        sb.append("\nDeadline: ").append(task.getDeadline());
        message.setText(sb.toString());
        mailSender.send(message);
    }

    @Override
    public void notifyCustomer(Task task) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ATMS");
        message.setTo(task.getReporter().getEmail());
        message.setSubject("Update task: " + task.getTitle());
        StringBuilder sb = new StringBuilder();
        sb.append("Status was changed to ").append(task.getStatus().toString()).append(" in task: ").append(task.getTitle());
        message.setText(sb.toString());
        mailSender.send(message);
    }
}
