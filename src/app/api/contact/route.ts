// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// ドメイン認証完了後は "Made In Local 100選事務局 <noreply@madeinlocal.jp>" 等に変更
const FROM_EMAIL = "Made In Local 100選事務局 <onboarding@resend.dev>";
// 本番時は運営のインフォアドレス等に変更
const ADMIN_EMAIL = "teradatomiaki@gmail.com";

// Googleスプレッドシートへ1行追記するヘルパー関数
async function appendToGoogleSheet(data: ContactFormData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // .envの改行コード(\n)を実際の改行に変換
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets APIの環境変数が不足しています。");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // 日本時間（JST）のタイムスタンプを生成（例: 2026/10/27 22:45:12）
  const timestamp = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  // 電話番号の先頭の「0」がスプレッドシート側で消えないよう、先頭にシングルクォートを付与
  const safePhone = `'${data.phone}`;

  // A列〜I列に順番に格納（シート名を指定せず A:I とすることで、左端のシートに自動で追記される）
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          timestamp,
          data.companyName,
          data.area,
          data.hpUrl || "未入力",
          data.title || "未入力",
          data.name,
          data.email,
          safePhone,
          data.message || "未入力",
        ],
      ],
    },
  });
}

// メール2通（運営通知＋サンクスメール）を順番に送信するヘルパー関数
async function sendEmails(data: ContactFormData) {
  const { companyName, area, hpUrl, email, phone, title, name, message } = data;

  // ① 運営宛て通知メール
  const adminResponse = await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    replyTo: email,
    subject: `【Made In Local 100選】エントリー相談（${companyName} 様）`,
    html: `
      <div style="font-family: sans-serif; color: #19324D; line-height: 1.6;">
        <h2 style="border-bottom: 2px solid #007a8c; padding-bottom: 8px;">
          LPから新しいお問い合わせがありました
        </h2>
        <p>以下の内容でエントリー相談・お問い合わせを受け付けました。</p>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb; width: 35%;">企業名</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${companyName}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">エリア</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${area}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">ホームページURL</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${hpUrl || "未入力"}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">役職</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${title || "未入力"}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">氏名</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">メールアドレス</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">電話番号</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd; background: #f9fafb;">お問い合わせ内容</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">${message || "未入力"}</td>
          </tr>
        </table>
      </div>
    `,
  });

  if (adminResponse.error) {
    throw new Error(`Admin Email Error: ${adminResponse.error.message}`);
  }
  console.log("✅ ① 運営宛メール送信成功:", adminResponse.data?.id);

  // レートリミット（秒間2リクエスト制限）回避のため0.6秒待機
  await new Promise((resolve) => setTimeout(resolve, 600));

  // ② ユーザー（送信者）宛て自動返信サンクスメール
  const userResponse = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `【地域を代表する企業100選】お問い合わせを受け付けました`,
    html: `
      <div style="font-family: sans-serif; color: #19324D; line-height: 1.8; max-width: 600px;">
        <p>${companyName}<br />${name} 様</p>
        <p>
          この度は、「地域を代表する企業100選」へのお問い合わせ・エントリー相談をいただき、誠にありがとうございます。<br />
          以下の内容にてお問い合わせを受け付けいたしました。
        </p>
        <p>
          内容を確認の上、担当者より2〜3営業日以内に折り返しご連絡いたしますので、今しばらくお待ちくださいませ。
        </p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #e5e7eb;">
          <h3 style="margin-top: 0; font-size: 15px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">ご入力内容の控え</h3>
          <p style="margin: 8px 0; font-size: 14px;"><strong>企業名：</strong> ${companyName}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>エリア：</strong> ${area}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>ホームページURL：</strong> ${hpUrl || "未入力"}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>役職：</strong> ${title || "未入力"}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>氏名：</strong> ${name}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>メールアドレス：</strong> ${email}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>電話番号：</strong> ${phone}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>お問い合わせ内容：</strong><br /><span style="white-space: pre-wrap;">${message || "未入力"}</span></p>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="font-size: 12px; color: #666;">
          ※本メールはシステムからの自動返信です。<br />
          地方創生メディア「Made In Local」運営事務局（株式会社IOBI）
        </p>
      </div>
    `,
  });

  if (userResponse.error) {
    console.warn("⚠️ ② サンクスメール送信スキップ:", userResponse.error);
  } else {
    console.log("✅ ② サンクスメール送信成功:", userResponse.data?.id);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. サーバーサイドでのZodバリデーション
    const validatedData = contactSchema.parse(body);

    // 2. スプレッドシート出力 と メール送信 を並列で実行（高速化＆耐障害性）
    const [sheetResult, emailResult] = await Promise.allSettled([
      appendToGoogleSheet(validatedData),
      sendEmails(validatedData),
    ]);

    if (sheetResult.status === "fulfilled") {
      console.log("✅ 📊 スプレッドシートへの出力成功！");
    } else {
      console.error("❌ 📊 スプレッドシート出力エラー:", sheetResult.reason);
    }

    // 運営メールもスプレッドシートも両方失敗した場合のみエラーを返す
    if (
      sheetResult.status === "rejected" &&
      emailResult.status === "rejected"
    ) {
      return NextResponse.json(
        { error: "送信処理に失敗しました。" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "不正なリクエスト、またはサーバーエラーが発生しました。" },
      { status: 400 },
    );
  }
}
