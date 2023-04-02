import Client from "@axiomhq/axiom-node";
import { env } from "./env";

export const axiom = new Client({
  orgId: env.AXIOM_ORG_ID,
  token: env.AXIOM_TOKEN,
});
