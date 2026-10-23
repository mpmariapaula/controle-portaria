
interface SummaryCardProps {
  title: string;
  count: number;
  variant: 'available' | 'borrowed';
}

export default function SummaryCard({
  title,
  count,
  variant,
}: SummaryCardProps) {
  return (
    <div
      className={`summary-card ${
        variant === 'available' ? 'available-card' : 'borrowed-card'
      }`}
    >
      <span>{title}</span>
      <strong>{count}</strong>
    </div>
  );
}
