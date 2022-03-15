import User from "../models/User";
import Repository from '../models/Repository';

class RepositoriesController {
    async index(req, res){
        try {
            const { user_id } = req.params;
            const { q } = req.query;

            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json();
            }

            let query = {};
            if(q){
                query = { url: {$regex: q} }
            }

            const repositories = await Repository.find({
                userId: user_id,
                ...query
            });

            return res.json(repositories);

        } catch(err){
            console.log(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async create(req, res){
        try {
            const { user_id } = req.params;
            const { name, url } = req.body;
            

            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json();
            }
            
            const repository = await Repository.findOne({
                userId: user_id,
                url
            })

            if(repository){
                return res.status(422).json({ message: `Repository ${name} already exist` });
            }

            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            });

            return res.status(201).json(newRepository);

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async destroy(req, res){
        try {
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);

            if(!user){
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user_id,
                id
            });

            if(repository){
                return res.status(404).json();
            }

            await repository.deleteOne();

            return res.status(200).json();

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}

export default new RepositoriesController();