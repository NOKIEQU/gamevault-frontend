'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/app/context/cart-context'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart()
    const { toast } = useToast()
    const router = useRouter()

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
    })
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
    })
    const [errors, setErrors] = useState({})

    const handleShippingInfoChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
    }

    // validate the card number
    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target
        let updatedValue = value

        if (name === 'cardNumber') {
            updatedValue = value.replace(/\D/g, '').slice(0, 16)
        } else if (name === 'expirationDate') {
            updatedValue = value.replace(/\D/g, '')
            if (updatedValue.length > 2) {
                updatedValue = updatedValue.slice(0, 2) + '/' + updatedValue.slice(2)
            }
            updatedValue = updatedValue.slice(0, 5)
        } else if (name === 'cvv') {
            updatedValue = value.replace(/\D/g, '').slice(0, 3)
        }

        setPaymentInfo({ ...paymentInfo, [name]: updatedValue })
        validateField(name, updatedValue)
    }

    // validate expiration date, and cvv
    const validateField = (name, value) => {
        let error = ''
        switch (name) {
            case 'cardNumber':
                error = value.length !== 16 ? 'Card number must be 16 digits' : ''
                break
            case 'expirationDate':
                const [month, year] = value.split('/')
                const currentYear = new Date().getFullYear() % 100
                const currentMonth = new Date().getMonth() + 1
                if (month > 12 || month < 1) {
                    error = 'Invalid month'
                } else if (year && (year < currentYear || (year == currentYear && month < currentMonth))) {
                    error = 'Card has expired'
                }
                break
            case 'cvv':
                error = value.length !== 3 ? 'CVV must be 3 digits' : ''
                break
            default:
                break
        }
        setErrors(prev => ({ ...prev, [name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(errors).some(error => error !== '')) {
            toast({
                title: "Error",
                description: "Please correct the errors in the form",
                variant: "destructive",
            })
            return
        }
        // Send the order to the backend
        console.log('Order submitted', { cart, shippingInfo, paymentInfo })

        clearCart()
        router.push('/checkout/success')
    }

    useEffect(() => {

        // Do not allow user to checkout if cart is empty
        if (cart.length === 0) {
            router.push('/shop')
        }
    }, [cart])

    return (
        <div className="w-full h-full p-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
            <Link href="/shop" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Store
            </Link>
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-2xl">Your Cart</CardTitle>
                            <CardDescription>Review your items before purchasing</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center mb-4 p-2 rounded-md">
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <Separator className="my-4" />
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span>${0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Fee</span>
                                    <span>${0}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span>${getCartTotal()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Card className="mb-8 ">
                            <CardHeader>
                                <CardTitle className="text-2xl">Shipping Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={handleShippingInfoChange}
                                        required
                                        className="bg-white"
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleShippingInfoChange}
                                        required
                                        className="bg-white"
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={shippingInfo.city}
                                        onChange={handleShippingInfoChange}
                                        required
                                        className="bg-white"
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="country">Country</Label>
                                    <Select name="country" required>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">United States</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            {/* Add more countries as needed */}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={shippingInfo.postalCode}
                                        onChange={handleShippingInfoChange}
                                        required
                                        className="bg-white"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl">Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={paymentInfo.cardNumber}
                                        onChange={handlePaymentInfoChange}
                                        required
                                        className="bg-white"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="cardHolder">Card Holder</Label>
                                    <Input
                                        type="text"
                                        id="cardHolder"
                                        name="cardHolder"
                                        value={paymentInfo.cardHolder}
                                        onChange={handlePaymentInfoChange}
                                        required
                                        className="bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className='flex flex-row justify-between gap-x-10'>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="expirationDate">Expiration Date</Label>
                                        <Input
                                            type="text"
                                            id="expirationDate"
                                            name="expirationDate"
                                            placeholder="MM/YY"
                                            value={paymentInfo.expirationDate}
                                            onChange={handlePaymentInfoChange}
                                            required
                                            className="bg-white"
                                            maxLength={5}
                                        />
                                        {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={paymentInfo.cvv}
                                            onChange={handlePaymentInfoChange}
                                            required
                                            className="bg-white"
                                            placeholder="123"
                                        />
                                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                        <Button type="submit" className="w-full text-lg py-6">Complete Purchase</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}


