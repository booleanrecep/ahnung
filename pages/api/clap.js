import { ObjectId } from "bson";
import { connectToDatabase } from "../../database_utils/connect";

export default async (req,res)=>{
    const {db} = await connectToDatabase()
    if(req.method==="GET"){
        res.json({data:"hoıhoı"});
    }
    else if(req.method==="PUT"){
        console.log(req.body)
        switch (req.query.lang) {
            case "tr":
              const clapUpdatedTr = await db
                .collection("turkish")
                .findOneAndUpdate(
                  {
                    _id: ObjectId("60cda66c4e223001f9e1566e"),
                    "articles._id": ObjectId(req.body._id),
                  },
                  {
                    $set: {
                      "articles.$.clapCount": req.body.clapCount,
                    },
                  },
                  (err, data) => {
                    if (err) {
                      return res.status(500).json({ error: err });
                    }
      
                    res.json(data);
                  }
                );
              break;
            case "en":
              const clapUpdatedEn = await db.collection("english").updateOne(
                {
                  _id: ObjectId("60aa929f71f1dfc4522acec1"),
                  "articles._id": ObjectId(req.body._id),
                },
                {
                  $set: {
                    "articles.$.clapCount": req.body.clapCount,

                  },
                },
                (err, data) => {
                  if (err) {
                    return res.status(500).json({ error: err });
                  }
      
                  res.json(data);
                }
              );
              break;
            case "de":
              const clapUpdatedDe = await db.collection("deutsch").updateOne(
                {
                  _id: ObjectId("60aa927d71f1dfc4522acec0"),
                  "articles._id": ObjectId(req.body._id),
                },
                {
                  $set: {
                    "articles.$.clapCount": req.body.clapCount,

                  },
                },
                (err, data) => {
                  if (err) {
                    return res.status(500).json({ error: err });
                  }
      
                  res.json(data);
                }
              );
              
              break;
      
            default:
              break;
          }
    }
}