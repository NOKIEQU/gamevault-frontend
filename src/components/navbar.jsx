"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu, Moon, Sun, X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'
import Logo from './logo'
import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from '@/app/context/cart-context'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data 
const user = {
  isLoggedIn: true,
  name: 'John Doe',
  avatar: 'https://github.com/shadcn.png'
}

function Navbar() {
    const { screenSize } = useScreenSize();
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
    const path = usePathname()
    const disableNavWithFooter = ["/login", "/checkout", "/register", "/dashboard", "/admin", "/admin/games", "/admin/sales", "/admin/users", "/admin/settings"]
    const disableBasket = ["/checkout", "/checkout/success"]
    // const [isCartOpen, setIsCartOpen] = useState(false)

    // const handleCartToggle = () => {
    //     setIsCartOpen(!isCartOpen)
    // }

    // const handleCartInteraction = (e) => {
    //     e.stopPropagation()
    // }

    function getScreenSize(width) {
        if (width >= 1536) {
            return '2xl';
        } else if (width >= 1280) {
            return 'xl';
        } else if (width >= 1024) {
            return 'lg';
        } else if (width >= 768) {
            return 'md';
        } else if (width >= 640) {
            return 'sm';
        } else {
            return 'xs';
        }
    }

    function useScreenSize() {
        const [dimension, setDimension] = useState({
            screenSize: undefined,
            width: undefined,
            height: undefined,
        });

        const handleResize = useCallback(() => {
            if (typeof window !== 'undefined') {
                const newSize = getScreenSize(window.innerWidth);
                setDimension({
                    screenSize: newSize,
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        }, []);

        const throttledHandleResize = useCallback(throttle(handleResize, 300), [
            handleResize,
        ]);

        useLayoutEffect(() => {
            if (typeof window !== 'undefined') {
                handleResize();
                window.addEventListener('resize', throttledHandleResize);
                return () => {
                    throttledHandleResize.cancel();
                    window.removeEventListener('resize', throttledHandleResize);
                };
            }
        }, [throttledHandleResize]);
        return dimension;
    }

    return (
        <>
            {!disableNavWithFooter.includes(path) ? screenSize === 'xs' ? <NavbarMobile screenSize={screenSize} cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} disableBasket={disableBasket} path={path} /> : <FullNavbar cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} disableBasket={disableBasket} path={path} /> : null}
        </>
    )
}

function FullNavbar({ cart, removeFromCart, getCartTotal, updateQuantity, disableBasket, path }) {
    return (
        <div className={"w-full h-auto py-5"}>
            <nav className={"flex justify-between items-center py-5"}>
                <div className={"flex justify-between items-center"}>
                    <Link href={"/"}><Logo /></Link>
                    <h1 className={"text-2xl font-bold"}>Game Vault</h1>
                </div>
                <div className={"flex justify-between items-center"}>
                    <ul className={"flex"}>
                        <li className={"mx-5"}><Link href={"/shop"}>Browse Games</Link></li>
                        <li className={"mx-5"}><Link href={"/about-us"}>About us</Link></li>
                        <li className={"mx-5"}><Link href={"/faq"}>FAQ</Link></li>
                    </ul>
                    
                    {!disableBasket.includes(path) && <BasketComponent cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} />}
                    {user.isLoggedIn ? (
                        <Link className="pl-4" href="/profile">
                            <Avatar className="mr-5">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Button className={"ml-5"}><Link href={"/register"}>Register {"->"}</Link></Button>
                    )}
                </div>
            </nav>
        </div>
    )
}

function NavbarMobile({ screenSize, cart, removeFromCart, getCartTotal, updateQuantity, disableBasket, path }) {
    return (
        <div className={"relative w-full h-auto"}>
            <nav className={"flex flex-col justify-between items-center py-5"}>
                <div className={"w-full flex flex-row justify-between items-center"}>
                    <Link href={"/"}><Logo /></Link>
                    <h1 className={"text-2xl font-bold"}>Game Vault</h1>
                    <Sheet>
                        <SheetTrigger>
                            <Button className={"bg-transparent"} variant={"outline"}><Menu /></Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle className={"flex flex-row items-center gap-x-2"}>
                                    <Logo />
                                    <h1 className={"text-2xl font-bold"}>Game Vault</h1>
                                </SheetTitle>
                            </SheetHeader>
                            <div className={"w-full flex flex-col justify-between pt-10"}>
                                <ul className={"w-full flex flex-col gap-5"}>
                                    <li className={""}><Link href={"/"}><Button className={"w-full"} variant="outline">Home</Button></Link></li>
                                    <li className={""}><Link href={"/shop"}><Button className={"w-full"} variant="outline">Browse Games</Button></Link></li>
                                    <li className={""}><Link href={"/about-us"}><Button className={"w-full"} variant="outline">About us</Button></Link></li>
                                    <li className={"mb-5"}><Link href={"/faq"}><Button className={"w-full"} variant="outline">FAQ</Button></Link></li>
                                </ul>
                                <div className={"w-full flex flex-row justify-between gap-2"}>
                                    {user.isLoggedIn ? (
                                        <Link href="/profile" className="w-full">
                                            <Button className="w-full flex items-center justify-center">
                                                <Avatar className="mr-2">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                Profile
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button className={"w-full"}><Link href={"/register"}>Register {"->"}</Link></Button>
                                    )}
                                </div>
                                {!disableBasket.includes(path) && screenSize !== "xs" && <BasketComponent cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} />}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
            {screenSize === "xs" && !disableBasket.includes(path) && <BasketComponentMobile cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} />}
        </div>
    )
}

// The rest of the components (BasketComponent, BasketComponentMobile, BasketItems, ChangeTheme) remain unchanged

function BasketComponent({ cart, removeFromCart, getCartTotal, updateQuantity }) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-10 w-10" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cart.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    )}
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[20rem]">
                <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cart.length === 0 ? (
                    <DropdownMenuItem>Your cart is empty</DropdownMenuItem>
                ) : (
                    <>
                        <BasketItems cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex justify-between w-full font-semibold">
                                <span>Total:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full">Checkout</Button>
                            </Link> 
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

function BasketComponentMobile({ cart, removeFromCart, getCartTotal, updateQuantity }) {


    return (
        <div className='fixed bottom-0 right-0 p-4 z-50'>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="default" size="icon" className="relative p-7 rounded-lg">
                        <ShoppingCart className='h-10 w-10' />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                        <span className="sr-only">Shopping cart</span>
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="w-full p-7 max-h-[100vh] overflow-y-scroll">
                    <DrawerHeader>
                        <DrawerTitle>Your Cart</DrawerTitle>
                    </DrawerHeader>
                    {cart.length === 0 ? (
                        <DrawerDescription>Your cart is empty</DrawerDescription>
                    ) : (
                        <div className=''>
                            <BasketItems cart={cart} removeFromCart={removeFromCart} getCartTotal={getCartTotal} updateQuantity={updateQuantity} />
                                <div className="flex justify-between w-full font-semibold pb-7">
                                    <span>Total:</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full">Checkout</Button>
                                </Link>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>


    )
}

function BasketItems({ cart, removeFromCart, updateQuantity }) {
    return (
        <>
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3">
                    <span className='pl-3 text-sm'>{item.title}</span>
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 ml-2"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>

                </div>
            ))}
            
        </>

    )
}


function ChangeTheme() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button className={"w-16 xl:w-10 md:w-10 lg:w-10 sm:w-10 bg-transparent"} variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" />
                : <Moon className="absolute h-[1.2rem] w-[1.2rem]" />}
        </Button>
    )
}

export default Navbar