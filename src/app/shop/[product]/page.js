'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, ShoppingCart, ThumbsUp, ThumbsDown, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from '@/app/context/cart-context'
import { useToast } from "@/hooks/use-toast"


// This would typically come from an API or database
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

export default function ProductPage() {
  const params = useParams()
  const [game, setGame] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, content: '' })
  const [quantity, setQuantity] = useState(1)
  const { cart, addToCart, updateQuantity } = useCart()
  const { toast } = useToast()


  useEffect(() => {
    const productId = typeof params.product === 'string' ? parseInt(params.product, 10) : null
    if (productId) {
      const foundGame = games.find(g => g.id === productId)
      setGame(foundGame || null)
    }
  }, [params.product])

  useEffect(() => {
    if (game) {
      const cartItem = cart.find(item => item.id === game.id)
      if (cartItem) {
        setQuantity(cartItem.quantity)
      } else {
        setQuantity(1)
      }
    }
  }, [game, cart])

  const handleAddToCart = () => {
    if (game) {
      addToCart({
        id: game.id,
        title: game.title,
        price: game.price,
        quantity: quantity
      })
      console.log(`${quantity} ${quantity === 1 ? 'copy' : 'copies'} of ${game.title} added to cart.`)
      toast({
        title: `${quantity} ${quantity === 1 ? 'Item' : 'Items'} added to cart`,
        description: `The ${quantity === 1 ? 'game' : 'games'} has been added to your cart.`,
    })
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      if (cart.some(item => item.id === game.id)) {
        updateQuantity(game.id, newQuantity)
      }
    }
  }

  const handleHelpful = (reviewId, isHelpful) => {
    console.log(`Review ${reviewId} marked as ${isHelpful ? 'helpful' : 'not helpful'}`)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (game) {
      const newReviewObj = {
        id: game.reviews.length + 1,
        author: "Current User",
        avatar: "CU",
        rating: newReview.rating,
        content: newReview.content,
        helpful: 0,
        notHelpful: 0
      }
      setGame({
        ...game,
        reviews: [...game.reviews, newReviewObj]
      })
      // this clears the review form after submission
      setNewReview({ rating: 5, content: '' })
      toast({
        title: "Review Submitted",
        description: "Thank you for submitting your review!",
    })
    }
  }

  if (!game) {
    return <div className="container mx-auto p-4">Product not found</div>
  }

  return (
    <div className="w-full h-full p-5 mb-24 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
      <Link href="/shop" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Store
      </Link>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <img 
            src={`https://fakeimg.pl/500x300?text=Game`}
            alt={game.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <div className="flex items-center mb-4">
            <Badge variant="secondary" className="mr-2">{game.genre}</Badge>
            <Badge variant="outline">{game.releaseYear}</Badge>
          </div>
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(game.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-600">({game.rating})</span>
          </div>
          <p className="text-gray-700 mb-6">{game.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold">${game.price.toFixed(2)}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} className="px-8">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Game Details</h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-gray-500">Genre</dt>
                  <dd>{game.genre}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Release Year</dt>
                  <dd>{game.releaseYear}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Rating</dt>
                  <dd>{game.rating}/5</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="my-8" />
      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {game.reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.avatar}`} />
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{review.author}</span>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{review.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleHelpful(review.id, true)}
                      className="flex items-center hover:text-blue-600"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button 
                      onClick={() => handleHelpful(review.id, false)}
                      className="flex items-center hover:text-blue-600"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      <span>Not Helpful ({review.notHelpful})</span>
                    </button>
                  </div>
                  <span>Posted on {new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Separator className="my-8" />
      <section>
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        {isLoggedIn ? (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <RadioGroup
                id="rating"
                value={newReview.rating.toString()}
                onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value, 10) })}
                className="flex space-x-2"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`}>{rating}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                placeholder="Write your review here..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        ) : (
          <div>
            <p className="mb-4">Please log in to write a review.</p>
            <Button onClick={() => setIsLoggedIn(true)}>Log In</Button>
          </div>
        )}
      </section>
    </div>
  )
}