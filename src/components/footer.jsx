"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Logo from '@/components/logo'
import { useTheme } from "next-themes";

const Footer = () => {
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

    return (
        <>
            {!disableNavWithFooter.includes(path) && <FooterComponent />}
        </>
    );
};

function FooterComponent() {

    const { theme } = useTheme();

    return (
        <footer className="bg-primary dark:bg-primary-foreground text-white  border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-start">
                        {/* <Logo className="h-168   w-auto mb-4" />
                 */}
                        {/* <Image src="/logo-dark.svg" alt="Gamevault" width={60} height={60} /> */}
                        {theme === "dark" ? <Image src="/logo-dark.svg" alt="Gamevault" width={60} height={60} /> : <Image src="/logo-dark.svg" alt="Gamevault" width={60} height={60} />}

                        <p className="text-sm text-muted dark:text-white">
                            Your one-stop shop for all things gaming. Discover, play, and connect.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:underline">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm hover:underline">Shipping</Link></li>
                            <li><Link href="/returns" className="text-sm hover:underline">Returns</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <Youtube className="h-5 w-5" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 GameStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer;