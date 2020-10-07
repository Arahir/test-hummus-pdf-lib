const hummus = require('hummus');
const pdfLib = require('pdf-lib');
const fs = require('fs');

function pointToCm(value) {
  return Number(((value / 10) * 0.3528).toFixed(1));
}

async function testReadFiles() {
  const buffer = fs.readFileSync(__dirname + '/good.pdf');
  console.log('pdflib')
  const document = await pdfLib.PDFDocument.load(buffer);
  const pages = document.getPages();
  const pageCount = pages.length;
  if (pageCount > 40) {
    return { isValid: false, reason: `Nombre de pages supérieur à ${40}` };
  }
  for (let i = 0; i < pageCount; ++i) {
    const { width, height } = pages[i].getSize()
    console.log(width)
    console.log(height)
  }
  try {
    console.log('hummus')
    const pdfReader = hummus.createReader(__dirname + '/good.pdf');
    const pageCount = pdfReader.getPagesCount();
    if (pageCount > 40) {
      return { isValid: false, reason: `Nombre de pages supérieur à ${40}` };
    }
    for (let i = 0; i < pageCount; ++i) {
      const pageInfo = pdfReader.parsePage(i).getMediaBox();
      console.log(`width: ${pageInfo[2]}`)
      console.log(`height: ${pageInfo[3]}`)
    }
  } catch (error) {
    console.log(error)
  }

}

testReadFiles()