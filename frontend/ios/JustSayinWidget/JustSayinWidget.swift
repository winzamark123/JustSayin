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
          .fill(Color(hex: "#262626"))
        VStack{
          Text(entry.data.quote).font(.custom("Poppins-Bold", size: 15)).padding().foregroundColor(Color(hex: "#FFFFFF")).lineLimit(5).minimumScaleFactor(0.5)
          HStack{
            Spacer()
            Text(entry.data.author).font(.custom("Poppins-SemiBold", size: 11)).padding().multilineTextAlignment(.trailing).foregroundColor(Color(hex: "#FFFFFF")).lineLimit(1).minimumScaleFactor(0.5)
          }
        }.padding(.top, 20)
      }
        
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
      let valuesData = ValuesData(quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco cillum dolore eu fugiat nulla pariatur", author:"Win Cheng")
      JustSayinWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int = UInt64()
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
