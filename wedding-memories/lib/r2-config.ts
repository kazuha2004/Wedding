/**
 * R2 image hosting config.
 *
 * You're splitting 11 folders across 3 Cloudflare accounts (free tier is
 * 10GB per account). This file is the ONLY place that needs to know which
 * account hosts which folder — everything else in the app just calls
 * getImageUrl(folder, filename) and doesn't care about the split.
 *
 * As you upload each folder, add it here.
 */

// Map each event folder -> which R2 account/bucket hosts it
export const folderToAccount: Record<string, string> = {
  "bride-haldi": "account1",
  "bride-pooja": "account1",
  "candid-1": "account1",
  "groom-haldi": "account1",
  "janeu": "account1",
  "tilak": "account1",
  "wedding-1": "account1",
  "wedding-2": "account1",
  "wedding-3": "account2",
  "wedding-4": "account2",
  "wedding-5": "account2",
};

// Each account's public R2.dev base URL (no trailing slash)
export const accountBaseUrls: Record<string, string> = {
  account1: "https://pub-02bd9297cf6144c5bb2a3eacbb891bff.r2.dev",
  account2: "https://pub-591331e9890e45fcbb7a8d7738acc75b.r2.dev",
  // account2: "https://pub-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.r2.dev",
  // account3: "https://pub-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.r2.dev",
};

/**
 * Builds the full public URL for an image given its folder + filename.
 * This is the single choke point that hides the multi-account split.
 */
export function getImageUrl(folder: string, filename: string): string {
  const account = folderToAccount[folder];
  if (!account) {
    throw new Error(
      `No R2 account mapped for folder "${folder}". Add it to folderToAccount in lib/r2-config.ts`
    );
  }
  const base = accountBaseUrls[account];
  if (!base) {
    throw new Error(
      `No base URL configured for account "${account}". Add it to accountBaseUrls in lib/r2-config.ts`
    );
  }
  // encodeURIComponent handles spaces and special characters in filenames
  // (e.g. "Copy of IMG_6202.JPG" -> "Copy%20of%20IMG_6202.JPG")
  return `${base}/${folder}/${encodeURIComponent(filename)}`;
}

/**
 * Generates a sequential filename list, e.g. DSC_8555.JPG..DSC_8621.JPG
 * Optionally skips specific numbers (e.g. files confirmed missing/corrupt).
 */
export function generateSequentialFilenames(
  prefix: string,
  start: number,
  end: number,
  extension: string = "JPG",
  skip: number[] = []
): string[] {
  const files: string[] = [];
  for (let i = start; i <= end; i++) {
    if (skip.includes(i)) continue;
    files.push(`${prefix}${i}.${extension}`);
  }
  return files;
}