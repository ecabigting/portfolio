// import { EmailTemplate } from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
	const { email, subject, message } = await req.json();
	try {
		console.log(subject);
		const data = await resend.emails.send({
			from: fromEmail,
			to: ["ericcabigting@outlook.com", "et.cabigting@gmail.com"],
			subject: subject + " [from ericcabigting.dev]",
			react: (
				<>
					<h4>Sender: {email}</h4>
					<h5>
						Subject: <u>{subject}</u>
					</h5>
					<p>Message:</p>
					<p>{message}</p>
				</>
			),
		});

		return Response.json(data);
	} catch (error) {
		return Response.json({ error });
	}
}
