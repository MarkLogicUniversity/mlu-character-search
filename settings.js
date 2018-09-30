/**
 * These are the settings to connect to the MarkLogic backend
 *
 * First please make sure that you run the curl statement from the ml-rest folder. That curl statement sets up an application inside MarkLogic that will run on port 5002. It will also automatically create a database.
 */
var connection = {
	host: 'localhost',
	port: 5002,
	user: 'adminuser',
	password: 'adminpassword'
};

module.exports.connection = connection;
