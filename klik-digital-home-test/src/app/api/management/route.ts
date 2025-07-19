import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { z } from "zod";

export const runtime = "nodejs";

const filePath = path.join(process.cwd(), "./data/managements.json");
const groupFilePath = path.join(process.cwd(), "./data/group-managements.json");

const schema = z.object({
  management_name: z.string().min(1, "Name is required"),
  group_id: z.number(),
});

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

export async function GET() {
  const managements = readJSON(filePath);
  const groups = readJSON(groupFilePath);

  const datas = managements.map(
    (data: { id: number; management_name: string; group_id: number }) => {
      const group = groups.find(
        (grup: { id: number; group_management_name: string }) =>
          grup.id === data.group_id
      );
      return {
        ...data,
        group_management_name: group ? group.group_management_name : null,
      };
    }
  );

  return NextResponse.json({
    status: "success",
    message: "Data fetched successfully",
    data: datas,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const { management_name, group_id } = parsed.data;

  const groups = readJSON(groupFilePath);
  const groupExists = groups.some(
    (grup: { id: number; group_management_name: string }) =>
      grup.id === group_id
  );

  if (!groupExists) {
    return NextResponse.json(
      { message: "Group ID not found" },
      { status: 404 }
    );
  }

  const managements = readJSON(filePath);
  const newId =
    managements.length > 0 ? managements[managements.length - 1].id + 1 : 1;

  const newManagement = {
    id: newId,
    management_name,
    group_id,
  };

  managements.push(newManagement);
  writeJSON(filePath, managements);

  return NextResponse.json(
    {
      status: "success",
      message: "Management created successfully",
      data: newManagement,
    },
    { status: 201 }
  );
}
