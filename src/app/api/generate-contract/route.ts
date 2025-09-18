import { NextRequest, NextResponse } from 'next/server';
import { createContract } from '@/utils/server/pdf-generator';
import { ContractData } from '@/types/contract';
// import contractData from '@/data/contract-data.json';

export async function POST(request: NextRequest) {
  try {
    const contractData: ContractData = await request.json();
    // const contract: ContractData = contractData;
    const contractBuffer = await createContract(contractData);
    if (contractBuffer) {
      const pdfBuffer = Buffer.from(contractBuffer);
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="contract.pdf"',
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate contract' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to generate contract' },
      { status: 500 }
    );
  }
}
