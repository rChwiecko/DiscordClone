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
import { RedirectToSignIn } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Sidebar, User2Icon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  
  return (
    <div>
      <Authenticated>
        <SidebarProvider>
          <DashboardSidebar />
          {children}
        </SidebarProvider>
      </Authenticated>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
    </div>
  );
}

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
