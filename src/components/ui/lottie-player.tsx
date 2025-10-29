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
      src="https://lottie.host/0c814c28-3e6b-4e70-8c48-41dd35855d13/QDXR3mM2Ky.json"
      style={{ height: "500px", width: "500px" }}
      {...props}
    />
  );
}
