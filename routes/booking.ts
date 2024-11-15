const file = Deno.readTextFileSync("./success.html");
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import chalk from "jsr:@nothing628/chalk";

import handlerbars from "npm:handlebars";
import { userReservations } from "../database.ts";

const template = handlerbars.compile(file);
export default async function booking(id: string): Promise<Response> {
  const reservation = userReservations(id)!;
  const image = await qrcode(
    reservation.id + reservation.phone + reservation.date,
  );
  // console.log(qrcode);

  console.log(
    chalk.green(`New Reservation: ${reservation.phone}, ${reservation.date}`),
  );
  return new Response(
    template({
      phone: reservation.phone,
      date: reservation.date,
      qrcode: image,
    }),
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
