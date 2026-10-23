
import './index.css';
import { useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SummaryCard from './components/SummaryCard';
import MovementForm from './components/MovementForm';
import MovementHistory from './components/MovementHistory';
import { useMovements } from './hooks/useMovements';

function App() {
  const {
    keys,
    employee,
    setEmployee,
    setSelectedKeyId,
    keySearch,
    setKeySearch,
    activeMovement,
    movementHistory,
    message,
    setMessage,
    registerWithdrawal,
    registerReturn,
  } = useMovements();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return (
    <div className="app">
      <Header />
      <Navigation />

      <main className="main-content">
        <h2>Movimentações</h2>
        <p>
          Registre a retirada e a devolução das chaves da unidade.
        </p>

        <div className="key-summary">
          <SummaryCard
            title="Chaves disponíveis"
            count={keys.filter((key) => key.status === 'disponivel').length}
            variant="available"
          />

          <SummaryCard
            title="Chaves emprestadas"
            count={keys.filter((key) => key.status === 'retirada').length}
            variant="borrowed"
          />
        </div>

        <section className="movement-card">
          <h3>Registrar movimentação</h3>

          <MovementForm
            keys={keys}
            keySearch={keySearch}
            setKeySearch={setKeySearch}
            setSelectedKeyId={setSelectedKeyId}
            employee={employee}
            setEmployee={setEmployee}
            registerWithdrawal={registerWithdrawal}
            registerReturn={registerReturn}
          />

          {message && (
            <p className="feedback-message" role="status">
              {message}
            </p>
          )}

          {activeMovement && (
            <div className="active-movement">
              <h3>Retirada ativa</h3>
              <p><strong>Chave:</strong> {activeMovement.key}</p>
              <p><strong>Matrícula:</strong> {activeMovement.employee}</p>
              <p><strong>Retirada em:</strong> {activeMovement.withdrawnAt}</p>
            </div>
          )}
        </section>

        <section className="history-section">
          <h2>Histórico de movimentações</h2>

          {movementHistory.length === 0 ? (
            <p>Nenhuma movimentação registrada nesta sessão.</p>
          ) : (
            <MovementHistory movements={movementHistory} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
