import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const groupFilePath = path.join(process.cwd(), "./data/group-managements.json");
const managementFilePath = path.join(process.cwd(), "./data/managements.json");

function readJSON(file: string) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(
  file: string,
  data: { id: number; group_management_name: string }[]
) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const groups = readJSON(groupFilePath);
  const groupExists = groups.some(
    (grup: { id: number; group_management_name: string }) => grup.id === id
  );

  if (!groupExists) {
    return NextResponse.json({ message: "Group not found" }, { status: 404 });
  }

  const newGroups = groups.filter(
    (grup: { id: number; group_management_name: string }) => grup.id !== id
  );
  writeJSON(groupFilePath, newGroups);

  const managements = readJSON(managementFilePath);
  const filteredManagements = managements.filter(
    (data: { id: number; management_name: string; group_id: number }) =>
      data.group_id !== id
  );
  writeJSON(managementFilePath, filteredManagements);

  return NextResponse.json({
    status: "success",
    message: "Group and related managements deleted",
  });
}
