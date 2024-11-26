import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for our e-commerce platform',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <CardDescription>Last updated: November 25, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Welcome to our e-commerce platform. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
              <AccordionContent>
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. User Accounts</AccordionTrigger>
              <AccordionContent>
                <p>When you create an account with us, you must provide accurate, complete, and up-to-date information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.</p>
                <p className="mt-2">You must notify us immediately of any breach of security or unauthorized use of your account.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. Products and Services</AccordionTrigger>
              <AccordionContent>
                We strive to provide accurate descriptions of our products and services. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. Pricing and Payment</AccordionTrigger>
              <AccordionContent>
                <p>All prices are subject to change without notice. We reserve the right to refuse or cancel any orders placed for products listed at an incorrect price.</p>
                <p className="mt-2">Payments are processed securely through our payment providers. By providing your payment information, you represent and warrant that you have the legal right to use any payment method(s) in connection with any purchase.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>5. Shipping and Returns</AccordionTrigger>
              <AccordionContent>
                Shipping costs and delivery times may vary depending on the product and your location. Please refer to our Shipping Policy for more details. For returns and refunds, please consult our Return Policy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. Intellectual Property</AccordionTrigger>
              <AccordionContent>
                The content on our platform, including text, graphics, logos, and software, is the property of our company or our content suppliers and is protected by copyright and other intellectual property laws.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>7. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>8. Governing Law</AccordionTrigger>
              <AccordionContent>
                These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>9. Changes to Terms</AccordionTrigger>
              <AccordionContent>
                We reserve the right to modify or replace these Terms of Service at any time. It is your responsibility to check these Terms periodically for changes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

