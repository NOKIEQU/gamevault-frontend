import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for our e-commerce platform',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>Last updated: November 25, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our e-commerce platform.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Information We Collect</AccordionTrigger>
              <AccordionContent>
                <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our customer support. This may include:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Personal information (e.g., name, email address, phone number)</li>
                  <li>Payment information</li>
                  <li>Shipping address</li>
                  <li>Purchase history</li>
                </ul>
                <p className="mt-2">We also automatically collect certain information about your device and how you interact with our platform.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
              <AccordionContent>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Process your orders and payments</li>
                  <li>Provide customer support</li>
                  <li>Improve our products and services</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. Information Sharing and Disclosure</AccordionTrigger>
              <AccordionContent>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Payment processors to process your payments</li>
                  <li>Law enforcement or other parties when required by law or to protect our rights</li>
                </ul>
                <p className="mt-2">We do not sell your personal information to third parties.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. Data Security</AccordionTrigger>
              <AccordionContent>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>5. Your Rights and Choices</AccordionTrigger>
              <AccordionContent>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to correct or update your personal information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to object to or restrict the processing of your personal information</li>
                </ul>
                <p className="mt-2">To exercise these rights, please contact us using the information provided at the end of this policy.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>6. Cookies and Similar Technologies</AccordionTrigger>
              <AccordionContent>
                We use cookies and similar tracking technologies to collect and use personal information about you. For more information about our use of cookies, please see our Cookie Policy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>7. Children's Privacy</AccordionTrigger>
              <AccordionContent>
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we may have collected information about a child, please contact us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>8. Changes to This Privacy Policy</AccordionTrigger>
              <AccordionContent>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>9. Contact Us</AccordionTrigger>
              <AccordionContent>
                If you have any questions about this Privacy Policy, please contact us at:
                <p className="mt-2">
                  Email: privacy@example.com<br />
                  Address: 123 E-commerce St, City, State, ZIP
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

