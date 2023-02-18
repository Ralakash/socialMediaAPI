const router = require('express').Router();

const {
	getAllUsers,
	getSingleUser,
	postNewUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postNewUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
