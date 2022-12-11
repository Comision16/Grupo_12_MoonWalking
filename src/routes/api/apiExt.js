const router = require('express').Router();
const { count, getLatest } = require('../../controllers/api/apiExtControllers');

router
    .get('/count', count)
    .get('/getLatest', getLatest)
module.exports = router;