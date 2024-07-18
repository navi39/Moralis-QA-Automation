const fs = require("fs");
const path = require("path");

const tracesDir = path.join(__dirname, "..", "logs");

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recurse
        deleteFolderRecursive(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Deleted trace folder: ${folderPath}`);
  }
}

deleteFolderRecursive(tracesDir);
