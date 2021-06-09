import { ObjectId } from "bson";
import { connectToDatabase } from "../../database_utils/connect";
// import { Article } from "../../database_utils/model";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const turkish = await db.collection("turkish").find({}).toArray();
  const deutsch = await db.collection("deutsch").find({}).toArray();
  const english = await db.collection("english").find({}).toArray();
  const tr = Object.assign({}, ...turkish);
  const de = Object.assign({}, ...deutsch);
  const en = Object.assign({}, ...english);

  if (req.method === "GET") {
    // console.log(req.url);
    // console.log(db.collection("turkish").find({}).toArray());
    switch (req.query.lang) {
      case "tr":
        res.json({ ...tr });
        break;
      case "en":
        res.json({ ...en });
        break;
      case "de":
        res.json({ ...de });
        break;
      default:
        res
          .status(404)
          .json({ error: "Ne ararsan bulunur derde devadan gayrı!" });
        break;
    }
  } else if (req.method === "POST") {
    // console.log(req.url);
    // console.log(req.body);

    const model = await import("../../database_utils/model");
    const article = new model.Article({
      title: req.body.title,
      text: req.body.text,
    });
    // console.log(article);
    switch (req.query.lang) {
      case "tr":
        const articleCreatedTr = await db
          .collection("turkish")
          .updateOne(
            { _id: ObjectId("60aa916471f1dfc4522acebf") },
            { $push: { articles: article } }
          );
        return res.status(200).send(articleCreatedTr);

      case "en":
        const articleCreatedEn = await db
          .collection("english")
          .updateOne(
            { _id: ObjectId("60aa929f71f1dfc4522acec1") },
            { $push: { articles: article } }
          );
        return res.status(200).send(articleCreatedEn);

      case "de":
        const articleCreatedDe = await db
          .collection("deutsch")
          .updateOne(
            { _id: ObjectId("60aa927d71f1dfc4522acec0") },
            { $push: { articles: article } }
          );
        return res.status(200).send(articleCreatedDe);

      default:
        break;
    }
  }
};
