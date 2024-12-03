"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash, Search } from 'lucide-react'

const initialGenres = [
    { id: 1, name: "Action RPG", description: "Games that combine elements of action games and role-playing games." },
    { id: 2, name: "Sports", description: "Games that simulate the playing of traditional physical sports." },
    { id: 3, name: "Simulation", description: "Games designed to closely simulate real-world activities." },
    { id: 4, name: "Action Adventure", description: "Games that combine elements of action games and adventure games." },
    { id: 5, name: "Sandbox", description: "Games with open-ended gameplay and minimal restrictions on the player." },
    { id: 6, name: "First-Person Shooter", description: "Action games where the player's on-screen view is through the eyes of the character." },
    { id: 7, name: "Strategy", description: "Games that focus on skillful thinking and planning to achieve victory." },
    { id: 8, name: "Party", description: "Multiplayer games designed for social gatherings and group play." },
    { id: 9, name: "Roguelike", description: "Games characterized by dungeon crawling, procedural generation, and permanent death." },
    { id: 10, name: "Co-op Adventure", description: "Games designed for multiple players to work together to progress through a story or series of challenges." },
]
export default function GamesPage() {
    const [genres, setGenres] = useState(initialGenres)
    const [currentPage, setCurrentPage] = useState(1)
    const [editingGenre, setEditingGenre] = useState(null)
    const [newGenre, setNewGenre] = useState({ name: '', description: '' })
    const [searchTerm, setSearchTerm] = useState('')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    const itemsPerPage = 5
    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        genre.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const totalPages = Math.ceil(filteredGenres.length / itemsPerPage)
    const paginatedGenres = filteredGenres.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleEdit = (genre) => {
        setEditingGenre({ ...genre })
    }

    const handleSave = () => {
        setGenres(prevGenres => prevGenres.map(genre => genre.id === editingGenre.id ? editingGenre : genre))
        setEditingGenre(null)
    }

    const handleAddNew = () => {
        const newId = Math.max(...genres.map(genre => genre.id)) + 1
        const genreToAdd = { ...newGenre, id: newId }
        setGenres(prevGenres => [...prevGenres, genreToAdd])
        setNewGenre({ name: '', description: '' })
        setIsAddDialogOpen(false)
    }

    const handleDelete = (id) => {
        setGenres(prevGenres => prevGenres.filter(genre => genre.id !== id))
    }

    return (
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-semibold mb-6">Genres Management</h1>
            <div className="flex justify-between  items-center mb-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Genre
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Genre</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="new-title">
                                    Title
                                </Label>
                                <Input
                                    id="new-name"
                                    value={newGenre.name}
                                    onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new-description">
                                    Genre
                                </Label>
                                <Input
                                    value={newGenre.description}
                                    onValueChange={(value) => setNewGenre({ ...newGenre, description: value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleAddNew}>Add Genre</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className={"rounded-md border"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedGenres.map((genre) => (
                            <TableRow key={genre.id}>
                                <TableCell>{genre.name}</TableCell>
                                <TableCell>{genre.description}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(genre)}>
                                                <Pencil className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Genre</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="edit-name">Name</Label>
                                                    <Input
                                                        id="edit-name"
                                                        value={editingGenre?.name}
                                                        onChange={(e) => setEditingGenre({ ...editingGenre, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="edit-description">Description</Label>
                                                    <Input
                                                        id="edit-description"
                                                        value={editingGenre?.description}
                                                        onChange={(e) => setEditingGenre({ ...editingGenre, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-x-2">
                                                <Button variant="destructive"><Trash /> Delete Game</Button>
                                                <Button onClick={handleSave}>Save Changes</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
        </div>
    )
}