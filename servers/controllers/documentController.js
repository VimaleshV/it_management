const mysql = require('mysql');
const html_to_pdf = require('html-pdf-node');
//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("template.html", "utf8");

exports.payslipHtml = async(req, res) => {
    res.render('payslip');
}

exports.generateHtmlPdf = async(req, res) => {
    console.log(req.query);
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    var document = {
        html: html,
        data: {
            results : req.query,
        //   users: users,
        },
        path: "./output.pdf",
        type: "",
      };

    pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
}

// Read HTML Template
// var html = fs.readFileSync("template.html", "utf8");

// exports.generateHtmlPdf = async(req, res) => {
// console.log('success');
// let options = { format: 'A4' };
// // Example of options with args //
// // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// var file = { content: "<h1>Welcome to html-pdf-node</h1>" };
// // or //
// var file = { url: "https://example.com" };
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//     response.setHeader("Content-Type", "text/pdf");
//   console.log("PDF Buffer:-", pdfBuffer);
// });

// }
