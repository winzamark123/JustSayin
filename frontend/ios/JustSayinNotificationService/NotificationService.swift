import WidgetKit
import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        // Log the receipt of the notification
        print("NotificationService: didReceive called")

        // Process the notification content and extract the data
        let userInfo = request.content.userInfo
        print("NotificationService: UserInfo received - \(userInfo)")

        if let dailySaying = userInfo["dailySaying"] as? String,
           let author = userInfo["author"] as? String {
            // Update the shared user defaults (used by the widget)
            if let sharedDefaults = UserDefaults(suiteName: "group.frontend") {
                print("NotificationService: Updating shared user defaults")
                sharedDefaults.setValue(dailySaying, forKey: "quote")
                sharedDefaults.setValue(author, forKey: "author")
                let didSynchronize = sharedDefaults.synchronize()

                if didSynchronize {
                    print("NotificationService: Successfully updated user defaults")
                } else {
                    print("NotificationService: Failed to synchronize user defaults")
                }

                // Tell the system to update the widget
                print("NotificationService: Requesting widget timeline reload")
                WidgetCenter.shared.reloadAllTimelines()
            } else {
                print("NotificationService: Unable to access shared user defaults")
            }
        } else {
            print("NotificationService: Failed to extract dailySaying or author from userInfo")
        }
        print("Notification Success")
        // Call the content handler
        contentHandler(request.content)
    }
}
