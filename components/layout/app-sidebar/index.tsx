import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href="/">
							<span className="text-base font-semibold">Open Social</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem>
						<SidebarMenuButton className="data-slot-sidebar-menu-button:p-1.5!">
							<Link href="/">Feed</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarGroup>
				<Separator />
				<SidebarGroup>
					<SidebarMenuItem>
						Friends
					</SidebarMenuItem>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}