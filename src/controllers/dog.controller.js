const { getDogsApiDb } = require("../helpers")
const { Dog, Temperament } = require('../db')

const getDogs = async (req, res) => {
	const { name } = req.query
	const dogs = await getDogsApiDb()
	try {
		if(!name) return res.status(200).json(dogs)
		const dogsFiltered = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
		dogsFiltered.length ? res.status(200).json(dogsFiltered) : res.status(404).json({ msg: 'Not found' }) 
	} catch (error) {
		res.json({
			msg: error.message
		})
	}
} 

const getDogById = async (req, res) => {
	const { id } = req.params
	const dogs = await getDogsApiDb()
	try {
		if(id.length < 5){
			const dogFiltered = dogs.find(dog => dog.id === Number(id))
			dogFiltered ? res.status(200).json(dogFiltered) : res.status(404).json({ msg: "Not found" })
		} else {
			const dog = await Dog.findOne({
				where: {
					id
				},
				include: Temperament
			})
			dog ? res.status(200).json(dog) : res.status(404).json({ msg: "Not found" })			
		}
	} catch (error) {
		res.status(500).json({
			msg: error.message
		})
	}
}

const createDog = async (req, res) => {
	const { name, height_min, height_max, weight_min, weight_max, year_min, year_max, image, temperamentId } = req.body
	try {
		const newDog = await Dog.create({
			name, height_min, height_max, weight_min, weight_max, year_min, year_max, image
		})
	
		for(const id of temperamentId){
			try {
				const temp = await Temperament.findByPk(id)
				newDog.addTemperament(temp)
			} catch (error) {
				throw new Error('Not found')
			}
		}
		
		res.status(201).json(newDog)
	} catch (error) {
		res.status(500).json({
			msg: error.message
		})
	}
}

module.exports = {	
	getDogs,
	createDog,
	getDogById
}