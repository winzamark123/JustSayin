//
//  RNSharedWidget.m
//  frontend
//
//  Created by Win Cheng on 2/1/2567 BE.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
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
  RCTLogInfo(@"This is working?");
  NSUserDefaults *sharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
  
  if (sharedDefaults == nil) {
    callback(@[@"Could not create UserDefaults with app group."]);
    return;
  }
  
  [sharedDefaults setValue:data forKey:key];
  if (@available(iOS 14, *)) {
    [WidgetKitHelper reloadAllTimelines];
  } else {
    // Fallback on earlier versions
  }
  callback(@[[NSNull null]]); // Indicate success with null error
}

@end
