const express = require('express');
const router = express.Router();

router.get('/getProjectById/:id', ( req, res ) => {
    console.log('reached projectRoutes')
})

router.get('/getAllProjects', ( req, res ) => {
    console.log('reached projectRoutes')
})

router.post('/addNewProject', ( req, res ) => {
    console.log('reached projectRoutes')
})

module.exports = router;