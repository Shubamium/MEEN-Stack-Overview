const fs = require("fs");
const dbDir = "./db.json";
function getDB() {
  // Check if database exist or not make one if it doesn't exist
  if (!fs.existsSync(dbDir)) {
    fs.writeFileSync(dbDir, "{1}");
  }
  let db = fs.readFileSync(dbDir, "utf-8");
  return JSON.parse(db);
}

function setDB(db) {
  if (!db || JSON.stringify(db) === "") return;
  fs.writeFileSync(dbDir, JSON.stringify(db));
}

module.exports = { setDB, getDB };
