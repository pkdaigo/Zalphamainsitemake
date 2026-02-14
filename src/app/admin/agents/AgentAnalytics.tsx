import { Card } from '@/components/ui/card'
import { useAgentAnalyticsNew } from './hooks/useAgentAnalyticsNew'
import { BarChart3, TrendingUp, Clock, Zap } from 'lucide-react'

export function AgentAnalytics() {
  const { analytics, loading } = useAgentAnalyticsNew()

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground">Loading analytics...</div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No analytics data available yet. Run some agents to see insights.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Execution Time</p>
              <p className="text-2xl font-bold">{analytics.avgExecutionTime}s</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Executions</p>
              <p className="text-2xl font-bold">{analytics.totalExecutions}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Agent Performance</h3>
        <div className="space-y-3">
          {analytics.byAgentType.map((agent) => (
            <div key={agent.agent_type} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{agent.agent_type}</p>
                <p className="text-sm text-muted-foreground">
                  {agent.total} executions • {agent.success_rate.toFixed(1)}% success
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{agent.avg_duration}s avg</p>
                <p className="text-xs text-muted-foreground">
                  {agent.completed} completed, {agent.failed} failed
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Trends */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Recent Activity (Last 7 Days)
        </h3>
        <div className="space-y-2">
          {analytics.recentTrend.map((day, index) => (
            <div key={index} className="flex items-center gap-3">
              <p className="text-sm font-medium w-24">{day.date}</p>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-blue-500 flex items-center justify-end pr-2"
                  style={{ width: `${(day.count / Math.max(...analytics.recentTrend.map(d => d.count))) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{day.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
