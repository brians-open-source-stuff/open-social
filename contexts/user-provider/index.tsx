"use client";
import { UserProfile } from "@/types";
import { createContext } from "react";

type UserContextValue = {
	user: UserProfile | null;
};

export const userContext = createContext<UserContextValue>({ user: null });

export default function UserProvider({ children, initialUser }: Readonly<{ children: React.ReactNode, initialUser: UserProfile }>) {

	return (
		<userContext.Provider value={{ user: initialUser }}>
			{children}
		</userContext.Provider>
	);
}