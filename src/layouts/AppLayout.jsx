import { Outlet } from "react-router";
import Sidebar from "@/Components/Sider/Sider";
import Header from "@/Components/Header/Header";
import "@/Components/ui/BackgroundGlow"
import BackgroundGlow  from "@/Components/ui/BackgroundGlow";
export default function AppLayout() {
  return (
    <div className="relative isolate flex min-h-screen bg-canvas text-ink">
   
     <BackgroundGlow/>

      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
