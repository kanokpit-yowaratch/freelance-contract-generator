import React from 'react';
import { ContractTemplateProps } from '@/types/contract';

const ContractTemplateColor = ({ data }: ContractTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: "'Sarabun', 'Noto Sans Thai', Arial, sans-serif",
        lineHeight: '1.4',
        background: '#fff',
        padding: '20px',
        fontSize: '14px',
        maxWidth: '56rem',
        margin: '0 auto',
      }}>
      {/* <div style={{
      fontFamily: "'Sarabun', Arial, sans-serif",
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#333',
      margin: 0,
      boxSizing: 'border-box'
    }}> */}
      <div style={{
        minHeight: 'calc(100vh - 140px)',
        paddingTop: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          marginBottom: '10px',
          pageBreakAfter: 'avoid',
          pageBreakInside: 'avoid'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>สัญญาการจ้างงาน</h1>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid',
          whiteSpace: 'pre-wrap'
        }}>
          {data.contractTerms}
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>รายละเอียดงาน</h2>
          <p><strong>ชื่อโครงการ:</strong> {data.projectDetails.title}</p>
          <p><strong>รายละเอียด:</strong> {data.projectDetails.description}</p>
          <p><strong>ระยะเวลา:</strong> {data.projectDetails.timeline}</p>
          <p><strong>วันที่เริ่มงาน:</strong> {data.projectDetails.startDate}</p>
          <p><strong>วันที่สิ้นสุด:</strong> {data.projectDetails.endDate}</p>
          <p><strong>ค่าจ้าง:</strong> {data.projectDetails.projectRate.toLocaleString('th-TH')} บาท</p>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>ขอบเขตงาน (Scope of Work)</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {data.scope.map((item, index) => (
              <li key={index} style={{
                margin: '8px 0',
                lineHeight: 1.5,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                pageBreakInside: 'avoid'
              }}>- {item}</li>
            ))}
          </ul>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid',
          pageBreakBefore: 'always'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>เงื่อนไขการชำระเงิน</h2>
          <h3 style={{
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>แบ่งการจ่ายเป็น 3 งวด</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>งวดที่ 1: เงินมัดจำ</span>
            <strong>{data.paymentTerms.deposit}% ({(data.projectDetails.projectRate * data.paymentTerms.deposit / 100).toLocaleString('th-TH')} บาท)</strong>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>งวดที่ 2: เมื่อความคืบหน้า 50%</span>
            <strong>{data.paymentTerms.milestone}% ({(data.projectDetails.projectRate * data.paymentTerms.milestone / 100).toLocaleString('th-TH')} บาท)</strong>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>งวดที่ 3: เมื่อส่งมอบงานเสร็จสิ้น</span>
            <strong>{data.paymentTerms.final}% ({(data.projectDetails.projectRate * data.paymentTerms.final / 100).toLocaleString('th-TH')} บาท)</strong>
          </div>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>คู่สัญญา</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                marginTop: 0,
                fontWeight: 'bold'
              }}>ผู้ว่าจ้าง</h3>
              <p><strong>ชื่อ:</strong> {data.employer.name}</p>
              <p><strong>โทรศัพท์:</strong> {data.employer.phone}</p>
              <p><strong>อีเมล:</strong> {data.employer.email}</p>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                marginTop: 0,
                fontWeight: 'bold'
              }}>ผู้รับจ้าง</h3>
              <p><strong>ชื่อ:</strong> {data.employee.name}</p>
              <p><strong>โทรศัพท์:</strong> {data.employee.phone}</p>
              <p><strong>อีเมล:</strong> {data.employee.email}</p>
            </div>
          </div>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid',
          marginTop: '50px'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>ลงนาม</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginTop: '40px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px'
            }}>
              <p>ผู้ว่าจ้าง</p>
              <div style={{
                borderBottom: '2px solid #374151',
                height: '60px',
                margin: '20px 0'
              }}></div>
              <p>( {data.employer.name} )</p>
              <p>วันที่ .........................</p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px'
            }}>
              <p>ผู้รับจ้าง</p>
              <div style={{
                borderBottom: '2px solid #374151',
                height: '60px',
                margin: '20px 0'
              }}></div>
              <p>( {data.employee.name} )</p>
              <p>วันที่ .........................</p>
            </div>
          </div>
        </div>

        <div style={{
          marginBottom: '25px',
          pageBreakInside: 'avoid',
          marginTop: '40px',
          pageBreakBefore: 'auto'
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '6px',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '5px'
          }}>พยาน</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginTop: '20px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px'
            }}>
              <p>พยานคนที่ 1</p>
              <div style={{
                borderBottom: '2px solid #374151',
                height: '60px',
                margin: '20px 0'
              }}></div>
              <p>( {data.witnesses.witness1} )</p>
              <p>วันที่ .........................</p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px'
            }}>
              <p>พยานคนที่ 2</p>
              <div style={{
                borderBottom: '2px solid #374151',
                height: '60px',
                margin: '20px 0'
              }}></div>
              <p>( {data.witnesses.witness2} )</p>
              <p>วันที่ .........................</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplateColor;
