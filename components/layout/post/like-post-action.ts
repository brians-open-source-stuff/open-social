"use server";

import prisma from "@/config/prisma";
import { requireCurrentUser } from "@/data/auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({
	postId: z.string().uuid(),
});

export async function likePostAction(formData: FormData) {
	const user = await requireCurrentUser();
	const { postId } = Object.fromEntries(formData);

	const parsed = schema.safeParse({ postId });
	if (!parsed.success) {
		return { success: false, errors: ["Invalid post id"] };
	}

	const post = await prisma.post.findUnique({
		where: { id: parsed.data.postId },
		select: { id: true, userId: true },
	});

	if (!post) {
		return { success: false, errors: ["Post not found"] };
	}

	if (post.userId === user.id) {
		return { success: false, errors: ["You cannot like your own post"] };
	}

	try {
		await prisma.postLike.create({
			data: {
				userId: user.id,
				postId: post.id,
			},
		});
	} catch (error: any) {
		// P2002 = unique constraint violation -> already liked, treat as no-op
		if (error?.code !== "P2002") {
			console.error(error);
			return { success: false, errors: ["Could not like post"] };
		}
	}

	revalidatePath("/");
	return { success: true };
}