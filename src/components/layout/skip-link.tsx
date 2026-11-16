type SkipLinkProps = {
  targetId: string;
};

export const SkipLink = ({ targetId }: SkipLinkProps) => (
  <a
    href={`#${targetId}`}
    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black focus:outline-2 focus:outline-offset-2 focus:outline-sky-500"
  >
    Skip to content
  </a>
);
