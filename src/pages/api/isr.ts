import { NextApiHandler } from "next";

import { modelDependencies } from "@/lib/cms/modelDependencies";
import { ON_DEMAND_SECRET, SLACK_WEBHOOK_URL } from "@/lib/environments";

type RevalidateResult = {
  route: string;
  success: boolean;
  error?: string;
};

//contentfulのデータを更新したときにwebhookで呼び出される
const handler: NextApiHandler = async (req, res) => {
  const secret = req.query.secret ?? req.body.secret;

  if (ON_DEMAND_SECRET === undefined) {
    res
      .status(500)
      .json({ message: "ON_DEMANT_SECRET 環境変数が設定されていません" });
    return;
  }
  if (secret !== ON_DEMAND_SECRET) {
    res.status(401).json({ message: "不正なsecretです" });
    return;
  }

  const model = req.query.model ?? req.body.model;
  if (typeof model !== "string" || !validateModelQueryValue(model)) {
    res.status(400).json({ message: "無効なmodelパラメータです" });
    return;
  }

  const updateRoutes = await modelDependencies[model]({
    id: req.query.id ?? req.body.id,
    slug: req.query.slug ?? req.body.slug,
  });

  const revalidateResults = await Promise.all(
    updateRoutes.map(async (route) => {
      try {
        await res.revalidate(route);
        return {
          route: route,
          success: true,
        } satisfies RevalidateResult;
      } catch (e) {
        return {
          route: route,
          success: false,
          error: String(e),
        } satisfies RevalidateResult;
      }
    })
  );

  if (SLACK_WEBHOOK_URL) {
    await noticeToSlack(SLACK_WEBHOOK_URL, revalidateResults).catch((error) => {
      console.error("Slack通知に失敗しました", error);
      // ignore
    });
  }

  res.status(200).json({
    revalidateResults,
    slack: SLACK_WEBHOOK_URL !== undefined,
  });
};

const validModelQueryValue = Object.keys(modelDependencies);
const validateModelQueryValue = (
  model: string
): model is keyof typeof modelDependencies =>
  validModelQueryValue.includes(model);

const noticeToSlack = async (webhook: string, results: RevalidateResult[]) => {
  const body = {
    blocks: [
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `以下のページが更新されます（${new Date().toLocaleString(
            "ja"
          )}）`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: results
            .map((result) =>
              result.success
                ? `✅ \`${result.route}\``
                : `❌ \`${result.route}\`\nerror: ${result.error}`
            )
            .join("\n"),
        },
      },
    ],
  };

  return await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export default handler;
