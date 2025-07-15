export default function Avatar({ name }: { name?: string }) {
  const initials = name
    ? name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  return (
    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
      {initials}
    </div>
  );
}
