import { useState } from 'react';
import { Upload, FileText, Image, File, X, CheckCircle, Award, Briefcase, Heart, Code, FolderOpen } from 'lucide-react';
import { RegionalFoodComplianceGuide } from '@/app/components/RegionalFoodComplianceGuide';
import { RegionalConstructionComplianceGuide } from '@/app/components/RegionalConstructionComplianceGuide';

interface UploadedDocument {
  id: string;
  file: File;
  category: string;
  description: string;
  url: string;
}

interface DocumentUploadProps {
  onDocumentsChange: (documents: UploadedDocument[]) => void;
  required?: boolean;
  studentLocation?: string;
  showFoodComplianceGuide?: boolean;
}

export function DocumentUpload({ onDocumentsChange, required = false, studentLocation, showFoodComplianceGuide = true }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('training');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [showComplianceGuide, setShowComplianceGuide] = useState(false);
  const [showConstructionGuide, setShowConstructionGuide] = useState(false);

  const categories = [
    { 
      id: 'training', 
      label: 'Training Certificates', 
      icon: Award,
      description: 'CPR, First Aid, Food Handler, etc.',
      examples: 'Food Handler Card, CPR Certification, Safety Training'
    },
    { 
      id: 'health', 
      label: 'Health Certificates', 
      icon: Heart,
      description: 'Medical clearances, TB tests, etc.',
      examples: 'TB Test Results, Health Clearance, Vaccination Records'
    },
    { 
      id: 'license', 
      label: 'Licenses & Permits', 
      icon: FileText,
      description: 'Professional licenses, permits',
      examples: 'Driver\'s License, Professional Certifications, Work Permits'
    },
    { 
      id: 'project', 
      label: 'Projects & Portfolio', 
      icon: Code,
      description: 'Work samples, case studies',
      examples: 'Design Portfolio, Code Samples, Research Papers'
    },
    { 
      id: 'work', 
      label: 'Work Samples', 
      icon: Briefcase,
      description: 'Resume, cover letters, references',
      examples: 'Resume, Cover Letter, Letters of Recommendation'
    },
    { 
      id: 'other', 
      label: 'Other Documents', 
      icon: FolderOpen,
      description: 'Any other relevant documents',
      examples: 'Awards, Transcripts, Other Certifications'
    },
  ];

  const acceptedFileTypes = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'text/plain': ['.txt'],
    'application/zip': ['.zip'],
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newDocuments: UploadedDocument[] = [];

    Array.from(files).forEach((file) => {
      // Validate file size
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      // Create document object
      const doc: UploadedDocument = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        category: selectedCategory,
        description: description || file.name,
        url: URL.createObjectURL(file),
      };

      newDocuments.push(doc);
    });

    const updatedDocuments = [...documents, ...newDocuments];
    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments);
    setDescription(''); // Reset description after upload
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return Image;
    } else if (file.type === 'application/pdf') {
      return FileText;
    } else {
      return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getDocumentsByCategory = (categoryId: string) => {
    return documents.filter(doc => doc.category === categoryId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <Upload className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              📄 Upload Your Documents & Portfolio {required && <span className="text-red-500">*</span>}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Stand out by uploading certificates, licenses, work samples, and projects. This helps employers see your qualifications at a glance!
            </p>

            {/* Category Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Document Type:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const count = getDocumentsByCategory(category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        selectedCategory === category.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="font-semibold text-sm text-gray-900">{category.label}</span>
                        {count > 0 && (
                          <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{category.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Category Info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Examples for {categories.find(c => c.id === selectedCategory)?.label}:</strong>{' '}
                {categories.find(c => c.id === selectedCategory)?.examples}
              </p>
            </div>

            {/* Show Food/Health Compliance Guide Button */}
            {showFoodComplianceGuide && (selectedCategory === 'training' || selectedCategory === 'health') && (
              <div className="mb-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowComplianceGuide(!showComplianceGuide);
                    setShowConstructionGuide(false);
                  }}
                  className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  🍽️ {showComplianceGuide ? 'Hide' : 'View'} Food Industry Requirements by Region
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowConstructionGuide(!showConstructionGuide);
                    setShowComplianceGuide(false);
                  }}
                  className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  🏗️ {showConstructionGuide ? 'Hide' : 'View'} Construction/Trades Requirements by Region
                </button>
              </div>
            )}

            {/* Regional Compliance Guides */}
            {showComplianceGuide && (selectedCategory === 'training' || selectedCategory === 'health') && (
              <div className="mb-6">
                <RegionalFoodComplianceGuide 
                  studentLocation={studentLocation}
                  showForJobType="Restaurant/Food Service"
                />
              </div>
            )}

            {showConstructionGuide && (selectedCategory === 'training' || selectedCategory === 'health') && (
              <div className="mb-6">
                <RegionalConstructionComplianceGuide 
                  studentLocation={studentLocation}
                  showForJobType="Construction/Trades"
                />
              </div>
            )}

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`e.g., "CPR Certification - Valid until 2026"`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Drag and Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-300 bg-white hover:border-green-400'
              }`}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="text-sm font-medium text-gray-900 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Accepted: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB per file)
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  accept={Object.keys(acceptedFileTypes).join(',')}
                  className="hidden"
                />
                <span className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold cursor-pointer inline-block">
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Uploaded Documents List */}
        {documents.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Uploaded Documents ({documents.length})
            </h4>

            {/* Group by category */}
            {categories.map((category) => {
              const categoryDocs = getDocumentsByCategory(category.id);
              if (categoryDocs.length === 0) return null;

              const Icon = category.icon;

              return (
                <div key={category.id} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <h5 className="font-semibold text-sm text-gray-700">{category.label}</h5>
                    <span className="text-xs text-gray-500">({categoryDocs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {categoryDocs.map((doc) => {
                      const FileIcon = getFileIcon(doc.file);
                      const isImage = doc.file.type.startsWith('image/');

                      return (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                        >
                          {/* Preview or Icon */}
                          {isImage ? (
                            <img
                              src={doc.url}
                              alt={doc.description}
                              className="w-12 h-12 object-cover rounded border border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <FileIcon className="w-6 h-6 text-gray-600" />
                            </div>
                          )}

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {doc.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.file.name} • {formatFileSize(doc.file.size)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        {documents.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">
                Great! You've uploaded {documents.length} document{documents.length !== 1 ? 's' : ''}.
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              These documents will be visible to employers when you apply for jobs or appear in their searches.
            </p>
          </div>
        )}

        {/* Helpful Tips */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-900 mb-2">
            <strong>💡 Pro Tips:</strong>
          </p>
          <ul className="text-sm text-yellow-800 space-y-1 ml-4 list-disc">
            <li>Upload high-quality, clear scans or photos of certificates</li>
            <li>For projects, consider creating a PDF portfolio with screenshots and descriptions</li>
            <li>Health certificates and training documents can give you an edge for restaurant, healthcare, and hospitality jobs</li>
            <li>You can always add more documents later from your profile</li>
          </ul>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>🔒 Privacy:</strong> Your documents are securely stored and only visible to employers when you apply for their jobs or when they search for candidates. You can manage, update, or remove documents anytime from your profile settings.
        </p>
      </div>
    </div>
  );
}