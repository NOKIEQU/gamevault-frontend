'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#000000', '#999999']
    })
  }, [])

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto"
            >
              <CheckCircle className="w-16 h-16 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-center mt-4">Order Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <motion.div
              className="mt-6 p-4 bg-secondary/30 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-primary">Order Details:</h3>
              <p className="text-secondary-foreground">Order #: 123456</p>
              <p className="text-secondary-foreground">Estimated Delivery: 3-5 business days</p>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => router.push('/')}
              className="bg-primary w-full text-primary-foreground font-bold py-2 px-4 rounded-lg"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

