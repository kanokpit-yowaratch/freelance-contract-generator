import { ContractData } from '@/types/contract';

export function generateContractHTML(data: ContractData): string {
  let htmlContent = `
    <!DOCTYPE html>
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
    <body>`;
  htmlContent += `
      <div class="page-content">
        <div class="contract-header no-break">
          <h1 class="contract-title">สัญญาการจ้างงาน</h1>
        </div>`;

  htmlContent += `
        <div class="section contract-terms no-break">
          ${data.contractTerms}
        </div>`;

  htmlContent += `
      <div class="section">
        <h2 class="section-title">รายละเอียดงาน</h2>
        <p><strong>ชื่อโครงการ:</strong> ${data.projectDetails.title}</p>
        <p><strong>รายละเอียด:</strong> ${data.projectDetails.description}</p>
        <p><strong>ระยะเวลา:</strong> ${data.projectDetails.timeline}</p>
        <p><strong>วันที่เริ่มงาน:</strong> ${data.projectDetails.startDate}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${data.projectDetails.endDate}</p>
        <p><strong>ค่าจ้าง:</strong> ${data.projectDetails.projectRate} บาท</p>
      </div>`;

  htmlContent += `
  <div class="section">
    <h2 class="section-title">ขอบเขตงาน (Scope of Work)</h2>
    <ul class="scope-list">
      ${data.scope.map(item => `<li>• ${item}</li>`).join('')}
    </ul>
  </div>`;

  htmlContent += `
  <div class="section page-break-before">
    <h2 class="section-title">เงื่อนไขการชำระเงิน</h2>
    <h3 class="payment-title">แบ่งการจ่ายเป็น 3 งวด</h3>
    <div class="payment-item">
      <span>งวดที่ 1: เงินมัดจำ</span>
      <strong>${data.paymentTerms.deposit}% (${(data.projectDetails.projectRate * data.paymentTerms.deposit / 100).toLocaleString('th-TH')} บาท)</strong>
    </div>
    <div class="payment-item">
      <span>งวดที่ 2: เมื่อความคืบหน้า 50%</span>
      <strong>${data.paymentTerms.milestone}% (${(data.projectDetails.projectRate * data.paymentTerms.milestone / 100).toLocaleString('th-TH')} บาท)</strong>
    </div>
    <div class="payment-item">
      <span>งวดที่ 3: เมื่อส่งมอบงานเสร็จสิ้น</span>
      <strong>${data.paymentTerms.final}% (${(data.projectDetails.projectRate * data.paymentTerms.final / 100).toLocaleString('th-TH')} บาท)</strong>
    </div>
  </div>`;

  htmlContent += `
      <div class="section no-break">
        <h2 class="section-title">คู่สัญญา</h2>
        <div class="party-info">
          <div class="party">
            <h3>ผู้ว่าจ้าง</h3>
            <p><strong>ชื่อ:</strong> ${data.employer.name}</p>
            <p><strong>โทรศัพท์:</strong> ${data.employer.phone}</p>
            <p><strong>อีเมล:</strong> ${data.employer.email}</p>
          </div>
          <div class="party">
            <h3>ผู้รับจ้าง</h3>
            <p><strong>ชื่อ:</strong> ${data.employee.name}</p>
            <p><strong>โทรศัพท์:</strong> ${data.employee.phone}</p>
            <p><strong>อีเมล:</strong> ${data.employee.email}</p>
          </div>
        </div>
      </div>`;

  htmlContent += `
  <div class="section signature-section no-break">
    <h2 class="section-title">ลงนาม</h2>
    <div class="signature-grid">
      <div class="signature-box">
        <p>ผู้ว่าจ้าง</p>
        <div class="signature-line"></div>
        <p>( ${data.employer.name} )</p>
        <p>วันที่ .........................</p>
      </div>
      <div class="signature-box">
        <p>ผู้รับจ้าง</p>
        <div class="signature-line"></div>
        <p>( ${data.employee.name} )</p>
        <p>วันที่ .........................</p>
      </div>
    </div>
  </div>

  <div class="section witness-section no-break">
    <h2 class="section-title">พยาน</h2>
    <div class="witness-grid">
      <div class="signature-box">
        <p>พยานคนที่ 1</p>
        <div class="signature-line"></div>
        <p>( ${data.witnesses.witness1} )</p>
        <p>วันที่ .........................</p>
      </div>
      <div class="signature-box">
        <p>พยานคนที่ 2</p>
        <div class="signature-line"></div>
        <p>( ${data.witnesses.witness2} )</p>
        <p>วันที่ .........................</p>
      </div>
    </div>
  </div>
  </div>`;

  htmlContent += `
    </body>
    </html>`;
  return htmlContent;
}
