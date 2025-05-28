export interface PokemonApiResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonInfos {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Ability[];
  types: Types[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}