const { getTemperamentsApi } = require("../helpers")
const { Temperament } = require('../db')

const getTemperaments = async (req, res) => {
    const temperaments = await getTemperamentsApi()
    for(const temperament of temperaments){
       await Temperament.findOrCreate({
            where: {
                name: temperament
            }
        })
    }
    const temperamentsDb = await Temperament.findAll()
    res.status(200).json(temperamentsDb)
}

module.exports = {
    getTemperaments
}