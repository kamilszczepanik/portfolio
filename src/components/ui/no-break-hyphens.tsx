type NoBreakHyphensProps = {
  text: string;
};

const HYPHENATED_WORD = /(\S+-\S+)/;

export const NoBreakHyphens = ({ text }: NoBreakHyphensProps) =>
  text.split(HYPHENATED_WORD).map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${part}-${index}`} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
