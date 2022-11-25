const router = require('express').Router();
const users = require('../../controllers/userController')

// const {
//     getUsers,
//     getSingleUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     addFriend,
//     deleteFriend
// } = require('../../controllers/userController');

// router.route('/').get(getUsers).post(createUser);

// router.route('/:userId').get(getSingleUser).put(updateUser).post(addFriend).delete(deleteUser).delete(deleteFriend);

router.get('/', users.getUsers);

router.get('/:id', users.getSingleUser);

router.post('/', users.createUser);

router.put('/:id', users.updateUser);

router.delete('/:id', users.deleteUser)

router.post('/:userId/friends/:friendId', users.deleteFriend);

router.delete('/:userId/friends/:friendId', users.deleteFriend);

module.exports = router;