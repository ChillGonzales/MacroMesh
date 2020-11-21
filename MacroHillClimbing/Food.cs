using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MacroHillClimbing
{
    public class Food
    {
        public int Servings { get; set; } = 1;
        [JsonIgnore]
        public int TotalCarbs 
        { 
            get
            {
                return Servings * CarbsPerServing;
            } 
        }
        [JsonIgnore]
        public int TotalFat 
        { 
            get
            {
                return Servings * FatPerServing;
            } 
        }
        [JsonIgnore]
        public int TotalProtein 
        { 
            get
            {
                return Servings * ProteinPerServing;
            } 
        }
        [JsonIgnore]
        public int Calories
        {
            get
            {
                return Servings * (4 * CarbsPerServing + 4 * ProteinPerServing + 9 * FatPerServing);
            }
        }
        public int CarbsPerServing { get; set; }
        public int ProteinPerServing { get; set; }
        public int FatPerServing { get; set; }
        public int MinServing { get; set; } = 1;
        public int MaxServing { get; set; } = 1;
        public string Name { get; set; }
    }
}
