/* eslint-disable no-unused-vars */
'use strinct';

class MainController {

	all(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	create(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	info(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	update(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	delete(req, res, next) {
		res.json({ message: 'Example request.' });
	}
}

module.exports = new MainController();
