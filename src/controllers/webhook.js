const { saveHistoryId } = require("../utils");

const webhookController = async (req, res, next) => {
    try {
        let data = req.body.message.data;
        data = Buffer.from(data, "base64").toString("utf-8");
        data = JSON.parse(data);

        req.body.message.data = data
        console.log(req.body)

        await saveHistoryId(data.historyId)

        res.end()
    } catch (error) {
        next(error);
    }
};

module.exports = webhookController