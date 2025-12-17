const Router = require('express-promise-router'); // 推荐：自动处理 async 错误
const router = new Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
// router.delete('/:id', userController.deleteUser);

module.exports = router;