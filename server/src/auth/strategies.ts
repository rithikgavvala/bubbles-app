import { URL } from "url";
import passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { Request } from "express";
import { createNew, IUser, User } from "../schema";

dotenv.config();

type PassportDone = (
  err: Error | null,
  user?: IUser | false,
  errMessage?: { message: string }
) => void;
type PassportProfileDone = (err: Error | null, profile?: IProfile) => void;

interface IStrategyOptions {
  passReqToCallback: true; // Forced to true for our usecase
}

interface IOAuthStrategyOptions extends IStrategyOptions {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret: string;
}

interface IProfile {
  uuid: string;
  name: string;
  email: string;
  token: string;
}

export type AuthenticateOptions = passport.AuthenticateOptions & {
  callbackURL: string;
};

function getExternalPort(req: Request): number {
  function defaultPort(): number {
    // Default ports for HTTP and HTTPS
    return req.protocol === "http" ? 80 : 443;
  }

  const host = req.headers.host;

  if (!host || Array.isArray(host)) {
    return defaultPort();
  }

  // IPv6 literal support
  const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
  const index = host.indexOf(":", offset);

  if (index !== -1) {
    return parseInt(host.substring(index + 1), 10);
  } else {
    return defaultPort();
  }
}

export function createLink(req: Request, link: string): string {
  if (link[0] === "/") {
    link = link.substring(1);
  }
  if (
    (req.secure && getExternalPort(req) === 443) ||
    (!req.secure && getExternalPort(req) === 80)
  ) {
    return `http${req.secure ? "s" : ""}://${req.hostname}/${link}`;
  } else {
    return `http${req.secure ? "s" : ""}://${req.hostname}:${getExternalPort(
      req
    )}/${link}`;
  }
}
