import express from "express";
import { createNew, IUser, User, IBubble, Bubble } from "../schema";
export let bubbleRoutes = express.Router();
import mongoose from "mongoose";

bubbleRoutes.route("/").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  console.log(user);
  if (!user) {
    next("Please refresh page");
    return;
  }
  let idea = Bubble.find({ user: user }).exec(function (err, idd) {
    if (err) {
      next("Problem querying ideas. Please refresh page.");
    }
    return res.send(JSON.stringify(idd));
  });
});
