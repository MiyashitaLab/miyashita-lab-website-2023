import { NextApiHandler } from "next";

import { modelDependencies } from "@/lib/cms/modelDependencies";

const handler: NextApiHandler = async (req, res) => {
  const secret = req.query.secret ?? req.body.secret;

  if (process.env.ON_DEMANT_SECRET === undefined) {
    res
      .status(500)
      .json({ message: "ON_DEMANT_SECRET 環境変数が設定されていません" });
    return;
  }
  if (secret !== process.env.ON_DEMANT_SECRET) {
    res.status(401).json({ message: "不正なsecretです" });
    return;
  }

  const { model, id } = req.query;
  if (typeof model !== "string" || !validateModelQueryValue(model)) {
    res.status(400).json({ message: "無効なmodelパラメータです" });
    return;
  }

  if (typeof id !== "string") {
    res.status(400).json({ message: "無効なidパラメータです" });
    return;
  }

  const updateRoutes = await modelDependencies[model](id);

  const revalidateResults = await Promise.all(
    updateRoutes.map(async (route) => {
      try {
        await res.revalidate(route);
        return {
          route: route,
          success: true,
        };
      } catch (e) {
        return {
          route: route,
          success: false,
          error: String(e),
        };
      }
    })
  );

  res.status(200).json({ revalidateResults });
};

const validModelQueryValue = Object.keys(modelDependencies);
const validateModelQueryValue = (
  model: string
): model is keyof typeof modelDependencies =>
  validModelQueryValue.includes(model);

export default handler;
