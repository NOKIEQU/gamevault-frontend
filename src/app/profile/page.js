'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, User, Settings, CreditCard, ShoppingBag, Truck, AlertTriangle, LogOut, ReceiptText } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

// Mock data for orders
const orders = [
    {
        id: '1', date: '2023-05-01', total: 99.99, status: 'Delivered', items: [
            { name: 'Product A', quantity: 2, price: 29.99 },
            { name: 'Product B', quantity: 1, price: 40.01 }
        ]
    },
    {
        id: '2', date: '2023-05-15', total: 149.99, status: 'Processing', items: [
            { name: 'Product C', quantity: 1, price: 149.99 }
        ]
    },
    {
        id: '3', date: '2023-06-01', total: 79.99, status: 'Shipped', items: [
            { name: 'Product D', quantity: 3, price: 26.66 }
        ]
    },
]

// Mock user data
const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
    memberSince: '2022-01-01',
    totalOrders: 15,
    rewardsPoints: 500,
}

export default function UserDashboard() {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const router = useRouter()

    const handleOrderClick = (order) => {
        setSelectedOrder(order)
    }

    const handleReturnOrder = () => {
        // Implement return logic here
        console.log('Returning order:', selectedOrder.id)
        setSelectedOrder(null)
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Delivered':
                return <Badge variant="success">Delivered</Badge>
            case 'Processing':
                return <Badge variant="warning">Processing</Badge>
            case 'Shipped':
                return <Badge variant="info">Shipped</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
            <div className='flex flex-row w-full my-4 justify-between'>
                <h1 className="text-3xl font-bold">User Dashboard</h1>

                <Button variant={"outline"}><LogOut />Logout</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userData.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">+3 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rewards Points</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userData.rewardsPoints}</div>
                        <p className="text-xs text-muted-foreground">+120 from last month</p>
                    </CardContent>
                </Card>
            </div>
            <Tabs defaultValue="orders">
                <TabsList className="mb-4">
                    <TabsTrigger value="orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Orders</CardTitle>
                            <CardDescription>View and manage your recent orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.id}</TableCell>
                                            
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => handleOrderClick(order)}>View Details</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Order Details - #{order.id}</DialogTitle>
                                                            <DialogDescription>
                                                                Order placed on {order.date}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <h4 className="font-semibold mb-2">Items:</h4>
                                                            {order.items.map((item, index) => (
                                                                <div key={index} className="flex justify-between mb-2">
                                                                    <span>{item.name} (x{item.quantity})</span>
                                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                                </div>
                                                            ))}
                                                            <Separator className="my-2" />
                                                            <div className="flex justify-between font-semibold">
                                                                <span>Total:</span>
                                                                <span>${order.total.toFixed(2)}</span>
                                                            </div>
                                                            <div className="mt-4">
                                                                <p><strong>Status:</strong> {getStatusBadge(order.status)}</p>
                                                                {order.status === 'Shipped' && (
                                                                    <div className="flex items-center mt-2">
                                                                        <Truck className="mr-2 h-4 w-4" />
                                                                        <span>Estimated delivery: 2-3 business days</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline">
                                                                <ReceiptText className="mr-2 h-4 w-4"/>
                                                                Make Invoice
                                                                </Button>
                                                            {order.status === 'Delivered' && (
                                                                <Button onClick={handleReturnOrder}>
                                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                                    Return Order
                                                                </Button>
                                                            )}
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>View and edit your profile information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 mb-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={userData.avatar} alt={userData.name} />
                                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-2xl font-semibold">{userData.name}</h3>
                                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                                    <p className="text-sm text-muted-foreground">Member since: {new Date(userData.memberSince).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <div>
                                    <Label>Total Orders</Label>
                                    <p>{userData.totalOrders}</p>
                                </div>
                                <div>
                                    <Label>Rewards Points</Label>
                                    <p>{userData.rewardsPoints}</p>
                                </div>
                            </div>
                            <Button onClick={() => router.push('/profile/edit')} className="mt-6">Edit Profile</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account settings and preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">


                                <div>
                                    <h4 className="font-semibold mb-2">Language Preference</h4>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}