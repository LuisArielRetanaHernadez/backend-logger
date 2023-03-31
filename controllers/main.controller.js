/* eslint-disable no-unused-vars */
'use strinct';
// Schema
const Aplications = require('../schema/aplications.schema')
const Log = require('../schema/logs.schema')
const Authorizations = require('../schema/authorizations.schema')

// utils
const { singJWT } = require('../utils/singJWT')
const  AppError = require('../utils/AppError')

// Controller
class MainController {

	async login(req, res, next) {
		try {
			const { name } = req.body

			if (!name){
				return res.status(404).json({
					message: 'name is required'
				}
				)
			}

			const aplication = await Aplications.findOne({name})
			
			if (!aplication) {
				return next(new AppError('aplication not found', 404))
			}

			const authorization = await Authorizations.findOne({application_id: aplication._id})

			if (!authorization) {
				return next( new AppError('authorization not found', 404))
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
		const idAplication = req.currentAplication.data.id
		
		const logFinds = await Log.find({application_id: idAplication})

		if (!logFinds || logFinds.length === 0) {
			return next(new AppError('logs not found', 404))
		} 

		return res.status(200).json({
			message: 'logs successfully',
			totalLogs: logFinds.length,
			data: {
				info:  logFinds
			}
		})

	}

	async create(req, res, next) {
		const { name } = req.body
		const findAplication = Aplications.findOne({name})

		if (!findAplication) {
			return next(new AppError('aplication not found', 404))
		}

			// create Aplication

		const aplication = new Aplications({name})

		await aplication.save()

			// singToken
		const token = singJWT({ name, id: aplication._id })

		const authorization = new Authorizations({
			application_id: aplication._id,
			token: token
		})

		await authorization.save()

		return res.status(201).json({
			message: 'seccion successfully',
			data: {
				aplication
			}
		})

	}

	async createLog(req, res, next) {

		try {
			const idAplication = req.currentAplication.id
			
			const log = new Log({
				...req.body,
				application_id: idAplication,
				created_at: new Date(),
				updated_at: new Date()
			})

			await log.save()

			return res.status(201).json({
				message: 'log created successfully',
				data: {
					log
				}
			})

		} catch (error) {
			return res.status(500).json({
				message: error.message
			})

		}
	
	}

	async info(req, res, next) {
		try {
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

		} catch (error) {
			return res.status(500).json({
				message: error.message,
				stack:  error.stack
			})

		}
		
	}

	async update(req, res, next) {
		const logFind = req.currentLog

		if (!logFind) {
			return res.status(404).json({
				message: 'log not found'
			})
		}

		await logFind.updateOne({...req.body, updated_at: new Date})

		logFind.save()

		return res.status(202).json({
			message: 'log successfully',
			data: {
				logFind
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

		return res.status(203).json({
			message: 'log deleted successfully',
		})
	
	}
}

module.exports = new MainController();
