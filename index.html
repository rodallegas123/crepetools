// P.S. I Crepe You — Register Closing Sheet Script (Updated)
// ─────────────────────────────────────────────────
// Since you've added new fields, you need to redeploy:
//
// 1. Paste this into your Apps Script editor (replacing the old code)
// 2. Click Save
// 3. Click Deploy → Manage Deployments
// 4. Click the pencil (edit) icon on your existing deployment
// 5. Change Version to "New version"
// 6. Click Deploy
//
// Your existing URL stays the same — no need to update the HTML file.
// ─────────────────────────────────────────────────

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Date",
        "Employee",
        "Starting Bank",
        "Cash Sales",
        "Snackpass Total",
        "Physical Count",
        "Over / Short",
        "To Deposit",
        "Notes"
      ])

      const headerRange = sheet.getRange(1, 1, 1, 10)
      headerRange.setBackground("#ff4d8d")
      headerRange.setFontColor("#ffffff")
      headerRange.setFontWeight("bold")
      sheet.setFrozenRows(1)

      sheet.setColumnWidth(1, 160)
      sheet.setColumnWidth(2, 100)
      sheet.setColumnWidth(3, 120)
      sheet.setColumnWidth(4, 110)
      sheet.setColumnWidth(5, 100)
      sheet.setColumnWidth(6, 130)
      sheet.setColumnWidth(7, 120)
      sheet.setColumnWidth(8, 100)
      sheet.setColumnWidth(9, 100)
      sheet.setColumnWidth(10, 240)
    }

    const data = JSON.parse(e.postData.contents)

    const diff    = parseFloat(data.difference)
    const deposit = parseFloat(data.deposit)

    sheet.appendRow([
      data.timestamp,
      data.date,
      data.employee,
      parseFloat(data.startBank).toFixed(2),
      parseFloat(data.cashSales).toFixed(2),
      parseFloat(data.posTotal).toFixed(2),
      parseFloat(data.physical).toFixed(2),
      diff,
      deposit,
      data.notes || ""
    ])

    // Color-code Over/Short cell (column 8)
    const lastRow = sheet.getLastRow()
    const diffCell = sheet.getRange(lastRow, 8)
    if (diff === 0) {
      diffCell.setBackground("#d4f5e4").setFontColor("#1a7a45")
    } else if (diff > 0) {
      diffCell.setBackground("#d4e8ff").setFontColor("#1a5fa8")
    } else {
      diffCell.setBackground("#fde8e8").setFontColor("#c0392b")
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService
    .createTextOutput("P.S. I Crepe You Register Closing Script is live.")
    .setMimeType(ContentService.MimeType.TEXT)
}
