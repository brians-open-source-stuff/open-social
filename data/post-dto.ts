import prisma from "@/config/prisma";
import "server-only";
import { getCurrentUser } from "./auth";

export async function getFeedPosts() {
	const viewer = await getCurrentUser();

	const posts = await prisma.post.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			user: {
				omit: {
					password: true,
					email: true,
				},
				include: {
					profile: true,
				},
			},
			_count: {
				select: { likes: true },
			},
			likes: viewer
				? {
					where: { userId: viewer.id },
					select: { id: true },
				}
				: false,
		},
	});

	return posts.map((post) => ({
		...post,
		likeCount: post._count.likes,
		likedByMe: viewer ? post.likes.length > 0 : false,
		isOwnPost: viewer ? post.userId === viewer.id : false,
	}));
}