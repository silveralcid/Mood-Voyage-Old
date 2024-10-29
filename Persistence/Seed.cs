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
            if (context.Assessments.Any()) return;

            var assessments = new List<Assessment>
            {
                new Assessment
                {
                    LivelihoodAvgRating = 55,
                    ConnectionAvgRating = 37,
                    EsteemAvgRating = 42,
                    AutonomyAvgRating = 60,
                    PurposeAvgRating = 75,
                    ActualizationAvgRating = 80,
                },
                new Assessment
                {
                    LivelihoodAvgRating = 80,
                    ConnectionAvgRating = 65,
                    EsteemAvgRating = 70,
                    AutonomyAvgRating = 85,
                    PurposeAvgRating = 90,
                    ActualizationAvgRating = 95,
                },
                new Assessment
                {
                    LivelihoodAvgRating = 40,
                    ConnectionAvgRating = 50,
                    EsteemAvgRating = 60,
                    AutonomyAvgRating = 70,
                    PurposeAvgRating = 80,
                    ActualizationAvgRating = 90,
                },
            };

            await context.Assessments.AddRangeAsync(assessments);
            await context.SaveChangesAsync();
        }
    }
}