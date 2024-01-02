//
//  JustSayinWidget.swift
//  JustSayinWidget
//
//  Created by Win Cheng on 2/1/2567 BE.
//

import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      let valuesData = ValuesData(quote: "This is a mock quote!", author: "Win Cheng")
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let valuesData = ValuesData(quote: "This is a mock quote!", author: "Win Cheng")
      let entry = SimpleEntry(date: Date(), configuration: configuration, data: valuesData)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
      let userDfaults = UserDefaults.init(suiteName: "group.frontend")
      let jsonText = userDfaults!.value(forKey: "justSayinWidgetKey") as? String
      let jsonData = Data(jsonText?.utf8 ?? "".utf8)
      let valuesData = try! JSONDecoder().decode(ValuesData.self, from: jsonData)

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
          let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct ValuesData: Codable{
  let quote: String
  let author: String
}
struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
  let data: ValuesData
}

struct JustSayinWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      ZStack{
        ContainerRelativeShape()
          .fill(.white.gradient)
      }
        Text(entry.date, style: .time)
    }
}

struct JustSayinWidget: Widget {
    let kind: String = "JustSayinWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            JustSayinWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("JustSayin Widget")
        .description("Always see your daily sayings!")
    }
}

struct JustSayinWidget_Previews: PreviewProvider {
    static var previews: some View {
      let valuesData = ValuesData(quote: "This is a mock quote!", author:"Win Cheng")
      JustSayinWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
