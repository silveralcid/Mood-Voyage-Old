import * as React from "react"
import { Link } from "react-router-dom";
import '../index.css';
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  ChevronDown,
  ChevronRight
} from "lucide-react"

import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      to: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Assessments",
      to: "/assessments",
      icon: Bot,
      items: [
        {
          title: "New Assessment",
          to: "/new-assessment",
        },
        {
          title: "Manage Assessments",
          to: "/manage-assessments",
        },
      ],
    },
    {
      title: "Learning",
      to: "/learning",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          to: "/learning/introduction",
        },
        {
          title: "Get Started",
          to: "/learning/get-started",
        },
        {
          title: "Tutorials",
          to: "/learning/tutorials",
        },
        {
          title: "Changelog",
          to: "/learning/changelog",
        },
      ],
    },
    {
      title: "Settings",
      to: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          to: "/settings/general",
        },
        {
          title: "Team",
          to: "/settings/team",
        },
        {
          title: "Billing",
          to: "/settings/billing",
        },
        {
          title: "Limits",
          to: "/settings/limits",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      to: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      to: "/feedback",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderNavItems = (items: any[]) => {
    return items.map((item, index) => (
      <div key={index} className="group">
        {item.items ? (
          // Item with submenu
          <div>
            <div 
              onClick={() => toggleMenu(item.title)}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="mr-2 size-4" />}
                <span>{item.title}</span>
              </div>
              {openMenus[item.title] ? 
                <ChevronDown className="size-4 text-gray-500" /> : 
                <ChevronRight className="size-4 text-gray-500" />
              }
            </div>
            
            {openMenus[item.title] && item.items && (
              <div className="pl-4 bg-gray-50">
                {item.items.map((subItem: any, subIndex: number) => (
                  <Link
                    key={subIndex}
                    to={subItem.to}
                    className="block p-2 hover:bg-gray-100 text-sm"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Simple navigation item
          <Link 
            to={item.to} 
            className="flex items-center p-2 hover:bg-gray-100"
          >
            {item.icon && <item.icon className="mr-2 size-4" />}
            {item.title}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                  <span className="truncate font-semibold">Mood Voyage</span>
                  <span className="truncate text-xs">NVC-based Needs Tracking</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <nav>
          {renderNavItems(data.navMain)}
        </nav>
        <div className="mt-auto">
          <NavSecondary 
            items={data.navSecondary.map(item => ({
              ...item,
              url: item.to // Compatibility with existing NavSecondary component
            }))} 
            className="mt-auto" 
          />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar