import React from 'react';
import { ContractTemplateProps } from '@/types/contract';

const ContractTemplateColor = ({ data }: ContractTemplateProps) => {
	return (
		<div
			style={{
				fontFamily: "'Sarabun', 'Noto Sans Thai', Arial, sans-serif",
				lineHeight: '1.6',
				padding: '20px',
				fontSize: '16px',
				maxWidth: '56rem',
				margin: '0 auto',
				boxSizing: 'border-box',
			}}>
			<div
				style={{
					minHeight: 'calc(100vh - 140px)',
					paddingTop: '20px',
				}}>
				<div
					style={{
						textAlign: 'center',
						marginTop: '30px',
						marginBottom: '10px',
						pageBreakAfter: 'avoid',
						pageBreakInside: 'avoid',
					}}>
					<h1
						style={{
							fontSize: '20px',
							fontWeight: 'bold',
							marginBottom: '25px',
						}}>
						สัญญาการจ้างงาน
					</h1>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
						whiteSpace: 'pre-wrap',
					}}>
					{data.contractTerms}
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
					}}>
					<h3
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						รายละเอียดงาน
					</h3>
					<ul
						style={{
							listStyle: 'none',
							padding: 0,
							margin: 0,
						}}>
						<li
							key="project-title"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>ชื่อโครงการ:</strong> {data.projectDetails.title}
						</li>
						<li
							key="project-desc"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>รายละเอียด:</strong> {data.projectDetails.description}
						</li>
						<li
							key="project-timeline"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>ระยะเวลา:</strong> {data.projectDetails.timeline}
						</li>
						<li
							key="project-startDate"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>วันที่เริ่มงาน:</strong> {data.projectDetails.startDate}
						</li>
						<li
							key="project-endDate"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>วันที่สิ้นสุด:</strong> {data.projectDetails.endDate}
						</li>
						<li
							key="project-projectRate"
							style={{
								margin: '8px 0',
								lineHeight: 1.5,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								pageBreakInside: 'avoid',
							}}>
							<strong>ค่าจ้าง:</strong> {data.projectDetails.projectRate.toLocaleString('th-TH')} บาท
						</li>
					</ul>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
					}}>
					<h3
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						ขอบเขตงาน (Project Scope)
					</h3>
					<ul
						style={{
							listStyle: 'none',
							padding: 0,
							margin: 0,
						}}>
						{data.scope.map((item, index) => (
							<li
								key={index}
								style={{
									margin: '8px 0',
									lineHeight: 1.5,
									wordWrap: 'break-word',
									overflowWrap: 'break-word',
									pageBreakInside: 'avoid',
								}}>
								- {item}
							</li>
						))}
					</ul>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
						pageBreakBefore: 'always',
					}}>
					<h3
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						เงื่อนไขการชำระเงิน
					</h3>
					<h4
						style={{
							marginBottom: '10px',
						}}>
						แบ่งการจ่ายเป็น 3 งวด
					</h4>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<span>งวดที่ 1: เงินมัดจำเมื่อเซ็นสัญญา</span>
						<strong>
							{data.paymentTerms.deposit}% (
							{((data.projectDetails.projectRate * data.paymentTerms.deposit) / 100).toLocaleString('th-TH')}{' '}
							บาท)
						</strong>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<span>งวดที่ 2: เมื่อความคืบหน้า 50%</span>
						<strong>
							{data.paymentTerms.milestone}% (
							{((data.projectDetails.projectRate * data.paymentTerms.milestone) / 100).toLocaleString(
								'th-TH',
							)}{' '}
							บาท)
						</strong>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<span>งวดที่ 3: เมื่อส่งมอบงานเสร็จสิ้น</span>
						<strong>
							{data.paymentTerms.final}% (
							{((data.projectDetails.projectRate * data.paymentTerms.final) / 100).toLocaleString('th-TH')}{' '}
							บาท)
						</strong>
					</div>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
					}}>
					<h2
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						คู่สัญญา
					</h2>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '30px',
							marginBottom: '20px',
						}}>
						<div style={{ flex: 1 }}>
							<h4
								style={{
									marginTop: 0,
									fontWeight: 'bold',
								}}>
								ผู้ว่าจ้าง
							</h4>
							<div>
								<strong>ชื่อ:</strong> {data.employer.name}
							</div>
							<div>
								<strong>โทรศัพท์:</strong> {data.employer.phone}
							</div>
							<div>
								<strong>อีเมล:</strong> {data.employer.email}
							</div>
							<div>
								<strong>เลขประจำตัวผู้เสียภาษี:</strong> {data.employer.taxId}
							</div>
						</div>
						<div style={{ flex: 1 }}>
							<h4
								style={{
									marginTop: 0,
									fontWeight: 'bold',
								}}>
								ผู้รับจ้าง
							</h4>
							<div>
								<strong>ชื่อ:</strong> {data.employee.name}
							</div>
							<div>
								<strong>โทรศัพท์:</strong> {data.employee.phone}
							</div>
							<div>
								<strong>อีเมล:</strong> {data.employee.email}
							</div>
							<div>
								<strong>เลขที่บัตร ปชช:</strong> {data.employee.idCard}
							</div>
						</div>
					</div>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
						marginTop: '50px',
					}}>
					<h2
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						ลงนาม
					</h2>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '40px',
							marginTop: '40px',
						}}>
						<div
							style={{
								textAlign: 'center',
								padding: '20px',
								border: '2px dashed #d1d5db',
								borderRadius: '8px',
							}}>
							<p>ผู้ว่าจ้าง</p>
							<div
								style={{
									borderBottom: '2px solid #374151',
									height: '60px',
									margin: '20px 0',
								}}></div>
							<p>( {data.employer.name} )</p>
							<p>วันที่ .........................</p>
						</div>
						<div
							style={{
								textAlign: 'center',
								padding: '20px',
								border: '2px dashed #d1d5db',
								borderRadius: '8px',
							}}>
							<p>ผู้รับจ้าง</p>
							<div
								style={{
									borderBottom: '2px solid #374151',
									height: '60px',
									margin: '20px 0',
								}}></div>
							<p>( {data.employee.name} )</p>
							<p>วันที่ .........................</p>
						</div>
					</div>
				</div>

				<div
					style={{
						marginBottom: '25px',
						pageBreakInside: 'avoid',
						marginTop: '40px',
						pageBreakBefore: 'auto',
					}}>
					<h2
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							marginBottom: '6px',
							borderBottom: '2px solid #e5e7eb',
							paddingBottom: '5px',
						}}>
						พยาน
					</h2>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '30px',
							marginTop: '20px',
						}}>
						<div
							style={{
								textAlign: 'center',
								padding: '20px',
								border: '2px dashed #d1d5db',
								borderRadius: '8px',
							}}>
							<p>พยานคนที่ 1</p>
							<div
								style={{
									borderBottom: '2px solid #374151',
									height: '60px',
									margin: '20px 0',
								}}></div>
							<p>( {data.witnesses.witness1} )</p>
							<p>วันที่ .........................</p>
						</div>
						<div
							style={{
								textAlign: 'center',
								padding: '20px',
								border: '2px dashed #d1d5db',
								borderRadius: '8px',
							}}>
							<p>พยานคนที่ 2</p>
							<div
								style={{
									borderBottom: '2px solid #374151',
									height: '60px',
									margin: '20px 0',
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
