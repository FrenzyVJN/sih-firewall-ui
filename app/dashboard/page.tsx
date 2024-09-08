'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Menu, HelpCircle, Monitor, Settings, ChevronRight, Plus, Globe, Server, Wifi } from "lucide-react"

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="bg-[#D9D9D9] min-h-screen flex">
      <nav className={`bg-[#353535] w-16 flex flex-col items-center py-4 space-y-6 fixed h-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-0' : '-left-16'}`}>
        <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white mt-auto">
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <Monitor className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings className="h-6 w-6" />
        </Button>
      </nav>
      
      <Button
        variant="ghost"
        size="icon"
        className={`fixed top-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-20' : 'left-4'} z-10`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <ChevronRight className={`h-6 w-6 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      <div className="flex-grow p-8 flex flex-col justify-between ml-16">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Configure Inbound Rules</p>
                <Globe className="h-8 w-8 text-blue-500 self-end" />
              </CardContent>
            </Card>
            
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Manage Outbound Traffic</p>
                <Server className="h-8 w-8 text-green-500 self-end" />
              </CardContent>
            </Card>
            
            <Card className="bg-[#353535] text-white">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="font-mono text-base mb-4">Set Up Network Zones</p>
                <Wifi className="h-8 w-8 text-yellow-500 self-end" />
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-[#353535] text-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Firewall Rules</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Source</TableHead>
                    <TableHead className="text-white">Destination</TableHead>
                    <TableHead className="text-white">Protocol</TableHead>
                    <TableHead className="text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-white">Allow HTTP</TableCell>
                    <TableCell className="text-white">Any</TableCell>
                    <TableCell className="text-white">10.0.0.1:80</TableCell>
                    <TableCell className="text-white">TCP</TableCell>
                    <TableCell className="text-white">Allow</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-white">Block Telnet</TableCell>
                    <TableCell className="text-white">External</TableCell>
                    <TableCell className="text-white">Any:23</TableCell>
                    <TableCell className="text-white">TCP</TableCell>
                    <TableCell className="text-white">Deny</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-[#353535] text-white mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Add New Firewall Rule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input placeholder="Rule Name" className="bg-transparent border-gray-600" />
              <Input placeholder="Source" className="bg-transparent border-gray-600" />
              <Input placeholder="Destination" className="bg-transparent border-gray-600" />
              <Select>
                <SelectTrigger className="bg-transparent border-gray-600">
                  <SelectValue placeholder="Protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcp">TCP</SelectItem>
                  <SelectItem value="udp">UDP</SelectItem>
                  <SelectItem value="icmp">ICMP</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-transparent border-gray-600">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allow">Allow</SelectItem>
                  <SelectItem value="deny">Deny</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              Add Rule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}