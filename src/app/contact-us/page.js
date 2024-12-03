'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    console.log(values)
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })
    form.reset()
  }

  return (
    <div className="w-full h-full px-5 md:px-20 lg:px-40 2xl:px-60 overflow-hidden">
      <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
              <CardDescription>We're here to help and answer any question you might have.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary" />
                <span>Aston St, Birmingham B4 7ET</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary" />
                <span>0121 204 3000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary" />
                <span>230234556@aston.ac.uk</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-primary" />
                <span>Mon-Fri: 9AM - 5PM EST</span>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[200px]">
                <Image
                  src="https://fakeimg.pl/350x200/?text=location"
                  alt="Map location"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us more about your inquiry..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="my-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">What are your shipping rates?</h3>
              <p className="text-muted-foreground">Our shipping rates vary depending on the product and your location. You can view the exact shipping cost at checkout.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long does shipping take?</h3>
              <p className="text-muted-foreground">Typical shipping times are 3-5 business days for domestic orders and 7-14 business days for international orders.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">We offer a 30-day return policy for most items. Please check our Returns page for more details.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
              <p className="text-muted-foreground">Yes, we ship to many countries worldwide. Shipping costs and delivery times may vary by location.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

