
import { useState } from 'react';
import { initialKeys } from '../services/keys';
import {
  findKeyById,
  findActiveMovement,
} from '../services/movements';
import type { Movement } from '../types';

export function useMovements() {
  const [selectedKeyId, setSelectedKeyId] = useState('');
  const [keys, setKeys] = useState(initialKeys);
  const [employee, setEmployee] = useState('');
  const [activeMovement, setActiveMovement] = useState<Movement | null>(null);
  const [movementHistory, setMovementHistory] = useState<Movement[]>([]);
  const [keySearch, setKeySearch] = useState('');
  const [message, setMessage] = useState('');

  function registerWithdrawal() {
    if (!selectedKeyId || !employee.trim()) {
      setMessage('Selecione uma chave e informe a matrícula do colaborador.');
      return;
    }

    const selectedKey = findKeyById(keys, selectedKeyId);

    if (!selectedKey) {
      setMessage('Chave não encontrada no cadastro.');
      return;
    }

    if (selectedKey.status === 'retirada') {
      setMessage('Esta chave já está retirada.');
      return;
    }

    if (activeMovement) {
      setMessage(
        'Já existe uma retirada ativa nesta sessão. Devolva a chave antes de registrar outra.'
      );
      return;
    }

    setKeys((currentKeys) =>
      currentKeys.map((key) =>
        key.id === selectedKeyId
          ? { ...key, status: 'retirada' }
          : key
      )
    );

    const newMovement: Movement = {
      key: `${selectedKey.code} - ${selectedKey.environment}`,
      employee: employee.trim(),
      withdrawnAt: new Date().toLocaleString('pt-BR'),
      returnedAt: null,
    };

    setActiveMovement(newMovement);
    setMovementHistory((history) => [newMovement, ...history]);

    setMessage('Retirada registrada nesta sessão.');
    setSelectedKeyId('');
    setKeySearch('');
    setEmployee('');
  }

  function registerReturn() {
    if (!selectedKeyId) {
      setMessage('Selecione a chave que deseja devolver.');
      return;
    }

    const selectedKey = findKeyById(keys, selectedKeyId);

    if (!selectedKey) {
      setMessage('Chave não encontrada no cadastro.');
      return;
    }

    if (selectedKey.status !== 'retirada') {
      setMessage('Esta chave não possui uma retirada ativa.');
      return;
    }

    const movementToReturn = findActiveMovement(
      movementHistory,
      selectedKey
    );

    if (!movementToReturn) {
      setMessage(
        'Não foi encontrada uma retirada ativa para esta chave.'
      );
      return;
    }

    const returnedAt = new Date().toLocaleString('pt-BR');

    setMovementHistory((history) =>
      history.map((movement) =>
        movement === movementToReturn
          ? { ...movement, returnedAt }
          : movement
      )
    );

    setKeys((currentKeys) =>
      currentKeys.map((key) =>
        key.id === selectedKeyId
          ? { ...key, status: 'disponivel' }
          : key
      )
    );

    setActiveMovement((current) =>
      current?.key === movementToReturn.key ? null : current
    );

    setSelectedKeyId('');
    setEmployee('');
    setMessage('Devolução registrada com sucesso.');
  }

  return {
    keys,
    employee,
    setEmployee,
    selectedKeyId,
    setSelectedKeyId,
    keySearch,
    setKeySearch,
    activeMovement,
    movementHistory,
    message,
    setMessage,
    registerWithdrawal,
    registerReturn,
  };
}
