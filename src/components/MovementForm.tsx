
import type { Key } from '../types';

interface MovementFormProps {
  keys: Key[];
  keySearch: string;
  setKeySearch: (value: string) => void;
  setSelectedKeyId: (value: string) => void;
  employee: string;
  setEmployee: (value: string) => void;
  registerWithdrawal: () => void;
  registerReturn: () => void;
}

export default function MovementForm({
  keys,
  keySearch,
  setKeySearch,
  setSelectedKeyId,
  employee,
  setEmployee,
  registerWithdrawal,
  registerReturn,
}: MovementFormProps) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="form-group">
        <label htmlFor="keySearch">Chave / Ambiente</label>
        <input
          id="keySearch"
          type="text"
          placeholder="Digite o código ou nome do ambiente"
          value={keySearch}
          onChange={(event) => {
            const value = event.target.value;
            setKeySearch(value);

            const matchingKey = keys.find(
              (key) => `${key.code} - ${key.environment}` === value
            );

            setSelectedKeyId(matchingKey ? matchingKey.id : '');
          }}
          autoComplete="off"
          list="registered-keys"
        />

        <datalist id="registered-keys">
          {keys.map((key) => (
            <option
              key={key.id}
              value={`${key.code} - ${key.environment}`}
            />
          ))}
        </datalist>
      </div>

      <div className="form-group">
        <label htmlFor="employee">Matrícula do colaborador</label>
        <input
          id="employee"
          type="text"
          placeholder="Digite a matrícula"
          value={employee}
          onChange={(event) => setEmployee(event.target.value)}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="action-button withdraw"
          onClick={registerWithdrawal}
        >
          Registrar retirada
        </button>

        <button
          type="button"
          className="action-button return"
          onClick={registerReturn}
        >
          Registrar devolução
        </button>
      </div>
    </form>
  );
}
