import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAgentJobs } from './hooks/useAgentJobs'
import { formatDistanceToNow } from 'date-fns'
import { Eye, RefreshCw } from 'lucide-react'
import type { AgentJob } from '@/services/agent/types'

const STATUS_COLORS = {
  idle: 'bg-yellow-500',
  running: 'bg-blue-500',
  completed: 'bg-green-500',
  failed: 'bg-red-500',
  paused: 'bg-gray-500',
}

const STATUS_LABELS = {
  idle: 'Queued',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  paused: 'Paused',
}

export function AgentMonitor() {
  const { jobs, loading, refresh } = useAgentJobs()
  const [selectedJob, setSelectedJob] = useState<AgentJob | null>(null)

  useEffect(() => {
    // Auto-refresh every 5 seconds for real-time monitoring
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Job List */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Jobs</h2>
            <Button onClick={refresh} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="h-[600px] pr-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No jobs found. Trigger an agent to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                      selectedJob?.id === job.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={STATUS_COLORS[job.status]}>
                            {STATUS_LABELS[job.status]}
                          </Badge>
                          <Badge variant="outline">{job.agent_type}</Badge>
                          {job.retry_count > 0 && (
                            <Badge variant="secondary">
                              Retry {job.retry_count}/{job.max_retries}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-1">
                          Job ID: {job.id.slice(0, 8)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Created {formatDistanceToNow(new Date(job.created_at))} ago
                        </p>

                        {job.started_at && (
                          <p className="text-xs text-muted-foreground">
                            Started {formatDistanceToNow(new Date(job.started_at))} ago
                          </p>
                        )}

                        {job.error_message && (
                          <p className="text-xs text-red-500 mt-2">{job.error_message}</p>
                        )}
                      </div>

                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>

      {/* Job Details */}
      <div className="lg:col-span-1">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>

          {selectedJob ? (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={`${STATUS_COLORS[selectedJob.status]} mt-1`}>
                    {STATUS_LABELS[selectedJob.status]}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agent Type</p>
                  <p className="text-sm mt-1">{selectedJob.agent_type}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Job ID</p>
                  <p className="text-xs mt-1 font-mono break-all">{selectedJob.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                  <p className="text-sm mt-1 capitalize">{selectedJob.priority}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Input Data</p>
                  <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-x-auto">
                    {JSON.stringify(selectedJob.input_data, null, 2)}
                  </pre>
                </div>

                {selectedJob.output_data && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Output Data</p>
                    <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-x-auto">
                      {JSON.stringify(selectedJob.output_data, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedJob.error_message && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Error</p>
                    <p className="text-xs mt-1 text-red-500">{selectedJob.error_message}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timestamps</p>
                  <div className="text-xs mt-1 space-y-1">
                    <p>Created: {new Date(selectedJob.created_at).toLocaleString()}</p>
                    {selectedJob.started_at && (
                      <p>Started: {new Date(selectedJob.started_at).toLocaleString()}</p>
                    )}
                    {selectedJob.completed_at && (
                      <p>Completed: {new Date(selectedJob.completed_at).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a job to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
