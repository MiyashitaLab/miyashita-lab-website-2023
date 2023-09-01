const validateEnvSet = (envName: string): string => {
  if (typeof process.env[envName] !== "string") {
    throw new Error(`environment ${envName} is undefined`);
  }
  return process.env[envName] as string;
};

export const CONTENTFUL_SPACE_ID = validateEnvSet("CONTENTFUL_SPACE_ID");
export const CONTENTFUL_DELIVERY_TOKEN = validateEnvSet(
  "CONTENTFUL_DELIVERY_TOKEN"
);

export const CONTENTFUL_MANAGEMENT_TOKEN = validateEnvSet(
  "CONTENTFUL_MANAGEMENT_TOKEN"
);

export const CONTENTFUL_ENVIRONMENT =
  process.env["CONTENTFUL_ENVIRONMENT"] ?? "master";

export const ON_DEMAND_SECRET = validateEnvSet("ON_DEMAND_SECRET");

export const SLACK_WEBHOOK_URL = process.env["SLACK_WEBHOOK_URL"];
