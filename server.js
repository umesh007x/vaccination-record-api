const path = require('path');
const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// configuring database
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// connecting database
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB connection successful!'));

// listening to local port
const port = process.env.PORT || 3000;
app.listen(3000, () => {
	console.log(`listening to the post ${port}`);
});
