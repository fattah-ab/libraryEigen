const { Router } = require('express');
const router = Router();


router.get('/', (req, res, next) => {
    res.json("Welcome to Library API");
});


const memberRoutes = require('./member');
router.use('/member', memberRoutes);

const bookRoutes = require('./book');
router.use('/book', bookRoutes);

module.exports = router;
