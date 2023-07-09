import { createClient, Entry } from "contentful";
import {
  createClient as createManagementClient,
  Environment,
} from "contentful-management";

if (process.env.CONTENTFUL_SPACE_ID === undefined) {
  throw new Error("CONTENTFUL_SPACE_ID is undefined");
}

if (process.env.CONTENTFUL_DELIVERY_TOKEN === undefined) {
  throw new Error("CONTENTFUL_DELIVERY_TOKEN is undefined");
}

if (process.env.CONTENTFUL_MANAGEMENT_TOKEN === undefined) {
  throw new Error("CONTENTFUL_MANAGEMENT_TOKEN is undefined");
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

export const isResolvedEntry = (field: unknown): field is Entry =>
  (field as any)?.sys?.type === "Entry";

export const managementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

let environmentCache: Environment | undefined;
export const getManagementEnvironment = async () => {
  if (environmentCache) return environmentCache;

  const space = await managementClient.getSpace(
    process.env.CONTENTFUL_SPACE_ID!
  );
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT ?? "master"
  );

  environmentCache = environment;
  return environment;
};
