using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MacroHillClimbing
{
    public static class Util
    {
        public static T Clone<T>(this T obj)
        {
            return JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(obj));
        }
    }
}
