const express = require('express');
const router = express.Router();
const Project = require('../models/project')
const { isUserAnAdminUser } = require('../middleware/privilegeMiddlware');

router.get('/getProjectById/:id', ( req, res ) => {
    console.log('reached projectRoutes')
})

router.get('/getAllProjects', ( req, res ) => {
    console.log('reached projectRoutes')
})

router.post('/addNewProject', isUserAnAdminUser, ( req, res ) => {
    console.log('reached projectRoutes')
})

module.exports = router;