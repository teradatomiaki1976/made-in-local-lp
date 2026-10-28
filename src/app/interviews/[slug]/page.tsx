// src/app/interviews/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getInterviews, getInterviewBySlug } from "@/lib/microcms";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import ArticleLayoutWrapper from "@/components/layouts/ArticleLayoutWrapper";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiHelpCircle,
} from "react-icons/fi";

// 1. ビルド時に全記事のURLを事前生成する（SSG）
export async function generateStaticParams() {
  const interviews = await getInterviews();
  return interviews.map((item) => ({
    slug: item.slug,
  }));
}

// 2. 記事ごとにSEOメタデータ（タイトル・OGP）を動的に生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInterviewBySlug(slug);
  if (!article) return {};

  const pageTitle = article.articleTitle || article.title;
  const plainDescription = article.summary
    .replace(/<[^>]*>?/gm, "")
    .slice(0, 120);

  return {
    title: `${pageTitle} | MADE IN LOCAL / 地域を代表する企業100選`,
    description: plainDescription,
    openGraph: {
      title: `${pageTitle} | ${article.company}`,
      description: plainDescription,
      images: [article.thumbnail],
    },
  };
}

export default async function InterviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getInterviewBySlug(slug);

  if (!article) {
    notFound();
  }

  // 追加：現在表示している記事以外のインタビュー一覧を取得
  const allInterviews = await getInterviews();
  const otherInterviews = allInterviews.filter((item) => item.slug !== slug);

  const displayTitle = article.articleTitle || article.title;

  // SEO強化：FAQ構造化データ（JSON-LD）の生成
  const faqJsonLd =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <ArticleLayoutWrapper>
      {/* JSON-LDの出力 */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* --- 記事ヘッダー（GlobalHeaderがfixedのため上部余白を確保） --- */}
      <div className="bg-midblue text-white pt-28 pb-14 md:pt-36 md:pb-20 px-4">
        <Container className="max-w-4xl mx-auto">
          {/* パンくず・戻るリンク */}
          <div className="mb-6">
            <Link
              href="/?tab=shikumi#section11"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white/80 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>「選出企業の声」一覧へ戻る</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-white text-midblue text-xs font-bold px-3 py-1 rounded-sm tracking-wider">
              地域を代表する企業100選｜選出企業インタビュー
            </span>
            <span className="text-white/90 text-xs md:text-sm border border-white/30 px-3 py-0.5 rounded-full">
              {article.area}
            </span>
            {/* <time className="text-white/60 text-xs ml-auto">
              {article.publishedAt}
            </time> */}
          </div>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold leading-snug mb-4">
            {displayTitle}
          </h1>
          <p className="text-white/85 text-sm md:text-base font-bold border-t border-white/20 pt-2">
            {article.company}（{article.area}）
          </p>
        </Container>
      </div>

      <Container className="max-w-4xl mx-auto px-4 -mt-6 md:-mt-10">
        {/* --- 1. YouTube動画埋め込みエリア --- */}
        <div className="bg-black rounded-xl overflow-hidden shadow-xl aspect-video w-full mb-8 md:mb-10 border-4 border-white">
          <iframe
            src={`https://www.youtube.com/embed/${article.youtubeId}?rel=0`}
            title={displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* --- 2. 記事リード文 --- */}
        <div
          className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 mb-8 md:mb-12 text-sm md:text-base leading-loose text-text"
          dangerouslySetInnerHTML={{ __html: article.summary }}
        />

        {/* --- 3. 記事本文 --- */}
        <article
          className="bg-white p-6 md:p-12 rounded-lg shadow-sm border border-gray-100 text-text
            [&_h2]:text-lg md:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-midblue [&_h2]:border-l-4 [&_h2]:border-[#007a8c] [&_h2]:pl-4 [&_h2]:py-1 [&_h2]:mt-12 [&_h2]:mb-6 first:[&_h2]:mt-0
            [&_h3]:text-base md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-text [&_h3]:bg-creem [&_h3]:px-4 [&_h3]:py-2.5 [&_h3]:rounded-md [&_h3]:mt-8 [&_h3]:mb-4
            [&_p]:text-sm md:[&_p]:text-base [&_p]:leading-[1.9] [&_p]:mb-6 last:[&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* --- 4. よくある質問（FAQ）セクション --- */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-8 md:mt-12 bg-white p-6 md:p-12 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2.5 border-b border-gray-200 pb-4 mb-6">
              <FiHelpCircle className="w-6 h-6 text-[#007a8c] shrink-0" />
              <h2 className="text-lg md:text-2xl font-bold text-text">
                よくある質問｜地域を代表する企業100選の選出効果
              </h2>
            </div>
            <div className="space-y-6">
              {article.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-creem/60 rounded-lg p-5 md:p-6 border border-gray-100"
                >
                  <h3 className="text-sm md:text-base font-bold text-text flex items-start gap-2.5 mb-3">
                    <span className="bg-midblue text-white text-xs px-2 py-0.5 rounded font-sans shrink-0 mt-0.5">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-text pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- 5. 取材企業・動画情報（クレジット枠） --- */}
        {article.credit && (
          <section className="mt-8 md:mt-12 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 text-xs md:text-sm">
            <h2 className="text-sm md:text-base font-bold text-text border-b border-gray-200 pb-3 mb-4">
              取材企業・動画情報
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4 mb-4">
              <dt className=" text-text2 font-sans">取材企業</dt>
              <dd className="sm:col-span-2 font-medium text-sm md:text-base text-text">
                {article.credit.companyName}
              </dd>
              <dt className=" text-text2 font-sans">選出エリア</dt>
              <dd className="sm:col-span-2 font-medium text-sm md:text-base text-text">
                {article.credit.selectionArea}
              </dd>
              <dt className=" text-text2 font-sans">代表者</dt>
              <dd className="sm:col-span-2 font-medium text-sm md:text-base text-text">
                {article.credit.ceo}
              </dd>
              <dt className=" text-text2 font-sans">対談出演者</dt>
              <dd className="sm:col-span-2 font-medium text-sm md:text-base text-text">
                {article.credit.speakers}
              </dd>
              <dt className=" text-text2 font-sans">対談進行</dt>
              <dd className="sm:col-span-2 font-medium text-sm md:text-base text-text">
                {article.credit.interviewer}
              </dd>
            </dl>
            {article.credit.note && (
              <p className="font-sans text-[11px] md:text-xs text-text2 pt-3 border-t border-gray-100">
                {article.credit.note}
              </p>
            )}
          </section>
        )}

        {/* --- 6. 「名店列伝」方式：原稿のクロージング文を活かしたLP・CV誘導ブリッジ --- */}
        <aside className="mt-12 md:mt-16 bg-linear-to-br from-[#19324D] to-[#00518B] text-white rounded-xl p-6 md:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-3xl font-bold leading-snug mb-6">
              あなたの会社の魅力も、
              <br className="sm:hidden" />
              まだ出会っていない人へ。
            </h2>
            <p className="text-white/90 text-xs md:text-base leading-loose max-w-3xl mb-8">
              優れた技術がある。独自のサービスがある。社会に貢献する事業がある。
              <br className="hidden md:block" />
              それでも、その価値がまだ十分に知られていない企業は少なくありません。
              <br />
              「地域を代表する企業100選」は、そんな地域企業の魅力と未来への意志に光を当てる取り組みです。
            </p>

            {/* メリット3点まとめ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-4xl mb-8 text-left">
              {[
                "企業としての信頼性を高めたい",
                "採用ブランディングに活かしたい",
                "新たな企業とのつながりを広げたい",
              ].map((merit, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-xs px-4 py-3 md:py-5 rounded-md flex items-center gap-2 text-xs md:text-sm font-bold"
                >
                  <FiCheckCircle className="text-[#4fd1c5] shrink-0 w-4 h-4" />
                  <span>{merit}</span>
                </div>
              ))}
            </div>

            {/* 2段構えの動線：エントリー相談モーダル起動 ＆ LP本編へ */}
            <div className="w-full flex flex-col items-center gap-4">
              <CTAButton
                text="エントリーについて相談する"
                className="mt-0! md:mt-0!"
              />

              <Link
                href="/?tab=shikumi#section11"
                className="mt-2 inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white/90 hover:text-white underline underline-offset-4 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>「選出企業の声」一覧へ戻る</span>
              </Link>
            </div>
          </div>
        </aside>
        {/* --- 7. 他の選出企業のインタビューも読む（回遊促進ミニカード一覧） --- */}
        {otherInterviews.length > 0 && (
          <section className="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 md:mb-8">
              <div>
                <span className="text-xs font-bodoni tracking-widest text-text2 font-bold block mb-1">
                  OTHER INTERVIEWS
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-midblue">
                  他の選出企業インタビューも読む
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {otherInterviews.map((item) => (
                <Link
                  key={item.id}
                  href={`/interviews/${item.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-md border border-gray-100 transition-all duration-300 flex flex-col"
                >
                  {/* サムネイル画像 */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                    <Image
                      src={item.thumbnail}
                      alt={`${item.company}のインタビュー`}
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-midblue/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-sm">
                      {item.area}
                    </span>
                  </div>

                  {/* テキストエリア */}
                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h3 className="text-base md:text-xl font-bold text-text leading-snug mb-3">
                      {item.title}
                    </h3>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-sm md:text-base font-bold text-text2 truncate">
                        {item.company}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs md:text-sm font-sans font-bold text-text group-hover:translate-x-1 transition-transform shrink-0">
                        <span>記事を読む</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </ArticleLayoutWrapper>
  );
}
