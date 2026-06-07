import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/lib/data";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const item = menuItems.find((menuItem) => String(menuItem.id) === id);

  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
