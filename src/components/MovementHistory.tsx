
interface Movement {
  key: string;
  employee: string;
  withdrawnAt: string;
  returnedAt: string | null;
}

interface MovementHistoryProps {
  movements: Movement[];
}

export default function MovementHistory({
  movements,
}: MovementHistoryProps) {
  return (
    <div className="history-list">
      {movements.map((movement, index) => (
        <article
          className="history-item"
          key={`${movement.key}-${movement.withdrawnAt}-${index}`}
        >
          <h3>{movement.key}</h3>

          <p>
            <strong>Matrícula:</strong> {movement.employee}
          </p>

          <p>
            <strong>Retirada:</strong> {movement.withdrawnAt}
          </p>

          <p>
            <strong>Devolução:</strong>{' '}
            {movement.returnedAt ?? 'Chave ainda retirada'}
          </p>
        </article>
      ))}
    </div>
  );
}
