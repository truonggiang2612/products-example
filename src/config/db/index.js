const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/sales_website', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successfully")
    }
    catch (error) {
        console.log("Connect failure");
    }

}

module.exports = { connect };
