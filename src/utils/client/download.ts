import { ContractData } from '@/types/contract';

export const downloadPDF = async (contractData: ContractData) => {
	try {
		const response = await fetch(`/api/generate-contract`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contractData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'contract.pdf';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	} catch (error) {
		console.log('เกิดข้อผิดพลาดในการสร้าง PDF', error);
	}
};
