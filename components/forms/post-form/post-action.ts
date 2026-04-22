"use server";

import prisma from "@/config/prisma";
import { requireCurrentUser } from "@/data/auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({
	content: z.string(),
	userId: z.string()
});

export default async function postAction(prevState: any, formData: FormData) {
	const user = await requireCurrentUser();
	const { content } = Object.fromEntries(formData);

	const validated = schema.safeParse({
		content,
		userId: user.id
	});

	if (!validated.success) {
		return {
			success: validated.success,
			...(z.treeifyError(validated.error)),
			data: { content }
		};
	}

	try {
		await prisma.post.create({
			data: {
				content: validated.data.content,
				userId: validated.data.userId,
			}
		});
		return revalidatePath("/");
	} catch (error) {
		console.error(error);
		return {
			success: false,
			errors: ["blah"],
			data: validated.data,
		};
	}
}