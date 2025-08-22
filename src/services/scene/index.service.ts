import { list } from "@vercel/blob";

const listAssets = async (id: string) => {
  const prefix = decodeURIComponent(id).replace(/^\/+|\/+$/g, "");

  // call list request
  const { blobs } = await list({ prefix: `scenes/${prefix}/` });

  // normalize data
  const items = blobs.map((blob) => ({
    url: blob.url,
  }));

  return {
    prefix,
    count: items.length - 1,
    items: items.slice(1),
  };
};

export { listAssets };
