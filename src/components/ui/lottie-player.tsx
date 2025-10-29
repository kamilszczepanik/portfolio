import { Player } from "@lottiefiles/react-lottie-player";

interface LottiePlayerProps {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  [key: string]: unknown;
}

export default function LottiePlayer(props: LottiePlayerProps) {
  return (
    <Player
      autoplay
      loop
      src="/animations/web-development.json"
      style={{ height: "600px", width: "600px" }}
      {...props}
    />
  );
}
