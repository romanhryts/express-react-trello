const router = require('express').Router();
const controller = require('../controllers/card');

router.post('/', controller.postCard);
router.delete('/:id', controller.deleteCard);
router.put('/name', controller.putCardName);
router.put('/status', controller.putCardStatus);



module.exports = router;