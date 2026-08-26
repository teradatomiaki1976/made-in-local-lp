// src/lib/regions.ts
export const REGIONS = [
  {
    id: "hokkaido",
    name: "北海道", //1
    prefectures: [{ prefId: "hokkaido", name: "北海道", count: 206_349 }],
  },
  {
    id: "tohoku",
    name: "東北", //6
    prefectures: [
      { prefId: "aomori", name: "青森県", count: 33_459 },
      { prefId: "iwate", name: "岩手県", count: 29_570 },
      { prefId: "miyagi", name: "宮城県", count: 71_674 },
      { prefId: "akita", name: "秋田県", count: 26_777 },
      { prefId: "yamagata", name: "山形県", count: 29_593 },
      { prefId: "fukushima", name: "福島県", count: 63_789 },
    ],
  },
  {
    id: "kanto",
    name: "関東", //7
    prefectures: [
      { prefId: "ibaraki", name: "茨城県", count: 12 },
      { prefId: "tochigi", name: "栃木県", count: 55 },
      { prefId: "gumma", name: "群馬県", count: 45 },
      { prefId: "saitama", name: "埼玉県", count: 23 },
      { prefId: "chiba", name: "千葉県", count: 44 },
      { prefId: "tokyo", name: "東京都", count: 1_175_095 },
      { prefId: "kanagawa", name: "神奈川県", count: 76 },
    ],
  },
  {
    id: "chubu",
    name: "中部", //9
    prefectures: [
      { prefId: "niigata", name: "新潟県", count: 34 },
      { prefId: "toyama", name: "富山県", count: 32 },
      { prefId: "ishikawa", name: "石川県", count: 47 },
      { prefId: "fukui", name: "福井県", count: 58 },
      { prefId: "yamanashi", name: "山梨県", count: 15 },
      { prefId: "nagano", name: "長野県", count: 26 },
      { prefId: "gifu", name: "岐阜県", count: 78 },
      { prefId: "shizuoka", name: "静岡県", count: 51 },
      { prefId: "aichi", name: "愛知県", count: 34 },
    ],
  },
  {
    id: "kinki",
    name: "近畿", //7
    prefectures: [
      { prefId: "mie", name: "三重県", count: 32 },
      { prefId: "shiga", name: "滋賀県", count: 43 },
      { prefId: "kyoto", name: "京都府", count: 56 },
      { prefId: "osaka", name: "大阪府", count: 99 },
      { prefId: "hyogo", name: "兵庫県", count: 67 },
      { prefId: "nara", name: "奈良県", count: 34 },
      { prefId: "wakayama", name: "和歌山県", count: 41 },
    ],
  },
  {
    id: "chugoku",
    name: "中国", //5
    prefectures: [
      { prefId: "tottori", name: "鳥取県", count: 34 },
      { prefId: "shimane", name: "島根県", count: 82 },
      { prefId: "okayama", name: "岡山県", count: 53 },
      { prefId: "hiroshima", name: "広島県", count: 45 },
      { prefId: "yamaguchi", name: "山口県", count: 62 },
    ],
  },
  {
    id: "shikoku",
    name: "四国", //4
    prefectures: [
      { prefId: "tokushima", name: "徳島県", count: 27 },
      { prefId: "kagawa", name: "香川県", count: 49 },
      { prefId: "ehime", name: "愛媛県", count: 72 },
      { prefId: "kochi", name: "高知県", count: 33 },
    ],
  },
  {
    id: "kyushu",
    name: "九州", //7
    prefectures: [
      { prefId: "fukuoka", name: "福岡県", count: 50 },
      { prefId: "saga", name: "佐賀県", count: 62 },
      { prefId: "nagasaki", name: "長崎県", count: 83 },
      { prefId: "kumamoto", name: "熊本県", count: 46 },
      { prefId: "oita", name: "大分県", count: 22 },
      { prefId: "miyazaki", name: "宮崎県", count: 18 },
      { prefId: "kagoshima", name: "鹿児島県", count: 42 },
    ],
  },
  {
    id: "okinawa",
    name: "沖縄", //1
    prefectures: [{ prefId: "okinawa", name: "沖縄", count: 89 }],
  },
];
