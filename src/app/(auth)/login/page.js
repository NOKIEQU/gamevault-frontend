"use client"
import { Metadata } from "next"
import React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/authForm"
import Logo from "@/components/logo"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:border lg:border-bg-primary/90 lg:rounded-md">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 hidden md:block"
          )}
        >
          {"<-"} Go back to Home Page
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r rounded-md">
          <div className="absolute inset-0 bg-secondary-foreground dark:bg-primary-foreground rounded-l-md overflow-hidden " >
            <Image
              src="/bg.png"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt=""
              className="opacity-10"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium gap-x-5">
            <Logo/> Game Vault
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <EmailForm />
        </div>
      </div>
    </>
  )
}

function EmailForm({ api }) {

    const [isLoading, setIsLoading] = React.useState(false)
  
    async function onSubmit(event) {
      event.preventDefault()
      setIsLoading(true)
  
      setTimeout(() => {
        setIsLoading(false)
        api.scrollNext()
      }, 1000)
    }
  
    return (
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to continue
        </p>
        <div className={"grid gap-6"}>
          <form tabIndex={"-1"} aria-hidden={true}>
            <div className="grid gap-2">
              <div className="grid gap-4">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Label className="sr-only" htmlFor="email">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className={"w-full mt-6"}>
                <Button onClick={onSubmit} className={"w-full"} disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </div>
  
            </div>
  
          </form>
         
        </div>
      </div>
  
    )
  }

function PersonalInfo () {
  
}