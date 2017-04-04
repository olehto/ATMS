package com.atms.notify;

import com.atms.model.Task;

/**
 * @author Alex Kazanovskiy.
 */

public interface Notifier {

    void notifyDeveloper(Task task);

    void notifyCustomer(Task task);
}
