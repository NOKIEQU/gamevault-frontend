import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/authForm"
import Logo from "@/components/logo"
export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

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
        <div className="lg:p-8">
            <UserAuthForm />
        </div>
      </div>
    </>
  )
}

function PersonalInfo () {
  
}