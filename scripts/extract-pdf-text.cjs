#!/usr/bin/env node
/* Simple PDF text extraction */
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

async function run() {
  const pdfPath = path.resolve(process.argv[2] || 'Sivasankaramalan_LEAD_SDET .pdf');
  if (!fs.existsSync(pdfPath)) {
    console.error('File not found:', pdfPath);
    process.exit(1);
  }
  const data = await pdfParse(fs.readFileSync(pdfPath));
  console.log('--- BEGIN TEXT ---');
  console.log(data.text);
  console.log('--- END TEXT ---');
}
run().catch(err => { console.error(err); process.exit(1); });
