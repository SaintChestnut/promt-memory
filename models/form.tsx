export const actions = ['create', 'edit'] as const;

export type ActionsType = (typeof actions)[number];

export enum ActionsEnum {
  CREATE = 'create',
  EDIT = 'edit'
}
