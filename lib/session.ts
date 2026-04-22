import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

type SessionPayload = {
	userId: string;
};

function isSessionPayload(payload: unknown): payload is SessionPayload {
	return (
		typeof payload === "object" &&
		payload !== null &&
		"userId" in payload &&
		typeof (payload as { userId: unknown }).userId === "string"
	);
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		if (!isSessionPayload(payload)) {
			return null;
		}

		return payload;
	} catch (error) {
		console.error("Failed to verify the session");
		return null;
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt })
	const cookieStore = await cookies();

	cookieStore.set("os_session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}