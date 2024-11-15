const template = Deno.readTextFileSync("./newBooking.html");
/**
 * Show booking form page
 */
export default function newBooking(): Response {
  return new Response(template, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
