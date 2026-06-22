const PALETTE = [
  "#E5402C", // accent red
  "#1FB46A", // success green
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#F59E0B", // amber
  "#14B8A6", // teal
  "#EC4899", // pink
];

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

type Props = {
  name: string | null;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-20 w-20 text-3xl",
};

export function AccountAvatar({ name, size = "md" }: Props) {
  const label = name ?? "?";
  const initial = label[0].toUpperCase();
  const color = colorFromName(label);

  return (
    <div
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full font-semibold text-white`}
      style={{ backgroundColor: color }}
      aria-label={label}
    >
      {initial}
    </div>
  );
}
