/**
 * 画像一括最適化スクリプト
 *
 * sharp を使って public/images 内の WebP/JPEG/PNG を圧縮・リサイズする。
 * - WebP: 品質75、最大幅1920px
 * - JPEG: 品質75、最大幅1920px
 * - PNG: 圧縮レベル9
 *
 * 実行方法: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat, copyFile, mkdir } from "fs/promises";
import { join, extname, relative } from "path";

const PUBLIC_IMAGES = "public/images";
const BACKUP_DIR = "public/images-backup";

// 最適化対象のディレクトリ（重い画像が集中している場所のみ）
const TARGET_DIRS = ["photo", "section3", "phase9"];

// 最適化設定
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 75;
const JPEG_QUALITY = 75;

/**
 * ディレクトリ内の全ファイルを再帰的に取得する
 */
async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 単一画像を最適化する
 */
async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (![".webp", ".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  // sharp で画像を読み込み
  let pipeline = sharp(filePath);
  const metadata = await pipeline.metadata();

  // 最大幅を超えている場合のみリサイズ
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  // フォーマット別に圧縮
  let buffer;
  if (ext === ".webp") {
    buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  } else if (ext === ".jpg" || ext === ".jpeg") {
    buffer = await pipeline.jpeg({ quality: JPEG_QUALITY }).toBuffer();
  } else if (ext === ".png") {
    buffer = await pipeline.png({ compressionLevel: 9 }).toBuffer();
  }

  // 元より小さくなった場合のみ上書き
  if (buffer && buffer.length < originalSize) {
    const { writeFile } = await import("fs/promises");
    await writeFile(filePath, buffer);
    const savedKB = ((originalSize - buffer.length) / 1024).toFixed(1);
    const ratio = ((1 - buffer.length / originalSize) * 100).toFixed(1);
    return {
      file: filePath,
      before: (originalSize / 1024).toFixed(1),
      after: (buffer.length / 1024).toFixed(1),
      saved: savedKB,
      ratio,
    };
  }

  return null;
}

async function main() {
  console.log("🖼️  画像最適化を開始します...\n");

  let totalSaved = 0;
  let optimizedCount = 0;

  for (const dir of TARGET_DIRS) {
    const dirPath = join(PUBLIC_IMAGES, dir);

    // バックアップを作成
    const backupPath = join(BACKUP_DIR, dir);
    console.log(`📦 バックアップ: ${dirPath} → ${backupPath}`);

    const files = await getFiles(dirPath);
    for (const file of files) {
      const relPath = relative(PUBLIC_IMAGES, file);
      const backupFile = join(BACKUP_DIR, relPath);
      await mkdir(join(backupFile, ".."), { recursive: true });
      await copyFile(file, backupFile);
    }

    // 最適化実行
    console.log(`\n🔧 最適化中: ${dirPath} (${files.length}枚)`);
    for (const file of files) {
      const result = await optimizeImage(file);
      if (result) {
        console.log(
          `  ✅ ${relative(PUBLIC_IMAGES, result.file)}: ${result.before}KB → ${result.after}KB (-${result.saved}KB, ${result.ratio}%削減)`,
        );
        totalSaved += parseFloat(result.saved);
        optimizedCount++;
      }
    }
  }

  console.log(`\n🎉 完了！`);
  console.log(`   最適化: ${optimizedCount}枚`);
  console.log(`   合計削減: ${(totalSaved / 1024).toFixed(2)}MB`);
  console.log(`   バックアップ: ${BACKUP_DIR}/`);
}

main().catch(console.error);
