import { z } from "zod";

const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
  GITHUB_REPOS_LIMIT: z.coerce.number().int().positive().max(24).default(6),
  X_USERNAME: z.string().min(1),
});

export type PortfolioConfig = z.infer<typeof envSchema>;

export function getPortfolioConfig(): PortfolioConfig {
  return envSchema.parse({
    GITHUB_USERNAME: process.env.GITHUB_USERNAME ?? "cophi-dev",
    GITHUB_REPOS_LIMIT: process.env.GITHUB_REPOS_LIMIT ?? "8",
    X_USERNAME: process.env.X_USERNAME ?? "cophi",
  });
}
