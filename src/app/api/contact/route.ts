// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { google } from "googleapis";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";

// Vercelで確実にサーバーレス関数として動的実行させる宣言
export const dynamic = "force-dynamic";

const FROM_EMAIL = "Made In Local 100選事務局 <onboarding@resend.dev>";
const ADMIN_EMAIL = "teradatomiaki@gmail.com";

// Googleスプレッドシートへ1行追記するヘルパー関数
async function appendToGoogleSheet(data: ContactFormData) {
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  // Vercel上で前後に「"」が残っていたり、改行コード(\n)が文字列になっていても自動で綺麗に整形する
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(
    /^["']|["']$/g,
    "",
  ).replace(/\\n/g, "\n");

  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error(
      "Google Sheets APIの環境変数がVercelに設定されていません。",
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const safePhone = `'${data.phone}`;

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
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEYがVercelに設定されていません。");
  }

  const resend = new Resend(apiKey);
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
    const validatedData = contactSchema.parse(body);

    const [sheetResult, emailResult] = await Promise.allSettled([
      appendToGoogleSheet(validatedData),
      sendEmails(validatedData),
    ]);

    const sheetError =
      sheetResult.status === "rejected"
        ? (sheetResult.reason as Error)?.message || String(sheetResult.reason)
        : null;
    const emailError =
      emailResult.status === "rejected"
        ? (emailResult.reason as Error)?.message || String(emailResult.reason)
        : null;

    if (sheetError)
      console.error("❌ 📊 スプレッドシート出力エラー:", sheetError);
    if (emailError) console.error("❌ ✉️ メール送信エラー:", emailError);

    // 両方失敗した場合、またはどちらかが失敗した理由をフロントへ返す
    if (sheetError && emailError) {
      return NextResponse.json(
        {
          error: "送信処理に失敗しました。",
          details: `Sheet: ${sheetError} / Email: ${emailError}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "不正なリクエスト、またはサーバーエラーが発生しました。",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 },
    );
  }
}
