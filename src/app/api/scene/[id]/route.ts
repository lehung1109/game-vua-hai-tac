import { NextResponse } from "next/server";

interface Scene {
  id: number;
}

// In-memory data store (thay thế bằng database trong thực tế)
const scenes: Scene[] = [{ id: 1 }, { id: 2 }];

// GET /api/users/[id] - Lấy thông tin user theo id
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const scene = scenes.find((s) => s.id === parseInt(params.id));
  if (!scene) {
    return NextResponse.json({ error: "Scene not found" }, { status: 404 });
  }
  return NextResponse.json(scene);
}

// PUT /api/users/[id] - Cập nhật user theo id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const body = (await request.json()) as Partial<Omit<Scene, "id">>;
  const sceneIndex = scenes.findIndex((s) => s.id === parseInt(params.id));

  if (sceneIndex === -1) {
    return NextResponse.json({ error: "Scene not found" }, { status: 404 });
  }

  scenes[sceneIndex] = {
    ...scenes[sceneIndex],
    ...body,
    id: parseInt(params.id),
  };
  return NextResponse.json(scenes[sceneIndex]);
}

// DELETE /api/users/[id] - Xóa user theo id
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const sceneIndex = scenes.findIndex((s) => s.id === parseInt(params.id));

  if (sceneIndex === -1) {
    return NextResponse.json({ error: "Scene not found" }, { status: 404 });
  }

  const deletedScene = scenes.splice(sceneIndex, 1);
  return NextResponse.json(deletedScene[0]);
}
