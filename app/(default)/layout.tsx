import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
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
            <section className="py-4 px-6 h-full overflow-y-scroll">
              {children}
            </section>
          </SidebarInset>
        </SidebarProvider>
  );
}
