import { z } from "zod";

const iconsSchema = z.object({
  light: z.string().nullable(),
  dark: z.string().nullable(),
});

export type Icons = z.infer<typeof iconsSchema>;

const commandSchema = z.object({
  name: z.string(),
  title: z.string(),
  id: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  mode: z.string(),
  beta: z.boolean(),
  icons: iconsSchema,
});

export type Command = z.infer<typeof commandSchema>;

const contributorSchema = z.object({
  name: z.string(),
  handle: z.string(),
  bio: z.string().nullable(),
  twitter_handle: z.string().nullable().optional(),
  initials: z.string(),
  location: z.string().nullable(),
  github_handle: z.string().nullable(),
  website: z.string().nullable(),
  username: z.string(),
  avatar: z.string().nullable(),
});

export type Contributor = z.infer<typeof contributorSchema>;

const extensionSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  store_url: z.string(),
  download_count: z.number().default(0),
  description: z.string(),
  source_url: z.string(),
  icons: iconsSchema,
  contributors: z.array(contributorSchema).default([]),
  owner: contributorSchema,
  author: contributorSchema,
  commands: z.array(commandSchema),
  changelog: z.object({
    versions: z.array(
      z.object({
        title: z.string(),
        date: z.string(),
        markdown: z.string(),
      }),
    ),
  }),
});

export type Extension = z.infer<typeof extensionSchema>;

export const getExtension = async (author: string, extensionName: string) => {
  const url = `https://www.raycast.com/frontend_api/users/${author}/extensions/${extensionName}`;
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });

  if (response.status !== 200) {
    console.log(response);
    return null;
  }

  const data = await response.json();
  const ext = extensionSchema.safeParse(data);

  if (ext.success) return ext.data;
  console.error(ext.error.issues);

  return null;
};

export const getDownloads = async (author: string, extensionName: string) => {
  const ext = await getExtension(author, extensionName);

  return ext?.download_count ?? 0;
};
