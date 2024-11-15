import { insertUser } from "../../database.ts";
const index = Deno.readTextFileSync("./success.html");
import handlerbars from "npm:handlebars";
import { paymentComplete } from "./payment.ts";

export const template = handlerbars.compile(index);
export default async function newApi(req: Request): Promise<Response> {
  const form = await req.formData();
  const phone = form.get("phone");
  const date = form.get("date");
  const phoneCheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (typeof date != "string") {
    return new Response("Invalid Date");
  }
  if (typeof phone != "string") {
    return new Response("Invalid Phone");
  }
  if ((phone.match(phoneCheck))) {
    const newDate = new Date(date);
    //@ts-ignore I want to pretend payment is working
    if (paymentComplete == false) {
      return new Response("Payment was not successful");
    } else {
      try {
        const id: string = crypto.randomUUID();
        const newUser = insertUser(id, phone!, newDate)!;
        const url = new URL(req.url);

        return Response.redirect(`${url.origin}/booking/${newUser.id}`);
      } catch (error) {
        // deno-lint-ignore no-explicit-any
        return new Response(error as any, {
          status: 400,
        });
      }
    }
  } else {
    return new Response("Invalid Phone");
  }
}
