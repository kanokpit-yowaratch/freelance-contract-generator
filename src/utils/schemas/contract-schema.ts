import { z } from 'zod';
import { ContractData } from '@/types/contract';

const employerSchema = z.object({
	name: z.string().min(1, 'ชื่อบริษัทจำเป็น').max(255, 'ชื่อบริษัทยาวเกินไป'),
	phone: z
		.string()
		.regex(/^[0-9+\-\s()]+$/, 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')
		.min(1, 'เบอร์โทรศัพท์จำเป็นต้องระบุ'),
	email: z
		.string()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'รูปแบบอีเมลไม่ถูกต้อง')
		.min(1, 'อีเมลจำเป็นต้องระบุ')
		.max(200, 'อีเมลยาวเกินไป'),
	taxId: z.string(),
});

const employeeSchema = z.object({
	name: z.string().min(1, 'ชื่อ-นามสกุลจำเป็น').max(255, 'ชื่อ-นามสกุลยาวเกินไป'),
	phone: z
		.string()
		.regex(/^[0-9+\-\s()]+$/, 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')
		.min(1, 'เบอร์โทรศัพท์จำเป็นต้องระบุ'),
	email: z
		.string()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'รูปแบบอีเมลไม่ถูกต้อง')
		.min(1, 'อีเมลจำเป็นต้องระบุ')
		.max(200, 'อีเมลยาวเกินไป'),
	idCard: z.string(),
});

const projectDetailsSchema = z.object({
	title: z.string().min(1, 'ชื่อโครงการ จำเป็นต้องกรอก').max(255, 'ชื่อโครงการ ยาวเกินไป'),
	description: z.string().min(1, 'รายละเอียดงานจำเป็น').max(2000, 'รายละเอียดงานยาวเกินไป'),
	timeline: z.string(),
	startDate: z.string().min(1, 'วันที่เริ่มงานจำเป็น'),
	endDate: z.string().min(1, 'วันที่สิ้นสุดงานจำเป็น'),
	projectRate: z.union([z.string(), z.number()]),
});

const PaymentTermsSchema = z
	.object({
		deposit: z
			.number()
			.min(0, 'เปอร์เซ็นต์เงินมัดจำต้องไม่น้อยกว่า 0')
			.max(100, 'เปอร์เซ็นต์เงินมัดจำต้องไม่เกิน 100'),
		milestone: z
			.number()
			.min(0, 'เปอร์เซ็นต์งานกลางระยะต้องไม่น้อยกว่า 0')
			.max(100, 'เปอร์เซ็นต์งานกลางระยะต้องไม่เกิน 100'),
		final: z
			.number()
			.min(0, 'เปอร์เซ็นต์งานสุดท้ายต้องไม่น้อยกว่า 0')
			.max(100, 'เปอร์เซ็นต์งานสุดท้ายต้องไม่เกิน 100'),
	})
	.refine(
		(data) => {
			const total = data.deposit + data.milestone + (data.final - data.milestone);
			return total <= 100;
		},
		{
			message: 'รวมเปอร์เซ็นต์การชำระเงินต้องไม่เกิน 100%',
			path: ['final'],
		},
	);

const WitnessesSchema = z
	.object({
		witness1: z.string().min(1, 'ชื่อพยาน 1 จำเป็น').max(255, 'ชื่อพยาน 1 ยาวเกินไป'),
		witness2: z.string().min(1, 'ชื่อพยาน 2 จำเป็น').max(255, 'ชื่อพยาน 2 ยาวเกินไป'),
	})
	.refine((data) => data.witness1 !== data.witness2, {
		message: 'พยานทั้งสองคนต้องเป็นคนละคน',
		path: ['witness2'],
	});

export const contractSchema = z.object({
	contractTerms: z.string().min(1, 'ต้องกรอกเนื้อหาสัญญา'),
	employer: employerSchema,
	employee: employeeSchema,
	projectDetails: projectDetailsSchema,
	scope: z
		.array(z.string().min(1, 'รายการงานไม่สามารถว่างได้').max(1000, 'รายการงานยาวเกินไป'))
		.min(1, 'ต้องมีขอบเขตการทำงานอย่างน้อย 1 รายการ'),
	paymentTerms: PaymentTermsSchema,
	witnesses: WitnessesSchema,
	//   additionalTerms: z.array(
	//     z.string()
	//       .min(1, 'เงื่อนไขเพิ่มเติมไม่สามารถว่างได้')
	//       .max(1000, 'เงื่อนไขเพิ่มเติมยาวเกินไป')
	//   ).min(1, 'ต้องมีเงื่อนไขเพิ่มเติมอย่างน้อย 1 รายการ')
	// }).refine((data) => {
	//   const startDate = new Date(data.jobDetails.startDate);
	//   const endDate = new Date(data.jobDetails.endDate);
	//   return startDate < endDate;
	// }, {
	//   message: 'วันที่เริ่มงานต้องมาก่อนวันที่สิ้นสุดงาน',
	//   path: ['jobDetails', 'endDate']
});

export type Employer = z.infer<typeof employerSchema>;
export type Employee = z.infer<typeof employeeSchema>;
export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
export type PaymentTerms = z.infer<typeof PaymentTermsSchema>;
export type Witnesses = z.infer<typeof WitnessesSchema>;
export type ContractSchema = z.infer<typeof contractSchema>;

export type EmployerFieldNames = `employer.${keyof Employer}`;
export type EmployeeFieldNames = `employee.${keyof Employee}`;
export type ProjectDetailsFieldNames = `projectDetails.${keyof ProjectDetails}`;
export type PaymentTermsFieldNames = `paymentTerms.${keyof PaymentTerms}`;
export type WitnessesFieldNames = `witnesses.${keyof Witnesses}`;

export type ScopeFieldNames = `scope.${number}`;
export type FeaturesFieldNames = `technicalSpecs.features.${number}`;
export type AdditionalTermsFieldNames = `additionalTerms.${number}`;

export type ContractFieldNames =
	| EmployerFieldNames
	| EmployeeFieldNames
	| ProjectDetailsFieldNames
	| PaymentTermsFieldNames
	| WitnessesFieldNames
	| ScopeFieldNames
	| FeaturesFieldNames
	| AdditionalTermsFieldNames;

export type AllValueTypes = ContractData[keyof ContractData];

export const defaultValues: ContractData = {
	contractTerms: `สัญญาฉบับนี้ทำขึ้น ณ วันที่ 19 กันยายน พ.ศ. 2568 ระหว่าง บริษัท เอบีซีดีอีเอฟ จำกัด เลขประจำตัวผู้เสียภาษี 1357909876543 ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้ว่าจ้าง”
กับ นางสาวสมทรง ใจมั่น ผู้ถือบัตรประจำตัวประชาชนเลขที่ 1234567890987 ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้รับจ้าง” ทั้งสองฝ่ายได้ตกลงทำสัญญานี้ขึ้น โดยมีเงื่อนไขและข้อตกลงร่วมกันดังต่อไปนี้

1. ผู้รับจ้างมีหน้าที่ พัฒนาระบบตามสเปคที่กำหนด รายงานความก้าวหน้าทุกสัปดาห์ผ่าน Line
2. ผู้ว่าจ้างมีหน้าที่ ให้ข้อมูลและความต้องการที่ชัดเจน ตอบกลับและอนุมัติงานภายใน 3 วันทำการ ชำระเงินตามกำหนดเวลาที่ตกลง จัดหาข้อมูลเนื้อหา (Content) สำหรับเว็บไซต์ จัดหา Domain และ Hosting รวมทั้ง Service ต่างๆ ที่จำเป็น เช่น Payment Gateway, Email Service
3. รอบการแก้ไขฟรี: 3 รอบสำหรับแต่ละ Milestone หากมีการเปลี่ยนแปลงขอบเขตงานนอกเหนือจากที่ตกลงไว้ ต้องมีการตกลงร่วมกันเป็นลายลักษณ์อักษร และคิดค่าใช้จ่ายเพิ่มเติมตามอัตรา 1,500 บาท/วัน
4. เก็บรักษาความลับข้อมูลสินค้า, ราคา, และกลยุทธ์ทางการตลาด ทั้งทางธุรกิจของผู้ว่าจ้าง และข้อมูลทางฝั่งผู้รับจ้าง ไม่เปิดเผยข้อมูลแก่บุคคลที่สาม ไม่ใช้ข้อมูลเพื่อประโยชน์ส่วนตัวหรือบุคคลอื่น
5. การยกเลิกสัญญา (Contract Termination)
		5.1 ผู้ว่าจ้างอาจยกเลิกสัญญาได้เมื่อ ผู้รับจ้างไม่ส่งมอบงานตามกำหนดเวลา คุณภาพงานไม่ตรงตามข้อตกลงในสัญญา ผู้รับจ้างผิดสัญญาในข้อสำคัญ ผู้รับจ้างเปิดเผยข้อมูลความลับ
		5.2 ผู้รับจ้างอาจยกเลิกสัญญาได้เมื่อ ผู้ว่าจ้างผิดนัดชำระเงินเกิน 15 วัน ผู้ว่าจ้างเปลี่ยนแปลงขอบเขตงานเกินกว่า 20% ผู้ว่าจ้างไม่ให้ความร่วมมือตามที่ตกลง
6. หากเกิดเหตุสุดวิสัย (ภัยธรรมชาติ, โรคระบาด) ขยายเวลาได้โดยไม่เสียค่าปรับ`,
	employer: {
		name: 'บริษัท เอบีซีดีอีเอฟ จำกัด',
		phone: '02-234-5678',
		email: 'contact@smartshop.co.th',
		taxId: '1234567890987',
	},
	employee: {
		name: 'นางสาวสมทรง ใจมั่น',
		phone: '08-1234-5678',
		email: 'somchai.jaidee@gmail.com',
		idCard: '1234567890987',
	},
	projectDetails: {
		title: 'ระบบการขายออนไลน์ (E-Commerce) ขนาดเล็ก',
		description: 'พัฒนาระบบการขายออนไลน์ (E-Commerce) ขนาดเล็ก พร้อมหน้าโปรไฟล์เว็บไซต์และระบบจัดการหลังบ้าน',
		timeline: '3 เดือน',
		startDate: '1 ตุลาคม 2568',
		endDate: '31 ธันวาคม 2568',
		projectRate: 40000,
	},
	scope: [
		'ฟีเจอร์หลักที่ต้องมี: หน้าแรก (Homepage) พร้อม Banner และสินค้าแนะนำ',
		'สร้างระบบจัดการสินค้า (Product Management) ครบถ้วน ได้แก่ เพิ่ม ลบ แก้ไข และมีการจัดหมวดหมู่สินค้า (สูงสุดไม่เกิน 2 level)',
		'พัฒนาระบบตะกร้าสินค้า (Shopping Cart) พร้อมการคำนวณราคารวมและค่าจัดส่ง',
		'ระบบการสั่งซื้อ (Order Management) ตั้งแต่การเลือกสินค้าจนถึงการยืนยันคำสั่งซื้อ',
		'ระบบชำระเงินออนไลน์ รองรับ QR Code Payment (PromptPay) และโอนเงินธนาคาร',
		'สร้างระบบจัดการคำสั่งซื้อสำหรับผู้ดูแลระบบ',
		'พัฒนาระบบสมาชิก (User Registration & Login) พร้อมการจัดการโปรไฟล์',
		'ระบบติดตามสถานะการสั่งซื้อและการจัดส่ง',
		'สร้าง Dashboard สำหรับดูสถิติยอดขายและรายงานต่างๆ',
		'ระบบรีวิวและให้คะแนนสินค้า',
		'การจัดการสต็อกสินค้าและแจ้งเตือนเมื่อสินค้าใกล้หมด',
		'ระบบส่วนลดและคูปอง (Discount & Coupon System)',
		'ระบบแจ้งเตือนทางอีเมลสำหรับการสั่งซื้อและการจัดส่ง',
		'การติดตั้งและ deploy ระบบบนเซิร์ฟเวอร์จริง',
		'การส่งมอบเอกสารคู่มือการใช้งานสำหรับผู้ดูแลระบบ',
		'การให้คำปรึกษาและการฝึกอบรมการใช้งานระบบเบื้องต้น',
		'การดูแลระบบและแก้ไขปัญหาเร่งด่วนภายใน 30 วันหลังส่งมอบ',
		'Responsive Design: รองรับมือถือและแท็บเล็ต',
		'Backup: ระบบสำรองข้อมูลอัตโนมัติ',
	],
	paymentTerms: {
		deposit: 20,
		milestone: 50,
		final: 100,
	},
	witnesses: {
		witness1: 'นางตาทิพย์ สาดส่อง',
		witness2: 'นายเคียงศักดิ์ ยืนยง',
	},
	// additionalTerms: [
	//   "ผู้รับจ้างต้องใช้ Git สำหรับ Version Control และส่ง Source Code ให้ครบถ้วน",
	//   "การแก้ไขหลังส่งมอบงานเกิน 3 ครั้ง จะมีค่าใช้จ่ายเพิ่มเติม",
	//   "ระบบต้องผ่านการทดสอบ Security และ Performance ตามมาตรฐาน",
	//   "การฝึกอบรมทีมงานผู้ดูแลระบบไม่น้อยกว่า 4 ชั่วโมง",
	//   "Source Code และ Database จะเป็นทรัพย์สินของผู้ว่าจ้าง",
	//   "หากโครงการล่าช้าเกิน 30 วัน ผู้รับจ้างต้องลดค่าจ้าง 5%"
	// ]
	// ผลงานที่ต้องส่งมอบ (Deliverables)
	// เว็บไซต์ที่สมบูรณ์พร้อมใช้งาน
	// ซอร์สโค้ดทั้งหมด
};
