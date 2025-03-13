// const fs = require("fs");
// const path = require("path");
// const PDFDocument = require("pdfkit");

// const generateFormOnePDF = (data, callback) => {
//   try {
//     const doc = new PDFDocument({
//       margins: { top: 100, bottom: 70, left: 80, right: 80 },
//     });

//     const pdfPath = path.join(
//       __dirname,
//       "../templates/Form1_PracticeUnitApplication.pdf"
//     );
//     const writeStream = fs.createWriteStream(pdfPath);
//     doc.pipe(writeStream);

//     const contentWidth =
//       doc.page.width - doc.page.margins.left - doc.page.margins.right;

//     // FORM HEADER
//     doc
//       .fontSize(14)
//       .font("Helvetica-Bold")
//       .text("FORM 1", { align: "center", width: contentWidth });
//     doc.moveDown(1);
//     doc
//       .fontSize(12)
//       .text("APPLICATION CUM QUESTIONNAIRE TO BE SUBMITTED BY PRACTICE UNIT", {
//         align: "center",
//         width: contentWidth,
//       });

//     // Proper way to apply italics
//     doc
//       .font("Helvetica-Bold")
//       .font("Helvetica-Oblique")

//       .text("[As per Clause 6(1) & 6(2) of the Peer Review Guidelines 2022]", {
//         align: "center",
//       });
//     doc.moveDown(2);

//     // ADDRESS BLOCK
//     doc.fontSize(12).font("Helvetica-Bold").text("To,", { align: "left" });
//     doc.text("The Secretary, Peer Review Board,");
//     doc.text("The Institute of Chartered Accountants of India,");
//     doc.text("ICAI Bhawan,");
//     doc.text("Post Box No. 7100,");
//     doc.text("Indraprastha Marg, New Delhi – 110002");
//     doc.moveDown(2);
//     doc
//       .fontSize(14)
//       .font("Helvetica-Bold")
//       .text("APPLICATION", { align: "center", width: contentWidth });
//     doc.moveDown(1);
//     // GREETING
//     doc.fontSize(12).font("Helvetica").text("Dear Sir,");
//     doc.moveDown(1);

//     // APPLICATION TEXT
//     const indentSpacing = 20; // Space for numbering alignment

//     // Point 1
//     doc
//       .fontSize(12)
//       .font("Helvetica")
//       .text("1.", doc.x, doc.y, { continued: true }) // Print "1." and keep the text on the same line
//       .text(
//         `Our Firm ${data.firmName}, (Name of practice unit as per ICAI Records); FRN/ M. No ${data.frnNo}, (Firm Registration Number/ Mem. No. as per ICAI records) would like to apply for Peer Review for the period from ${data.reviewPeriodFrom} to ${data.reviewPeriodTo} (three preceding financial years from the date of application).`,
//         doc.x + indentSpacing,
//         doc.y
//       );

//     // Additional text should align properly
//     doc.text(
//       "We have gone through the Peer Review Guidelines 2022 hosted at:",
//       {
//         indent: indentSpacing,
//       }
//     );
//     doc
//       .fillColor("blue")
//       .text(
//         "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
//         { underline: true, indent: indentSpacing }
//       )
//       .fillColor("black")
//       .text("And undertake to abide by the same.", { indent: indentSpacing });

//     doc.moveDown(2);

//     // Point 2
//     doc
//       .text("2.", doc.x, doc.y, { continued: true }) // Print "2." first
//       .text(
//         `I/We hereby declare that my/our firm is applying for Peer Review (Tick the applicable clause):`,
//         doc.x + indentSpacing,
//         doc.y
//       );
//     doc.moveDown(1);
//     // TABLE FOR CHECKBOXES
//     const bulletPoints = [
//       "(i)       As it is Mandatory by: ICAI",
//       "          Any other Regulator (please specify): " +
//         (data.otherRegulator || ""),
//       "(ii)      Voluntarily",
//       "(iii)     As a special case Review initiated by the Board",
//       "(iv)     New Unit",
//       "(v)      As per decision of the Board",
//     ];

//     bulletPoints.forEach((point, index) => {
//       doc.text("     " + point, { width: contentWidth - 50 }).moveUp(1);
//       doc.text(
//         ` [${
//           [
//             data.mandatoryICAI,
//             data.mandatoryOther,
//             data.voluntary,
//             data.specialCase,
//             data.newUnit,
//             data.boardDecision,
//           ][index]
//             ? "✔"
//             : " "
//         }]`,
//         { align: "right" }
//       );
//       doc.moveDown(1);
//     });

//     doc.moveDown(3);

//     const startX = 80; // Left padding
//     const tableWidth = 450;
//     const rowHeight = 25;

//     doc.addPage();

//     // Section 3 Title
//     doc
//       .font("Helvetica-Bold")
//       .text(
//         "3. I/We hereby declare that my/our firm has signed reports pertaining to the following assurance services during the period under review:"
//       );
//     doc.moveDown(1);

//     // Table Headers with Gray Background
//     doc
//       .fillColor("gray")
//       .rect(startX, doc.y, tableWidth, rowHeight)
//       .fill()
//       .fillColor("black")
//       .font("Helvetica-Bold")
//       .text("S. No.", startX + 5, doc.y + 8)
//       .text("Type of Assurance Service Rendered", startX + 70, doc.y + 8)
//       .text("Major Type of Client", startX + 320, doc.y + 8);

//     doc.moveDown(1);

//     // Table Data
//     const assuranceServices = [
//       {
//         type: "Central Statutory Audit",
//         client: data.centralStatutoryAudit || "N/A",
//       },
//       { type: "Statutory Audit", client: data.statutoryAudit || "N/A" },
//       { type: "Internal Audit", client: data.internalAudit || "N/A" },
//       { type: "Tax Audit", client: data.taxAudit || "N/A" },
//       { type: "Concurrent Audit", client: data.concurrentAudit || "N/A" },
//       { type: "Certification Work", client: data.certificationWork || "N/A" },
//       {
//         type: "Any other, please specify",
//         client: data.otherAssurance || "N/A",
//       },
//     ];

//     // Draw Table Rows
//     assuranceServices.forEach((service, index) => {
//       doc
//         .strokeColor("black")
//         .lineWidth(1)
//         .rect(startX, doc.y, tableWidth, rowHeight)
//         .stroke();

//       doc
//         .font("Helvetica")
//         .text(`${index + 1}.`, startX + 5, doc.y + 8)
//         .text(service.type, startX + 70, doc.y + 8)
//         .text(service.client, startX + 320, doc.y + 8);
//       doc.moveDown(1);
//     });

//     doc.moveDown(2);

//     // Section 4: Statutory Audit Declaration
//     doc
//       .font("Helvetica-Bold")
//       .text(
//         "4. I [ ] / We [ ] hereby declare that my [ ] / our [ ] firm has conducted [ ] / has not conducted [ ] Statutory Audit of enterprises Listed in India or abroad as defined under SEBI LODR, 2015 during the Review Period."
//       );
//     doc.moveDown(2);

//     // Section 5: Reviewer Appointment Options
//     doc
//       .font("Helvetica-Bold")
//       .text("5. Option for appointment of Reviewer: (Tick appropriate option)");
//     doc.moveDown(1);

//     const reviewerOptions = [
//       { label: "Same City", value: data.reviewerSameCity },
//       { label: "From Outside City", value: data.reviewerOutsideCity },
//       { label: "Either option (i) or (ii)", value: data.reviewerEitherOption },
//     ];

//     reviewerOptions.forEach((option) => {
//       doc.text(` [ ${option.value ? "✔" : " "} ] ${option.label}`);
//     });

//     doc.moveDown(1);
//     doc.text(
//       `(iv) Preferred City in case of option (ii): ${
//         data.preferredCity || "______"
//       }`
//     );

//     doc.moveDown(2);

//     // Section 6: Contact Information
//     doc
//       .font("Helvetica-Bold")
//       .text("6. Mail ID for communication with the Practice unit:");
//     doc.font("Helvetica").text(data.email || "______");
//     doc.moveDown(1);

//     // Section 7: Address
//     doc
//       .font("Helvetica-Bold")
//       .text("7. Address for sending the Peer Review Certificate:");
//     doc.font("Helvetica").text(data.address || "______________________");
//     doc.moveDown(2);

//     // Further Information for New Units
//     doc
//       .font("Helvetica-Bold")
//       .text("Further Information to be submitted by New Unit:");
//     doc.font("Helvetica").text("..."); // Placeholder
//     // Add content to the PDF

//     // TABLE HEADERS
//     const tableTop = doc.y;
//     const colWidths = [250, 120, 80, 80];
//     const initialX = doc.x;

//     doc.font("Helvetica-Bold");
//     doc.text("Competency Basis", initialX, tableTop, { width: colWidths[0] });
//     doc.text("Score Basis", initialX + colWidths[0], tableTop, { width: colWidths[1] });
//     doc.text("Max Scores", initialX + colWidths[0] + colWidths[1], tableTop, { width: colWidths[2] });
//     doc.text("Scores Obtained", initialX + colWidths[0] + colWidths[1] + colWidths[2], tableTop, { width: colWidths[3] });
//     doc.moveDown(1);

//     doc.font("Helvetica");

//     // TABLE DATA
//     const tableData = [
//       ["Payroll processing", "Points", "", ""],
//       ["Physical & Logical Security of Information are extended and implemented across locations?", "For Yes – 8 Points\nFor No – 0 Point", "8", data.scores["security"] || ""],
//       ["Are there adequate DA tools and IT infrastructure available and are they being used for the relevant assignment?", "For Yes – 12 Points\nFor No – 0 Point", "12", data.scores["da_tools"] || ""],
//       ["Is the infrastructure adequate in terms of internet/intranet network bandwidth/ VPN/Wi-Fi etc. for remote working?", "For Yes – 12 Points\nFor No – 0 Point", "12", data.scores["infrastructure"] || ""],
//       ["Total", "", "48", data.scores["total"] || ""],
//     ];

//     let yPosition = doc.y + 10;
//     tableData.forEach(row => {
//       let xPos = initialX;
//       row.forEach((text, index) => {
//         doc.text(text, xPos, yPosition, { width: colWidths[index] });
//         xPos += colWidths[index];
//       });
//       yPosition += 20;
//     });

//     doc.moveDown(2);
//     doc.font("Helvetica-Bold").text("3.3 Practice Credentials", { align: "left" });
//     doc.moveDown(1);

//     // PRACTICE CREDENTIALS TABLE
//     const practiceData = [
//       ["Is the firm ICAI Peer Review certified?", "For Yes – 4 Points\nFor No – 0 Point", "4", data.scores["peer_review"] || ""],
//       ["Empanelment with RBI / C&AG", "For Yes – 8 Points\nFor No – 0 Point", "8", data.scores["rbi_empanelment"] || ""],
//       ["Is there an advisory as well as a decision, to not allot work due to unsatisfactory performance by the CAG office?", "For Yes – (-5) Points\nFor No – 0 Point", "0", data.scores["advisory"] || ""],
//       ["Have any Government Bodies/ Authorities evaluated the performance of the firm to the extent of debarment/ blacklisting?", "For Yes – (-10) Points\nFor No – 0 Point", "0", data.scores["blacklist"] || ""],
//       ["Any negative assessment in the report of the Quality", "For Yes – (-5) Points\nFor No – 0 Point", "0", data.scores["negative_assessment"] || ""],
//     ];

//     yPosition = doc.y + 10;
//     practiceData.forEach(row => {
//       let xPos = initialX;
//       row.forEach((text, index) => {
//         doc.text(text, xPos, yPosition, { width: colWidths[index] });
//         xPos += colWidths[index];
//       });
//       yPosition += 20;
//     });

//     doc.end();
//     writeStream.on("finish", () => {
//       callback(null, pdfPath);
//     });
//   } catch (error) {
//     callback(error, null);
//   }
// };

// module.exports = generateFormOnePDF;

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const generateFormOnePDF = (data, callback) => {
  try {
    const doc = new PDFDocument({
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
    });

    const pdfPath = path.join(__dirname, `Form1_${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // FORM HEADER
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("FORM 1", { align: "center", width: contentWidth });
    doc.moveDown(1);

    doc
      .fontSize(12)
      .text("APPLICATION CUM QUESTIONNAIRE TO BE SUBMITTED BY PRACTICE UNIT", {
        align: "center",
        width: contentWidth,
      })
      .text("[As per Clause 6(1) & 6 (2) of the Peer Review Guidelines 2022]", {
        align: "center",
        width: contentWidth,
      });

    doc.moveDown(2);

    // ADDRESS
    doc
      .font("Helvetica")
      .fontSize(12)
      .text("The Secretary, Peer Review Board,")
      .text("The Institute of Chartered Accountants of India,")
      .text("ICAI Bhawan,")
      .text("Post Box No. 7100,")
      .text("Indraprastha Marg, New Delhi – 110002");

    doc.moveDown(2);

    // APPLICATION
    doc.font("Helvetica-Bold").text("APPLICATION", { align: "center" });
    doc.moveDown(1);
    doc.font("Helvetica").text("Dear Sir,");
    doc.moveDown(1);

    doc.text(
      `1. Our Firm ${data.firm_name} (Name of practice unit as per ICAI Records); FRN/ M. No. ${data.frn} ` +
        `/${data.reviewStartDate} (Firm Registration Number/ Mem. No. as per ICAI records) would like to apply for Peer Review for the period from ${data.reviewEndDate} `,
      { continued: true }
    );

    doc
      .fillColor("blue")
      .text(
        "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
        {
          link: "https://resource.cdn.icai.org/72010prb57960-peer-review-guidelines2022.pdf",
          continued: true,
        }
      );

    doc.fillColor("black").text(" and undertake to abide by the same.");
    doc.moveDown(1);

    doc.text(
      "2. I/We hereby declare that my/our firm is applying for Peer Review (Tick the applicable clause):"
    );
    doc.moveDown(1);

    // CHECKBOXES
    const checkboxSize = 18;

    doc
      .text("(i) As it is Mandatory by: ICAI", { continued: true })
      .moveDown(0.5);
    doc.rect(260, doc.y - 12, checkboxSize, checkboxSize).stroke();
    doc.moveDown(1);

    doc
      .text("Any other Regulator (please specify)", 130, doc.y - 22)
      .moveDown(1);
    doc.rect(120, doc.y - 14, checkboxSize, checkboxSize).stroke();
    doc.moveDown(1);

    doc.text("(ii) Voluntarily:", 100, doc.y);
    doc.rect(200, doc.y - 18, checkboxSize, checkboxSize).stroke();
    doc.moveDown(1);

    doc.text(
      "(iii) As a special case Review initiated by the Board:",
      100,
      doc.y
    );
    doc.rect(380, doc.y - 18, checkboxSize, checkboxSize).stroke();
    doc.moveDown(1);

    doc.text("(iv) New Unit:", 100, doc.y);
    doc.rect(200, doc.y - 18, checkboxSize, checkboxSize).stroke();
    doc.moveDown(1);

    doc.text("(v) As per decision of the Board:", 100, doc.y);
    doc.rect(300, doc.y - 18, checkboxSize, checkboxSize).stroke();
    doc.moveDown(2);

    doc.text(
      "3. I/We hereby declare that my/our firm has signed reports pertaining to the following assurance services during the period under review:"
    );

    // TABLE CONFIGURATION
    const drawTables = (headers, data, startY) => {
      const pageWidth = doc.page.width;
      const tableWidth = 500;
      const startX = (pageWidth - tableWidth) / 2;
      const colWidths = [50, 220, 150, 60, 60];
      let yPosition = startY;

      doc.lineWidth(1);

      // Draw Headers
      doc.font("Helvetica-Bold");
      let xPos = startX;
      headers.forEach((header, index) => {
        doc.rect(xPos, yPosition, colWidths[index], 20).stroke();
        doc.text(header, xPos + 5, yPosition + 5, {
          width: colWidths[index] - 10,
        });
        xPos += colWidths[index];
      });
      yPosition += 20;

      // Draw Data Rows
      doc.font("Helvetica");
      data.forEach((row, rowIndex) => {
        let xPos = startX;
        doc.rect(xPos, yPosition, colWidths[0], 20).stroke();
        doc.text((rowIndex + 1).toString(), xPos + 5, yPosition + 5, {
          width: colWidths[0] - 10,
        });
        xPos += colWidths[0];

        row.forEach((text, index) => {
          doc.rect(xPos, yPosition, colWidths[index + 1], 20).stroke();
          doc.text(text, xPos + 5, yPosition + 5, {
            width: colWidths[index + 1] - 10,
          });
          xPos += colWidths[index + 1];
        });
        yPosition += 20;
      });
      return yPosition;
    };

    // New Page
    doc.addPage();

    // Table Headers
    const headers = [
      "S.No.",
      "Type of Assurance  Service Rendered",
      "Major Type of Client (Specify) (e.g.: Banks; Insurance Company; Manufacturing; Individuals; Trading ; any other )",
    ];
    const dataRows = [
      ["1", "Central Statutory Audit", ""],
      ["2", "Statutory Audit", ""],
      ["3", "Internal Audit", ""],
      ["4", "Tax Audit", ""],
      ["5", "Concurrent Audit", ""],
      ["6", "Certification work", ""],
      ["7", "Any other, please specify", ""],
    ];

    const tableWidth = 400;
    const colWidths = [40, 150, 180];
    const startX = (doc.page.width - tableWidth) / 2;
    let startY = doc.y;

    doc.font("Helvetica");
    let xPos = startX;
    headers.forEach((header, i) => {
      doc.rect(xPos, startY, colWidths[i], 100).stroke();
      doc.text(header, xPos + 5, startY + 5, { width: colWidths[i] - 10 });
      xPos += colWidths[i];
    });
    startY += 80;

    doc.font("Helvetica");
    dataRows.forEach((row) => {
      let xPos = startX;
      row.forEach((text, i) => {
        doc.rect(xPos, startY, colWidths[i], 20).stroke();
        doc.text(text, xPos + 5, startY + 5, { width: colWidths[i] - 10 });
        xPos += colWidths[i];
      });
      startY += 20;
    });

    doc.moveDown(4);
    doc
      .font("Helvetica-Bold")
      .text(
        "4. Declaration on Statutory Audit of Listed Enterprises",
        doc.page.margins.left,
        doc.y
      );
    doc.moveDown(1);
    doc
      .font("Helvetica")
      .text(
        "I / We hereby declare that my/ our firm has conducted/ has not conducted Statutory Audit of enterprises Listed in India or abroad as defined under SEBI LODR, 2015 during the Review Period."
      );
    doc.moveDown(2);

    // CHECKBOXES
    const boxSize = 18;

    doc
      .font("Helvetica")
      .text("5. Option for appointment of Reviewer:(Tick appropriate option)");
    doc.font("Helvetica");
    doc.moveDown(1);

    doc.text("(i) Same City");
    doc
      .rect(doc.page.margins.left + 100, doc.y - 12, boxSize, boxSize)
      .stroke();
    doc.moveDown(2);

    doc.text("(ii) From outside City");
    doc
      .rect(doc.page.margins.left + 130, doc.y - 12, boxSize, boxSize)
      .stroke();
    doc.moveDown(1);

    doc.text("(iii) Either option (i) or (ii)");
    doc
      .rect(doc.page.margins.left + 150, doc.y - 12, boxSize, boxSize)
      .stroke();
    doc.moveDown(1);

    doc.text("(iv) Preferred City in case of option (ii):");
    doc
      .rect(doc.page.margins.left, doc.y + 100, doc.y - 12, 150, boxSize)
      .stroke(); // Input field box

    doc.moveDown(2);

    doc
      .font("Helvetica-Bold")
      .text("6. Mail ID for communication with the Practice unit:");
    doc.text("____________________________________________");
    doc.moveDown(2);

    doc
      .font("Helvetica-Bold")
      .text("7. Address for sending the Peer Review Certificate:");
    doc.text;

    //doc.moveDown(2);

    doc.moveDown(6);
    doc
      .lineWidth(2)
      .strokeColor("black")
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .text("Further Information to be submitted by New Unit", {
        align: "center",
      });
    doc.moveDown(2);
    doc
      .font("Helvetica")
      .text(
        "8. Tick the applicable clause or mention N.A. as the case may be:"
      );
    doc.moveDown(2);
    // New Page
    doc.addPage();

    const content = [
      "(i) CA ……….., M.No. [………], partner of my firm is /was a partner/ proprietor of the firm ………………….. ",
      "(ii) I am / was a partner/ proprietor of the firm …………………..",
      "(iii) CA……………..(M. N………………………….), an employee of my firm who is a Chartered Accountant, is / was a partner...",
      "(iv) CA ……….., M.No. [………], partner of my firm ……………, is an Empanelled Peer Reviewer...",
      "(v) I, CA ……………….., M. No………………………. am an Empanelled Peer Reviewer...",
      "9. Policies, procedures, and infrastructure of my firm are in conformity with the Standards on Quality Control",
      "10. I wish to undertake audit of listed entity and further declare that: (Fill as applicable or mention N.A.)",
      "(i) CA ……….., M.No.: [………], partner of my firm has carried out audit of Listed company in last three years.",
      "(ii) I, CA…………., M. No.: ……………… (in case of proprietorship firm) have carried out audit of Listed company...",
      "11. The Practice Unit nominates its Partner CA……………….. for Peer Review process...",
      "12. Annexure: Questionnaire",
    ];

    content.forEach((line) => {
      doc.fontSize(12).font("Helvetica").text(line, { align: "justify" });
      doc.moveDown(1);
    });

    // New Page
    doc.addPage();

    // LIST OF CONFIDENTIALITY CONDITIONS
    const conditions = [
      "I hereby Declare that the details furnished above are true and correct as borne out by the facts to the best of my knowledge and belief.",
      "I understand that the Peer Review Certificate, issued on the basis of the report submitted by the reviewer does not provide immunity from Disciplinary/ legal proceedings or actions initiated against Practice Unit or its partners/ employees.",
      "I undertake to pay the fee to the Peer Reviewer within 7 days from the date of receipt of the invoice from the Peer Reviewer.",
      "I further undertake and agree that the certificate can be revoked for any of the reason stated in the Peer Review Guidelines",
    ];

    const leftMargin = doc.page.margins.left + 10;
    const bulletSymbol = "•"; // Unicode bullet character

    conditions.forEach((item) => {
      doc.text(`${bulletSymbol}`, leftMargin, doc.y, { continued: true });
      doc.text(item, leftMargin + 10, doc.y, {
        width: contentWidth - 20,
        align: "left",
      });
      doc.moveDown(1);
    });

    // SIGNATURE SECTION
    doc.fontSize(12).font("Helvetica").text("Signature:", { align: "left" });

    doc.moveDown(1);
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("__________________________", { align: "left" });

    doc.moveDown(2);
    doc.fontSize(12).font("Helvetica").text("Name of Proprietor/Partner/");
    doc.moveDown(1);
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("Individual Practicing in own name:");

    doc.moveDown(2);
    doc.fontSize(12).font("Helvetica").text("Membership No. of the Signatory:");
    doc.moveDown(1);
    // doc.fontSize(12).font("Helvetica").text("[Membership No.]");

    doc.moveDown(2);
    doc.fontSize(12).font("Helvetica").text("Date:");
    doc.moveDown(1);
    doc.fontSize(12).font("Helvetica").text(new Date().toLocaleDateString());

    //Add New Page
    doc.addPage();

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Annexure", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(14).text("QUESTIONNAIRE", { align: "center" });
    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .text("(PART A - PROFILE OF PRACTICE UNIT (PU))", { align: "center" });
    doc.moveDown(2);

    // Questions
    doc.fontSize(12).font("Helvetica").text("1. Name of the Practice Unit:");
    doc.moveDown(-1);

    const boxWidth = 18; // Width of each box
    const boxGap = 0; // Gap between boxes
    const initialX = 270; // Adjust X position for alignment
    const initialY = doc.y; // Current Y position

    // Draw 14 small boxes for input
    for (let i = 0; i < 14; i++) {
      doc
        .rect(initialX + i * (boxWidth + boxGap), initialY, boxWidth, boxWidth)
        .stroke();
    }

    doc.moveDown(2);

    doc.fontSize(12).text("2. Peer Review of");
    const hoBoxX = 230; // X position for HO box
    const hoBoxY = doc.y - 12; // Align with text
    const squareSize = 18; // New variable name for box size

    doc.text(" HO ", hoBoxX + squareSize + -50, doc.y); // Adjust spacing
    // Draw box for HO
    doc.rect(hoBoxX, hoBoxY, squareSize, squareSize).stroke();

    doc.text(" Branch ", hoBoxX + squareSize + 30, doc.y); // Adjust spacing

    // Draw box for Branch
    doc.rect(hoBoxX + squareSize + 80, hoBoxY, squareSize, squareSize).stroke();
    doc.moveDown(1.5);

    doc
      .fontSize(12)
      .font("Helvetica")
      .text("3. Address (As per ICAI records);", 100);
    doc.moveDown(1);

    doc
      .fontSize(12)
      .font("Helvetica")
      .text("4. Email Id of PU.________________", { continued: true })
      .text(" Website of PU:_______________________");
    doc.moveDown(1);

    doc.fontSize(12).text("5. Status");
    const hoBox = 230; // X position for HO box
    const hoBoxx = doc.y - 12; // Align with text
    const squareSizea = 18; // New variable name for box size

    doc.text(" HO ", hoBox + squareSize + -50, doc.y); // Adjust spacing
    // Draw box for HO
    doc.rect(hoBox, hoBoxx, squareSizea, squareSizea).stroke();

    doc.text(" Branch ", hoBoxX + squareSize + 30, doc.y); // Adjust spacing

    //date
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("6. Date of establishment of the PU:", 100);

    doc.moveDown(-1);

    const boxWidthb = 18; // Width of each box
    const boxGapb = 0; // Gap between boxes
    const initialXb = 300; // Adjust X position for alignment
    const initialYb = doc.y; // Current Y position

    // Draw 14 small boxes for input
    for (let i = 0; i < 8; i++) {
      doc
        .rect(
          initialXb + i * (boxWidthb + boxGapb),
          initialYb,
          boxWidth,
          boxWidth
        )
        .stroke();
    }

    doc.moveDown(2);

    //Firm Registration No
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("7. Firm Registration Number:", 100);

    doc.moveDown(-1);

    const boxWidthc = 18; // Width of each box
    const boxGapc = 0; // Gap between boxes
    const initialXc = 300; // Adjust X position for alignment
    const initialYc = doc.y; // Current Y position

    // Draw 14 small boxes for input
    for (let i = 0; i < 8; i++) {
      doc
        .rect(
          initialXc + i * (boxWidthc + boxGapc),
          initialYc,
          boxWidth,
          boxWidth
        )
        .stroke();
    }
    doc.moveDown(2);
    doc
      .fontSize(12)
      .font("Helvetica")
      .text(
        "  (Membership No. in case of an individual practicing in own name)",
        100
      );
    doc.moveDown(2);

    //8
    doc
      .font("Helvetica")
      .text("8. Is there any networking firm and if yes, please provide: ");
    doc.moveDown(2);

    const contenta = [
      "(i) Name of network: _____________________________________ ",
      "(ii) Since when the Networking is entered into: ________________",
      "(iii) 	Is there any exit from the Networking recently: _______. And if Yes, what is the reason or such exit:   _____________________",
    ];

    contenta.forEach((line) => {
      doc.fontSize(12).font("Helvetica").text(line, { align: "justify" });
      doc.moveDown(1);
    });

    //9
    doc.font("Helvetica").text("9. Period of assurance service under review");
    doc.moveDown(2);

    const boxWidthd = 18; // Width of each box
    const boxGapd = 0; // Gap between boxes
    const initialXd = 300; // Adjust X position for alignment
    const initialYd = doc.y; // Current Y position

    doc.font("Helvetica").text("From");
    doc.moveDown(2);

    // Draw 14 small boxes for input
    for (let i = 0; i < 8; i++) {
      doc
        .rect(
          initialXd + i * (boxWidthd + boxGapd),
          initialYd,
          boxWidth,
          boxWidth
        )
        .stroke();
    }

    doc.font("Helvetica").text("To");
    doc.moveDown(2);
    const boxWidthe = 18; // Width of each box
    const boxGape = 0; // Gap between boxes
    const initialXe = 300; // Adjust X position for alignment
    const initialYe = doc.y; // Current Y position

    // Draw 14 small boxes for input
    for (let i = 0; i < 8; i++) {
      doc
        .rect(
          initialXe + i * (boxWidthe + boxGape),
          initialYe,
          boxWidth,
          boxWidth
        )
        .stroke();
    }
    //10.
    doc
      .font("Helvetica")
      .text(
        "10. Contact Person of PU for Peer Reviw (along Mobile No. and Email id)__________________________________________________________________________  _____________________________________ "
      );
    doc.moveDown(2);

    //Add New Page
    doc.addPage();

    doc
      .font("Helvetica")
      .text(
        "11. Particulars about the constitution of the PU during the period under review (as per Form 18 filled with the ICAI). Is there assurance service like Statutory audit, tax audit, Taxation etc. headed by different partners, if yes details to be provided in the below table:"
      );
    doc.moveDown(2);

    // Table Headers
    const tableHeaders = [
      "Name of sole-practitioner/ sole-proprietor/ partner",
      "Membership no. of sole-practitioner/ sole-proprietor/ partner",
      "Association with Practice unit (In years)",
      "Any Post Qualification or Certificate course pursued within or outside ICAI.",
      "Professional experience in practice",
      "Predominant function (e.g. audit, tax, consulting)",
      "Details of Changes",
    ];

    // Table Data (4 rows including header)
    const dataRow = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];

    // Adjust table width and column distribution
    const colWidth = [50, 50, 50, 50, 50, 50, 50]; // 7 columns
    const tableWidt = colWidth.reduce((a, b) => a + b, 0);
    const startXa = (doc.page.width - tableWidt) / 2;
    let startYb = doc.y;

    // Draw Table Header
    doc.font("Helvetica");
    let xPosa = startXa;
    tableHeaders.forEach((header, i) => {
      doc.rect(xPosa, startYb, colWidth[i], 190).stroke();
      doc.text(header, xPosa + 5, startYb + 5, { width: colWidth[i] - 10 });
      xPosa += colWidth[i];
    });
    startYb += 190;

    // Draw Table Data
    doc.font("Helvetica");
    dataRow.forEach((row) => {
      let xPosa = startXa;
      row.forEach((text, i) => {
        doc.rect(xPosa, startYb, colWidth[i], 30).stroke();
        doc.text(text, xPosa + 5, startYb + 5, { width: colWidth[i] - 10 });
        xPosa += colWidth[i];
      });
      startYb += 30;
    });

    doc.moveDown(4);
    doc
      .font("Helvetica")
      .text(
        "12. Particulars of Chartered Accountants Employed / Paid Assistant or Consultants as on <______>:(last date of block period of peer review)",
        doc.page.margins.left,
        doc.y
      );

    doc.moveDown(1);
    // Table Headers
    const columnTitles = [
      "Name (s)",
      "Membership no.",
      "Association with Practice unit (In years)",
      "Experience (In years)",
    ];

    // Table Data (4 rows including header)
    const rowDataa = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ];

    // Adjust table width and column distribution
    const columnWidthx = [90, 90, 90, 90]; // 4 columns
    const totalTableWidthy = columnWidthx.reduce((a, b) => a + b, 0);
    const initialXPositionz = (doc.page.width - totalTableWidthy) / 2;
    let initialYPositiona = doc.y;

    // Draw Table Header
    doc.font("Helvetica");
    let currentXPositionX = initialXPositionz;
    columnTitles.forEach((header, i) => {
      doc
        .rect(currentXPositionX, initialYPositiona, columnWidthx[i], 130)
        .stroke();
      doc.text(header, currentXPositionX + 5, initialYPositiona + 5, {
        width: columnWidthx[i] - 10,
      });
      currentXPositionX += columnWidthx[i];
    });
    initialYPositiona += 60;

    // Draw Table Data
    doc.font("Helvetica");
    rowDataa.forEach((row) => {
      let currentXPositionX = initialXPositionz;
      row.forEach((text, i) => {
        doc
          .rect(currentXPositionX, initialYPositiona, columnWidthx[i], 30)
          .stroke();
        doc.text(text, currentXPositionX + 5, initialYPositiona + 5, {
          width: columnWidthx[i] - 10,
        });
        currentXPositionX += columnWidthx[i];
      });
      initialYPositiona += 30;
    });
    doc.moveDown(3);

    doc
      .font("Helvetica")
      .text(
        "13.Details of Other Employees as on <______>:(last date of block period of peer review)",
        doc.page.margins.left,
        doc.y
      );

    // Table Headers
    const tableTitles = ["Particulars", "Number"];

    // Table Data (4 rows including header)
    const rows = [
      ["(a) Semi-Qualified Assistants", ""],
      ["(b) Articled Assistants", ""],
      ["(c) Administrative Staff", ""],
      ["(d) Others", ""],
    ];

    // Adjust table width and column distribution
    const columnSizes = [150, 150]; // 2 columns
    const totalWidth = columnSizes.reduce((a, b) => a + b, 0);
    const startXx = (doc.page.width - totalWidth) / 2;
    let startYy = doc.y;

    // Draw Table Header
    doc.font("Helvetica");
    let posX = startXx;
    tableTitles.forEach((header, i) => {
      doc.rect(posX, startYy, columnSizes[i], 30).stroke();
      doc.text(header, posX + 5, startYy + 5, { width: columnSizes[i] - 10 });
      posX += columnSizes[i];
    });
    startYy += 30;

    // Draw Table Data
    doc.font("Helvetica");
    rows.forEach((row) => {
      let posX = startXx;
      row.forEach((text, i) => {
        doc.rect(posX, startYy, columnSizes[i], 30).stroke();
        doc.text(text, posX + 5, startYy + 5, { width: columnSizes[i] - 10 });
        posX += columnSizes[i];
      });
      startYy += 30;
    });

    doc.addPage();

    doc
      .font("Helvetica")
      .text(
        "14.If the PU has any branch offices, furnish the following details of member in charge and number of staff:)",
        doc.page.margins.left,
        doc.y
      );

    doc
      .font("Helvetica")
      .text(
        "15.(i) How is the control procedure followed by the Branch/es?",
        doc.page.margins.left,
        doc.y
      )
      .text(
        "(ii) And whether any periodic sample testing of clients handled by Branch/es is done by HO?",
        doc.page.margins.left,
        doc.y + 20
      );

    doc
      .font("Helvetica")
      .text(
        "16.Gross receipts of the Practice Unit [both H.O. and branch(es)] as per books of accounts from assurance functions for the period under review. In case of centralized billing the branch turnover may be added with HO, otherwise separate figures (Rs. in Lakhs) to be given:",
        doc.page.margins.left,
        doc.y
      );

    doc.end();

    writeStream.on("finish", () => {
      callback(null, pdfPath);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = generateFormOnePDF;
