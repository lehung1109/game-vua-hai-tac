import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: {
    // Hasura GraphQL endpoint
    [process.env.HASURA_URL!]: {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
      },
    },
  },
  documents: ["src/**/*.graphql"],
  generates: {
    "src/__generated__/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  ignoreNoDocuments: true,
};
export default config;
