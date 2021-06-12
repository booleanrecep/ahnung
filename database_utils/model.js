import { Schema, model, Types, models } from "mongoose";

const articleShema = Schema({
  id: {
    type: Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    default: "/static/bonn.jpg",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  readMin: {
    type: Number,
    default: 5,
  },
  tags: {
    type: Array,
    default: ["reactjs", "nodejs", "nextjs"],
  },
  clapCount: {
    type: Number,
    default: 0,
  },
  shareTwt: {
    type: String,
  },
  sharelnkd: {
    type: String,
  },
});

export const Article = models.Article || model("Article", articleShema);
