import { NextApiHandler } from "next";

import { fetchMemberSlugByAuthor } from "@/lib/cms/fetchMember";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const paper = await fetchMemberSlugByAuthor(id as string);
  res.status(200).json(paper);
};

export default handler;
