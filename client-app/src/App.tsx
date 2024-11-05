import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Dashboard from './components/Dashboard';
import ManageAssessments from './components/ManageAssessments';

export function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex h-full w-full">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-4">
              <SidebarTrigger />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-assessments" element={<ManageAssessments />} />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Router>
  )
}

export default App;