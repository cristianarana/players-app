export default function WaveDivider({
  fill = 'white',
  inverted = false,
}: {
  fill?: string;
  inverted?: boolean;
}) {
  const d = inverted
    ? 'M0,100 L1440,100 L1440,50 C1080,0 360,100 0,50 Z'
    : 'M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z';

  return (
    <div className="relative h-16 w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
