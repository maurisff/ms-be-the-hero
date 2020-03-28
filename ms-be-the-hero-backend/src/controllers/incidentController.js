
const conn = require('../database/connection')

module.exports = {
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
    },
    async list(req, res) {
        const {page=1, rowsPage = 5} = req.query
        
        let totalPages = 1;
        const [count] = await conn('incidents').count();      
        totalPages = Math.ceil((parseInt(count['count(*)']) / parseInt(rowsPage)));
        totalPages = (totalPages === 0 ? 1 : totalPages);
        const incidents = await conn('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(rowsPage)
            .offset((page-1) * rowsPage)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
        
        res.header('X-Total-Rows', count['count(*)']);
        res.header('X-Rows-Page', rowsPage);
        res.header('X-Page', page);
        res.header('X-Total-Pages', totalPages);
        
        return res.json(incidents)
    },
    async delete(req, res) {
        const { id } = req.params; 
        const ong_id = req.headers.ong_id;
        const incident = await conn('incidents').where('id', id).select('ong_id').first();
        if (incident && incident.ong_id !== ong_id){
            return res.status(401).json({error: 'Operation not permitted.'});
        }

        await conn('incidents').where('id', id).delete();

        return res.status(204).send()
    }


}