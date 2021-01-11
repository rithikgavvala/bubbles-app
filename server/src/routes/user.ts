import express from "express";
import { createNew, IUser, User, IBubble, Bubble } from "../schema";

export let userRoutes = express.Router();

userRoutes.route("/").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  await User.findById(reqUser._id)
    .populate("bubble")
    .exec((err, user) => {
      if (err) {
        return next("Error looking up profile. Please try again bro");
      }
      if (!user) {
        return next("ERR USER NOT FOUND");
      }
      // if(!user.bubble) {
      //     res.redirect('/join');
      // }
      return res.send({
        name: user.name,
        bubbleCode: user.bubble ? user.bubble.code : null,
        tests: user.tests,
      });
    });
  //   if (!user) {
  //     return res.send("ERROR USER NOT FOUND");
  //   }
});
