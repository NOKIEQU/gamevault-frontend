'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Check, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from '@/app/context/cart-context'

const games = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "Action RPG",
    price: 59.99,
    rating: 4.8,
    releaseYear: 2022,
    description: "Elden Ring is an action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment.",
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
    reviews: [
      { id: 3, author: "Emily Chen", avatar: "EC", rating: 5, content: "The most realistic football game yet! Graphics are incredible.", helpful: 56, notHelpful: 2 },
      { id: 4, author: "Mike Johnson", avatar: "MJ", rating: 4, content: "Great gameplay, but not much different from last year's version.", helpful: 34, notHelpful: 8 },
    ]
  },
  {
    id: 3,
    title: "Stardew Valley",
    genre: "Simulation",
    price: 14.99,
    rating: 4.9,
    releaseYear: 2016,
    description: "Stardew Valley is a simulation role-playing game developed by ConcernedApe. Players take on the role of a character who inherits their grandfather's old farm plot.",
    reviews: [
      { id: 5, author: "Sarah Williams", avatar: "SW", rating: 5, content: "So relaxing and addictive! I love tending to my farm.", helpful: 78, notHelpful: 1 },
      { id: 6, author: "Tom Baker", avatar: "TB", rating: 5, content: "Incredible depth and charm. A must-play for any gamer.", helpful: 65, notHelpful: 3 },
    ]
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    genre: "Action Adventure",
    price: 59.99,
    rating: 4.7,
    releaseYear: 2018,
    description: "Red Dead Redemption 2 is an action-adventure game developed and published by Rockstar Games. Set in the Wild West, it follows the story of outlaw Arthur Morgan.",
    reviews: [
      { id: 7, author: "Alex Turner", avatar: "AT", rating: 5, content: "The attention to detail in this game is unparalleled. A masterpiece!", helpful: 92, notHelpful: 4 },
      { id: 8, author: "Olivia Martinez", avatar: "OM", rating: 4, content: "Fantastic story and gameplay, but can feel slow at times.", helpful: 53, notHelpful: 7 },
    ]
  },
  {
    id: 5,
    title: "Minecraft",
    genre: "Sandbox",
    price: 26.95,
    rating: 4.8,
    releaseYear: 2011,
    description: "Minecraft is a sandbox video game developed by Mojang Studios. The game allows players to build with a variety of different blocks in a 3D procedurally generated world.",
    reviews: [
      { id: 9, author: "Chris Peterson", avatar: "CP", rating: 5, content: "Endless creativity and fun. Great for all ages!", helpful: 87, notHelpful: 3 },
      { id: 10, author: "Lisa Wong", avatar: "LW", rating: 4, content: "Amazing game, but can be overwhelming for beginners.", helpful: 42, notHelpful: 6 },
    ]
  },
  {
    id: 6,
    title: "Overwatch 2",
    genre: "First-Person Shooter",
    price: 0,
    rating: 4.3,
    releaseYear: 2022,
    description: "Overwatch 2 is a team-based multiplayer first-person shooter developed and published by Blizzard Entertainment. It's a free-to-play game with various heroes to choose from.",
    reviews: [
      { id: 11, author: "Emma Davis", avatar: "ED", rating: 4, content: "Fun and fast-paced gameplay, but microtransactions can be annoying.", helpful: 63, notHelpful: 8 },
      { id: 12, author: "Ryan Cooper", avatar: "RC", rating: 5, content: "Great improvement over the original. Love the new heroes!", helpful: 51, notHelpful: 3 },
    ]
  },
  {
    id: 7,
    title: "Civilization VI",
    genre: "Strategy",
    price: 59.99,
    rating: 4.6,
    releaseYear: 2016,
    description: "Civilization VI is a turn-based strategy 4X video game developed by Firaxis Games. It's the latest entry in the Civilization series.",
    reviews: [
      { id: 13, author: "Daniel Lee", avatar: "DL", rating: 5, content: "The best Civilization game yet. So many ways to play!", helpful: 76, notHelpful: 2 },
      { id: 14, author: "Sophie Brown", avatar: "SB", rating: 4, content: "Addictive gameplay, but can be overwhelming for newcomers.", helpful: 58, notHelpful: 7 },
    ]
  },
  {
    id: 8,
    title: "Among Us",
    genre: "Party",
    price: 4.99,
    rating: 4.5,
    releaseYear: 2018,
    description: "Among Us is an online multiplayer social deduction game developed and published by InnerSloth. Players complete tasks while trying to identify impostors among the crew.",
    reviews: [
      { id: 15, author: "Jake Wilson", avatar: "JW", rating: 5, content: "So much fun with friends! Simple yet addictive gameplay.", helpful: 89, notHelpful: 4 },
      { id: 16, author: "Mia Garcia", avatar: "MG", rating: 4, content: "Great party game, but can get repetitive with the same group.", helpful: 67, notHelpful: 9 },
    ]
  },
  {
    id: 9,
    title: "Hades",
    genre: "Roguelike",
    price: 24.99,
    rating: 4.9,
    releaseYear: 2020,
    description: "Hades is a roguelike action dungeon crawler developed and published by Supergiant Games. Players control Zagreus, the son of Hades, as he attempts to escape from the Underworld.",
    reviews: [
      { id: 17, author: "Liam Taylor", avatar: "LT", rating: 5, content: "Incredible art, music, and gameplay. A perfect roguelike!", helpful: 95, notHelpful: 1 },
      { id: 18, author: "Ava Robinson", avatar: "AR", rating: 5, content: "Addictive gameplay with a surprisingly deep story. Can't stop playing!", helpful: 82, notHelpful: 3 },
    ]
  },
  {
    id: 10,
    title: "It Takes Two",
    genre: "Co-op Adventure",
    price: 39.99,
    rating: 4.8,
    releaseYear: 2021,
    description: "It Takes Two is a cooperative action-adventure platform game developed by Hazelight Studios. The game follows the story of a couple on the verge of divorce who must work together to escape a fantastical world.",
    reviews: [
      { id: 19, author: "Noah Adams", avatar: "NA", rating: 5, content: "Best co-op game I've ever played. So creative and fun!", helpful: 103, notHelpful: 2 },
      { id: 20, author: "Isabella Kim", avatar: "IK", rating: 4, content: "Great game to play with a partner. Puzzles are clever and engaging.", helpful: 79, notHelpful: 5 },
    ]
  }
];

const genres = ["Action RPG", "Sports", "Simulation", "Action Adventure", "Sandbox", "First-Person Shooter", "Strategy", "Party", "Roguelike", "Co-op Adventure"];

export default function GameStore() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [selectedYears, setSelectedYears] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()
  const { cart, addToCart, updateQuantity } = useCart()

  const itemsPerPage = 6
  const filteredGames = games.filter(game =>
    (selectedGenres.length === 0 || selectedGenres.includes(game.genre)) &&
    game.price >= priceRange[0] && game.price <= priceRange[1] &&
    game.rating >= minRating &&
    (selectedYears.length === 0 || selectedYears.includes(game.releaseYear))
  )

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
    setCurrentPage(1)
  }

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      quantity: 1
    })
    toast({
      title: "Item Added",
      description: "The game has been added to your cart.",
  })
    console.log(`${game.title} has been added to your cart.`)
  }

  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden mb-10">
      <h1 className="text-3xl font-bold mb-6">Game Store</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Genres</h3>
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => handleGenreChange(genre)}
                        />
                        <label htmlFor={genre} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value)
                        setCurrentPage(1)
                      }}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Minimum Rating</h3>
                    <Slider
                      min={0}
                      max={5}
                      step={0.1}
                      value={[minRating]}
                      onValueChange={([value]) => {
                        setMinRating(value)
                        setCurrentPage(1)
                      }}
                      className="mb-2"
                    />
                    <div className="text-sm text-muted-foreground">{minRating.toFixed(1)} / 5</div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Release Year</h3>
                    {Array.from(new Set(games.map(game => game.releaseYear))).sort().map(year => (
                      <div key={year} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`year-${year}`}
                          checked={selectedYears.includes(year)}
                          onCheckedChange={() => {
                            setSelectedYears(prev =>
                              prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
                            )
                            setCurrentPage(1)
                          }}
                        />
                        <label htmlFor={`year-${year}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedGames.map(game => {
              const cartItem = cart.find(item => item.id === game.id)
              return (
                <Card key={game.id} className="flex flex-col justify-between">
                  <Link href={`/shop/${game.id}`} className="flex-grow">
                    <div>
                      <img 
                        src={`https://fakeimg.pl/500x300?text=Game`}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start">
                          <span className="text-lg">{game.title}</span>
                          <Badge variant="secondary">{game.releaseYear}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{game.genre}</p>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(game.rating) ? "★" : "☆"}
                            </span>
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({game.rating})</span>
                        </div>
                      </CardContent>
                    </div>
                  </Link>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-bold">${game.price.toFixed(2)}</span>
                    {cartItem ? (
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(game.id, cartItem.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(game.id, cartItem.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        <ShoppingCart size={20} />
                        <span className="sr-only">Add to Cart</span>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="icon"
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
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}