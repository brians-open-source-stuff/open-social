"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FiLogOut, FiMoreVertical, FiUser, FiUsers } from "react-icons/fi";
import Link from "next/link";

export default function NavUser({ user }: { user: { name: string, avatar: string } }) {

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={(
				<Button
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					variant="ghost"
				>
					<Avatar className="h-8 w-8 rounded-lg grayscale">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.name}</span>
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
						<Link href={`/${user.name}`} className="flex gap-2">
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
	);
}