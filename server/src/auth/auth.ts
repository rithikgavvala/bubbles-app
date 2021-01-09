const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
import dotenv from "dotenv";
import { app } from "../app";
import { IUser, User } from "../schema";
// import { GroundTruthStrategy } from "./strategies";
const Auth0Strategy = require("passport-auth0");

dotenv.config();

if (process.env.PRODUCTION === "true") {
  app.enable("trust proxy");
} else {
  console.warn("OAuth callback(s) running in development mode");
}

const session_secret = process.env.SECRET;
if (!session_secret) {
  throw new Error("Secret not specified");
}

app.use(
  session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

export function isAuthenticated(request, response, next) {
  response.setHeader("Cache-Control", "private");
  if (!request.isAuthenticated() || !request.user) {
    if (request.session) {
      request.session.returnTo = request.originalUrl;
    }
    response.redirect("/auth/login");
  } else {
    next();
  }
}

// const groundTruthStrategy = new GroundTruthStrategy(String(process.env.GROUND_TRUTH_URL));
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/auth/callback",
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    console.log(profile);
    User.findOne({ uuid: profile.user_id }, (err, user) => {
      console.log("ERR", err);
      if (err) {
        return done(err);
      }

      if (user) {
        done(null, profile);
      } else {
        var newUser = new User();
        newUser.email = profile.emails[0].value;
        newUser.uuid = profile.user_id;
        newUser.name = profile.displayName;
        newUser.save((err) => {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });

    // return done(null, profile);
  }
);

passport.use(strategy);
passport.serializeUser((user, done) => {
  console.log(user);
  console.log("hiiii", user.user_id);
  done(null, user.user_id);
});
passport.deserializeUser((uuid, done) => {
  console.log(uuid);
  User.findOne({ uuid: uuid }, (err, user) => {
    done(err, user);
  });
});
