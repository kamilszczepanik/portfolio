export async function getProjectReadme(repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/kamilszczepanik/${repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    }
  );

  if (!response.ok) return null;
  return await response.text();
}
