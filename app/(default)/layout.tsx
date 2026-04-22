import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import SiteHeader from "@/components/layout/site-header";
import UserProvider from "@/contexts/user-provider";
import { getCurrentUser, requireCurrentUser } from "@/data/auth";
import { getUserProfile } from "@/data/profile-dto";

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const user = await requireCurrentUser();
  const profile = await getUserProfile(user.id);
  return (
    <UserProvider initialUser={profile}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <section className="py-4 px-6 h-full max-h-full overflow-y-scroll">
            {children}
          </section>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
