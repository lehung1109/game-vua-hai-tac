import { NextRequest } from "next/server";
import { listAssets } from "@/services/scene/index.service";

export type GetSceneBlobResponse = Awaited<ReturnType<typeof listAssets>>;

/**
 * GET /api/scene/[id]/blob
 * example: /api/scene/1/blob  -> return all files in scene 1
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // normalize data
  const data = await listAssets(id);

  return Response.json(data);
}
