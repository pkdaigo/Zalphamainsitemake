import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTriggerAgent } from './hooks/useTriggerAgent'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const AGENT_TYPES = [
  {
    id: 'first_interview',
    name: 'First Interview Agent',
    description: 'Conducts AI-powered first-round interviews',
    fields: [
      { name: 'candidate_id', label: 'Candidate ID', type: 'text', required: true },
      { name: 'candidate_name', label: 'Candidate Name', type: 'text', required: true },
      { name: 'candidate_email', label: 'Candidate Email', type: 'email', required: true },
      { name: 'job_id', label: 'Job ID', type: 'text', required: true },
      { name: 'job_title', label: 'Job Title', type: 'text', required: true },
    ],
  },
  // Add more agent types here as you build them
]

export function TriggerAgent() {
  const [selectedAgent, setSelectedAgent] = useState<string>('')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const { trigger, loading, success, error, jobId } = useTriggerAgent()

  const agentConfig = AGENT_TYPES.find((a) => a.id === selectedAgent)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAgent) return

    await trigger(selectedAgent, formData)
  }

  const handleReset = () => {
    setFormData({})
    setSelectedAgent('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Trigger Agent</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Manually trigger an agent to execute a task. Fill in the required fields and submit.
        </p>

        {success && jobId && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Agent triggered successfully!</p>
              <p className="text-xs text-green-700 mt-1 font-mono">Job ID: {jobId}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Failed to trigger agent</p>
              <p className="text-xs text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agent Selection */}
          <div className="space-y-2">
            <Label>Agent Type</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {AGENT_TYPES.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {agentConfig && (
              <p className="text-xs text-muted-foreground">{agentConfig.description}</p>
            )}
          </div>

          {/* Dynamic Form Fields */}
          {agentConfig && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-4">Input Data</h3>

                {agentConfig.fields.map((field) => (
                  <div key={field.name} className="mb-4">
                    <Label>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      required={field.required}
                      className="mt-1"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}

                {/* Advanced Options */}
                <details className="mt-4">
                  <summary className="text-sm cursor-pointer text-muted-foreground hover:text-foreground mb-2">
                    Advanced options
                  </summary>
                  <div className="space-y-4 mt-2">
                    <div>
                      <Label>Custom JSON Input (Optional)</Label>
                      <Textarea
                        placeholder='e.g., {"questions": ["Tell me about your experience"]}'
                        className="mt-1 font-mono text-xs"
                        rows={4}
                        onChange={(e) => {
                          try {
                            const custom = JSON.parse(e.target.value)
                            setFormData({ ...formData, ...custom })
                          } catch {
                            // Invalid JSON, ignore
                          }
                        }}
                      />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" disabled={!selectedAgent || loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Triggering...
                </>
              ) : (
                'Trigger Agent'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
