// var Job = require('../models/job');
var models = require('../models');
var Job = models.Job;
var Bid = models.Bid;

// Display list of all Jobs
exports.job_list = (req, res) => {
  Job.findAll()
    .then((results) => {
      res.render('jobs/index', { jobs: results });
    });
};

// Display details for Jobs
exports.get_job_details = (req, res) => {
  // res.send('NOT IMPLEMENTED: Job detail GET ' + req.params.id);
  Job.findById(req.params.id)
    .then(job => {
      Bid.findAll({
          where: {
            jobId: req.params.id
          }
        })
        .then(bids => {
          console.log('Hell' + bids);
          // console.log(job.UserId + " " + req.user.id)
          res.render('jobs/job', { job: job, bids: bids });
        })
    })
};

// Display job create form on GET
exports.create_a_job_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Job create GET');
};


exports.create_a_job_post = (req, res) => {
  Job.create({
    title: req.body.jobTitle,
    description: req.body.jobDescription,
    duration: req.body.jobDuration,
    construction: (req.body.construction === "on" ? true : false),
    indoor: (req.body.indoor === "on" ? true : false),
    landscaping: (req.body.landscaping === "on" ? true : false),
    outdoor: (req.body.outdoor === "on" ? true : false),
    renovation: (req.body.renovation === "on" ? true : false),
    UserId: req.user.id
  }).then(() => {
    res.redirect("/jobs");
  })

  // Job.create({
  //     title: req.body.title,
  //     description: req.body.description
  //   })
  //   .then(function() {
  //     res.redirect('/');
  //   });
};


// Handle job/delete DELETE
exports.delete_a_job = (req, res) => {
  res.send('NOT IMPLEMENTED: Job delete DELETE' + req.params.id);
};

exports.update_a_job = (req, res) => {
  Job.update({
    title: req.body.jobTitle,
    description: req.body.jobDescription,
    duration: req.body.duration,
    location: req.body.location,
    construction: (req.body.construction === "on" ? true : false),
    indoor: (req.body.indoor === "on" ? true : false),
    landscaping: (req.body.landscaping === "on" ? true : false),
    outdoor: (req.body.outdoor === "on" ? true : false),
    renovation: (req.body.renovation === "on" ? true : false)
  }, {
    where: {
      id: req.params.id
    }
  }).then( () => {
    res.redirect("/jobs");
  })
};

// Bids
exports.create_a_bid = (req, res) => {
  Bid.create({
      amount: req.body.bidAmount,
      duration: req.body.jobDuration,
      accepted: req.body.accepted,
      JobId: req.params.id
    })
    .then(function() {
      res.redirect('/jobs/' + req.params.id);
    });
};

exports.get_bids_on_job = (req, res) => {
  Bid.findAll({
    where: {
      JobId: req.params.jobID
    }
  }).then( data => {
    res.render("viewbids", {
      bids: data
    })
  })
  res.send('NOT IMPLEMENTED: List of all bids on a job');
};

exports.accept_bid = (req, res) => {
  res.send('NOT IMPLEMENTD: Accept a bid for a job');
};
