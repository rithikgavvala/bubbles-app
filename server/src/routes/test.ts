import express from "express";
import { createNew, IUser, User, ITest, Test } from "../schema";

export let testRoutes = express.Router();

testRoutes.route("/add").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);

  let dateObj = new Date(req.body.date);
  console.log(req.params.status);
  let test = createNew<ITest>(Test, {
    date: dateObj,
    status: req.body.status,
  });
  await test.save();

  if (user) {
    console.log("TESTING");
    user.tests.push(test);
    console.log(user.tests);
    await user.save();
    return res.send(user.tests);
  }
  return next("DONE GOOFED THE ADD TEST");
});

testRoutes.route("/update/:status").get(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);
  if (user) {
    let userTest = user.tests.pop();
    if (userTest) {
      userTest.status = req.params.status;
    }
    user.tests.push(userTest as ITest);

    console.log(user.tests);
    // userTest.status = req.params.status;
    return res.send("found test");
  }
  return res.send("not found test");
});
