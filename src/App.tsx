import { useState, useEffect } from "react"
import { Shield, Globe, ArrowUpRight, Zap, Settings, Send, BarChart, X, Activity, AlertTriangle, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToastProvider, Toast, ToastViewport } from "@/components/ui/toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { name: "Mon", threats: 4000, traffic: 2400 },
  { name: "Tue", threats: 3000, traffic: 1398 },
  { name: "Wed", threats: 2000, traffic: 9800 },
  { name: "Thu", threats: 2780, traffic: 3908 },
  { name: "Fri", threats: 1890, traffic: 4800 },
  { name: "Sat", threats: 2390, traffic: 3800 },
  { name: "Sun", threats: 3490, traffic: 4300 }
]

export default function AIFirewallDashboard() {
  const [firewallRules, setFirewallRules] = useState<string[]>([
    "Block suspicious IP ranges",
    "Detect and prevent SQL injection attempts"
  ])
  const [newRule, setNewRule] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showPopup])

  const addFirewallRule = async () => {
    if (newRule.trim() !== "") {
      try {
        const response = await fetch('/add_keyword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `message=${encodeURIComponent(newRule.trim())}`
        })
        const result = await response.json()

        if (result.status === 'success') {
          setFirewallRules([...firewallRules, newRule.trim()])
          setResponseMessage(`Keyword added: ${result.added_keyword}`)
          setNewRule("")
        } else {
          setResponseMessage(result.message)
        }
        setShowPopup(true)
      } catch (error) {
        setResponseMessage('An error occurred while adding the keyword.')
        setShowPopup(true)
      }
    }
  }

  const removeFirewallRule = (index: number) => {
    setFirewallRules(firewallRules.filter((_, i) => i !== index))
  }

  return (
    <ToastProvider>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-16 bg-white dark:bg-gray-800 p-4 flex flex-col items-center space-y-6">
            <Shield className="text-blue-500" />
            <Globe className="text-gray-500" />
            <ArrowUpRight className="text-gray-500" />
            <Zap className="text-gray-500" />
            <BarChart className="text-gray-500" />
            <Settings className="text-gray-500" />
          </aside>

          <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Firewall Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inbound Rules</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24 Active</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outgoing Traffic</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2 TB</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Zones</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5 Zones</div>
                  <p className="text-xs text-muted-foreground">2 zones need attention</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>AI-Generated Firewall Rules</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {firewallRules.map((rule, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {rule}
                      <button
                        onClick={() => removeFirewallRule(index)}
                        className="ml-1 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={`Remove rule: ${rule}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="threats" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Network Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="traffic" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Activity Log</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    Suspicious activity detected from IP 192.168.1.105
                  </li>
                  <li className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    New firewall rule added: "Ransomware Protection"
                  </li>
                  <li className="flex items-center text-sm">
                    <PieChart className="h-4 w-4 text-blue-500 mr-2" />
                    Weekly security report generated
                  </li>
                </ul>
              </CardContent>
            </Card>
          </main>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Input
              placeholder="Add a new firewall rule..."
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={addFirewallRule}>
              <Send className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>
        </div>

        <ToastViewport className="fixed bottom-0 right-0 p-6 z-50" />
        {showPopup && (
          <Toast className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Activity className="text-green-500" />
              {responseMessage}
            </div>
          </Toast>
        )}
      </div>
    </ToastProvider>
  )
}
