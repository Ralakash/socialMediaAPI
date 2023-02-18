const router = require('express').Router();

const {
	getAllUsers,
	getSingleUser,
	postNewUser,
	// updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postNewUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);
// .put(updateUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
