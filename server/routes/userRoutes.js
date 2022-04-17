const express = require('express');
const router = express.Router();

router.get('/getUserInformation', ( req, res ) => {
    console.log('User Info')
});

router.post('/registerUser', (req, res) => {
    console.log('User registered')

})
router.post('/loginUser', (req, res) => {
    console.log('User logged in')

})

module.exports = router;