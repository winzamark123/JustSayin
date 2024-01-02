//
//  RNSharedWidget.m
//  frontend
//
//  Created by Win Cheng on 2/1/2567 BE.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#

@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString *appGroup = @"group.frontend";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(RNSharedWidget)

RCT_EXPORT_METHOD(setData: (NSString *)key: (NSString * )data: (RCTResponseSenderBlock)callback) {
  sharedDefaults = [[NSUserDefaults alloc]initWithSuiteName:appGroup];
  
  if(sharedDefaults == nil){
    callback(@[@0]);
    return;
  }
  
  [sharedDefaults setValue:data forKey:key];
  callback(@[[NSNull null]]);
}
@end
