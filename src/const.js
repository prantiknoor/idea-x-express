const path = require("path");

const TOKEN_PATH = path.join(process.cwd(), "token.json");

const HISTORY_PATH = path.join(process.cwd(), "history.db");

module.exports = { TOKEN_PATH, HISTORY_PATH };
