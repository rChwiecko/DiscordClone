"use client";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import DashboardSidebar from "./_components/sidebar";

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

