var Airtable = require("airtable");
const fs = require("fs");
const { parse } = require("csv-parse");

var base = new Airtable({
  apiKey:
    "patnS7RcJTwwy1DtF.dff99f7c17e5dee7c365fed4911dddefd5c1a20b2f7e94593556a94a2bb698b3",
}).base("appLssWUoBe7qEbq9");

fs.createReadStream("./AuctionResultsReport.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
    base("Properties").create(
      [
        {
          fields: {
            Property: "",
            Status: "1 - buying",
            APN: row[2],
            width: 75,
            depth: 134,
            "date bought": row[0],
            "amount paid": parseFloat(row[5]) + parseFloat(row[12]),
            "Seller full name": "TD",
            fee: 10,
            down: 149,
            "term (mo)": 48,
            "other terms": "36 mo: $000.00 // 24 mo: $000.00",
            "Appraiser website":
              "https://apps.putnam-fl.com/pa/property/?type=api&parcel=" +
              row[2],
            "County GIS":
              "https://pamap.putnam-fl.gov/PropertyAppraiserPublicMap/?find=" +
              row[2],
            "CTA URL": "https://PayPal.me/landadeal/99",
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      }
    );
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
  });
