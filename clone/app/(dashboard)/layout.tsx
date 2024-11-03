"use client";
import dynamic from "next/dynamic";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { RedirectToSignIn, useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Sidebar, User2Icon } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render the layout only if the user is signed in
  return (
    <div>
      <SignedIn>
        <SidebarProvider>
          heyyyyyyyyyyyy
          <DashboardSidebar />
          {children}
        </SidebarProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <Authenticated>
//         <SidebarProvider>
//           <DashboardSidebar />
//           {children}
//         </SidebarProvider>
//       </Authenticated>
//       <Unauthenticated>
//         <RedirectToSignIn />
//       </Unauthenticated>
//     </div>
//   );
// }

function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/friends">
                    <User2Icon />
                    Friends
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
