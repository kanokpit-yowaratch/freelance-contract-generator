export interface ContractData {
	contractTerms: string;
	employer: {
		name: string;
		phone: string;
		email: string;
	};
	employee: {
		name: string;
		phone: string;
		email: string;
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
