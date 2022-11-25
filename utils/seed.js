const connection = require('../config/connection');
const { User, Thought, reactionSchema } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('Now connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.create([{
        username: 'Philip',
        email: 'Philip@gmail.com'
    },
    {
        username: 'Heaton',
        email: 'Heaton@gmail.com'
    }]);

    console.log('Information seeded');
    process.exit(0);
})

