import { ObjectId } from "bson";
import { connectToDatabase } from "../../database_utils/connect";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const turkish = await db.collection("turkish").find({}).toArray();
    const deutsch = await db.collection("deutsch").find({}).toArray();
    const english = await db.collection("english").find({}).toArray();

    const tr = Object.assign({}, ...turkish);
    const de = Object.assign({}, ...deutsch);
    const en = Object.assign({}, ...english);
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
    const model = await import("../../database_utils/model");
    const article = new model.Article({
      title: req.body.title,
      text: req.body.text,
    });
    switch (req.query.lang) {
      case "tr":
        const articleCreatedTr = await db
          .collection("turkish")
          .updateOne(
            { _id: ObjectId("60cda66c4e223001f9e1566e") },
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
  } else if (req.method === "DELETE") {
    console.log(req.query);
    switch (req.query.lang) {
      case "tr":
        const articleDeletedTr = await db
          .collection("turkish")
          .updateOne(
            { _id: ObjectId("60cda66c4e223001f9e1566e") },
            { $pull: { articles: { _id: ObjectId(req.query.articleID) } } },
            (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "error in deleting address" });
              }

              res.json(data);
            }
          );
        break;
      case "en":
        const articleDeletedEn = await db
          .collection("english")
          .updateOne(
            { _id: ObjectId("60aa929f71f1dfc4522acec1") },
            { $pull: { articles: { _id: ObjectId(req.query.articleID) } } },
            (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "error in deleting address" });
              }

              res.json(data);
            }
          );
        break;
      case "de":
        const articleDeletedDe = await db
          .collection("deutsch")
          .updateOne(
            { _id: ObjectId("60aa927d71f1dfc4522acec0") },
            { $pull: { articles: { _id: ObjectId(req.query.articleID) } } },
            (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "error in deleting address" });
              }

              res.json(data);
            }
          );
        break;

      default:
        break;
    }
  } else if (req.method === "PUT") {
    switch (req.query.lang) {
      case "tr":
        console.log(req.body);
        const articleUpdatedTr = await db
          .collection("turkish")
          .findOneAndUpdate(
            {
              _id: ObjectId("60cda66c4e223001f9e1566e"),
              "articles._id": ObjectId(req.body._id),
            },
            {
              $set: {
                "articles.$.title": req.body.title,
                "articles.$.text": req.body.text,
              },
            },
            (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "error in deleting address" });
              }

              res.json(data);
            }
          );
        break;
      case "en":
        console.log(req.body);

        const articleUpdatedEn = await db.collection("english").updateOne(
          {
            _id: ObjectId("60aa929f71f1dfc4522acec1"),
            "articles._id": ObjectId(req.body._id),
          },
          {
            $set: {
              "articles.$.title": req.body.title,
              "articles.$.text": req.body.text,
            },
          },
          (err, data) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "error in deleting address" });
            }

            res.json(data);
          }
        );
        break;
      case "de":
        console.log(req);

        const articleUpdatedDe = await db.collection("deutsch").updateOne(
          {
            _id: ObjectId("60aa927d71f1dfc4522acec0"),
            "articles._id": ObjectId(req.body._id),
          },
          {
            $set: {
              "articles.$.title": req.body.title,
              "articles.$.text": req.body.text,
            },
          },
          (err, data) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "error in deleting address" });
            }

            res.json(data);
          }
        );
        break;

      default:
        break;
    }
  }
};
