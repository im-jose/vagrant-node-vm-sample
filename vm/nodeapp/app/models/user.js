// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
	lastname: String,
	email: String
	//date: { type: Date, default: Date.now},
	//active: Boolean
});

module.exports = mongoose.model('User', UserSchema);