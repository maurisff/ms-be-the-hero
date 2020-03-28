
const conn = require('../database/connection')

module.exports = {
    
    async list(req, res) {
        const ong_id = req.headers.ong_id;
        const incidents = await conn('incidents').where('ong_id', ong_id).select('*');
        return res.json(incidents)
    },
    async create (req, res) {
        const {title, description, value} = req.body;
        const ong_id = req.headers.ong_id;
    
        var [id] = await conn('incidents').insert({
            title, 
            description, 
            value, 
            ong_id
        });
    
        return res.json({id})
    }

}