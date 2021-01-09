import express from "express";
import { createNew, IUser, User, IBubble, Bubble } from "../schema";
import { customAlphabet } from "nanoid";
import { ElementFlags, textSpanIsEmpty } from "typescript";
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
export let bubbleRoutes = express.Router();

bubbleRoutes.route("/").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  let usersInBubble = [] as any;
  if (!user) {
    return res.send("ERROR USER NOT FOUND");
  }

  const bubbleId = user.bubble;
  if (!bubbleId) {
    return next("You are not in a bubble!");
  }
  usersInBubble = await User.find({ bubble: bubbleId });

  console.log(usersInBubble);

  let usersRes = [] as any;
  if (usersInBubble.length > 0) {
    usersRes = usersInBubble.map((element) => {
      return {
        name: element.name,
        lastTest: element.tests[element.tests.length - 1],
      };
    });
  } else {
    next("BRO AINT NO ONE IN THIS DAMN BUBBLE");
  }
  return res.send(usersRes);
});

bubbleRoutes.route("/create").post(async (req, res, next) => {
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
    next("USER NOT FOUND");
  } else {
    user.bubble = bubble;
    await user.save();

    return res.send(user.bubble);
  }
});

bubbleRoutes.route("/pop").get(async (req, res, next) => {
  console.log("hello");
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  if (!user) {
    return next("User not found");
  }
  console.log(user);

  user.bubble = undefined;
  await user.save();
  console.log(user);

  return res.send({ error: false });

  // user.bubbles.pull({ code: req.params.id });
});
bubbleRoutes.route("/join/:id").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const groupId = req.params.id;
  const user = await User.findById(reqUser._id);
  console.log(reqUser);
  console.log(groupId);
  const bubble = await Bubble.findOne({ code: groupId });
  if (!bubble) {
    return next("no bubble foud");
  }
  if (!user) {
    return next("user not found");
  }
  user.bubble = bubble;
  await user.save();
});
