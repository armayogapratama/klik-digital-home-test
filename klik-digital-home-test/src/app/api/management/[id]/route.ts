import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const filePath = path.join(process.cwd(), "./data/managements.json");

function readJSON(file: string) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(
  file: string,
  data: { id: number; management_name: string; group_id: number }[]
) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  const managements = readJSON(filePath);

  const filtered = managements.filter(
    (data: { id: number; management_name: string; group_id: number }) =>
      data.id !== id
  );

  if (filtered.length === managements.length) {
    return NextResponse.json({ message: "ID not found" }, { status: 404 });
  }

  writeJSON(filePath, filtered);

  return NextResponse.json({
    status: "success",
    message: "Data deleted",
    data: "",
  });
}
