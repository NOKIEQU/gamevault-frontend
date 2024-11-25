"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu, Moon, Sun, X, ShoppingCart } from 'lucide-react'
import Logo from './logo'
import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { useTheme } from "next-themes"

function Navbar() {
    const { screenSize } = useScreenSize();
    const [basketItems, setBasketItems] = useState([])
    const path = usePathname()
    const disableNavWithFooter = [
        "/login",
        "/register",
        "/dashboard",
        "/admin",
        "/admin/games",
        "/admin/sales",
        "/admin/users",
        "/admin/settings",

    ]

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
            screenSize: undefined, // Default to 'xs'
            width: undefined,
            height: undefined,
        });

        // Define the resize handler
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

        // Create a throttled version of the resize handler
        const throttledHandleResize = useCallback(throttle(handleResize, 300), [
            handleResize,
        ]);

        useLayoutEffect(() => {
            if (typeof window !== 'undefined') {
                // Run the handler immediately to set the initial screen size
                handleResize();

                // Set up the throttled resize listener
                window.addEventListener('resize', throttledHandleResize);

                // Clean up
                return () => {
                    throttledHandleResize.cancel(); // Cancel the throttle function on cleanup
                    window.removeEventListener('resize', throttledHandleResize);
                };
            }
        }, [throttledHandleResize]);
        return dimension;
    }


    return (
        <>
            {!disableNavWithFooter.includes(path) ? screenSize === 'xs' ? <NavbarMobile basketItems={basketItems} /> : <FullNavbar basketItems={basketItems} /> : null}
        </>
    )
}

function FullNavbar({basketItems}) {



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
                    <Button className={"mr-5"}><Link href={"/register"}>Register {"->"}</Link></Button>
                    {/* <ChangeTheme /> */}
                    {/* <div className='relative border rounded-lg border-gray-200 p-2'>
                        <ShoppingCart size={20} />
                        <div className='absolute -top-2 -right-2 bg-primary rounded-full text-white px-1 text-xs'>{basketItems.length === null ? 0 : basketItems.length}</div>


                    </div> */}
                    <BasketComponent basketItems={basketItems} />
                </div>
            </nav>
        </div>
    )
}


function NavbarMobile({basketItems}) {

    return (
        <div className={"w-full h-auto"}>
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
                                    <li className={""}><Button className={"w-full"} variant="outline"><Link href={"/"}>Home</Link></Button></li>

                                    <li className={""}><Button className={"w-full"} variant="outline"><Link href={"/shop"}>Browse Games</Link></Button></li>
                                    <li className={""}><Button className={"w-full"} variant="outline"><Link href={"/about-us"}>About us</Link></Button></li>
                                    <li className={"mb-5"}><Button className={"w-full"} variant="outline"><Link href={"/faq"}>FAQ</Link></Button></li>
                                </ul>
                                <div className={"w-full flex flex-row justify-between gap-2"}>
                                    <Button className={"w-full"}><Link href={"/register"}>Register {"->"}</Link></Button>
                                    {/* <ChangeTheme /> */}
                                </div>
                                {/* <div className='relative border rounded-lg border-gray-200 p-2'>
                                    <ShoppingCart size={20} />
                                    <div className='absolute -top-2 -right-2 bg-primary rounded-full text-white px-1 text-xs'>{basketItems.length === null ? 0 : basketItems.length}</div>


                                </div> */}
                                <BasketComponent basketItems={basketItems} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </nav>
        </div>
    )
}

function BasketComponent({basketItems}) {
    return (
        <div className='relative border rounded-lg border-gray-200 p-2 cursor-pointer hover:bg-gray-100'>
            <ShoppingCart size={20} />
            <div className='absolute -top-2 -right-2 bg-primary rounded-full text-white px-1 text-xs'>{basketItems.length}</div>
        </div>
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