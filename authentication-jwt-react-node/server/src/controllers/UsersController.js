import User from '../models/User';

class UsersController {
    async index(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch(err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    async show(req, res) {
        return res.json({ Users: 'world' });
    }
    async create(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if(user){
                return res
                    .status(422)
                    .json({ message: `User ${email} already exists.` });
            }
            const newUser = await User.create({ email, password });
            return res.status(201).json(newUser);
        } catch(err){

        }
    }
    async update(req, res) {
        return res.json({ Users: 'world' });
    }
    async destroy(req, res) {
        return res.json({ Users: 'world' });
    }
}

export default new UsersController();