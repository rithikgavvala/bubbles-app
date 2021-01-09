import express from "express";
import { createNew, IUser, User, IBubble, Bubble } from "../schema";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
export let bubbleRoutes = express.Router();

bubbleRoutes.route("/").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  if (!user) {
    return res.send("ERROR USER NOT FOUND");
  } else {
    const bubbleId = user.bubbles[0];
    const usersInBubble = await User.find({ bubble: bubbleId });
    return res.send(usersInBubble);
  }

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

bubbleRoutes.route("/create").get(async (req, res, next) => {
  console.log("HELLO TEST");
  const reqUser = req.user as IUser;

  const user = await User.findById(reqUser._id);

  //logic to randomize here
  let bubble = createNew<IBubble>(Bubble, {
    name: "TEST_BUB",
    code: nanoid(),
  });

  await bubble.save();

  if (!user) {
    return res.send("USER NOT FOUND");
  } else {
    if (user.bubbles.length === 0) {
      user.bubbles.push(bubble);
      console.log(user.bubbles);
      await user.save();

      return res.send(user.bubbles);
    }
  }
});

bubbleRoutes.route("/join/:id").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const groupId = req.params.id;
  const user = await User.findById(reqUser._id);

  console.log(reqUser);
  console.log(groupId);
  const bubble = await Bubble.findOne({ code: groupId });
  if (!bubble) {
    return res.send({ error: true, msg: "no bubble foud" });
  }
  if (!user) {
    return res.send({ error: true, msg: "user not found" });
  }

  user.bubbles.push(bubble);
  await user.save();

  //find bubble code in bubbles collection
  //append bubble id to user bubbles list
  //redirect to '/' and we should be gucci
});
