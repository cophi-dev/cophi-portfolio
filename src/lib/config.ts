import { z } from "zod";

const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
  GITHUB_TOKEN: z.string().min(1).optional(),
  X_USERNAME: z.string().min(1),
});

export type PortfolioConfig = z.infer<typeof envSchema>;

export function getPortfolioConfig(): PortfolioConfig {
  return envSchema.parse({
    GITHUB_USERNAME: process.env.GITHUB_USERNAME ?? "cophi-dev",
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    X_USERNAME: process.env.X_USERNAME ?? "cophi",
  });
}
