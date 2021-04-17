var commentmodel = require("../models/comment");
exports.commentform = (req, res) => {
    // Find state by id
    State.findById(req.params.id, (err, state) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", {state:state});
        }
    });
}

exports.newcomment = (req, res) => {
    // Lookup state using ID
    State.findById(req.params.id, (err, state) => {
        if(err) {
            console.log(err);
            res.redirect("/states")
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } 
                else {
                    state.comments.push(comment);
                    state.save();
                    console.log(req.body.comment);
                    res.redirect("/states/" + state._id)
                }
            });
        }
    });
}