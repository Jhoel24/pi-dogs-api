const axios = require('axios')
const { Dog, Temperament } = require('../db')

const getDogsApi = async () => {
	const url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
	const { data } = await axios(url)
	return data.reduce((acc, el) => {
		const obj = {
			id: el.id,
			name: el.name,
			height: el.height.metric,
			weight: el.weight.metric,
			yearsLife: el.life_span,
			image: el.image.url,
	     	temperament: el.temperament ? el.temperament : 'Desconocido'
		}
		acc.push(obj)
		return acc
	}, [])
}

const getDogsDB = async () => {
	try {
		const dogs = await Dog.findAll({
			include: Temperament
		})
		// To serve the client as the API information
		return dogs.map(dog => ({
			name: dog.name,
			id: dog.id,
			height: dog.height,
			weight: dog.weight,
			yearsLife: dog.yearsLife,
			image: dog.image ? dog.image : 'https://i.pinimg.com/originals/5b/22/d9/5b22d9ae604335802dbcb5cdc476d57b.jpg',
			temperament: dog.temperaments.map(e => e.name)
		}))
	} catch (error) {
		console.log(error)
	}
}

const getDogsApiDb = async () => {
	try {
		const [resultApi, resultDb] = await Promise.all([getDogsApi(), getDogsDB()])
		const dataTotal = resultApi.concat(resultDb)
		return dataTotal
	} catch (error) {
		console.log(error)
	}
}

const getTemperamentsApi = async () => {
	try {
		const url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
		const { data } = await axios(url)
		let temperaments = data.reduce((acc, el) => {
			if(el.temperament){
				el.temperament.split(', ').forEach(temp => {
					if(!acc.includes(temp)) acc.push(temp)
				})
			}
			return acc
		}, [])
		return temperaments
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getDogsApiDb,
	getTemperamentsApi
}