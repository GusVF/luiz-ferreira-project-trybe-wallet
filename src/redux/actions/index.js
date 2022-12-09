// Coloque aqui suas actions
export const USER = 'USER';

export const userAction = (value) => ({
  type: USER,
  payload: { value },
});
