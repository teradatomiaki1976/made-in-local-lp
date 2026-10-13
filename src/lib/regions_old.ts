// src/lib/regions.ts
export const REGIONS = [
  {
    id: "hokkaido",
    name: "北海道", //1
    prefectures: [{ prefId: "hokkaido", name: "北海道", count: 132_116 }],
  },
  {
    id: "tohoku",
    name: "東北", //6
    prefectures: [
      { prefId: "aomori", name: "青森県", count: 35_929 },
      { prefId: "iwate", name: "岩手県", count: 33_295 },
      { prefId: "miyagi", name: "宮城県", count: 56_142 },
      { prefId: "akita", name: "秋田県", count: 29_066 },
      { prefId: "yamagata", name: "山形県", count: 34_646 },
      { prefId: "fukushima", name: "福島県", count: 53_290 },
    ],
  },
  {
    id: "kanto",
    name: "関東", //7
    prefectures: [
      { prefId: "ibaraki", name: "茨城県", count: 72_900 },
      { prefId: "tochigi", name: "栃木県", count: 53_621 },
      { prefId: "gumma", name: "群馬県", count: 58_642 },
      { prefId: "saitama", name: "埼玉県", count: 150_341 },
      { prefId: "chiba", name: "千葉県", count: 114_313 },
      { prefId: "tokyo", name: "東京都", count: 423_595 },
      { prefId: "kanagawa", name: "神奈川県", count: 184_197 },
    ],
  },
  {
    id: "chubu",
    name: "中部", //9
    prefectures: [
      { prefId: "niigata", name: "新潟県", count: 67_216 },
      { prefId: "toyama", name: "富山県", count: 31_472 },
      { prefId: "ishikawa", name: "石川県", count: 36_917 },
      { prefId: "fukui", name: "福井県", count: 26_914 },
      { prefId: "yamanashi", name: "山梨県", count: 28_552 },
      { prefId: "nagano", name: "長野県", count: 66_662 },
      { prefId: "gifu", name: "岐阜県", count: 64_514 },
      { prefId: "shizuoka", name: "静岡県", count: 108_917 },
      { prefId: "aichi", name: "愛知県", count: 195_912 },
    ],
  },
  {
    id: "kinki",
    name: "近畿", //7
    prefectures: [
      { prefId: "mie", name: "三重県", count: 46_459 },
      { prefId: "shiga", name: "滋賀県", count: 32_250 },
      { prefId: "kyoto", name: "京都府", count: 74_999 },
      { prefId: "osaka", name: "大阪府", count: 262_619 },
      { prefId: "hyogo", name: "兵庫県", count: 134_302 },
      { prefId: "nara", name: "奈良県", count: 30_083 },
      { prefId: "wakayama", name: "和歌山県", count: 31_836 },
    ],
  },
  {
    id: "chugoku",
    name: "中国", //5
    prefectures: [
      { prefId: "tottori", name: "鳥取県", count: 14_641 },
      { prefId: "shimane", name: "島根県", count: 19_572 },
      { prefId: "okayama", name: "岡山県", count: 50_200 },
      { prefId: "hiroshima", name: "広島県", count: 78_069 },
      { prefId: "yamaguchi", name: "山口県", count: 34_174 },
    ],
  },
  {
    id: "shikoku",
    name: "四国", //4
    prefectures: [
      { prefId: "tokushima", name: "徳島県", count: 23_259 },
      { prefId: "kagawa", name: "香川県", count: 28_641 },
      { prefId: "ehime", name: "愛媛県", count: 39_668 },
      { prefId: "kochi", name: "高知県", count: 22_422 },
    ],
  },
  {
    id: "kyushu",
    name: "九州", //7
    prefectures: [
      { prefId: "fukuoka", name: "福岡県", count: 131_240 },
      { prefId: "saga", name: "佐賀県", count: 22_405 },
      { prefId: "nagasaki", name: "長崎県", count: 38_267 },
      { prefId: "kumamoto", name: "熊本県", count: 46_830 },
      { prefId: "oita", name: "大分県", count: 31_999 },
      { prefId: "miyazaki", name: "宮崎県", count: 31_900 },
      { prefId: "kagoshima", name: "鹿児島県", count: 45_827 },
    ],
  },
  {
    id: "okinawa",
    name: "沖縄", //1
    prefectures: [{ prefId: "okinawa", name: "沖縄", count: 44_424 }],
  },
];
