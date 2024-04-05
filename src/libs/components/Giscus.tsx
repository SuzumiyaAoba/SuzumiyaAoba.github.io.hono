import type { FC } from "hono/jsx";

export const Giscus: FC<{
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict: string;
  reactionsEnabled: string;
  emitMetadata: string;
  inputPosition: string;
  theme: string;
  lang: string;
}> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping,
  strict,
  reactionsEnabled,
  emitMetadata,
  inputPosition,
  theme,
  lang,
}) => {
  return (
    <script
      src="https://giscus.app/client.js"
      data-repo={repo}
      data-repo-id={repoId}
      data-category={category}
      data-category-id={categoryId}
      data-mapping={mapping}
      data-strict={strict}
      data-reactions-enabled={reactionsEnabled}
      data-emit-metadata={emitMetadata}
      data-input-position={inputPosition}
      data-theme={theme}
      data-lang={lang}
      data-loading="lazy"
      crossorigin="anonymous"
      async={true}
    />
  );
};
