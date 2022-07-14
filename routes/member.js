const { Router } = require('express');
const router = Router();

const MemberController = require('../controllers/Member');

router.get('/', MemberController.memberList);
router.post('/create', MemberController.addMember);


module.exports = router;
