import z from "zod";

export const GitHubUserSchema = z.object({
  name: z.string(),
  avatar_url: z.url(),
  bio: z.string().nullable(),
  login: z.string(),
  location: z.string().nullable(),
  company: z.string().nullable(),
  email: z.email().nullable(),
  public_repos: z.number(),
  html_url: z.url(),
  followers: z.number(),
  following: z.number(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string().nullable(),
  visibility: z.enum(["public", "private", "internal"]),
  html_url: z.url(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
