//
//  NotificationService.swift
//  JustSayinNotificationService
//
//  Created by Win Cheng on 19/2/2567 BE.
//

import WidgetKit
import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        // Process the notification content and extract the data
        let userInfo = request.content.userInfo
        if let dailySaying = userInfo["dailySaying"] as? String,
           let author = userInfo["author"] as? String {
            // Update the shared user defaults (used by the widget)
            let sharedDefaults = UserDefaults(suiteName: "group.frontend")
            sharedDefaults?.setValue(dailySaying, forKey: "quote")
            sharedDefaults?.setValue(author, forKey: "author")
            sharedDefaults?.synchronize()

            // Tell the system to update the widget
            WidgetCenter.shared.reloadAllTimelines()
        }

        // Call the content handler
        contentHandler(request.content)
    }
}
