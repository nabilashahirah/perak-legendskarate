// Next 16.4 static export writes segment-prefetch payloads as nested folders
// (out/centres/__next.centres/__PAGE__.txt) while the client router requests the flat
// name (out/centres/__next.centres.__PAGE__.txt), which 404s on a plain static host.
// Copy each nested payload to its flat name so client-side prefetching works on Cloudflare Pages.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
    else if (entry.name !== "_next") walk(full);
  }
}

function flatten(segDir, parent, prefix) {
  for (const entry of fs.readdirSync(segDir, { withFileTypes: true })) {
    const full = path.join(segDir, entry.name);
    const flatName = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, parent, flatName);
    else {
      fs.copyFileSync(full, path.join(parent, flatName));
      copied++;
    }
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`postbuild: flattened ${copied} segment prefetch file(s)`);
}
