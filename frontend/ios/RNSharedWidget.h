//
//  RNSharedWidget.h
//  frontend
//
//  Created by Win Cheng on 2/1/2567 BE.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNSharedWidget : NSObject<RCTBridgeModule>

@end
