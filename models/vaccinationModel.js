const mongoose = require('mongoose');

// creating schema for the record

const recordSchema = new mongoose.Schema(
	{
		Adhar_card_num: {
			type: Number,
			unique: true,
			required: [ true, 'Enter aadhar card number' ]
		},
		state: {
			type: String,
			require: [ true, 'Enter your state' ]
		},
		IP: {
			String
		}
	},
	{ timestamps: true }
);

// creating model out of the schema
const Vaccination = mongoose.model('Vaccination', recordSchema);
module.exports = Vaccination;
