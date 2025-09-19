export interface ContractData {
	contractTerms: string;
	employer: {
		name: string;
		phone: string;
		email: string;
		taxId: string; // or ID Card for personal
	};
	employee: {
		name: string;
		phone: string;
		email: string;
		idCard: string;
	};
	projectDetails: {
		title: string;
		description: string;
		timeline: string;
		startDate: string;
		endDate: string;
		projectRate: number;
	};
	scope: string[];
	paymentTerms: {
		deposit: number;
		milestone: number;
		final: number;
	};
	witnesses: {
		witness1: string;
		witness2: string;
	};
}

export interface ContractTemplateProps {
	data: ContractData;
}
