/* eslint-disable no-unused-vars */
'use strinct';
// Schema
const Aplications = require('../schema/aplications.schema')
const Log = require('../schema/logs.schema')
// utils
const {singJWT} = require('../utils/singJWT')

// Controller
class MainController {

	async login(req, res, next) {
		try {
			const {name} = req.body

			if (!name){
				return res.status(404).json({
					message: 'name is required'
				}
				)
			}

			const aplication = await Aplications.findOne({name})

			console.log(Boolean(aplication), ' ', aplication)
			
			if (!aplication) {
				return res.status(404).json({
					message: 'aplication not found'
				})
			}

			// Sing JWT, valid for 1 hour
			const token = await singJWT({name}, '2min')

			return res.status(200).json({
				message: 'seccion successfully',
				token
			})


		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	}

	async all(req, res, next) {
		try {
			const logFinds = await Log.find({}).populate('aplication')

			if (!logFinds || logFinds.length === 0) {
				return res.status(200).json({
					message: 'logs not found',
					data: {
						info: []
					}
				})
			} 

			return res.status(200).json({
				message: 'logs successfully',
				totalLogs: logFinds.length,
				data: {
					info:  logFinds
				}
			})
		}
		catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	}

	create(req, res, next) {
		try {
			const { name } = req.body
			if (!name) {
				return res.status(404).json({
					message: 'name is required'
				})
			}

			const findAplication = Aplications.findOne({name})

			if (!findAplication) {
				return res.status(404).json({
					message: 'aplication not found'
				})
			}

			// create Aplication

			const aplication = new Aplications({name})

			aplication.save()

			return res.status(200).json({
				message: 'seccion successfully',
				data: {
					aplication
				}
			})

			// Sing JWT, valid for 1 hour

		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
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
