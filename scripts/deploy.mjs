// Uploads the built site (out/) to Cloudflare Pages. Run via `npm run deploy` (builds first).
// The site lives in the academy's Cloudflare account; you need to be a member of it and logged in
// with `npx wrangler login` (tick that account on the approval page).
import { spawnSync } from "node:child_process";

const ACCOUNT_ID = "ec9613681c8be07cf3a7c614fc771989"; // Perakunited@gmail.com's Account
const PROJECT = "perakkarate";

const result = spawnSync(
  "npx",
  ["--yes", "wrangler@4", "pages", "deploy", "out", "--project-name", PROJECT, "--branch", "main"],
  { stdio: "inherit", shell: true, env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: ACCOUNT_ID } },
);
process.exit(result.status ?? 1);
