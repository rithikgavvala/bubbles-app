import express from "express";
import { createNew, IUser, User, IBubble, Bubble } from "../schema";
import { customAlphabet } from "nanoid";
import { ElementFlags, textSpanIsEmpty } from "typescript";
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
export let bubbleRoutes = express.Router();

bubbleRoutes.route("/:id").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  const bubbleId: string = req.params.id;

  let usersInBubble = [] as any;
  if (!user) {
    return res.send("ERROR USER NOT FOUND");
  }

  if (!bubbleId) {
    return next("You are not in a bubble!");
  }

  const bubble = await Bubble.findById(bubbleId);

  if (!bubble) {
    return next("Invalid bubble id");
  }

  const userInBubble = user.bubbles.some((bubble) => {
    return bubble._id.toString() == bubbleId;
  });

  if (!userInBubble) {
    return next("user not in bubble");
  }

  usersInBubble = await User.find({ bubbles: bubble });

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
    user.bubbles.push(bubble);
    user.bubble = bubble;
    await user.save();

    return res.send(user.bubble);
  }
});

bubbleRoutes.route("/pop/:id").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  const bubbleId = req.params.id;
  if (!user) {
    return next("User not found");
  }
  const removedBubble = user.bubbles.filter((bubble) => {
    return bubble._id.toString() != bubbleId;
  });

  user.bubbles = removedBubble;
  await user.save();

  return res.send({ error: false });

  // user.bubbles.pull({ code: req.params.id });
});
<<<<<<< HEAD
bubbleRoutes.route("/join/:id").post(async (req, res, next) => {
  console.log("USER ARE YOU THERE")

=======

bubbleRoutes.route("/join/:id").get(async (req, res, next) => {
>>>>>>> 449576001a13b4c884e5be8923ab48a160daaf9b
  const reqUser = req.user as IUser;
  const groupId = req.params.id;
  const user = await User.findById(reqUser._id);
  console.log("USER ARE YOU THERE", user)
  const bubble = await Bubble.findOne({ code: groupId });
  console.log("I FOUND BUBBLE")
  if (!bubble) {
    return next("no bubble foud");
  }
  if (!user) {
    return next("user not found");
  }
  user.bubbles.forEach((bub) => {
    if (bub.code == groupId) {
      return next("user already in bubble");
    }
  });

  user.bubbles.push(bubble);
<<<<<<< HEAD
  // user.bubble = bubble;
  
=======
  user.bubble = bubble;

>>>>>>> 449576001a13b4c884e5be8923ab48a160daaf9b
  await user.save();
  return res.send({ error: false });
});

bubbleRoutes.route("/switch/:bubbleCode").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const bubbleCode = req.params.bubbleCode;
  const user = await User.findById(reqUser._id);
  const bubble = await Bubble.findOne({ code: bubbleCode });

  if (!user) {
    return next("user not found");
  }

  if (!bubble) {
    return next("no bubble foud");
  }

  user.bubble = bubble;

  await user
    .save()
    .then((val) => {
      return res.send({ error: false });
    })
    .catch((err) => {
      return res.send({ error: true, msg: err });
    });
});
