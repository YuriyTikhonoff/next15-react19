import fs from "fs"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

console.log("Hello, World!")
const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = path.join(__dirname, "package.json")
fs.readFile(packageJsonPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err)
    return
  }
  console.log("package.json contents:", data)
})
