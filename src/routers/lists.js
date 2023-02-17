const router = require('express').Router();
const controller = require('../controllers/lists');

router.get('/', controller.getLists);
router.post('/', controller.postLists);
router.delete('/:id', controller.deleteList);

module.exports = router;