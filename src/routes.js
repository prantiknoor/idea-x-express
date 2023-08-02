const { getHealth } = require("./controllers");
const { authController, oAuth2CallbackHandler } = require("./controllers/auth");
const getHistory = require("./controllers/history");
const getLabels = require("./controllers/labels");
const getMessages = require("./controllers/messages");
const webhookController = require("./controllers/webhook");
const authMiddleware = require("./middlewares/auth");

const router = require("express").Router();

router.get("/", (_req, res) =>
    res.status(200).json({ message: "Welcome to IDEA-X" })
);
router.get("/health", getHealth);

router.get("/auth", authController)
router.get("/oauth2callback", oAuth2CallbackHandler)

router.get('/labels', authMiddleware, getLabels)
router.get("/history/:historyId", authMiddleware, getHistory);
router.get("/messages/:messageId", authMiddleware, getMessages);

router.post('/webhook', require('express').json(), webhookController)


module.exports = router;
