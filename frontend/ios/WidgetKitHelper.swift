//
//  WidgetKitHelper.swift
//  frontend
//
//  Created by Win Cheng on 2/1/2567 BE.
//

import WidgetKit
@available(iOS 14, *)

@objcMembers final class WidgetKitHelper: NSObject{
  class func reloadAllTimelines(){
    print("WidgetKitHelper")
    WidgetCenter.shared.reloadAllTimelines()
  }
}
