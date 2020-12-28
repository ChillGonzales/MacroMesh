import { Food } from "../core/solver";

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

  public async GetInfo(id: string, unit: string): Promise<Food> {
    const response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=acd0407dd0a24276a1972db37fc22f29&amount=1&unit=${unit}`, { cache: "force-cache" });
    const data = await response.json();
    return new Food(
      data.name,
      unit,
      data.nutrients.find((x: any) => x.title === "Carbohydrates").amount,
      data.nutrients.find((x: any) => x.title === "Protein").amount,
      data.nutrients.find((x: any) => x.title === "Fat").amount,
      1,
      1,
      1
    );
  }
}

export interface SearchResult {
  name: string;
  id: string;
  possibleUnits: string[];
}