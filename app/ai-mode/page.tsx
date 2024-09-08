import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Ban, Lock, FileText, Menu, HelpCircle, Monitor, Settings } from "lucide-react"
import Link from "next/link"
export default function Component() {
  return (
    <div className="bg-[#D9D9D9] min-h-screen flex">
      <nav className="bg-[#353535] w-16 flex flex-col items-center py-4 space-y-6">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white mt-auto">
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white">
            <Monitor className="h-6 w-6" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-6 w-6" />
        </Button>
      </nav>
      
      <div className="flex-grow p-8 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Create a policy to restrict access to social media platforms during work hours</p>
                <Ban className="h-8 w-8 text-red-500 self-end" />
              </CardContent>
            </Card>
            
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Create a policy to allow access to specific websites only from certain departments</p>
                <Lock className="h-8 w-8 text-green-500 self-end" />
              </CardContent>
            </Card>
            
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Create a policy to filter out content containing specific keywords from being accessed</p>
                <FileText className="h-8 w-8 text-blue-500 self-end" />
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-[#353535] text-white">
            <CardContent className="p-6">
              <p className="text-base text-center">
                Leverage LLM-driven policies to manage and secure network access by blocking harmful content, controlling application usage, enforcing time-based restrictions, and ensuring data privacy and protection.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center bg-[#353535] rounded-md p-4 mt-8">
          <Input 
            placeholder="Use your LLM to update your firewall policy with minimal network knowledge" 
            className="flex-grow mr-4 bg-transparent text-white border-none placeholder-gray-400 text-lg"
          />
          <Button variant="ghost" size="icon" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}