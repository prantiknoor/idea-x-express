const { google } = require("googleapis");
const { readHistoryId } = require("../utils");

async function getHistory(req, res, next) {
    let historyId = req.params.historyId;

    try {
        if (historyId == "latest") {
            historyId = await readHistoryId();
        }
        const gmail = google.gmail({ version: "v1", auth: req.auth });
        const response = await gmail.users.history.list({
            userId: "me",
            startHistoryId: historyId,
            historyTypes: "messageAdded",
        });

        res.json(response.data);
    } catch (error) {
        next(error);
    }
}

module.exports = getHistory;
