import { VideoProvider } from "../services/VideoContext";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VideoProvider>{children}</VideoProvider>
    </>
  );
}
