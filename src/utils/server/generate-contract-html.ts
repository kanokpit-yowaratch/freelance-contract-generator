import React from 'react';
import { ContractData } from '@/types/contract';

export const generateContractHTML = async (data: ContractData): Promise<string> => {
  try {
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { default: ContractTemplate } = await import('@/components/ContractTemplateColor');
    const componentHTML = renderToStaticMarkup(React.createElement(ContractTemplate, { data }));

    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>สัญญาการจ้างงาน</title>
      <style>
        @page {
          size: A4;
          margin: 0.75in 0.25in 0.65in 0.35in;
        }
        @page :first {
          margin-top: 0.25in; /* หน้าแรกใช้ margin น้อยกว่า */
        }
        body {
          font-family: 'Sarabun', Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          margin: 0;
          box-sizing: border-box;
        }
        .page-content {
          min-height: calc(100vh - 140px); /* ลบ space สำหรับ header + footer */
          padding-top: 20px;
        }
        .contract-header {
          text-align: center;
          margin-top: 30px;
          margin-bottom: 10px;
          page-break-after: avoid;
        }
        .contract-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 6px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 5px;
        }
        .contract-terms {
          white-space: pre-wrap;
        }
        .party-info {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 20px;
        }
        .party {
          flex: 1;
        }
        .party h3 {
          margin-top: 0;
          font-weight: bold;
        }
        .scope-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .scope-list li {
          margin: 8px 0;
          line-height: 1.5;
          word-wrap: break-word;
          overflow-wrap: break-word;
          page-break-inside: avoid;
        }
        .payment-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .payment-item {
          display: flex;
          justify-content: space-between;
        }
        .signature-section {
          margin-top: 50px;
          page-break-inside: avoid;
        }
        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .signature-box {
          text-align: center;
          padding: 20px;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
        }
        .signature-line {
          border-bottom: 2px solid #374151;
          height: 60px;
          margin: 20px 0;
        }
        .witness-section {
          margin-top: 40px;
          page-break-before: auto;
          page-break-inside: avoid;
        }
        .witness-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 20px;
        }
        .no-break {
          page-break-inside: avoid;
        }
        .page-break-before {
          page-break-before: always;
        }
        .page-break-after {
          page-break-after: always;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      </style>
</head>
<body>
    <div class="doc-container">
        ${componentHTML}
    </div>
</body>
</html>`;
  } catch (error) {
    console.log(error);
    return '';
  }
}
