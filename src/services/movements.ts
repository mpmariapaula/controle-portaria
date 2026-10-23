
import type { Key, Movement } from '../types';

export function findKeyById(
  keys: Key[],
  selectedKeyId: string
): Key | undefined {
  return keys.find((key) => key.id === selectedKeyId);
}

export function findActiveMovement(
  movements: Movement[],
  key: Key
): Movement | undefined {
  const keyLabel = `${key.code} - ${key.environment}`;

  return movements.find(
    (movement) =>
      movement.key === keyLabel && movement.returnedAt === null
  );
}
