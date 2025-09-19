import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { ContractData } from '@/types/contract';
import { generateContractHTML } from './generate-contract-html';

export async function generateContractPDF(contractData: ContractData) {
	let browser;
	try {
		const executablePath =
			process.env.NODE_ENV === 'development'
				? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
				: await chromium.executablePath();

		browser = await puppeteer.launch({
			headless: true,
			args: [
				...chromium.args,
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--disable-gpu',
				'--no-first-run',
				'--no-zygote',
				'--single-process',
				'--disable-extensions',
			],
			defaultViewport: {
				width: 1200,
				height: 800,
				deviceScaleFactor: 1,
				isMobile: false,
				hasTouch: false,
				isLandscape: false,
			},
			executablePath,
		});

		const page = await browser.newPage();

		const htmlContent = await generateContractHTML(contractData);

		await page.setContent(htmlContent, {
			waitUntil: 'networkidle0',
		});

		// config header and footer with page number
		const pdf = await page.pdf({
			displayHeaderFooter: true,
			headerTemplate: `
      <div style="font-size: 12px; width: 100%; text-align: center; padding: 10px;">
        <span>สัญญาว่าจ้าง (Contract Agreement)</span>
      </div>
    `,
			footerTemplate: `
      <div style="font-size: 12px; width: 100%; text-align: center; padding: 10px;">
        <span>หน้า <span class="pageNumber"></span> จาก <span class="totalPages"></span></span>
      </div>
    `,
		});
		return pdf;
	} catch (error) {
		console.log('Failed to generate PDF', error);
		return null;
	} finally {
		if (browser) {
			await browser.close();
		}
	}
}

export async function createContract(contractData: ContractData) {
	try {
		const pdfBuffer = await generateContractPDF(contractData);
		return pdfBuffer;
	} catch (error) {
		console.log(error);
		return null;
	}
}
