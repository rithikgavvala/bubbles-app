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

  usersInBubble = usersInBubble.filter((curr) => user.uuid !== curr.uuid);

  let usersRes = [] as any;

  usersRes = usersInBubble.map((element) => {
    return {
      name: element.name,
      tests: element.tests,
    };
  });

  if (usersRes.length == 0) {
    return res.send({ data: [] });
  } else {
    return res.send({ data: usersRes });
  }
});

bubbleRoutes.route("/create").post(async (req, res, next) => {
  const reqUser = req.user as IUser;

  const user = await User.findById(reqUser._id);

  //logic to randomize here
  let bubble = createNew<IBubble>(Bubble, {
    name: req.body.name,
    code: nanoid(),
  });
  await bubble.save();
  if (!user) {
    next("USER NOT FOUND");
  } else {
    user.bubbles.push(bubble)
    user.bubble = bubble;
    await user.save();

    return res.send(user.bubble);
  }
});

bubbleRoutes.route("/pop").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  if (!user) {
    return next("User not found");
  }

  user.bubble = undefined;
  await user.save();

  return res.send({ error: false });

  // user.bubbles.pull({ code: req.params.id });
});
bubbleRoutes.route("/join/:id").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const groupId = req.params.id;
  const user = await User.findById(reqUser._id);

  const bubble = await Bubble.findOne({ code: groupId });
  if (!bubble) {
    return next("no bubble foud");
  }
  if (!user) {
    return next("user not found");
  }
  user.bubbles.forEach((bub) => {
    if(bub.code == groupId){
      return next("user already in bubble")
    }
  })
  
  user.bubbles.push(bubble);
  user.bubble = bubble;
  
  await user.save();
  return res.send({ error: false });
});
