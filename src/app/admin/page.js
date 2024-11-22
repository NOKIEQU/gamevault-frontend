'use client'

import { useState } from 'react'
import { BarChart, Users, ShoppingBag, DollarSign, Settings, Bell, Menu } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex-grow overflow-auto">

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,482</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Games</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$54,231</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,573</div>
                <p className="text-xs text-muted-foreground">+4.25% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#3210</TableCell>
                    <TableCell>Elden Ring</TableCell>
                    <TableCell>Olivia Martin</TableCell>
                    <TableCell className="text-right">$59.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3209</TableCell>
                    <TableCell>FIFA 23</TableCell>
                    <TableCell>Jackson Lee</TableCell>
                    <TableCell className="text-right">$49.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3208</TableCell>
                    <TableCell>Stardew Valley</TableCell>
                    <TableCell>Isabella Nguyen</TableCell>
                    <TableCell className="text-right">$14.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3207</TableCell>
                    <TableCell>Red Dead Redemption 2</TableCell>
                    <TableCell>William Kim</TableCell>
                    <TableCell className="text-right">$39.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3206</TableCell>
                    <TableCell>Minecraft</TableCell>
                    <TableCell>Sofia Davis</TableCell>
                    <TableCell className="text-right">$26.95</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}