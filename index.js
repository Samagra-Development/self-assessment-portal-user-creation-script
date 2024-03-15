var fs = require('fs');
var { parse, CsvError } = require('csv-parse');
var path = require('path');
const { createUser, assignRole } = require('./api');

const createUsersInCentral = async () => {
    try {
        const filePath = path.join(__dirname, './csv/data.csv');

        console.log("Starting user creation on central")

        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ',' }))
            .on('data', async function (csvrow) {
                // Creating user in central
                let userRes = await createUser(csvrow[0], csvrow[1])
                if (userRes && userRes.id) {
                    let assignRes = await assignRole(userRes.id);
                    if (assignRes && assignRes.success) {
                        console.log(csvrow[0], " created on central as Data Collector")
                    } else {
                        console.log("Couldn't assign Data Collector role to user: ", csvrow[0])
                    }
                } else {
                    console.log("Couldn't create user: ", csvrow[0])
                }
                // Assigning Data Collector role to user in central

            })
    } catch (err) {
        console.log("An error occured: ", err);
    }
}

createUsersInCentral();