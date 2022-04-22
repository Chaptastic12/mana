const express = require('express');
const router = express.Router();
const Project = require('../models/project')
const { isUserRegularUser } = require('../middleware/privilegeMiddlware');

router.get('/getSpecificProject/:projectReference', ( req, res ) => {
    Project.findOne({projectReference: req.params.projectReference}).populate('tickets').exec((err, foundProject) =>{
        if (err) throw err;

        res.send(foundProject)
    });
})

router.get('/getAllProjects', ( req, res ) => {
    Project.find({}, (err, foundProjects) => {
        if (err) throw err;

        res.send({ success: true, projects: foundProjects })
    })
})

router.post('/addNewProject', isUserRegularUser, ( req, res ) => {
    let project = new Project(req.body);
    project.save(req.body);

    res.send({success: true, msg: 'Succesfully Added Project'})
})

module.exports = router;