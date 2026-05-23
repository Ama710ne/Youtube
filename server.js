const express = require("express");
const { exec } = require("child_process");

const app = express();

app.use(express.json());

app.post("/stream", (req, res) => {

    const url = req.body.url;

    if (!url) {
        return res.status(400).json({
            error: "No URL"
        });
    }

    exec(`yt-dlp -g "${url}"`, (error, stdout, stderr) => {

        if (error) {

            return res.status(500).json({
                error: stderr
            });
        }

        res.json({
            streamUrl: stdout.trim()
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started");
});
