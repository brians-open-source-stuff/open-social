"use server";

import z from "zod";
import { signinFormState } from "@/types";
import prisma from "@/config/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
	email: z.email(),
	password: z.string()
});

export default async function loginAction(prevState: signinFormState, formData: FormData) {
	const { email, password } = Object.fromEntries(formData);

	const validated = loginSchema.safeParse({ email, password });

	if (!validated.success) {
		return {
			success: validated.success,
			...(z.treeifyError(validated.error)),
			data: {email, password}
		};
	}

	let user;

	try {
		user = await prisma.user.findUnique({ where: { email: validated.data.email } });
		if (!user || !await user?.validate(validated.data.password)) {
			return {
				success: false,
				errors: ["Incorrect email or password"],
				data: validated.data,
			};
		}
		await createSession(user.id);
	} catch (error) {
		console.error(error);
		return {
			success: false,
			errors: ["meh"]
		};	
	}
	
	redirect("/" + user.id);
}
