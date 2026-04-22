"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FiLogOut, FiMoreVertical, FiUser, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { UserProfile } from "@/types";
import { getUserInitials } from "@/lib/utils";

export default function NavUser({ user }: { user: UserProfile }) {
	const initials = getUserInitials(user);

	return (
		user && (
			<DropdownMenu>
				<DropdownMenuTrigger render={(
					<Button
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						variant="ghost"
					>
						<Avatar className="h-8 w-8 rounded-lg grayscale">
							{user.avatar
								? (<AvatarImage src={user.avatar} alt={`${user.firstname} ${user.lastname}`} />)
								: (<AvatarFallback className="rounded-lg uppercase">{initials}</AvatarFallback>)
							}
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user.firstname} {user.lastname}</span>
						</div>
						<FiMoreVertical />
					</Button>
				)}>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					align="end"
				>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link href={`/${user.user.id}`} className="flex gap-2">
								<FiUser />
								My Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<FiUsers />
							My Friends
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<FiLogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	);
}