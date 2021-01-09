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
  } else {
    const bubbleId = user.bubbles[0];
    usersInBubble = await User.find({ bubbles: bubbleId });
  }
  console.log(usersInBubble)



  let usersRes = [] as any;
  if(usersInBubble){
    usersInBubble.forEach(element => {
      let user = {
        name: element.name,
        lastTest: element.tests[element.tests.length - 1]
      }
      usersRes.push(user)
      
    });
  }else{
    return res.send("BRO AINT NO ONE IN THIS DAMN BUBBLE");
  }

  return res.send(usersRes);

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
      user.bubbles.push(bubble);
      console.log(user.bubbles);
      await user.save();

      return res.send(user.bubbles);
  
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
});
