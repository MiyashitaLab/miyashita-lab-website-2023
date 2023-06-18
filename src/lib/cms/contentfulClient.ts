import { createClient } from "contentful";

if (process.env.CONTENTFUL_SPACE_ID === undefined) {
  throw new Error("CONTENTFUL_SPACE_ID is undefined");
}

if (process.env.CONTENTFUL_DELIVERY_TOKEN === undefined) {
  throw new Error("CONTENTFUL_DELIVERY_TOKEN is undefined");
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});
