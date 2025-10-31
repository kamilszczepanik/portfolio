import { Player } from "@lottiefiles/react-lottie-player";

interface LottiePlayerProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  [key: string]: unknown;
}

export default function LottiePlayer(props: LottiePlayerProps) {
  const { className, ...restProps } = props;

  return (
    <div
      className={`w-full ${className || ""}`}
      style={{ aspectRatio: "1 / 1", minHeight: "220px" }}
    >
      <Player
        autoplay
        loop
        src="/animations/web-development.json"
        className="w-full h-full object-contain"
        {...restProps}
      />
    </div>
  );
}
