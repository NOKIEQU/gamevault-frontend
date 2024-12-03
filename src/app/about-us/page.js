import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home Page
      </Link>
      
      <h1 className="text-4xl font-bold mb-8">About GameVault</h1>
      
      <section className="mb-12 grid md:grid-cols-2 gap-8 items-center">
        <div className='flex flex-col justify-start gap-y-10 h-[40vh]'>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-primary dark:text-white mb-4">
            At GameVault, we're passionate about bringing the best gaming experiences to our community. 
            Our mission is to create a haven for gamers of all levels, providing access to a vast library 
            of games, fostering a vibrant gaming community, and delivering exceptional customer service.
          </p>
          <p className="text-lg text-primary dark:text-white">
            We believe that games have the power to inspire, challenge, and connect people. That's why 
            we're committed to curating a diverse collection of titles across all genres and platforms.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="https://fakeimg.pl/500x300?text=About Us"
            alt="Gaming Community"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Why Choose GameVault?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vast Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access to thousands of games across multiple platforms and genres.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Join a thriving community of gamers, participate in events, and share your passion.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our knowledgeable team is always ready to assist you with any gaming-related queries.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">1M+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Happy Gamers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Games Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Customer Support</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gaming Events Yearly</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I purchase games on GameVault?</AccordionTrigger>
            <AccordionContent>
              Purchasing games on GameVault is easy! Simply browse our collection, add your desired games to your cart, and proceed to checkout. We offer various payment methods for your convenience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer refunds for most purchases within 14 days of purchase, provided the game has been played for less than 2 hours. Please check our refund policy for more details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I join the GameVault community?</AccordionTrigger>
            <AccordionContent>
              You can join our community by creating a GameVault account, participating in our forums, joining our Discord server, and attending our virtual and in-person gaming events.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      
      <section className="text-center border-t py-12">
        <h2 className="text-2xl font-semibold mb-6">Join the GameVault Family</h2>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're a casual gamer or a hardcore enthusiast, GameVault has something for everyone. 
          Join us in our mission to make gaming more accessible, enjoyable, and community-driven.
        </p>
        <Button size="lg">
          Sign Up Now
        </Button>
      </section>
    </div>
  )
}