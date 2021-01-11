import express from "express";
import { createNew, IUser, User, ITest, Test } from "../schema";

export let testRoutes = express.Router();

testRoutes.route("/add").post(async (req, res, next) => {
  const reqUser = req.user as IUser;
  const user = await User.findById(reqUser._id);

  console.log(req.params.status);
  let test = createNew<ITest>(Test, {
    date: req.body.testDate,
    status: req.body.userTestStatus,
  });
  await test.save();

  if (user) {
    user.tests.push(test);
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

    await user.save();
    // userTest.status = req.params.status;
    return res.send({ data: user.tests });
  }
  return res.send({ data: null });
});
