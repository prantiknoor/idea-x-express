const fs = require("fs").promises;
const { OAuth2Client } = require("google-auth-library");
const { HttpError, loadSavedCredentialsIfExist } = require("../utils");
const { TOKEN_PATH } = require("../const");

const oauth2Client = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.OAUTH2_REDIRECT_URI,
});

const oAuth2CallbackHandler = async (req, res, next) => {
    const code = req.query.code;
    try {
        const tokenResponse = await oauth2Client.getToken(code);
        const tokens = tokenResponse.tokens;

        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: tokens.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);

        res.json({ message: "Authentication successful! Tokens saved." });
    } catch (error) {
        next(
            new HttpError(
                500,
                "Error retrieving access token: " + error.message
            )
        );
    }
};

const authController = async (req, res) => {
    if (!req.query.force && (await loadSavedCredentialsIfExist())) {
        return res.json({ message: "Already authenticated" });
    }

    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/gmail.readonly",
        prompt: "consent",
    });

    res.redirect(authorizeUrl);
};

module.exports = {
    authController,
    oAuth2CallbackHandler,
};
