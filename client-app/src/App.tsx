import './index.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Dashboard from './components/Dashboard';
export function App() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <SidebarTrigger />
            <Dashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App;