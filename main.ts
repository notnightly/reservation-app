import newBooking from "./routes/new.ts";
import newApi from "./routes/api/new.ts";
const index = Deno.readTextFileSync("./index.html");
import handlerbars from "npm:handlebars";

const template = handlerbars.compile(index);
import booking from "./routes/booking.ts";

const pattern = new URLPattern({ pathname: "/booking/:id" });

Deno.serve((req: Request): Response | Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname == "/new") {
    return newBooking();
  }
  if (url.pathname == "/api/new") {
    return newApi(req);
  }
  const result = pattern.exec(req.url);
  if (result) {
    /** Take ID from url pattern */
    const id = result.pathname.groups.id;
    if (!id) {
      return new Response("Invalid ID", {
        status: 404,
      });
    }
    return booking(id);
  }
  return new Response(template({}), {
    headers: {
      "Content-Type": "text/html",
    },
  });
});
