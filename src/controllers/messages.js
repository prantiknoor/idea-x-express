const { google } = require("googleapis");

async function getMessages(req, res, next) {
    const messageId = req.params.messageId;

    try {
        const gmail = google.gmail({ version: "v1", auth: req.auth });
        const response = await gmail.users.messages.get({
            userId: "me",
            id: messageId,
        });

        const headers = response.data.payload.headers;

        const data = { from: 1, to: 1, subject: 1, date: 1 };

        headers.forEach(({ name, value }) => {
            name = name.toLowerCase();
            data[name] && (data[name] = value);
        });

        res.json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = getMessages;
