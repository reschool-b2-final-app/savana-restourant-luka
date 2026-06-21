import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/lib/data";
// GET ფუნქცია არის API რაუტის ჰენდლერი, რომელიც პასუხობს HTTP GET მოთხოვნებს კონკრეტული მენიუს ნივთის შესახებ. ის იღებს მოთხოვნას და კონტექსტს, რომელიც შეიცავს URL პარამეტრებს, მათ შორის ნივთის ID-ს. ფუნქცია ეძებს menuItems მასივში შესაბამის ნივთს ID-ის მიხედვით და თუ ვერ პოულობს, აბრუნებს 404 სტატუსის მქონე JSON პასუხს "Item not found" შეტყობინებით. თუ ნივთი წარმატებით მოიძებნა, ის აბრუნებს JSON ფორმატში ამ ნივთის დეტალებს, რაც საშუალებას აძლევს მომხმარებლებს მიიღონ საჭირო ინფორმაცია კონკრეტული კერძის შესახებ.
export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const item = menuItems.find((menuItem) => String(menuItem.id) === id);

  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
