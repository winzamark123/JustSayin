//
//  RNSharedWidget.m
//  frontend
//
//  Created by Win Cheng on 2/1/2567 BE.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#import "frontend-Bridging-Header.h"
#import "frontend-Swift.h"


@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString *const appGroup = @"group.frontend";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedWidget)

// Export the `setData` method
RCT_EXPORT_METHOD(setData:(NSString *)key data:(NSString *)data callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"[RNSharedWidget] setData called with key: %@ and data: %@", key, data);
  NSUserDefaults *sharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
  
  if (!sharedDefaults) {
     NSLog(@"[RNSharedWidget] Could not create UserDefaults with app group: %@", appGroup);
     callback(@[@"Could not create UserDefaults with app group."]);
     return;
   }

  
  [sharedDefaults setValue:data forKey:key];
  // Attempt to read it back immediately for testing
  NSString *savedData = [sharedDefaults stringForKey:key];
  NSLog(@"[RNSharedWidget] Saved Data: %@", savedData);
//  BOOL success = [sharedDefaults synchronize]; // This will save the changes immediately.
//
//   if (!success) {
//     NSLog(@"[RNSharedWidget] UserDefaults synchronize failed.");
//     callback(@[@"UserDefaults synchronize failed."]);
//     return;
//   }

  

  if (@available(iOS 14, *)) {
    NSLog(@"[RNSharedWidget] iOS 14 or later, attempting to reload widget timelines.");
    [WidgetKitHelper reloadAllTimelines];
  } else {
    NSLog(@"[RNSharedWidget] iOS version is below 14, no need to reload widget timelines.");
  }

  NSLog(@"[RNSharedWidget] setData method completed successfully.");
  callback(@[[NSNull null]]); // Indicate success with null error
}

@end
