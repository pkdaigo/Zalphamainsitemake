import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AgentMonitor } from './AgentMonitor'
import { AgentLogs } from './AgentLogs'
import { TriggerAgent } from './TriggerAgent'
import { AgentAnalytics } from './AgentAnalytics'
import { useAgentStats } from './hooks/useAgentStats'
import { Play, Pause, Activity, CheckCircle2, XCircle, Clock } from 'lucide-react'

export function AgentDashboard() {
  const { stats, loading, refresh } = useAgentStats()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(refresh, 30000)
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Control Center</h1>
          <p className="text-muted-foreground">
            Monitor and manage autonomous recruitment agents
          </p>
        </div>
        <Button onClick={refresh} variant="outline">
          <Activity className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      {!loading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-3xl font-bold">{stats.running}</p>
              </div>
              <Play className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{stats.completed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-3xl font-bold">{stats.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Queued</p>
                <p className="text-3xl font-bold">{stats.idle}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitor">Monitor</TabsTrigger>
          <TabsTrigger value="trigger">Trigger</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <AgentAnalytics />
        </TabsContent>

        <TabsContent value="monitor">
          <AgentMonitor />
        </TabsContent>

        <TabsContent value="trigger">
          <TriggerAgent />
        </TabsContent>

        <TabsContent value="logs">
          <AgentLogs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
