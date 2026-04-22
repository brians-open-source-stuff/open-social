import "server-only";

import prisma from "@/config/prisma";

export async function getUserById(id: string) {
	return prisma.user.findUnique({
		where: { id },
		include: {
			profile: true
		}
	});
}

export type UserDTO = Awaited<ReturnType<typeof getUserById>>;