// src/components/ui/ContactModal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { FiX, FiChevronDown } from "react-icons/fi";
import { useModalStore } from "@/store/useModalStore";

const PREFECTURES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京23区",
  "多摩地域",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪市",
  "北摂",
  "堺・泉州",
  "河内",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const Label = ({
  text,
  required = false,
}: {
  text: string;
  required?: boolean;
}) => (
  <label className="block text-sm font-bold text-text mb-1.5">
    {text} {required && <span className="text-red-500 text-xs ml-1">必須</span>}
  </label>
);

export default function ContactModal() {
  const { isOpen, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
  };

  const inputClass =
    "w-full bg-gray-100 border border-transparent focus:border-text/50 focus:bg-white focus:ring-2 focus:ring-[#007a8c]/20 rounded-md p-3 text-sm transition-all outline-none text-text";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 print:hidden">
          {/* 背景オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-text/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden z-10"
          >
            {/* ヘッダー（上部固定：shrink-0） */}
            <div className="shrink-0 flex justify-between items-center p-5 md:p-6 border-b border-gray-100 bg-white z-10">
              <h2 className="text-lg md:text-2xl font-bold text-text text-center w-full">
                エントリー相談・お問い合わせ
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 md:right-6 text-text/50 hover:text-text transition-colors cursor-pointer"
                aria-label="閉じる"
              >
                <FiX className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
            >
              <div
                className="flex-1 p-6 md:p-8 overflow-y-auto overscroll-contain space-y-6"
                data-lenis-prevent="true"
              >
                {/* 企業名 ＆ エリア (2カラム) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label text="企業名" required />
                    <input
                      {...register("companyName")}
                      className={inputClass}
                      placeholder="例: 株式会社IOBI"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label text="エリア" required />
                    <div className="relative">
                      <select
                        {...register("area")}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="">選択してください</option>
                        {PREFECTURES.map((pref) => (
                          <option key={pref} value={pref}>
                            {pref}
                          </option>
                        ))}
                      </select>

                      <FiChevronDown
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text/60 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                    {errors.area && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.area.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* URL ＆ メール ＆ 電話番号 (3カラム) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label text="ホームページURL" />
                    <input
                      {...register("hpUrl")}
                      type="url"
                      className={inputClass}
                      placeholder="https://"
                    />
                    {errors.hpUrl && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.hpUrl.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label text="メールアドレス" required />
                    <input
                      {...register("email")}
                      type="email"
                      className={inputClass}
                      placeholder="example@madeinlocal.jp"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label text="電話番号" required />
                    <input
                      {...register("phone")}
                      type="tel"
                      className={inputClass}
                      placeholder="03-1234-5678"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 役職 ＆ 氏名 (2カラム) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label text="役職" />
                    <input
                      {...register("title")}
                      className={inputClass}
                      placeholder="例: 代表取締役"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label text="氏名" required />
                    <input
                      {...register("name")}
                      className={inputClass}
                      placeholder="例: 山田 太郎"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* お問い合わせ内容 (1カラム) */}
                <div>
                  <Label text="面談への意気込み／お問い合わせ内容" />
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="ご自由にご記入ください"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* プライバシーポリシー＆同意 */}
                <div className="pt-2">
                  <h3 className="text-sm font-bold text-text mb-2">
                    個人情報の取扱いについて
                  </h3>
                  <div className="w-full bg-gray-50 border border-gray-200 p-4 text-xs text-text rounded leading-relaxed mb-4">
                    <p className="mb-2">
                      ご入力いただいた個人情報は、株式会社IOBI（以下「当社」）が以下の目的で利用いたします。
                    </p>
                    <ul className="list-decimal list-inside mb-2 pl-1 space-y-1">
                      <li>お問い合わせに対する回答および資料送付のため</li>
                      <li>
                        当社のサービス、イベント、キャンペーン等に関する情報提供のため
                      </li>
                      <li>サービスの品質改善およびマーケティング分析のため</li>
                    </ul>
                    <p>
                      法令に定める場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
                    </p>
                  </div>

                  <label className="flex items-center justify-center gap-2 cursor-pointer group w-fit mx-auto py-1">
                    <input
                      type="checkbox"
                      {...register("agreement")}
                      className="w-5 h-5 text-text rounded border-gray-300 focus:ring-text cursor-pointer"
                    />
                    <span className="text-sm font-bold text-text group-hover:opacity-80 transition-opacity">
                      個人情報の取扱いに同意する{" "}
                      <span className="text-red-500 text-xs ml-1">必須</span>
                    </span>
                  </label>
                  {errors.agreement && (
                    <p className="text-red-500 text-xs text-center mt-1">
                      {errors.agreement.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 🌟 フッター・送信ボタン（下部固定：shrink-0） */}
              <div className="shrink-0 p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex justify-center z-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full max-w-sm font-sans bg-text text-white font-bold py-3.5 md:py-4 rounded-md transition-all hover:bg-[#004895] hover:shadow-lg flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>→</span>
                  {isSubmitting ? "送信中..." : "上記内容で送信する"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
