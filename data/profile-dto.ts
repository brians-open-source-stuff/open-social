import "server-only";
import { getCurrentUser } from "./auth";
import prisma from "@/config/prisma";
import { UserProfile } from "@/types";

export async function getUserProfile(userId: string): Promise<UserProfile> {
	const viewer = await getCurrentUser();
	const isSelf = viewer?.id === userId;

	const profile = await prisma.profile.findUnique({
		where: { userId },
		select: isSelf
			? {
				id: true,
				firstname: true,
				lastname: true,
				nickname: true,
				avatarMedia: true,
				user: {
					select: { id: true, email: true }
				}
			}
			: {
				id: true,
				firstname: true,
				lastname: true,
				avatarMedia: true,
			},
	});

	if (!profile) return null;

	if (isSelf) return {
		kind: "self",
		...profile,
	}

	return {
		kind: "public",
		...profile,
	}
}