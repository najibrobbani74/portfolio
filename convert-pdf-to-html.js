// convert-pdfs.js

import pdf2html from 'pdf2html';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// External PDF URL
const pdfUrl = 'https://resume.showwcase.com/najibrobbani74148.pdf'; // Replace with your actual PDF URL
// Temporary file path for the downloaded PDF
const tempPdfPath = path.join(process.cwd(), 'temp.pdf');
// Directory where the HTML files will be saved
const htmlDir = path.join(process.cwd(), 'src/pages/pdf-output'); // Change to your output directory

// Ensure output directory exists
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// Function to download PDF from URL
const downloadPdf = async (url) => {
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'arraybuffer',
  });

  fs.writeFileSync(tempPdfPath, response.data);
  console.log(`Downloaded PDF from ${url}`);
};

// Function to convert PDFs to HTML
const convertPdfToHtml = async () => {
  const pdfFileName = path.basename(pdfUrl, '.pdf');
  const htmlOutputPath = path.join(htmlDir, `${pdfFileName}.html`);
  
  
  const html = await pdf2html.html(tempPdfPath);
  await fs.writeFile(htmlOutputPath, html,()=>{});
  
};

// Main function to execute the download and conversion
const main = async () => {
  try {
    // await downloadPdf(pdfUrl);
    await convertPdfToHtml();

    // Optionally, clean up the temporary PDF file after conversion
    // await fs.unlinkSync(tempPdfPath);
    console.log(`Cleaned up temporary file: ${tempPdfPath}`);
  } catch (error) {
    console.error('Error during PDF conversion process:', error);
  }
};

// Execute the main function
main();
