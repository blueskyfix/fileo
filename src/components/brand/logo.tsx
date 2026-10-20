import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logos/logo.png"
      alt="FileoPDF"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
}