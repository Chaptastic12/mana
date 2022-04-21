const express = require('express');
const router = express.Router();
const Project = require('../models/project')
const { isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/getProjectById/:id', ( req, res ) => {
    console.log('reached projectRoutes')
})

router.get('/getAllProjects', ( req, res ) => {
    console.log('get all projectRoutes');
    Project.find({}, (err, foundProjects) => {
        if (err) throw err;

        res.send({ success: true, projects: foundProjects })
    })
})

router.post('/addNewProject', isUserRegularUser, ( req, res ) => {
    console.log('reached projectRoutes')
    console.log(req.body)
    let project = new Project(req.body);
    project.save(req.body);

    res.send({success: true, msg: 'Succesfully Added Project'})
})

module.exports = router;