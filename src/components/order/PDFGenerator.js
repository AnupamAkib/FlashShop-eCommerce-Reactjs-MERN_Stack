// PDFGenerator.js
import html2pdf from 'html2pdf.js';

const generatePDF = (htmlContent) => {
  html2pdf().from(htmlContent).save('customer_receipt.pdf');
};

export default generatePDF;
