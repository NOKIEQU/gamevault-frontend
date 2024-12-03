"use client"

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Pencil, Search, Trash2 } from 'lucide-react'

// Mock data - replace with actual API call
const initialSales = [
  { id: 1, orderId: "ORD001", game: "Elden Ring", user: "John Doe", price: 59.99, status: "Completed" },
  { id: 2, orderId: "ORD002", game: "FIFA 23", user: "Jane Smith", price: 59.99, status: "Processing" },
  { id: 3, orderId: "ORD003", game: "Cyberpunk 2077", user: "Mike Johnson", price: 49.99, status: "Shipped" },
  { id: 4, orderId: "ORD004", game: "The Legend of Zelda: Breath of the Wild", user: "Emily Brown", price: 59.99, status: "Completed" },
  { id: 5, orderId: "ORD005", game: "Red Dead Redemption 2", user: "Chris Wilson", price: 39.99, status: "Cancelled" },
  { id: 6, orderId: "ORD006", game: "Grand Theft Auto V", user: "Sarah Davis", price: 29.99, status: "Processing" },
  { id: 7, orderId: "ORD007", game: "Minecraft", user: "Tom Anderson", price: 26.95, status: "Shipped" },
  { id: 8, orderId: "ORD008", game: "The Witcher 3: Wild Hunt", user: "Lisa Taylor", price: 39.99, status: "Completed" },
  { id: 9, orderId: "ORD009", game: "Overwatch", user: "David Moore", price: 39.99, status: "Processing" },
  { id: 10, orderId: "ORD010", game: "Animal Crossing: New Horizons", user: "Emma White", price: 59.99, status: "Shipped" },

]

const orderStatuses = ["Processing", "Shipped", "Completed", "Cancelled"]

export default function SalesPage() {
  const [sales, setSales] = useState(initialSales)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingSale, setEditingSale] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const itemsPerPage = 5

  const filteredSales = useMemo(() => {
    return sales.filter(sale =>
      sale.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.user.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sales, searchTerm])

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage)

  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredSales.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredSales, currentPage])

  const handleEdit = (sale) => {
    setEditingSale({ ...sale })
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    setSales(prevSales => prevSales.map(sale => sale.id === editingSale.id ? editingSale : sale))
    setIsEditDialogOpen(false)
    setEditingSale(null)
  }

  const handleDelete = () => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== editingSale.id))
    setIsEditDialogOpen(false)
    setEditingSale(null)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-semibold mb-6">Sales Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sales..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)  // Reset to first page on new search
            }}
          />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.orderId}</TableCell>
                <TableCell>{sale.game}</TableCell>
                <TableCell>{sale.user}</TableCell>
                <TableCell>${sale.price.toFixed(2)}</TableCell>
                <TableCell>{sale.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(sale)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Order Status</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Order Status</Label>
              <Select
                value={editingSale?.status}
                onValueChange={(value) => setEditingSale({ ...editingSale, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select order status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Order
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}