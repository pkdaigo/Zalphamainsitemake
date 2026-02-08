import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  Database, 
  FileText, 
  Plus, 
  Upload, 
  Trash2, 
  Link, 
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  status: string;
  created: string;
}

interface KnowledgeDocument {
  id: string;
  title: string;
  documentType: string;
  status: string;
  created: string;
}

interface DIDKnowledgeManagerProps {
  onNavigate?: (page: string) => void;
}

export function DIDKnowledgeManager({ onNavigate }: DIDKnowledgeManagerProps) {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [selectedKB, setSelectedKB] = useState<KnowledgeBase | null>(null);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateKB, setShowCreateKB] = useState(false);
  const [showUploadDoc, setShowUploadDoc] = useState(false);

  // Create KB form
  const [newKBName, setNewKBName] = useState('');
  const [newKBDescription, setNewKBDescription] = useState('');

  // Upload document form
  const [docTitle, setDocTitle] = useState('');
  const [docContent, setDocContent] = useState('');
  const [docType, setDocType] = useState<'txt' | 'pdf' | 'docx'>('txt');

  // Agent linking
  const [agentId, setAgentId] = useState('');
  const [ragTemplate, setRagTemplate] = useState<'rag-grounded' | 'rag-ungrounded'>('rag-ungrounded');

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-9bd83859`;

  useEffect(() => {
    loadKnowledgeBases();
  }, []);

  useEffect(() => {
    if (selectedKB) {
      loadDocuments(selectedKB.id);
    }
  }, [selectedKB]);

  const loadKnowledgeBases = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/did/knowledge`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load knowledge bases');
      }

      const data = await response.json();
      setKnowledgeBases(data.knowledgeBases || []);
    } catch (error: any) {
      console.error('Error loading knowledge bases:', error);
      toast.error('Failed to load knowledge bases');
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async (knowledgeId: string) => {
    try {
      const response = await fetch(`${API_BASE}/did/knowledge/${knowledgeId}/documents`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load documents');
      }

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error: any) {
      console.error('Error loading documents:', error);
      toast.error('Failed to load documents');
    }
  };

  const createKnowledgeBase = async () => {
    if (!newKBName || !newKBDescription) {
      toast.error('Please provide name and description');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/did/knowledge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKBName,
          description: newKBDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create knowledge base');
      }

      const data = await response.json();
      toast.success(`Knowledge base "${newKBName}" created successfully!`);
      
      setNewKBName('');
      setNewKBDescription('');
      setShowCreateKB(false);
      
      await loadKnowledgeBases();
    } catch (error: any) {
      console.error('Error creating knowledge base:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async () => {
    if (!selectedKB || !docTitle || !docContent) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/did/knowledge/${selectedKB.id}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: docTitle,
          content: docContent,
          documentType: docType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload document');
      }

      toast.success(`Document "${docTitle}" uploaded successfully!`);
      
      setDocTitle('');
      setDocContent('');
      setShowUploadDoc(false);
      
      await loadDocuments(selectedKB.id);
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const attachKnowledgeToAgent = async () => {
    if (!selectedKB || !agentId) {
      toast.error('Please select a knowledge base and enter an agent ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/did/agents/${agentId}/knowledge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          knowledgeId: selectedKB.id,
          ragTemplate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to attach knowledge');
      }

      toast.success(`Knowledge base attached to agent ${agentId}!`);
      setAgentId('');
    } catch (error: any) {
      console.error('Error attaching knowledge:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="h-8 w-8 text-ocean-500" />
              Knowledge Base Manager
            </h1>
            <p className="text-gray-600 mt-2">
              Create and manage knowledge bases for your D-ID agents
            </p>
          </div>
          <Button
            onClick={() => setShowCreateKB(true)}
            className="bg-ocean-500 hover:bg-ocean-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Knowledge Base
          </Button>
        </div>

        {/* Create Knowledge Base Modal */}
        {showCreateKB && (
          <Card className="border-2 border-ocean-300">
            <CardHeader className="bg-ocean-50">
              <CardTitle>Create New Knowledge Base</CardTitle>
              <CardDescription>
                Knowledge bases store information that agents can reference when chatting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label htmlFor="kb-name">Name</Label>
                <Input
                  id="kb-name"
                  value={newKBName}
                  onChange={(e) => setNewKBName(e.target.value)}
                  placeholder="e.g., Company FAQ, Career Resources"
                />
              </div>
              <div>
                <Label htmlFor="kb-description">Description</Label>
                <Textarea
                  id="kb-description"
                  value={newKBDescription}
                  onChange={(e) => setNewKBDescription(e.target.value)}
                  placeholder="Describe what information this knowledge base contains..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateKB(false);
                    setNewKBName('');
                    setNewKBDescription('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={createKnowledgeBase}
                  disabled={loading}
                  className="bg-ocean-500 hover:bg-ocean-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Knowledge Bases List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Knowledge Bases</CardTitle>
              <CardDescription>
                {knowledgeBases.length} total
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && knowledgeBases.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-ocean-500 animate-spin" />
                </div>
              ) : knowledgeBases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Database className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No knowledge bases yet</p>
                  <p className="text-sm mt-1">Create one to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {knowledgeBases.map((kb) => (
                    <button
                      key={kb.id}
                      onClick={() => setSelectedKB(kb)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        selectedKB?.id === kb.id
                          ? 'border-ocean-500 bg-ocean-50'
                          : 'border-gray-200 hover:border-ocean-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{kb.name}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {kb.description}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(kb.created).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents & Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedKB ? (
              <>
                {/* Selected KB Info */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-ocean-500 to-ocean-600 text-white">
                    <CardTitle>{selectedKB.name}</CardTitle>
                    <CardDescription className="text-ocean-50">
                      {selectedKB.description}
                    </CardDescription>
                    <div className="text-sm text-ocean-100 mt-2">
                      ID: {selectedKB.id}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {/* Upload Document Button */}
                    {!showUploadDoc && (
                      <Button
                        onClick={() => setShowUploadDoc(true)}
                        className="w-full"
                        variant="outline"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    )}

                    {/* Upload Form */}
                    {showUploadDoc && (
                      <div className="border-2 border-ocean-200 rounded-lg p-4 space-y-4 bg-ocean-50">
                        <h3 className="font-semibold text-gray-900">Upload Document</h3>
                        <div>
                          <Label htmlFor="doc-title">Document Title</Label>
                          <Input
                            id="doc-title"
                            value={docTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                            placeholder="e.g., Company Benefits Guide"
                          />
                        </div>
                        <div>
                          <Label htmlFor="doc-type">Document Type</Label>
                          <select
                            id="doc-type"
                            value={docType}
                            onChange={(e) => setDocType(e.target.value as any)}
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option value="txt">Text (.txt)</option>
                            <option value="pdf">PDF (.pdf)</option>
                            <option value="docx">Word (.docx)</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="doc-content">Content</Label>
                          <Textarea
                            id="doc-content"
                            value={docContent}
                            onChange={(e) => setDocContent(e.target.value)}
                            placeholder="Paste your document content here..."
                            rows={6}
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowUploadDoc(false);
                              setDocTitle('');
                              setDocContent('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={uploadDocument}
                            disabled={loading}
                            className="bg-ocean-500 hover:bg-ocean-600"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Documents List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-ocean-500" />
                      Documents
                    </CardTitle>
                    <CardDescription>
                      {documents.length} document{documents.length !== 1 ? 's' : ''} in this knowledge base
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {documents.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No documents yet</p>
                        <p className="text-sm mt-1">Upload documents to train your agents</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium text-gray-900">{doc.title}</div>
                                <div className="text-sm text-gray-500">
                                  {doc.documentType.toUpperCase()} • {doc.status}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(doc.created).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Attach to Agent */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-5 w-5 text-ocean-500" />
                      Attach to Agent
                    </CardTitle>
                    <CardDescription>
                      Connect this knowledge base to a D-ID agent using RAG (Retrieval-Augmented Generation)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="agent-id">Agent ID</Label>
                      <Input
                        id="agent-id"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)}
                        placeholder="agt_abc123..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="rag-template">RAG Template</Label>
                      <select
                        id="rag-template"
                        value={ragTemplate}
                        onChange={(e) => setRagTemplate(e.target.value as any)}
                        className="w-full rounded-md border border-gray-300 p-2"
                      >
                        <option value="rag-ungrounded">
                          RAG Ungrounded (Flexible - can use general knowledge)
                        </option>
                        <option value="rag-grounded">
                          RAG Grounded (Strict - only uses knowledge base)
                        </option>
                      </select>
                    </div>
                    <Button
                      onClick={attachKnowledgeToAgent}
                      disabled={loading || !agentId}
                      className="w-full bg-ocean-500 hover:bg-ocean-600"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Attaching...
                        </>
                      ) : (
                        <>
                          <Link className="h-4 w-4 mr-2" />
                          Attach Knowledge Base
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500">
                    <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No Knowledge Base Selected</p>
                    <p className="text-sm mt-2">
                      Select a knowledge base from the list to view and manage its documents
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default DIDKnowledgeManager;
