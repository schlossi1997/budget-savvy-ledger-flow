
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  CreditCard, 
  Home, 
  PiggyBank,
  Settings, 
  TrendingUp
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: CreditCard,
  },
  {
    title: 'Budgets',
    url: '/budgets',
    icon: PiggyBank,
  },
  {
    title: 'Analysis',
    url: '/analysis',
    icon: BarChart3,
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <TrendingUp className="h-6 w-6 text-sidebar-accent" />
          <span className="text-xl font-bold">Budget Savvy</span>
        </div>
        <SidebarTrigger className="absolute top-3 right-4" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={isActive(item.url) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/settings" className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
