const SPREADSHEET_ID = '1ngD5jb8SrKWvLetR5DyjPAcIe9dg9r_HpFsowHNvkY8';
const SHEET_NAME = 'Результати';

const ANSWERS = {
  q1: 'a',
  q2: 'b',
  q3: 'c',
  q4: 'a',
  q5: 'b',
  q6: 'c'
};

function doGet() {
  return ContentService
    .createTextOutput('4.12 test results endpoint is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const p = e.parameter || {};
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet not found: ' + SHEET_NAME);

  let score = 0;
  Object.keys(ANSWERS).forEach(k => {
    if ((p[k] || '') === ANSWERS[k]) score++;
  });
  const percent = Math.round(score / Object.keys(ANSWERS).length * 100);

  sheet.appendRow([
    new Date(),
    p.group || '',
    p.rank || '',
    p.name || '',
    score,
    percent,
    p.q1 || '',
    p.q2 || '',
    p.q3 || '',
    p.q4 || '',
    p.q5 || '',
    p.q6 || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true, score, percent}))
    .setMimeType(ContentService.MimeType.JSON);
}