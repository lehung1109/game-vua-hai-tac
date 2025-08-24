import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
} from "@/__generated__/graphql";
import { executeGraphQL } from "@/app/lib/graphql/gqlFetch";

/**
 * get user
 */
export async function getUserByEmail(email: string) {
  const data = await executeGraphQL<
    GetUserByEmailQuery,
    GetUserByEmailQueryVariables
  >(GetUserByEmailDocument, { email });

  return data.users[0] || null;
}
