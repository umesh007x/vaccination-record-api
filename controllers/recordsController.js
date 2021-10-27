const Vaccination = require('../models/vaccinationModel');

// To get one record
exports.getRecord = async (req, res) => {
	const record = await Vaccination.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: record
	});
};

// To get all records
exports.getAllRecords = async (req, res) => {
	try {
		let inputSate = 'goa';
		const records = await Vaccination.aggregate([
			// filtering on the basis of state
			{
				$match: { state: `${inputSate}` }
			},

			//  grouping records on the basis of month,week,year,date

			{
				$facet: {
					monthlyRecord: [
						{
							$group: {
								_id: new Date('$createdAt').getMonth(),
								count: {
									$sum: 1
								}
							}
						},
						{
							$project: {
								count: '$count'
							}
						}
					],
					yearlyRecord: [
						{
							$group: {
								_id: new Date('$createdAt').getFullYear(),
								count: {
									$sum: 1
								}
							}
						},
						{
							$project: {
								count: '$count'
							}
						}
					],
					dateRecord: [
						{
							$group: {
								_id: new Date('$createdAt').getDate(),
								count: {
									$sum: 1
								}
							}
						},
						{
							$project: {
								count: '$count'
							}
						}
					],
					weeklyRecord: [
						{
							$group: {
								_id: new Date('$createdAt'),
								count: {
									$sum: 1
								}
							}
						},
						{
							$project: {
								week: {
									$week: '$_id'
								},
								count: '$count'
							}
						}
					]
				}
			}
		]);
		res.status(200).json({
			status: 'success',
			results: records.length,
			data: records
		});
	} catch (error) {
		console.log(error);
	}
};

// creating record

exports.createNewRecord = async (req, res) => {
	const record = await Vaccination.create({
		ID: req.connection.remoteAddress,
		Adhar_card_num: req.body.Adhar_card_num,
		state: req.body.state
	});
	res.status(200).json({
		status: 'success',
		data: record
	});
};

// updating record
exports.updateRecord = async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});
	console.log(req.file);
	res.status(200).json({
		status: 'success',
		data: product
	});
};

// deleting record

exports.deleteRecord = async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(200).json({
		status: 'success',
		data: null
	});
};
