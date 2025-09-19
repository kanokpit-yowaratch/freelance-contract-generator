'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContractData } from '@/types/contract';
import { useForm } from 'react-hook-form';
import {
	AllValueTypes,
	ContractSchema,
	contractSchema,
	defaultValues,
} from '@/utils/schemas/contract-schema';
import { setNestedValue } from '@/utils/contract';
import { downloadPDF } from '@/utils/client/download';
import { generateContractHTML } from '@/utils/server/generate-contract-html';
import { Download, Plus, Trash2, Printer } from 'lucide-react';

const FreelanceContractGenerator = () => {
	const [contractData, setContractData] = useState<ContractData>(defaultValues);
	const [activeTab, setActiveTab] = useState<string>('terms');
	const [htmlContent, setHtmlContent] = useState<string>('');
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const {
		register,
		clearErrors,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<ContractSchema>({
		resolver: zodResolver(contractSchema),
		defaultValues,
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		manageChange(name, value);
	};

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		manageChange(name, value);
	};

	const manageChange = (name: string, value: string | number | string[]) => {
		setContractData((prev) => setNestedValue(prev, name, value));
		clearErrors(name as keyof ContractSchema);
		const nameParts = name.split('.');
		if (nameParts.length > 1) {
			setValue(
				nameParts[0] as keyof ContractSchema,
				{
					...(contractData[nameParts[0] as keyof ContractData] as object),
					[nameParts[1]]: value,
				} as AllValueTypes,
			);
		} else {
			setValue(name as keyof ContractSchema, value as AllValueTypes);
		}
	};

	const addScope = () => {
		setContractData((prev) => ({
			...prev,
			scope: [...prev.scope, ''],
		}));
	};

	const handleScopeChange = (index: number, value: string) => {
		const newItems = [...contractData.scope];
		newItems[index] = value;
		setContractData((prev) => ({ ...prev, scope: newItems }));
	};

	const removeScope = (index: number) => {
		const newItems = contractData.scope.filter((_, i) => i !== index);
		setContractData((prev) => ({ ...prev, scope: newItems }));
	};

	const downloadContract = () => {
		setIsProcessing(true);
		const blob = new Blob([JSON.stringify(contractData, null, 2)], {
			type: 'application/json;charset=utf-8',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `contract-data.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		setIsProcessing(false);
	};

	const exportPdf = async () => {
		setIsProcessing(true);
		await downloadPDF(contractData);
		setIsProcessing(false);
	};

	const loadPreview = async () => {
		const preview = await generateContractHTML(contractData);
		setHtmlContent(preview);
	};

	const onSubmit = () => {
		console.log(contractData);
	};

	useEffect(() => {
		loadPreview();
	}, [contractData]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 to-stone-200 text-sm">
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-center items-center mb-4">
					<h4 className="text-2xl font-bold text-gray-700">เครื่องมือช่วยร่างสัญญาสำหรับ Freelance</h4>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<div className="bg-white rounded-2xl shadow-lg">
						<div className="border-b border-gray-200 h-14">
							<div className="flex">
								{[
									{ id: 'terms', label: 'เงื่อนไขสัญญา' },
									{ id: 'scope', label: 'ขอบเขตงาน' },
									{ id: 'payment_terms', label: 'เงื่อนไขการชำระเงิน' },
									{ id: 'basic', label: 'คู่สัญญา' },
								].map((tab) => (
									<button
										type="button"
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`flex-1 p-4 transition-colors ${
											activeTab === tab.id
												? 'text-indigo-600 border-b-2 border-indigo-600'
												: 'text-gray-600 cursor-pointer hover:text-indigo-600'
										}`}>
										{tab.label}
									</button>
								))}
							</div>
						</div>

						<div className="p-6">
							{activeTab === 'basic' && (
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<h3 className="font-semibold text-gray-800 mb-4">ข้อมูลผู้ว่าจ้าง</h3>
											<div className="space-y-4">
												<div>
													<label
														htmlFor="employer.name"
														className="block text-sm font-medium text-gray-700 mb-2">
														ชื่อ
													</label>
													<input
														{...register('employer.name')}
														type="text"
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="นาย/นาง/นางสาว ..."
													/>
												</div>
												<div>
													<label
														htmlFor="employer.phone"
														className="block text-sm font-medium text-gray-700 mb-2">
														เบอร์โทร
													</label>
													<input
														{...register('employer.phone')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="client@example.com"
													/>
												</div>
												<div>
													<label
														htmlFor="employer.email"
														className="block text-sm font-medium text-gray-700 mb-2">
														อีเมล
													</label>
													<input
														type="email"
														{...register('employer.email')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="user@example.com"
													/>
												</div>
												<div>
													<label
														htmlFor="employer.taxId"
														className="block text-sm font-medium text-gray-700 mb-2">
														Tax Id
													</label>
													<input
														{...register('employer.taxId')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="user@example.com"
													/>
												</div>
											</div>
										</div>

										<div>
											<h3 className="font-semibold text-gray-800 mb-4">ข้อมูลผู้รับจ้าง</h3>
											<div className="space-y-4">
												<div>
													<label
														htmlFor="employee.name"
														className="block text-sm font-medium text-gray-700 mb-2">
														ชื่อ
													</label>
													<input
														{...register('employee.name')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="นาย/นาง/นางสาว ..."
													/>
												</div>
												<div>
													<label
														htmlFor="employee.phone"
														className="block text-sm font-medium text-gray-700 mb-2">
														เบอร์โทร
													</label>
													<input
														{...register('employee.phone')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder=""
													/>
												</div>
												<div>
													<label
														htmlFor="employee.email"
														className="block text-sm font-medium text-gray-700 mb-2">
														อีเมล
													</label>
													<input
														{...register('employee.email')}
														type="email"
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="user@example.com"
													/>
												</div>
												<div>
													<label
														htmlFor="employee.idCard"
														className="block text-sm font-medium text-gray-700 mb-2">
														เลขที่บัตร ปชช
													</label>
													<input
														{...register('employee.idCard')}
														onChange={handleInputChange}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														placeholder="user@example.com"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{activeTab === 'scope' && (
								<div className="space-y-6">
									<div>
										<h3 className="font-semibold text-gray-800 mb-4">ข้อมูลโครงการ</h3>
										<div className="space-y-4">
											<div>
												<label
													htmlFor="projectDetails.title"
													className="block text-sm font-medium text-gray-700 mb-2">
													ชื่อโครงการ
												</label>
												<input
													{...register('projectDetails.title')}
													onChange={handleInputChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													placeholder="ชื่อโครงการหรืองานที่จ้าง"
												/>
											</div>
											<div>
												<label
													htmlFor="projectDetails.description"
													className="block text-sm font-medium text-gray-700 mb-2">
													รายละเอียดโครงการ
												</label>
												<textarea
													{...register('projectDetails.description')}
													onChange={handleTextareaChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													rows={3}
													placeholder="อธิบายรายละเอียดโครงการ"
												/>
											</div>
											<div>
												<label
													htmlFor="projectDetails.timeline"
													className="block text-sm font-medium text-gray-700 mb-2">
													ระยะเวลาดำเนินการ (Timeline)
												</label>
												<input
													{...register('projectDetails.timeline')}
													onChange={handleInputChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													placeholder="EXP: 2 สัปดาห์, 1 เดือน, 1 ปี"
												/>
											</div>
											<div>
												<label
													htmlFor="projectDetails.startDate"
													className="block text-sm font-medium text-gray-700 mb-2">
													วันที่เริ่มงาน
												</label>
												<input
													{...register('projectDetails.startDate')}
													type="date"
													onChange={handleInputChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													placeholder=""
												/>
											</div>
											<div>
												<label
													htmlFor="projectDetails.endDate"
													className="block text-sm font-medium text-gray-700 mb-2">
													วันที่สิ้นสุดงาน
												</label>
												<input
													{...register('projectDetails.endDate')}
													type="date"
													onChange={handleInputChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													placeholder=""
												/>
											</div>
											<div>
												<label
													htmlFor="projectDetails.projectRate"
													className="block text-sm font-medium text-gray-700 mb-2">
													ค่าตอบแทน
												</label>
												<input
													{...register('projectDetails.projectRate')}
													type="number"
													onChange={handleInputChange}
													className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
													placeholder=""
												/>
												{errors.projectDetails?.projectRate && (
													<p className="text-red-500">{errors.projectDetails?.projectRate.message}</p>
												)}
											</div>
										</div>
									</div>
									<div>
										<div className="flex justify-between items-center mb-4">
											<h3 className="font-semibold text-gray-800">ขอบเขตงาน (Project Scope)</h3>
											<button
												type="button"
												onClick={addScope}
												className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
												<Plus className="w-4 h-4 mr-1" />
												เพิ่ม
											</button>
										</div>
										<div className="space-y-3">
											{contractData.scope.map((item, index) => (
												<div key={index} className="flex items-center space-x-3">
													<span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
														{index + 1}
													</span>
													<textarea
														value={item}
														onChange={(e) => handleScopeChange(index, e.target.value)}
														className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
														rows={2}
														placeholder="รายละเอียดงานที่ต้องทำ"
													/>
													{contractData.scope.length > 1 && (
														<button
															type="button"
															onClick={() => removeScope(index)}
															className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg">
															<Trash2 className="w-4 h-4" />
														</button>
													)}
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{activeTab === 'payment_terms' && (
								<div className="space-y-6">
									<h1 className="font-semibold">แบ่งการจ่ายเป็น 3 งวด</h1>
									<div>
										<label
											htmlFor="paymentTerms.deposit"
											className="block text-sm font-medium text-gray-700 mb-2">
											งวดที่ 1: เปอร์เซ็นต์เงินมัดจำ {contractData.paymentTerms.deposit}%{' '}
											{`(${((contractData.projectDetails.projectRate * contractData.paymentTerms.deposit) / 100).toLocaleString('th-TH')} บาท)`}
										</label>
										<input
											{...register('paymentTerms.deposit')}
											type="number"
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="ใส่ตัวเลข 1-100"
										/>
									</div>
									<div>
										<label
											htmlFor="paymentTerms.milestone"
											className="block text-sm font-medium text-gray-700 mb-2">
											งวดที่ 2: จ่ายเพิ่มให้ครบ {contractData.paymentTerms.milestone} เปอร์เซ็นต์
											เมื่อความคืบหน้า 50%{' '}
											{`(${((contractData.projectDetails.projectRate * contractData.paymentTerms.milestone) / 100).toLocaleString('th-TH')} บาท)`}
										</label>
										<input
											{...register('paymentTerms.milestone')}
											type="number"
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="ใส่ตัวเลข 1-100"
										/>
									</div>
									<div>
										<label
											htmlFor="paymentTerms.final"
											className="block text-sm font-medium text-gray-700 mb-2">
											งวดที่ 3: เมื่อส่งมอบงานเสร็จสิ้นสมบูรณ์{' '}
											{`(${((contractData.projectDetails.projectRate * contractData.paymentTerms.final) / 100).toLocaleString('th-TH')} บาท)`}
										</label>
										<input
											{...register('paymentTerms.final')}
											type="number"
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
											placeholder="100"
										/>
									</div>
								</div>
							)}

							{activeTab === 'terms' && (
								<div className="space-y-6">
									<textarea
										{...register('contractTerms')}
										rows={20}
										placeholder="พิมพ์ข้อความที่นี่..."
										className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										style={{ whiteSpace: 'pre-wrap' }}
										onChange={handleTextareaChange}
									/>
								</div>
							)}
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg">
						<div className="flex justify-between items-center px-4 border-b border-gray-200 h-14">
							<h4>แสดงตัวอย่าง</h4>
							<div className="flex space-x-2">
								<button
									type="button"
									className="flex items-center gap-1 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
									onClick={downloadContract}
									disabled={isProcessing}>
									<Download className="w-4 h-4 mr-2" />
									ดาวน์โหลด JSON
								</button>
								<button
									type="button"
									className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
									onClick={exportPdf}
									disabled={isProcessing}>
									<Printer size={18} />
									ดาวน์โหลด PDF
								</button>
							</div>
						</div>
						<div className="p-6">
							<div
								className="overflow-y-auto text-sm"
								dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FreelanceContractGenerator;
