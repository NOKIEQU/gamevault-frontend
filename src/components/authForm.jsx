"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, GraduationCap, Mail } from "lucide-react"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useEffect, useState } from "react"
import Logo from "./logo"

export function UserAuthForm({ className, ...props }) {

  const [api, setApi] = React.useState()

  useEffect(() => {
    if (!api) {
      return
    }
    
  }, [api])


  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="w-full flex flex-col justify-center items-center mb-10 lg:hidden">
          <Logo />
          <h3>Game Vault</h3>
        </div>
      </div>
      <div>
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false }}
        >
          <CarouselContent >
            <CarouselItem >
              <EmailForm api={api} />
            </CarouselItem>
            {/* <CarouselItem>
              <PickRole api={api} />
            </CarouselItem> */}
            <CarouselItem>
              <PersonalInfo api={api} />
            </CarouselItem>
            <CarouselItem>
              <PasswordForm api={api} />
            </CarouselItem>
          </CarouselContent>

        </Carousel>
      </div>
    </div>

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
        Create an account
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your email below to create your account
      </p>
      <div className={"grid gap-6"}>
        <form tabIndex={"-1"} aria-hidden={true}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className={"w-full mt-6"}>
              <Button onClick={onSubmit} className={"w-full"} disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next Step {"->"}
              </Button>
            </div>

          </div>

        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>

  )
}

// function PickRole({ api }) {

//   const [isLoading, setIsLoading] = React.useState(false)

//   async function onSubmit(event) {
//     event.preventDefault()
//     setIsLoading(true)

//     setTimeout(() => {
//       setIsLoading(false)
//       api.scrollNext()
//     }, 1000)
//   }

//   return (
//     <div className="flex flex-col space-y-4 text-center">
//       <h1 className="text-2xl font-semibold tracking-tight">
//         Who are you?
//       </h1>
//       <p className="text-sm text-muted-foreground">
//         You need to select, which account you want to create.
//       </p>
//       <div className={"grid gap-6"}>
//         <form tabIndex={"-1"} aria-hidden={true}>
//           <div className="grid gap-6">
//             <div className="grid gap-6">
//               <Label className="sr-only">
//                 Learner
//               </Label>
//               <Button onClick={(e) => onSubmit(e)} disabled={isLoading} variant="outline" className="flex flex-col justify-center items-center p-4 h-full">
//                 <User className="h-5 w-5" />
//                 <h3 className="text-1xl font-semibold">Learner</h3>
//                 <p className="text-sm text-muted-foreground">
//                   I'd like to find an instructor.
//                 </p>
//               </Button>
//               <Label className="sr-only">
//                 Instructor
//               </Label>
//               <Button onClick={(e) => onSubmit(e)} disabled={isLoading} variant="outline" className="flex flex-col justify-center items-center p-4 h-full">
//                 <GraduationCap className="h-5 w-5" />
//                 <h3 className="text-1xl font-semibold">Instructor</h3>
//                 <p className="text-sm text-muted-foreground">
//                   I'd like to offer my lessons to learners.
//                 </p>
//               </Button>
//             </div>
//             <Button variant={"outline"} onClick={(e) => { api.scrollPrev(e.preventDefault()) }} disabled={isLoading}>
//               {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>{"<-"} Previous Step</>}

//             </Button>
//           </div>

//         </form>

//       </div>
//     </div>
//   )
// }

function PersonalInfo({ api }) {
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
        Information about you
      </h1>
      <p className="text-sm text-muted-foreground">
        Your details are fully confidential and not shared with anyone.
      </p>
      <div className={"grid gap-6"}>
        <form tabIndex={"-1"} aria-hidden={true}>
          <div className="grid gap-2">
            <div className="grid gap-2 text-left">
              <Label className="m-1">Full Name*</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
              />
              <Label className="m-1">Date of Birth*</Label>
              <div className="flex flex-row justify-between gap-2">
                <Input
                  id="day"
                  placeholder="DD"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="day"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Input
                  id="month"
                  placeholder="MM"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="month"
                  autoCorrect="off"
                  disabled={isLoading}
                />
                <Input
                  id="year"
                  placeholder="YYYY"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="year"
                  autoCorrect="off"
                  disabled={isLoading}
                />

              </div>
              <Label className="m-1">Phone Number*</Label>
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                type="number"
                autoCapitalize="none"
                autoComplete="phone"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-row justify-between gap-2 mt-6">
              <Button onClick={(e) => { api.scrollPrev(e.preventDefault()) }} variant="outline" className={"w-full"} disabled={isLoading}>
                {"<-"} Previous Step
              </Button>
              <Button onClick={(e) => onSubmit(e)} className={"w-full"} disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next Step {"->"}
              </Button>
            </div>

          </div>

        </form>

      </div>
    </div>

  )
}

function PasswordForm({ api }) {
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
        Set up your password
      </h1>
      <p className="text-sm text-muted-foreground">
        Let's set up your password to keep your account secure.
      </p>
      <div className={"grid gap-6"}>
        <form tabIndex={"-1"} aria-hidden={true}>
          <div className="grid gap-2">
            <div className="grid gap-2 text-left">
              <Label className="m-1">Password*</Label>
              <Input
                id="password"
                placeholder="Secure password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
              <Label className="m-1">Confirm Password*</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-row justify-between gap-2 mt-6">
              <Button onClick={(e) => { api.scrollPrev(e.preventDefault()) }} variant="outline" className={"w-full"} disabled={isLoading}>
                {"<-"} Previous Step
              </Button>
              <Button onClick={(e) => onSubmit(e)} className={"w-full"} disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account 
              </Button>
            </div>

          </div>

        </form>

      </div>
    </div>

  )
}

