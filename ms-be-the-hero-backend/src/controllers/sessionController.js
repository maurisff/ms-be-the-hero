
const conn = require('../database/connection')

module.exports = {
    
    async create (req, res) {
        const {id} = req.body;
    
        var ong = await conn('ongs').where('id', id).select('name').first();
        
        if (!ong){
            return res.status(400).json({error: 'No ONG found with this ID'})
        }

        return res.status(200).json(ong)
    }

}