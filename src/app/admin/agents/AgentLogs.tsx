import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useAgentLogs } from './hooks/useAgentLogs'
import { formatDistanceToNow } from 'date-fns'
import { Search, RefreshCw, Info, AlertTriangle, XCircle, Bug } from 'lucide-react'

const LOG_LEVEL_COLORS = {
  info: 'bg-blue-500',
  warn: 'bg-yellow-500',
  error: 'bg-red-500',
  debug: 'bg-gray-500',
}

const LOG_LEVEL_ICONS = {
  info: Info,
  warn: AlertTriangle,
  error: XCircle,
  debug: Bug,
}

export function AgentLogs() {
  const { logs, loading, refresh } = useAgentLogs()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string | null>(null)

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === '' ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.job_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = filterLevel === null || log.level === filterLevel

    return matchesSearch && matchesLevel
  })

  useEffect(() => {
    // Auto-refresh every 10 seconds
    const interval = setInterval(refresh, 10000)
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Agent Logs</h2>
        <Button onClick={refresh} variant="ghost" size="sm">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filterLevel === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel(null)}
          >
            All
          </Button>
          <Button
            variant={filterLevel === 'info' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel('info')}
          >
            Info
          </Button>
          <Button
            variant={filterLevel === 'warn' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel('warn')}
          >
            Warn
          </Button>
          <Button
            variant={filterLevel === 'error' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel('error')}
          >
            Error
          </Button>
          <Button
            variant={filterLevel === 'debug' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel('debug')}
          >
            Debug
          </Button>
        </div>
      </div>

      {/* Logs List */}
      <ScrollArea className="h-[600px]">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery || filterLevel ? 'No logs match your filters' : 'No logs available'}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => {
              const Icon = LOG_LEVEL_ICONS[log.level]
              return (
                <Card key={log.id} className="p-3">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 text-white ${LOG_LEVEL_COLORS[log.level]}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={LOG_LEVEL_COLORS[log.level]}>{log.level}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(log.created_at))} ago
                        </span>
                      </div>

                      <p className="text-sm mb-1">{log.message}</p>

                      <p className="text-xs text-muted-foreground font-mono">
                        Job: {log.job_id.slice(0, 8)}
                      </p>

                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <details className="mt-2">
                          <summary className="text-xs cursor-pointer text-muted-foreground hover:text-foreground">
                            View metadata
                          </summary>
                          <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-x-auto">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </Card>
  )
}
