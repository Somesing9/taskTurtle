var authController = require("../controllers/authcontroller.js");
const db = require("../models");

module.exports = function(app, passport) {
  app.get("/", isLoggedIn, authController.dashboard);
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);
  app.get("/newbid", isLoggedIn, authController.newbid);

  app.get("/:jobID/viewbids", isLoggedIn, (req, res) => {
    db.Bid.findAll({
      where: {
        JobId: req.params.jobID
      }
    }).then( data => {
      res.render("viewbids", {
        bids: data
      })
    })
  });

  app.put("/:bidID", isLoggedIn, (req, res) => {
    db.Bid.update({
      accepted: req.body.accepted
    }, {
      where: {
        id: req.params.bidID
      }
    }).then( () => {
      res.redirect("/")
    })
  });

  app.post("/:jobID/newbid", isLoggedIn, (req, res) => {
    db.Bid.create({
      amount: req.body.bidAmount,
      duration: req.body.jobDuration,
      JobId: req.params.jobID,
      UserId: req.user.id
    }).then( () => {
      res.redirect("/");
    })
  });

  app.post("/signup", passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    }
  ));

  app.post("/signin", passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    }
  ));

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
}