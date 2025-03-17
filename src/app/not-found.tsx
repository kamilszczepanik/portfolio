"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-blue-500 to-sky-300">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="text-sm text-muted-foreground border-l-2 border-primary pl-4 py-2 mb-6 text-left">
          <code className="font-mono">{pathname}</code>
        </div>

        <p className="text-foreground">
          Hi, this is Kamil. You&apos;re probably looking for one of these:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="gradient">
            <Link href="/" className="flex items-center gap-2">
              <Home size={16} />
              Home Page
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link
              href="/#featured-projects"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
