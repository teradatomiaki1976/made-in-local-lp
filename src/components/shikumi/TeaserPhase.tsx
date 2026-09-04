import { motion } from "framer-motion";

export default function TeaserPhase() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6 py-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-8"
      >
        <div className="space-y-8">
          <h2 className="text-base md:text-xl font-bold tracking-widest text-gray-500 uppercase">
            Coming Soon
          </h2>
          <h1 className="text-xl md:text-4xl font-bold leading-normal">
            只今、詳細な審査基準や事例を
            <br className="hidden md:block" />
            まとめたページを準備中です。
          </h1>
        </div>

        <p className="text-left text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          「地域を代表する企業100選」の仕組みや、選出による具体的な事例、
          審査プロセスについての内容を制作しております。公開まで今しばらくお待ちください。
        </p>
      </motion.div>
    </section>
  );
}
