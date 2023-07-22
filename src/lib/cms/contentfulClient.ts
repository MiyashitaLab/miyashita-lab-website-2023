import { createClient, Entry } from "contentful";
import {
  createClient as createManagementClient,
  Environment,
} from "contentful-management";

import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "@/lib/environments";

export const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_DELIVERY_TOKEN,
});

export const isResolvedEntry = (field: unknown): field is Entry =>
  (field as any)?.sys?.type === "Entry";

export const managementClient = createManagementClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

let environmentCache: Environment | undefined;
export const getManagementEnvironment = async () => {
  if (environmentCache) return environmentCache;

  const space = await managementClient.getSpace(CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  environmentCache = environment;
  return environment;
};
