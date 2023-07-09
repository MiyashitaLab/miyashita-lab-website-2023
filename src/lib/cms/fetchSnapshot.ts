import { getManagementEnvironment } from "@/lib/cms/contentfulClient";

export const fetchSnapshotsSlug = async (
  id: string
): Promise<
  {
    version: number;
    slug: string;
  }[]
> => {
  const environment = await getManagementEnvironment();
  const result = await environment.getEntrySnapshots(id, {
    select: ["snapshot.sys.version", "snapshot.fields.slug.ja"].join(","),
    order: "snapshot.sys.version",
  });

  return result.items.map((item) => ({
    version: item.snapshot.sys.version,
    slug: item.snapshot.fields.slug.ja,
  }));
};
