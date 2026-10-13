// src/lib/regions.ts
export const REGIONS = [
  {
    id: "hokkaido",
    name: "北海道", //1
    prefectures: [{ prefId: "hokkaido", name: "北海道", count: 139_966 }],
  },
  {
    id: "tohoku",
    name: "東北", //6
    prefectures: [
      { prefId: "aomori", name: "青森県", count: 36_880 },
      { prefId: "iwate", name: "岩手県", count: 34_939 },
      { prefId: "miyagi", name: "宮城県", count: 57_627 },
      { prefId: "akita", name: "秋田県", count: 30_003 },
      { prefId: "yamagata", name: "山形県", count: 36_114 },
      { prefId: "fukushima", name: "福島県", count: 54_509 },
    ],
  },
  {
    id: "kanto",
    name: "関東", //7
    prefectures: [
      { prefId: "ibaraki", name: "茨城県", count: 73_413 },
      { prefId: "tochigi", name: "栃木県", count: 54_205 },
      { prefId: "gumma", name: "群馬県", count: 59_737 },
      { prefId: "saitama", name: "埼玉県", count: 152_142 },
      { prefId: "chiba", name: "千葉県", count: 118_471 },
      { prefId: "tokyo", name: "東京都", count: 445_315 },
      { prefId: "kanagawa", name: "神奈川県", count: 186_284 },
    ],
  },
  {
    id: "chubu",
    name: "中部", //9
    prefectures: [
      { prefId: "niigata", name: "新潟県", count: 70_069 },
      { prefId: "toyama", name: "富山県", count: 32_986 },
      { prefId: "ishikawa", name: "石川県", count: 36_845 },
      { prefId: "fukui", name: "福井県", count: 28_252 },
      { prefId: "yamanashi", name: "山梨県", count: 29_317 },
      { prefId: "nagano", name: "長野県", count: 68_644 },
      { prefId: "gifu", name: "岐阜県", count: 65_357 },
      { prefId: "shizuoka", name: "静岡県", count: 110_164 },
      { prefId: "aichi", name: "愛知県", count: 196_751 },
    ],
  },
  {
    id: "kinki",
    name: "近畿", //7
    prefectures: [
      { prefId: "mie", name: "三重県", count: 48_335 },
      { prefId: "shiga", name: "滋賀県", count: 35_737 },
      { prefId: "kyoto", name: "京都府", count: 77_465 },
      { prefId: "osaka", name: "大阪府", count: 264_544 },
      { prefId: "hyogo", name: "兵庫県", count: 135_885 },
      { prefId: "nara", name: "奈良県", count: 31_890 },
      { prefId: "wakayama", name: "和歌山県", count: 32_564 },
    ],
  },
  {
    id: "chugoku",
    name: "中国", //5
    prefectures: [
      { prefId: "tottori", name: "鳥取県", count: 15_844 },
      { prefId: "shimane", name: "島根県", count: 21_394 },
      { prefId: "okayama", name: "岡山県", count: 52_373 },
      { prefId: "hiroshima", name: "広島県", count: 80_158 },
      { prefId: "yamaguchi", name: "山口県", count: 36_434 },
    ],
  },
  {
    id: "shikoku",
    name: "四国", //4
    prefectures: [
      { prefId: "tokushima", name: "徳島県", count: 24_109 },
      { prefId: "kagawa", name: "香川県", count: 29_913 },
      { prefId: "ehime", name: "愛媛県", count: 40_808 },
      { prefId: "kochi", name: "高知県", count: 23_135 },
    ],
  },
  {
    id: "kyushu",
    name: "九州", //7
    prefectures: [
      { prefId: "fukuoka", name: "福岡県", count: 135_973 },
      { prefId: "saga", name: "佐賀県", count: 23_809 },
      { prefId: "nagasaki", name: "長崎県", count: 39_794 },
      { prefId: "kumamoto", name: "熊本県", count: 50_149 },
      { prefId: "oita", name: "大分県", count: 33_688 },
      { prefId: "miyazaki", name: "宮崎県", count: 33_162 },
      { prefId: "kagoshima", name: "鹿児島県", count: 47_947 },
    ],
  },
  {
    id: "okinawa",
    name: "沖縄", //1
    prefectures: [{ prefId: "okinawa", name: "沖縄", count: 43_796 }],
  },
];
