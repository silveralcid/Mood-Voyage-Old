using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Needs.Any()) return;

            var needs = new List<Need>
            {
                new Need
                {
                    Name = "Sustenance",
                    Category = "Livelihood",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 20,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Rest",
                    Category = "Livelihood",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 50,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Shelter",
                    Category = "Livelihood",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 95,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Acceptance",
                    Category = "Connection",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 55,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Intimacy",
                    Category = "Connection",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 14,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Love",
                    Category = "Connection",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 42,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Competence",
                    Category = "Esteem",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 42,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Growth",
                    Category = "Esteem",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 72,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
                new Need
                {
                    Name = "Respect",
                    Category = "Esteem",
                    Description = "Description of need",
                    Examples = "Activity 2 months ago",
                    Rating = 12,
                    Date = DateTime.UtcNow.AddMonths(-2),
                },
            };

            await context.Needs.AddRangeAsync(needs);
            await context.SaveChangesAsync();
        }
    }
}