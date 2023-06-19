import { Entry, EntrySkeletonType } from "contentful";
import { EntriesQueries } from "contentful/dist/types/types/query";

import { client } from "@/lib/cms/contentfulClient";

export const fetchAll = async <TEntrySkeleton extends EntrySkeletonType>(
  query?: Omit<EntriesQueries<TEntrySkeleton, undefined>, "skip" | "limit">
): Promise<Entry<TEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[]> => {
  let skip = 0;
  const limit = 500;
  let total;

  const items: Entry<TEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[] =
    [];

  do {
    const response =
      await client.withoutUnresolvableLinks.getEntries<TEntrySkeleton>({
        ...query,
        skip: skip,
        limit: limit,
      });

    items.push(...response.items);
    skip += limit;
    total = response.total;
  } while (skip < total);

  return items;
};
