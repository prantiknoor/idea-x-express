const { google } = require("googleapis");

async function getLabels(req, res, next) {
    try {
        const gmail = google.gmail({ version: "v1", auth: req.auth });
        const response = await gmail.users.labels.list({
            userId: "me",
        });
        const labels = response.data.labels.map((label) => label.name);

        res.json({ labels });
    } catch (error) {
        next(error);
    }
}

module.exports = getLabels;
