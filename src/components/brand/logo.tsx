import Image from "next/image";

// alt="" quand le nom « FileoPDF » est déjà écrit à côté (évite la double annonce).
export function Logo({ className, alt = "FileoPDF" }: { className?: string; alt?: string }) {
  return (
    <Image
      src="/logos/logo.png"
      alt={alt}
      width={36}
      height={36}
      className={className}
      priority
    />
  );
}