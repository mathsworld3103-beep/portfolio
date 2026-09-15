require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["mathsworld3103@gmail.com"],
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,

            html: `
                <h2>New Contact Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <hr>

                <h3>Message</h3>

                <p>${message}</p>
            `
        });

        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Email could not be sent."
            });
        }

        res.json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});