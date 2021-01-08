import dotenv from "dotenv";
import mongoose, { MongooseDocument } from "mongoose";

dotenv.config();

const MONGO_URL = String(process.env.MONGO_URL);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    throw err;
  });

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface RootDocument {
  _id: mongoose.Types.ObjectId;
}
export function createNew<T extends RootDocument>(
  model: mongoose.Model<T & mongoose.Document, {}>,
  doc: Omit<T, "_id">
) {
  return new model(doc);
}

enum TestStatus {
  NEGATIVE,
  POSITIVE,
  INPROGRESS,
  INCONCLUSIVE,
}

export interface ITest {
  date: Date;
  status: TestStatus;
}

export interface IBubble extends RootDocument {
  name: string;
  code: string;
}

export interface IUser extends RootDocument {
  email: string;
  name: string;
  token: string;
  admin: boolean;
  bubbles: IBubble[];
  tests: ITest[];
}

const TestSchema = new mongoose.Schema({
  date: Date,
  code: {
    type: String,
    enum: ["POSITIVE", "INPROGRESS", "INCONCLUSIVE"],
  },
});

export const User = mongoose.model<IUser & mongoose.Document>(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      token: String,
      admin: {
        type: Boolean,
        default: false,
      },
      bubbles: [
        {
          type: mongoose.Types.ObjectId,
          index: true,
          ref: "Bubble",
        },
      ],
      tests: [TestSchema],
    },
    {
      usePushEach: true,
    }
  )
);

const BubbleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    usePushEach: true,
  }
);

BubbleSchema.virtual("id").get(function (this: any) {
  return this._id.toHexString();
});

BubbleSchema.set("toJSON", {
  virtuals: true,
});

export const Bubble = mongoose.model<IBubble & mongoose.Document>(
  "Bubble",
  BubbleSchema
);
