import { jsPDF } from 'jspdf';
import { expandDocumentContent } from './comprehensiveContentExpander';

interface DocumentInfo {
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  status: string;
  size: string;
  pages: number;
  content: string;
  file: string;
  description?: string;
  id?: string;
}

interface PDFOptions {
  repositoryName: string;
  headerColor?: [number, number, number];
  accentColor?: [number, number, number];
}

export function generatePDF(doc: DocumentInfo, options: PDFOptions): void {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    const headerColor = options.headerColor || [16, 185, 129]; // Default green
    const accentColor = options.accentColor || [5, 150, 105];

    // Header Section
    pdf.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    pdf.rect(0, 0, pageWidth, 45, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ZALPHA', margin, 15);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(options.repositoryName, margin, 22);

    // Document Title
    yPosition = 55;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(doc.name, contentWidth);
    pdf.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 8;

    // Metadata Box
    yPosition += 5;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPosition, contentWidth, 35, 'F');
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(60, 60, 60);
    
    const metadataY = yPosition + 8;
    pdf.text(`Category: ${doc.category.toUpperCase()}`, margin + 5, metadataY);
    pdf.text(`Version: ${doc.version}`, margin + 5, metadataY + 6);
    pdf.text(`Last Updated: ${doc.lastUpdated}`, margin + 5, metadataY + 12);
    pdf.text(`Status: ${doc.status.toUpperCase()}`, margin + 5, metadataY + 18);
    pdf.text(`File Size: ${doc.size}`, margin + 65, metadataY);
    pdf.text(`Pages: ${doc.pages}`, margin + 65, metadataY + 6);
    
    yPosition += 40;

    // Separator Line
    pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Content Section Header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('DOCUMENT CONTENT', margin, yPosition);
    yPosition += 8;

    // Content
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(40, 40, 40);

    const contentLines = pdf.splitTextToSize(expandDocumentContent(doc), contentWidth);
    
    for (let i = 0; i < contentLines.length; i++) {
      if (yPosition > pageHeight - 25) {
        // Add new page
        pdf.addPage();
        yPosition = margin;
        
        // Add page header
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text(doc.name, margin, 10);
        pdf.text(`Page ${pdf.internal.pages.length - 1}`, pageWidth - margin - 20, 10);
        yPosition = 20;
        
        pdf.setFontSize(10);
        pdf.setTextColor(40, 40, 40);
      }
      
      pdf.text(contentLines[i], margin, yPosition);
      yPosition += 5;
    }

    // Footer on last page
    yPosition = pageHeight - 25;
    pdf.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 5;
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'italic');
    pdf.text('This document is confidential and proprietary to ZALPHA.', margin, yPosition);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition + 4);
    pdf.text(options.repositoryName, margin, yPosition + 8);

    // Save the PDF
    const filename = doc.file.replace(/\.(pdf|docx|xlsx|pptx|zip|doc|xls|ppt)$/i, '.pdf');
    pdf.save(filename);
    
    // Show success message
    alert(`✅ Downloaded: ${doc.name}\n\nFile saved as: ${filename}`);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('❌ PDF download failed. Please try again.');
  }
}