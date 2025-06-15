const fs = require("fs")
const path = require("path")

console.log("Hello, World!")
const packageJsonPath = path.join(__dirname, "package.json")
fs.readFile(packageJsonPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err)
    return
  }
  console.log("package.json contents:", data)
})
