// src/lib/validations/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  companyName: z.string().min(1, "企業名は必須です"),
  hpUrl: z
    .string()
    .url("正しいURL形式で入力してください")
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, "氏名は必須です"),

  title: z.string().optional(),

  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().min(10, "正しい電話番号を入力してください"),
  area: z.string().min(1, "エリアを選択してください"),

  message: z.string().optional(),

  agreement: z.boolean().refine((val) => val === true, {
    message: "個人情報の取扱いに同意する必要があります",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
