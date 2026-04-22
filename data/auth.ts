import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/config/prisma";

export const getCurrentUser = cache(async function () {
	const token = (await cookies()).get("os_session");
	if (!token) return null;

	const decodedToken = await decrypt(token.value);

	if (!decodedToken) return null;

	const user = await prisma.user.findUnique({ where: { id: decodedToken.userId }, select: { id: true } })
	return user;
});

export async function requireCurrentUser() {
	const user = await getCurrentUser();
	if (!user) redirect("/sign-in");
	return user;
}