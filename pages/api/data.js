import { connectToDatabase } from "../../db_util/dbConnect";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const turkish = await db.collection("turkish").find({}).toArray();
  const deutsch = await db.collection("deutsch").find({}).toArray();
  const english = await db.collection("english").find({}).toArray();
  const tr = Object.assign({}, ...turkish);
  const de = Object.assign({}, ...deutsch);
  const en = Object.assign({}, ...english);
  res.json({ tr,  de, en });
};
