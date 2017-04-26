var express = require ('express');
var router = express.Router();
var mongojs = require ('mongojs');
var db = mongojs ('mongodb://jai:1234@ds113628.mlab.com:13628/mytasklist_project');

router.get('/tasks', function(req, res ,next){
 db.tasks.find(function( err ,tasks){
   if(err){
      res.send(err);
    } 
     res.json(tasks);
  })
});
//get a single task
router.get('/task/:id', function(req, res ,next){
 db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)} ,function( err ,task){
   if(err){
      res.send(err);
    } 
     res.json(task);
  })
});

//save tasks
router.post('/task', function(req, res ,next){
  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400);
    res.json({
      "error" :"data is not found"
  });
  } else {
    db.tasks.save(task,function(err , task){
        if(err){
          res.send(err);
           } 
        res.json(task);
    });
  }
});

//delete task
router.delete('/task/:id', function(req, res ,next){
 db.tasks.remove({_id:mongojs.ObjectId(req.params.id)} ,function( err ,task){
   if(err){
      res.send(err);
    } 
     res.json(task);
  })
});



//update task
router.put('/task/:id', function(req, res ,next){
 db.tasks.remove({_id:mongojs.ObjectId(req.params.id)} ,function( err ,task){
   if(err){
      res.send(err);
    } 
     res.json(task);
  })
});


module.exports = router;