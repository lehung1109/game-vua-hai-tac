// lib/gqlFetch.ts
import { print, type DocumentNode } from "graphql";

const HASURA_URL = process.env.HASURA_URL!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function executeGraphQL<TData, TVars>(
  document: DocumentNode,
  variables?: TVars,
  init?: RequestInit
): Promise<TData> {
  const res = await fetch(HASURA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: print(document),
      variables: variables ?? {},
    }),
    ...init,
  });

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    // Combine message for easy debug/log
    const msg = json.errors.map((e) => e.message).join("; ");

    throw new Error(`GraphQL error: ${msg}`);
  }

  return json.data as TData;
}
