"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes"
import { Gamepad2, GamepadIcon, Zap, Swords, ShieldCheck, Joystick, Ghost, Pickaxe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {


  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
      <div className={"flex flex-row"}>
        <div className="relative flex flex-col h-[78vh] md:w-1/2 md:text-left justify-center gap-y-6 overflow-visible text-center w-full">
          <div className={"absolute w-full h-full top-0 left-0 -z-10"}>
            {/* <Image src="/abstract.png" alt="bg" fill objectFit="cover" /> */}
          </div>
          <div className="flex flex-row gap-x-10 opacity-40 justify-center md:justify-start">
            <Gamepad2 />
            <Swords />
            <Joystick />
            <Ghost />
            <Pickaxe />
          </div>
          <h1 className={"text-6xl font-bold"}>Find your perfect games!</h1>
          <p className={"text-md text-muted-foreground w-full 2xl:w-2/3"}>With houndreds of games you can find something just right for you.</p>
          <div className={"flex flex-row gap-x-6 justify-center md:justify-start"}>
            <Button>Find games {"->"}</Button>
            <Button variant="link">Learn more </Button>

          </div>
        </div>
        <div className="w-2/3 2xl:w-1/2 h-[79vh] absolute top-0 right-0 translate-x-24 2xl:translate-x-0 2xl:translate-y-32 hidden md:block -z-10">
          <Image src="/hero.svg" alt="bg" fill objectFit="cover" className={"animate-wiggle"} />
        </div>
      </div>
      <div className="my-24">
        <h2 className="text-4xl font-extrabold text-center my-24">Popular Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Elden Ring", genre: "Action RPG", price: 59.99, image: "/bg2.jpg" },
              { title: "FIFA 23", genre: "Sports", price: 59.99, image: "/bg3.jpg" },
              { title: "Stardew Valley", genre: "Simulation", price: 14.99, image: "/bg4.jpg" },
            ].map((game, index) => (
              <Card key={index} className="overflow-hidden h-[400px]">
                <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4 ">
                  <h3 className="text-lg font-semibold text-gray-900">{game.title}</h3>
                  <Badge variant="secondary" className="mt-2">{game.genre}</Badge>
                  <p className="mt-2 text-gray-600">${game.price.toFixed(2)}</p>
                  <Button className="mt-4 w-full">See more {"->"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
      </div>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Why Choose GameVault?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <GamepadIcon className="h-8 w-8 text-primary" />, title: "Vast Selection", description: "Access to thousands of games across all platforms." },
              { icon: <Zap className="h-8 w-8 text-primary" />, title: "Instant Delivery", description: "Get your game keys instantly after purchase." },
              { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Secure Transactions", description: "Your payments and personal data are always protected." },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-lg py-16 px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start gaming?</span>
            <span className="block mt-1">Create an account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            Join our community of gamers and get access to exclusive deals and early releases.
          </p>
          <Button size="lg" variant="secondary" className="mt-8">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
}
