const router = require('express').Router();
const homepage = require('./homepage');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homepage);

module.exports = router;
