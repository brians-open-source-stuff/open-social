"use server";

import prisma from "@/config/prisma";
import { formContentType } from "@/types";
import z from "zod";

const signupSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export default async function signupAction(prevState: formContentType, formData: FormData) {
	const { email, password, confirmPassword } = Object.fromEntries(formData);

	const validated = signupSchema.safeParse({email, password, confirmPassword});

	if (!validated.success) {
		return {
			success: validated.success,
			...(z.treeifyError(validated.error)),
			data: { email, password, },
		};
	}

	try {
		const user = await prisma.user.create({
			data: {
				email: validated.data.email,
				password: validated.data.password,
			}
		});
		console.log(user);
		return {};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			errors: ["blah"],
			data: validated.data,
		};
	}
}