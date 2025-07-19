import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./data/group-managements.json");

const schema = z.object({
  group_management_name: z.string().min(1, "Group name is required"),
});

export async function GET() {
  const data = fs?.readFileSync(filePath, "utf-8");

  const groups = JSON.parse(data);
  return NextResponse.json({
    status: "success",
    message: "Data fetched successfully",
    data: groups,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  const newGroupName = parsed.data.group_management_name;
  const data = fs?.readFileSync(filePath, "utf-8");

  const groups = JSON.parse(data);

  const newId = groups.length > 0 ? groups[groups.length - 1].id + 1 : 1;
  const newGroup = { id: newId, group_management_name: newGroupName };

  groups.push(newGroup);
  fs.writeFileSync(filePath, JSON.stringify(groups, null, 2));

  return NextResponse.json(
    {
      status: "success",
      message: "Group created successfully",
      data: newGroup,
    },
    { status: 201 }
  );
}
