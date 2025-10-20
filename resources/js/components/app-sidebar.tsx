import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    CalendarCheck2,
    Folder,
    LayoutGrid,
    User,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isClinic = !!auth?.clinic;
    const isAdmin = !!auth.admin;
    const dashboardLink = isAdmin
        ? '/dashboard/admin'
        : isClinic
          ? '/dashboard/clinic'
          : '/dashboard/user';

    // 🏥 Main nav based on user type
    const mainNavItems: NavItem[] = isAdmin
        ? [
              {
                  title: 'Dashboard',
                  href: '/dashboard/admin',
                  icon: LayoutGrid,
              },
              {
                  title: 'Clinics',
                  href: '/dashboard/admin/clinics',
                  icon: Folder,
              },
              {
                  title: 'Users',
                  href: '/dashboard/admin/users',
                  icon: Folder,
              },
              {
                  title: 'Articles',
                  href: '/dashboard/admin/articles',
                  icon: BookOpen,
              },
              {
                  title: 'Profile',
                  href: '/dashboard/admin/profile',
                  icon: User,
              },
              {
                  title: 'Notifications',
                  href: '/dashboard/admin/notifications',
                  icon: Bell,
              },
          ]
        : isClinic
          ? [
                {
                    title: 'Dashboard',
                    href: '/dashboard/clinic',
                    icon: LayoutGrid,
                },
                {
                    title: 'Appointments',
                    href: '/dashboard/clinic/appointments',
                    icon: CalendarCheck2,
                },
                {
                    title: 'Health Info Hub',
                    href: '/dashboard/health-info',
                    icon: BookOpen,
                },
                {
                    title: 'Profile',
                    href: '/dashboard/clinic/profile',
                    icon: User,
                },
                {
                    title: 'Notifications',
                    href: '/dashboard/clinic/notifications',
                    icon: Bell,
                },
            ]
          : [
                {
                    title: 'Dashboard',
                    href: '/dashboard/user',
                    icon: LayoutGrid,
                },
                {
                    title: 'Appointments',
                    href: '/dashboard/user/appointments',
                    icon: CalendarCheck2,
                },
                {
                    title: 'Health Info Hub',
                    href: '/dashboard/health-info',
                    icon: BookOpen,
                },
                {
                    title: 'Profile',
                    href: '/dashboard/user/profile',
                    icon: User,
                },
                {
                    title: 'Notifications',
                    href: '/dashboard/user/notifications',
                    icon: Bell,
                },
            ];

    //   const footerNavItems: NavItem[] = [
    //     {
    //       title: 'Repository',
    //       href: 'https://github.com/laravel/react-starter-kit',
    //       icon: Folder,
    //     },
    //     {
    //       title: 'Documentation',
    //       href: 'https://laravel.com/docs/starter-kits#react',
    //       icon: BookOpen,
    //     },
    //   ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardLink} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* Optionally re-enable footer nav */}
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
