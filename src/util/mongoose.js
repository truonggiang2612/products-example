
//GIÚP XỬ LÝ LỖI PHIÊN BẢN 4.7 CỦA EXPRESS HANDLEBAR
module.exports = {
    mutipleMongooseToOject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
