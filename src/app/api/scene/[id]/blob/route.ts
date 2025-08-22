import { NextRequest } from "next/server";
import { list } from "@vercel/blob";

/**
 * GET /api/scene/[id]/blob
 * example: /api/scene/1/blob  -> return all files in scene 1
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // check prefix
  const prefix = decodeURIComponent(params.id).replace(/^\/+|\/+$/g, "") + "/";

  // call list request
  const { blobs } = await list({ prefix });

  // normalize data
  const items = blobs.map((blob) => ({
    url: blob.url,
  }));

  return Response.json({ prefix, count: items.length, items });
}
