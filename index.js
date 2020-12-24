const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000
// const base = require('airtable').base('app9qa4tmGXMAPDOF');
var Airtable = require('airtable');
var axios = require('axios');


app.use(cors())

app.use(bodyParser.json());


app.get('/',cors, (req, res) => {
    res.send({status:"ok"})
})


app.post('/', (req, res) => {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyTYKG2JLkdJEBOq'
    });
    var base = Airtable.base('app9qa4tmGXMAPDOF');

    let {username, phone, date , time, party  } = req.body;

    base('Table 1').create([
            {
                "fields": {
                    "username": username,
                    "phone": phone,
                    "date": date,
                    "time": time,
                    "party": party,
                    "type": "заказ столика",
                }
            }
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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

