
export class FoodService {

  public async SearchFood(token: string): Promise<SearchResult[]> {
    const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=acd0407dd0a24276a1972db37fc22f29&query=${token}&number=5&metaInformation=true`,
      { cache: "force-cache" });
    const data = await response.json();
    if (data.length > 0) {
      return data.map((x: any) => {
        return {
          name: x.name,
          id: x.id.toString(),
          possibleUnits: x.possibleUnits
        } as SearchResult;
      });
    } else {
      return [];
    }
  }
}

export interface SearchResult {
  name: string;
  id: string;
  possibleUnits: string[];
}