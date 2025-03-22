"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessType: "",
    organization: "",
    businessStage: "",
    description: "",
    investment: "",
    mentorship: false,
    receiveMails: false,
  })

  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUpload(e.target.files[0])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.businessType ||
      !formData.organization.trim() ||
      !formData.businessStage ||
      !formData.description.trim() ||
      !fileUpload ||
      !formData.investment
    ) {
      alert("Please fill in all fields.")
      return
    }

    if (formData.description.length > 200) {
      alert("Description should be 200 words max.")
      return
    }

    // Form submission success
    setIsSubmitted(true)
    alert("Registration Successful!")

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      businessType: "",
      organization: "",
      businessStage: "",
      description: "",
      investment: "",
      mentorship: false,
      receiveMails: false,
    })
    setFileUpload(null)

    // Reset file input
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Women Entrepreneur Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name:</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name:</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type:</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleSelectChange("businessType", value)}
              >
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization:</Label>
              <Input
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessStage">Current Stage of Business:</Label>
              <Select
                value={formData.businessStage}
                onValueChange={(value) => handleSelectChange("businessStage", value)}
              >
                <SelectTrigger id="businessStage">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="intermediate">Intermediate Level</SelectItem>
                  <SelectItem value="pro">Pro Successful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description (200 words max):</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={200}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileUpload">Upload Business Report:</Label>
              <Input
                type="file"
                id="fileUpload"
                name="fileUpload"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png,.docx"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment">Investment Required (in Rupees):</Label>
              <Select value={formData.investment} onValueChange={(value) => handleSelectChange("investment", value)}>
                <SelectTrigger id="investment">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50000-100000">₹50K - ₹1L</SelectItem>
                  <SelectItem value="100000-500000">₹1L - ₹5L</SelectItem>
                  <SelectItem value="500000-1000000">₹5L - ₹10L</SelectItem>
                  <SelectItem value="1000000+">₹10L+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mentorship"
                checked={formData.mentorship}
                onCheckedChange={(checked) => handleCheckboxChange("mentorship", checked as boolean)}
              />
              <Label htmlFor="mentorship" className="font-normal">
                I am interested to learn financial terminologies.
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="receiveMails"
                checked={formData.receiveMails}
                onCheckedChange={(checked) => handleCheckboxChange("receiveMails", checked as boolean)}
              />
              <Label htmlFor="receiveMails" className="font-normal">
                I want to receive emails from you.
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Register Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

