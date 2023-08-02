const { google } = require("googleapis");
const { TOKEN_PATH, HISTORY_PATH } = require("./const");
const fs = require("fs").promises;

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

const saveHistoryId = async (historyId) => {
    try {
        await fs.writeFile(HISTORY_PATH, historyId.toString());
        return true;
    } catch (error) {
        console.log("Failed to save history id");
        return false;
    }
};

const readHistoryId = async () => {
    try {
        const data = await fs.readFile(HISTORY_PATH);
        return data.toString();
    } catch (error) {
        return;
    }
};

module.exports = { HttpError, loadSavedCredentialsIfExist, saveHistoryId, readHistoryId };
