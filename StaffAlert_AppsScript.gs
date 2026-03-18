// P.S. I Crepe You — Staff Alert Script
// ─────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
//
// 1. Create a NEW Google Sheet (separate from your register closing sheet)
//    Name it: "P.S. I Crepe You — Staff Alerts"
// 2. Click Extensions → Apps Script
// 3. Delete existing code and paste this entire file
// 4. On line 14 below, replace the email with YOUR email address
// 5. Click Save
// 6. Click Deploy → New Deployment
//    Type: Web App | Execute as: Me | Access: Anyone
// 7. Click Deploy → Authorize → Allow
// 8. Copy the Web App URL
// 9. Paste it into alert.html where it says:
//    const SHEET_URL = "YOUR_APPS_SCRIPT_URL_HERE"
// 10. Re-upload alert.html to Netlify Drop
// ─────────────────────────────────────────────────

const NOTIFY_EMAIL = "rodallegas123@gmail.com, patty@psicrepeyou.com"

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Build header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Location", "Employee", "Alert Type", "Item / Equipment", "Notes"])

      const headerRange = sheet.getRange(1, 1, 1, 6)
      headerRange.setBackground("#ff4d8d")
      headerRange.setFontColor("#ffffff")
      headerRange.setFontWeight("bold")
      sheet.setFrozenRows(1)
      sheet.setColumnWidth(1, 160)
      sheet.setColumnWidth(2, 110)
      sheet.setColumnWidth(3, 120)
      sheet.setColumnWidth(4, 150)
      sheet.setColumnWidth(5, 180)
      sheet.setColumnWidth(6, 280)
    }

    const data = JSON.parse(e.postData.contents)

    // Log to sheet
    sheet.appendRow([
      data.timestamp,
      data.location,
      data.name,
      data.alertType,
      data.item,
      data.notes || ""
    ])

    // Color-code row by alert type
    const lastRow = sheet.getLastRow()
    const rowRange = sheet.getRange(lastRow, 1, 1, 6)
    const colors = {
      'running-low':  { bg: "#fff3cd", font: "#856404" },
      'out-of-stock': { bg: "#fde8e8", font: "#c0392b" },
      'broken':       { bg: "#ffe8d4", font: "#b85c00" },
      'other':        { bg: "#e8f0ff", font: "#1a3fa8" },
    }
    const c = colors[data.alertTypeKey] || { bg: "#ffffff", font: "#000000" }
    rowRange.setBackground(c.bg).setFontColor(c.font)

    // Send email notification
    const icons = {
      'running-low':  '📉',
      'out-of-stock': '🚨',
      'broken':       '🔧',
      'other':        '📝',
    }
    const icon = icons[data.alertTypeKey] || '📋'
    const subject = `${icon} [${data.location}] ${data.alertType.toUpperCase()} — ${data.item}`

    const body = `
P.S. I Crepe You — Staff Alert
────────────────────────────
Location:   ${data.location}
Alert Type: ${data.alertType}
Item:       ${data.item}
Reported by: ${data.name}
Time:       ${data.timestamp}
${data.notes ? `\nNotes: ${data.notes}` : ''}
────────────────────────────
Sent from the Staff Alert Form
    `.trim()

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff1a6e, #ff5fa0); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">${icon}</div>
          <div style="color: #ffe0ee; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">P.S. I Crepe You — ${data.location}</div>
          <div style="color: #fff; font-size: 22px; font-weight: bold; margin-top: 4px;">Staff Alert</div>
        </div>
        <div style="background: #fff0f5; border: 1px solid #ffb3d0; border-top: none; border-radius: 0 0 12px 12px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #ffcce0;">
              <td style="padding: 10px 0; color: #c0336a; width: 40%;">Alert Type</td>
              <td style="padding: 10px 0; color: #3d0020; font-weight: 600;">${data.alertType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ffcce0;">
              <td style="padding: 10px 0; color: #c0336a;">Item</td>
              <td style="padding: 10px 0; color: #3d0020; font-weight: 600;">${data.item}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ffcce0;">
              <td style="padding: 10px 0; color: #c0336a;">Reported By</td>
              <td style="padding: 10px 0; color: #3d0020; font-weight: 600;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ffcce0;">
              <td style="padding: 10px 0; color: #c0336a;">Location</td>
              <td style="padding: 10px 0; color: #3d0020; font-weight: 600;">${data.location}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #c0336a;">Time</td>
              <td style="padding: 10px 0; color: #3d0020; font-weight: 600;">${data.timestamp}</td>
            </tr>
            ${data.notes ? `
            <tr style="border-top: 1px solid #ffcce0;">
              <td style="padding: 10px 0; color: #c0336a;">Notes</td>
              <td style="padding: 10px 0; color: #3d0020;">${data.notes}</td>
            </tr>` : ''}
          </table>
        </div>
      </div>
    `

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, { htmlBody })

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
    .createTextOutput("P.S. I Crepe You Staff Alert Script is live.")
    .setMimeType(ContentService.MimeType.TEXT)
}
