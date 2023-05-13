export interface PokemonData {
  abilities: {
    ability: Record<string, string>
  }[]
  baseExperience: number
  forms: any
  gameIndices: any
  height: number
  heldItems: any
  id: number
  isDefault: boolean
  locationAreaEncounters: string
  moves: any
  name: string
  order: number
  pastTypes: any
  species: any
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: any
    versions: any
  }
  stats: {
    baseStat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  weight: number
}
