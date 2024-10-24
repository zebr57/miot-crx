import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === "staging" ? "[INTERNAL] MIOT Tools" : "MIOT Tools",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: {
    default_popup: "index.html",
    default_title: "MIOT Tools"
  },
  background: {
    service_worker: "src/background/service_worker.ts",
    type: "module"
  },
  permissions: ["tabs", "activeTab", "cookies", "storage"],
  host_permissions: ["https://iot.mi.com/*"],
  // side_panel: {
  //   default_path: "index.html"
  // },
  content_scripts: [
    {
      matches: ["https://iot.mi.com/*"],
      js: ["src/content/index"], // crxjs 会自动打包放到对应目录下 (不能带后缀.js)
      run_at: "document_end"
    }
  ]
}));
