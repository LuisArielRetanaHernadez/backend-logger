/* eslint-disable no-unused-vars */
'use strinct';
// Schema
const Aplications = require('../schema/aplications.schema')
const Log = require('../schema/logs.schema')
const Authorizations = require('../schema/authorizations.schema')
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

			const authorization = await Authorizations.findOne({application_id: aplication._id})

			if (!authorization) {
				return res.status(404).json({
					message: 'invalid authorization'
				})
			}

			return res.status(200).json({
				message: 'login successfully',
				data: {
					aplication,
					token: authorization.token
				}
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

	async create(req, res, next) {
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

			// singToken
			const token = singJWT({ name, id: aplication._id })

			const authorization = new Authorizations({
				_id: aplication._id,
				token: token
			})

			await authorization.save()

			return res.status(200).json({
				message: 'seccion successfully',
				data: {
					aplication
				}
			})

		} catch (error) {
			return res.status(500).json({
				message: error.message
			})
		}
	}

	async info(req, res, next) {
		const { id } = req.params

		const logFind = await Log.findById(id)

		if (!logFind) {
			return res.status(404).json({
				message: 'log not found'
			})
		
		}

		return res.status(200).json({
			message: 'log successfully',
			data: {
				log:  logFind
			}
		})

	}

	async update(req, res, next) {
		const { id } = req.params

		const logFind = Log.findById(id)

		if (!logFind) {
			return res.status(404).json({
				message: 'log not found'
			})
		}

		await logFind.updateOne(req.body)

		await logFind.save()

		return res.status(200).json({
			message: 'log successfully',
			data: {
				log:  logFind
			}
		})

	}

	async delete(req, res, next) {
		const { id } = req.params

		const logFind = await Log.findById(id)

		if (!logFind) {
			return res.status(404).json({
				message: 'log not found'
			})
		}

		await logFind.deleteOne()

		return res.status(200).json({
			message: 'log deleted successfully',
		})
	
	}
}

module.exports = new MainController();
