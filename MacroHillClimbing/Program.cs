using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MacroHillClimbing
{
    class Program
    {
        private const int DailyCals = 2500;
        private const double CarbPct = 0.10;
        private const double ProteinPct = 0.50;
        private const double FatPct = 0.40;

        static void Main(string[] args)
        {
            Console.WriteLine("Optimizing your food!");
            // TODO: Create new class for food serving that's separate from food macro definition
            var eggs = new Food { Name = "Eggs", CarbsPerServing = 1, ProteinPerServing = 6, FatPerServing = 5, MinServing = 1, MaxServing = 4 };
            var chicken = new Food { CarbsPerServing = 0, ProteinPerServing = 9, FatPerServing = 1, MinServing = 1, MaxServing = 18, Name = "Chicken" };
            var beef = new Food { CarbsPerServing = 0, ProteinPerServing = 7, FatPerServing = 5, MinServing = 1, MaxServing = 18, Name = "Beef" };
            var cheese = new Food { CarbsPerServing = 0, ProteinPerServing = 7, FatPerServing = 9, MinServing = 1, MaxServing = 5, Name = "Cheese" };
            var rice = new Food { CarbsPerServing = 8, ProteinPerServing = 1, FatPerServing = 0, MinServing = 1, MaxServing = 16, Name = "White Rice" };

            var carbGrams = (int)((DailyCals * CarbPct) / 4);
            var proteinGrams = (int)((DailyCals * ProteinPct) / 4);
            var fatGrams = (int)((DailyCals * FatPct) / 9);

            var foods = new List<Food>() { eggs, beef, chicken, cheese, rice };

            var goals = new DailyGoals() { Calories = DailyCals, Carbs = carbGrams, Protein = proteinGrams, Fat = fatGrams };

            //Console.WriteLine($"Carb grams: {carbGrams}g, Protein grams: {proteinGrams}g, Fat grams: {fatGrams}g");

            // At each step
            // Check how close we are to our macro goals
            // If not within a tolerance then check each variation of moving each serving up or down one
            // From there, choose which option is the best
            // Iterate

            for (int i = 0; i < 50; i++)
            {
                var diffs = GetDifferences(foods, goals);
                if (DiffsWithinTolerance(diffs))
                {
                    Console.WriteLine($"We've reached our goal in {i + 1} steps!");
                    Console.WriteLine(JsonConvert.SerializeObject(foods, Formatting.Indented));
                    break;
                }
                var changes = GetPossibleChanges(foods);
                // TODO: Make sure our change is actually better
                var optimalChange = FindBestChange(foods, goals, changes);
                if (optimalChange == null)
                {
                    Console.WriteLine($"No further optimal changes found. We've reached our goal in {i + 1} steps!");
                    Console.WriteLine(JsonConvert.SerializeObject(foods, Formatting.Indented));
                    break;
                }
                Console.WriteLine($"Changing servings by {JsonConvert.SerializeObject(optimalChange, Formatting.Indented)}");
                ApplyChange(optimalChange, foods);
            }
            PrintSummary(foods, goals);
        }
        static void PrintSummary(List<Food> optimal, DailyGoals goals)
        {
            // todo add error
            Console.WriteLine($"Carbs ended at {optimal.Sum(x => x.TotalCarbs)}g with a goal of {goals.Carbs}g.");
            Console.WriteLine($"Fat ended at {optimal.Sum(x => x.TotalFat)}g with a goal of {goals.Fat}g");
            Console.WriteLine($"Protein ended at {optimal.Sum(x => x.TotalProtein)}g with a goal of {goals.Protein}g");
            Console.WriteLine($"Calories ended at {optimal.Sum(x => x.Calories)} with a goal of {goals.Calories}");
        }
        static double Error(double predicted, double expected)
        {
            return Math.Abs(predicted - expected) / expected;
        }
        static bool DiffsWithinTolerance(Differences diffs)
        {
            return diffs.CarbDiff < 10 &&
                    diffs.CalDiff < 100 &&
                    diffs.FatDiff < 10 &&
                    diffs.ProteinDiff < 10;
        }

        static List<Dictionary<string, int>> GetPossibleChanges(List<Food> foods)
        {
            // We're going to solve this using decimal to binary conversion.
            // This only works when we're considering only 0 or 1 for changes.
            // This method will have to be more complex if we are to consider more than that (like negative changes)

            // 0 or 1 for now
            var numberOfChoices = 2;
            // This is how you compute the possibilities of 2 choices for x number of foods. 2^x
            var numPossibilities = (int)Math.Pow(numberOfChoices, foods.Count);
            var binaries = Enumerable.Range(0, numPossibilities).Select(x => Convert.ToString(x, 2).PadLeft(foods.Count, '0'));
            var list = new List<Dictionary<string, int>>();

            foreach (var binary in binaries)
            {
                // Don't give an option of no change
                if (binary.All(x => x == '0'))
                    continue;
                var chars = binary.ToCharArray();
                var dict = new Dictionary<string, int>();
                // Here we're using the values in the binary representation to correspond to the value of each food.
                // This should build us a full possibility space.
                for (int i = 0; i < foods.Count; i++)
                    dict.Add(foods[i].Name, int.Parse(chars[i].ToString()));
                if (IsValidChange(foods, dict))
                    list.Add(dict);
            }
            return list;
        }

        static bool IsValidChange(List<Food> foods, Dictionary<string, int> change)
        {
            ApplyChange(change, foods);
            var valid = foods.All(x => x.Servings >= x.MinServing && x.Servings <= x.MaxServing);
            RevertChange(change, foods);
            return valid;
        }

        static Dictionary<string, int> FindBestChange(List<Food> foods, DailyGoals goals, List<Dictionary<string, int>> changes)
        {
            // Use one object to test each change as they're easy to apply/revert
            var tempFood = foods.Clone();
            Dictionary<string, int> bestChange = null;
            List<Food> bestFood = foods;
            foreach (var change in changes)
            {
                ApplyChange(change, tempFood);
                if (CompareFoodsToGoals(tempFood, bestFood, goals))
                {
                    // Store current best
                    bestFood = tempFood.Clone();
                    bestChange = change;
                }
                RevertChange(change, tempFood);
            }
            return bestChange;
        }

        static void ApplyChange(Dictionary<string, int> change, List<Food> foods)
        {
            foreach (var food in foods)
            {
                food.Servings += change[food.Name];
            }
        }
        static void RevertChange(Dictionary<string, int> change, List<Food> foods)
        {
            foreach (var food in foods)
            {
                food.Servings -= change[food.Name];
            }
        }

        /// <summary>
        /// Returns true if foodA is better.
        /// </summary>
        /// <param name="foodA"></param>
        /// <param name="foodB"></param>
        /// <param name=""></param>
        /// <returns></returns>
        static bool CompareFoodsToGoals(List<Food> foodA, List<Food> foodB, DailyGoals goals)
        {
            if (foodA == null && foodB == null)
                throw new InvalidOperationException("Can't have two null foods to compare.");
            if (foodA == null)
                return false;
            if (foodB == null)
                return true;
            var diffA = GetDifferences(foodA, goals);
            var diffB = GetDifferences(foodB, goals);
            return diffA.OverallDiffScore < diffB.OverallDiffScore;
        }

        static Differences GetDifferences(List<Food> newServings, DailyGoals goals)
        {
            var carbDiff = Difference(goals.Carbs, newServings.Sum(x => x.TotalCarbs));
            var proteinDiff = Difference(goals.Protein, newServings.Sum(x => x.TotalProtein));
            var fatDiff = Difference(goals.Fat, newServings.Sum(x => x.TotalFat));
            var calDiff = Difference(goals.Calories, newServings.Sum(x => x.Calories));

            return new Differences()
            {
                CarbDiff = carbDiff,
                FatDiff = fatDiff,
                ProteinDiff = proteinDiff,
                CalDiff = calDiff
            };
        }

        static int Difference(int goal, int newOne)
        {
            return Math.Abs(goal - newOne);
        }
    }
    class Differences
    {
        public const double CarbImportance = 0.25f;
        public const double FatImportance = 0.25f;
        public const double ProteinImportance = 0.25f;
        public const double CalorieImportance = 0.25f;

        public int CarbDiff { get; set; }
        public int FatDiff { get; set; }
        public int ProteinDiff { get; set; }
        public int CalDiff { get; set; }
        public double OverallDiffScore => (CarbDiff * CarbImportance) + 
            (FatDiff * FatImportance) + 
            (ProteinDiff * ProteinImportance) + 
            (CalDiff * 0.3 * CalorieImportance); // Calories are scaled so they don't dominate
    }
}
