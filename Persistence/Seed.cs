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
                    Date = DateTime.UtcNow.AddDays(-12),
                    LivelihoodAvgRating = 92,
                    ConnectionAvgRating = 75,
                    EsteemAvgRating = 81,
                    AutonomyAvgRating = 56,
                    PurposeAvgRating = 88,
                    ActualizationAvgRating = 79
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-37),
                    LivelihoodAvgRating = 68,
                    ConnectionAvgRating = 91,
                    EsteemAvgRating = 42,
                    AutonomyAvgRating = 73,
                    PurposeAvgRating = 60,
                    ActualizationAvgRating = 85
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-54),
                    LivelihoodAvgRating = 39,
                    ConnectionAvgRating = 82,
                    EsteemAvgRating = 96,
                    AutonomyAvgRating = 51,
                    PurposeAvgRating = 77,
                    ActualizationAvgRating = 63
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-68),
                    LivelihoodAvgRating = 84,
                    ConnectionAvgRating = 47,
                    EsteemAvgRating = 69,
                    AutonomyAvgRating = 92,
                    PurposeAvgRating = 35,
                    ActualizationAvgRating = 58
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-83),
                    LivelihoodAvgRating = 71,
                    ConnectionAvgRating = 63,
                    EsteemAvgRating = 55,
                    AutonomyAvgRating = 86,
                    PurposeAvgRating = 90,
                    ActualizationAvgRating = 78
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-3),
                    LivelihoodAvgRating = 88,
                    ConnectionAvgRating = 72,
                    EsteemAvgRating = 95,
                    AutonomyAvgRating = 81,
                    PurposeAvgRating = 93,
                    ActualizationAvgRating = 87
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-7),
                    LivelihoodAvgRating = 65,
                    ConnectionAvgRating = 79,
                    EsteemAvgRating = 58,
                    AutonomyAvgRating = 84,
                    PurposeAvgRating = 71,
                    ActualizationAvgRating = 76
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-14),
                    LivelihoodAvgRating = 92,
                    ConnectionAvgRating = 86,
                    EsteemAvgRating = 78,
                    AutonomyAvgRating = 90,
                    PurposeAvgRating = 89,
                    ActualizationAvgRating = 94
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-21),
                    LivelihoodAvgRating = 73,
                    ConnectionAvgRating = 68,
                    EsteemAvgRating = 82,
                    AutonomyAvgRating = 75,
                    PurposeAvgRating = 80,
                    ActualizationAvgRating = 77
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-28),
                    LivelihoodAvgRating = 56,
                    ConnectionAvgRating = 61,
                    EsteemAvgRating = 53,
                    AutonomyAvgRating = 59,
                    PurposeAvgRating = 64,
                    ActualizationAvgRating = 58
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-35),
                    LivelihoodAvgRating = 87,
                    ConnectionAvgRating = 91,
                    EsteemAvgRating = 85,
                    AutonomyAvgRating = 93,
                    PurposeAvgRating = 88,
                    ActualizationAvgRating = 90
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-42),
                    LivelihoodAvgRating = 70,
                    ConnectionAvgRating = 75,
                    EsteemAvgRating = 68,
                    AutonomyAvgRating = 72,
                    PurposeAvgRating = 77,
                    ActualizationAvgRating = 73
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-49),
                    LivelihoodAvgRating = 83,
                    ConnectionAvgRating = 79,
                    EsteemAvgRating = 86,
                    AutonomyAvgRating = 81,
                    PurposeAvgRating = 85,
                    ActualizationAvgRating = 82
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-56),
                    LivelihoodAvgRating = 62,
                    ConnectionAvgRating = 57,
                    EsteemAvgRating = 65,
                    AutonomyAvgRating = 60,
                    PurposeAvgRating = 63,
                    ActualizationAvgRating = 59
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-63),
                    LivelihoodAvgRating = 94,
                    ConnectionAvgRating = 89,
                    EsteemAvgRating = 97,
                    AutonomyAvgRating = 92,
                    PurposeAvgRating = 95,
                    ActualizationAvgRating = 96
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-70),
                    LivelihoodAvgRating = 78,
                    ConnectionAvgRating = 82,
                    EsteemAvgRating = 75,
                    AutonomyAvgRating = 80,
                    PurposeAvgRating = 79,
                    ActualizationAvgRating = 81
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-77),
                    LivelihoodAvgRating = 51,
                    ConnectionAvgRating = 48,
                    EsteemAvgRating = 54,
                    AutonomyAvgRating = 50,
                    PurposeAvgRating = 52,
                    ActualizationAvgRating = 49
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-84),
                    LivelihoodAvgRating = 89,
                    ConnectionAvgRating = 93,
                    EsteemAvgRating = 87,
                    AutonomyAvgRating = 91,
                    PurposeAvgRating = 90,
                    ActualizationAvgRating = 92
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-5),
                    LivelihoodAvgRating = 76,
                    ConnectionAvgRating = 71,
                    EsteemAvgRating = 79,
                    AutonomyAvgRating = 74,
                    PurposeAvgRating = 77,
                    ActualizationAvgRating = 75
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-10),
                    LivelihoodAvgRating = 67,
                    ConnectionAvgRating = 63,
                    EsteemAvgRating = 70,
                    AutonomyAvgRating = 65,
                    PurposeAvgRating = 68,
                    ActualizationAvgRating = 66
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-17),
                    LivelihoodAvgRating = 85,
                    ConnectionAvgRating = 88,
                    EsteemAvgRating = 83,
                    AutonomyAvgRating = 87,
                    PurposeAvgRating = 86,
                    ActualizationAvgRating = 84
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-24),
                    LivelihoodAvgRating = 72,
                    ConnectionAvgRating = 69,
                    EsteemAvgRating = 74,
                    AutonomyAvgRating = 71,
                    PurposeAvgRating = 73,
                    ActualizationAvgRating = 70
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-31),
                    LivelihoodAvgRating = 59,
                    ConnectionAvgRating = 55,
                    EsteemAvgRating = 62,
                    AutonomyAvgRating = 57,
                    PurposeAvgRating = 60,
                    ActualizationAvgRating = 58
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-38),
                    LivelihoodAvgRating = 91,
                    ConnectionAvgRating = 95,
                    EsteemAvgRating = 89,
                    AutonomyAvgRating = 93,
                    PurposeAvgRating = 92,
                    ActualizationAvgRating = 94
                },
                new Assessment
                {
                    Date = DateTime.UtcNow.AddDays(-45),
                    LivelihoodAvgRating = 80,
                    ConnectionAvgRating = 77,
                    EsteemAvgRating = 82,
                    AutonomyAvgRating = 79,
                    PurposeAvgRating = 81,
                    ActualizationAvgRating = 78
                },
            };

            await context.Assessments.AddRangeAsync(assessments);
            await context.SaveChangesAsync();
        }
    }
}