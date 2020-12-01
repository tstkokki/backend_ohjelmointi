var Project = require('./models/projects');
var Message = require('./models/message');

exports.post = (req, res)=> {
    new Project.find({title: req.body.title, author: req.body.author}).save();
}

exports.list = (req, res)=>{
    Project.find((err, projects)=>{
        res.send(projects);
    });
}

//locate project by title, then get messages by project id
exports.show = ((req, res)=>{
    Project.findOne({title: req.params.title}, (error, project)=>{
        var messages = Message.find({project: project._id}, (error, messages)=>{
            res.send([{project: project, messages: messages}]);
        });
    })
});