"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash, Search, X } from 'lucide-react'

const genres = ["Action RPG", "Sports", "Simulation", "Action Adventure", "Sandbox", "First-Person Shooter", "Strategy", "Party", "Roguelike", "Co-op Adventure"];

// Mock data - replace with actual API call
const initialGames = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "Action RPG",
    price: 59.99,
    rating: 4.8,
    releaseYear: 2022,
    description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
    images: ["/placeholder.svg?height=200&width=300"],
    reviews: [
      { id: 1, author: "John Doe", avatar: "JD", rating: 5, content: "Amazing game! The open world is breathtaking.", helpful: 42, notHelpful: 3 },
      { id: 2, author: "Jane Smith", avatar: "JS", rating: 4, content: "Great game, but the difficulty can be frustrating at times.", helpful: 28, notHelpful: 5 },
    ]
  },
  {
    id: 2,
    title: "FIFA 23",
    genre: "Sports",
    price: 59.99,
    rating: 4.5,
    releaseYear: 2022,
    description: "FIFA 23 is a football simulation video game published by Electronic Arts. It's the latest installment in the FIFA series.",
    images: ["/placeholder.svg?height=200&width=300"],
    reviews: [
      { id: 3, author: "Emily Chen", avatar: "EC", rating: 5, content: "The most realistic football game yet! Graphics are incredible.", helpful: 56, notHelpful: 2 },
      { id: 4, author: "Mike Johnson", avatar: "MJ", rating: 4, content: "Great gameplay, but not much different from last year's version.", helpful: 34, notHelpful: 8 },
    ]
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    genre: "Action RPG",
    price: 49.99,
    rating: 4.2,
    releaseYear: 2020,
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification.",
    images: ["/placeholder.svg?height=200&width=300"],
    reviews: [
      { id: 5, author: "Alice Brown", avatar: "AB", rating: 4, content: "Great story and visuals, but buggy.", helpful: 50, notHelpful: 10 },
      { id: 6, author: "Bob White", avatar: "BW", rating: 3, content: "Needs more polish, but has potential.", helpful: 30, notHelpful: 15 },
    ]
  },
  {
    id: 4,
    title: "The Witcher 3: Wild Hunt",
    genre: "Action RPG",
    price: 39.99,
    rating: 4.9,
    releaseYear: 2015,
    description: "The Witcher 3: Wild Hunt is a story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    images: ["/placeholder.svg?height=200&width=300"],
    reviews: [
      { id: 7, author: "Charlie Green", avatar: "CG", rating: 5, content: "Masterpiece! Best RPG ever.", helpful: 70, notHelpful: 2 },
      { id: 8, author: "Diana Black", avatar: "DB", rating: 5, content: "Incredible story and characters.", helpful: 60, notHelpful: 3 },
    ]
  },
  {
    id: 5,
    title: "Minecraft",
    genre: "Sandbox",
    price: 26.95,
    rating: 4.7,
    releaseYear: 2011,
    description: "Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles.",
    images: ["/placeholder.svg?height=200&width=300"],
    reviews: [
      { id: 9, author: "Eve White", avatar: "EW", rating: 5, content: "Endless creativity and fun.", helpful: 80, notHelpful: 5 },
      { id: 10, author: "Frank Black", avatar: "FB", rating: 4, content: "Great game, but can get repetitive.", helpful: 40, notHelpful: 10 },
    ]
  }
  
]

export default function GamesPage() {
  const [games, setGames] = useState(initialGames)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingGame, setEditingGame] = useState(null)
  const [newGame, setNewGame] = useState({
    title: '',
    genre: '',
    price: '',
    releaseYear: '',
    description: '',
    images: [],
  })
  const [errors, setErrors] = useState({
    title: '',
    genre: '',
    price: '',
    releaseYear: '',
    description: '',
    images: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const fileInputRef = useRef(null)

  const itemsPerPage = 10
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    if (!isAddDialogOpen) {
      setNewGame({
        title: '',
        genre: '',
        price: '',
        releaseYear: '',
        description: '',
        images: [],
      })
      setErrors({
        title: '',
        genre: '',
        price: '',
        releaseYear: '',
        description: '',
        images: '',
      })
    }
  }, [isAddDialogOpen])

  const handleEdit = (game) => {
    setEditingGame({ ...game })
  }

  const handleSave = () => {
    setGames(prevGames => prevGames.map(game => game.id === editingGame.id ? editingGame : game))
    setEditingGame(null)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      title: '',
      genre: '',
      price: '',
      releaseYear: '',
      description: '',
      images: '',
    }

    if (!newGame.title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }

    if (!newGame.genre) {
      newErrors.genre = 'Genre is required'
      isValid = false
    }

    if (!newGame.price || isNaN(parseFloat(newGame.price))) {
      newErrors.price = 'Valid price is required'
      isValid = false
    }

    if (!newGame.releaseYear || isNaN(parseInt(newGame.releaseYear))) {
      newErrors.releaseYear = 'Valid release year is required'
      isValid = false
    }

    if (!newGame.description.trim()) {
      newErrors.description = 'Description is required'
      isValid = false
    }

    if (newGame.images.length === 0) {
      newErrors.images = 'At least one image is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddNew = () => {
    if (validateForm()) {
      const newId = Math.max(...games.map(game => game.id)) + 1
      const gameToAdd = { 
        ...newGame, 
        id: newId, 
        rating: 0, 
        reviews: [],
        price: parseFloat(newGame.price),
        releaseYear: parseInt(newGame.releaseYear),
      }
      setGames(prevGames => [...prevGames, gameToAdd])
      setIsAddDialogOpen(false)
    }
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    if (newGame.images.length + files.length > 5) {
      setErrors(prev => ({ ...prev, images: "You can only upload a maximum of 5 images." }))
      return
    }
    const newImages = files.map(file => URL.createObjectURL(file))
    setNewGame(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    setErrors(prev => ({ ...prev, images: '' }))
  }

  const removeImage = (index) => {
    setNewGame(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-semibold mb-6">Games Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Game
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Game</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-title">Title</Label>
                <Input
                  id="new-title"
                  value={newGame.title}
                  onChange={(e) => {
                    setNewGame({ ...newGame, title: e.target.value })
                    setErrors(prev => ({ ...prev, title: '' }))
                  }}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-genre">Genre</Label>
                <Select
                  value={newGame.genre}
                  onValueChange={(value) => {
                    setNewGame({ ...newGame, genre: value })
                    setErrors(prev => ({ ...prev, genre: '' }))
                  }}
                >
                  <SelectTrigger id="new-genre">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-price">Price</Label>
                <Input
                  id="new-price"
                  type="number"
                  value={newGame.price}
                  onChange={(e) => {
                    setNewGame({ ...newGame, price: e.target.value })
                    setErrors(prev => ({ ...prev, price: '' }))
                  }}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-releaseYear">Release Year</Label>
                <Input
                  id="new-releaseYear"
                  type="number"
                  value={newGame.releaseYear}
                  onChange={(e) => {
                    setNewGame({ ...newGame, releaseYear: e.target.value })
                    setErrors(prev => ({ ...prev, releaseYear: '' }))
                  }}
                />
                {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={newGame.description}
                  onChange={(e) => {
                    setNewGame({ ...newGame, description: e.target.value })
                    setErrors(prev => ({ ...prev, description: '' }))
                  }}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Game Images (1-5 images)</Label>
                <div className="flex flex-wrap gap-2">
                  {newGame.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Game ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {newGame.images.length < 5 && (
                  <Button onClick={() => fileInputRef.current.click()} variant="outline">
                    Add Image
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                />
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddNew}>Add Game</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Release Year</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedGames.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.title}</TableCell>
                <TableCell>{game.genre}</TableCell>
                <TableCell>${game.price.toFixed(2)}</TableCell>
                <TableCell>{game.rating}</TableCell>
                <TableCell>{game.releaseYear}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(game)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Game</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={editingGame?.title}
                            onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="genre">Genre</Label>
                          <Select
                            value={editingGame?.genre}
                            onValueChange={(value) => setEditingGame({ ...editingGame, genre: value })}
                          >
                            <SelectTrigger id="genre">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            <SelectContent>
                              {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            value={editingGame?.price}
                            onChange={(e) => setEditingGame({ ...editingGame, price: parseFloat(e.target.value) })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="releaseYear">Release Year</Label>
                          <Input
                            id="releaseYear"
                            type="number"
                            value={editingGame?.releaseYear}
                            onChange={(e) => setEditingGame({ ...editingGame, releaseYear: parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={editingGame?.description}
                            onChange={(e) => setEditingGame({ ...editingGame, description: e.target.value })}
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