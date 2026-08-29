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
      { prefId: "ibaraki", name: "茨城県", count: 84_510 },
      { prefId: "tochigi", name: "栃木県", count: 64_397 },
      { prefId: "gumma", name: "群馬県", count: 66_155 },
      { prefId: "saitama", name: "埼玉県", count: 233_792 },
      { prefId: "chiba", name: "千葉県", count: 206_748 },
      { prefId: "tokyo", name: "東京都", count: 1_175_095 },
      { prefId: "kanagawa", name: "神奈川県", count: 326_238 },
    ],
  },
  {
    id: "chubu",
    name: "中部", //9
    prefectures: [
      { prefId: "niigata", name: "新潟県", count: 64_858 },
      { prefId: "toyama", name: "富山県", count: 31_848 },
      { prefId: "ishikawa", name: "石川県", count: 38_807 },
      { prefId: "fukui", name: "福井県", count: 26_900 },
      { prefId: "yamanashi", name: "山梨県", count: 31_553 },
      { prefId: "nagano", name: "長野県", count: 70_262 },
      { prefId: "gifu", name: "岐阜県", count: 63_286 },
      { prefId: "shizuoka", name: "静岡県", count: 108_941 },
      { prefId: "aichi", name: "愛知県", count: 244_223 },
    ],
  },
  {
    id: "kinki",
    name: "近畿", //7
    prefectures: [
      { prefId: "mie", name: "三重県", count: 48_960 },
      { prefId: "shiga", name: "滋賀県", count: 38_911 },
      { prefId: "kyoto", name: "京都府", count: 101_387 },
      { prefId: "osaka", name: "大阪府", count: 424_797 },
      { prefId: "hyogo", name: "兵庫県", count: 180_450 },
      { prefId: "nara", name: "奈良県", count: 36_812 },
      { prefId: "wakayama", name: "和歌山県", count: 27_333 },
    ],
  },
  {
    id: "chugoku",
    name: "中国", //5
    prefectures: [
      { prefId: "tottori", name: "鳥取県", count: 17_448 },
      { prefId: "shimane", name: "島根県", count: 19_901 },
      { prefId: "okayama", name: "岡山県", count: 64_947 },
      { prefId: "hiroshima", name: "広島県", count: 98_414 },
      { prefId: "yamaguchi", name: "山口県", count: 36_994 },
    ],
  },
  {
    id: "shikoku",
    name: "四国", //4
    prefectures: [
      { prefId: "tokushima", name: "徳島県", count: 27_059 },
      { prefId: "kagawa", name: "香川県", count: 34_199 },
      { prefId: "ehime", name: "愛媛県", count: 45_999 },
      { prefId: "kochi", name: "高知県", count: 22_711 },
    ],
  },
  {
    id: "kyushu",
    name: "九州", //7
    prefectures: [
      { prefId: "fukuoka", name: "福岡県", count: 193_871 },
      { prefId: "saga", name: "佐賀県", count: 22_167 },
      { prefId: "nagasaki", name: "長崎県", count: 36_951 },
      { prefId: "kumamoto", name: "熊本県", count: 63_899 },
      { prefId: "oita", name: "大分県", count: 42_893 },
      { prefId: "miyazaki", name: "宮崎県", count: 35_011 },
      { prefId: "kagoshima", name: "鹿児島県", count: 52_509 },
    ],
  },
  {
    id: "okinawa",
    name: "沖縄", //1
    prefectures: [{ prefId: "okinawa", name: "沖縄", count: 59_050 }],
  },
];
