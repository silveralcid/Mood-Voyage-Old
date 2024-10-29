namespace Domain
{
    public class Assessment
    {
        public Guid Id { get; set; } // primary key for EF, need to be specifically Id
        public string UserId { get; set; }
        public byte LivelihoodAvgRating { get; set; }
        public byte ConnectionAvgRating { get; set; }
        public byte EsteemAvgRating { get; set; }
        public byte AutonomyAvgRating { get; set; }
        public byte PurposeAvgRating { get; set; }
        public byte ActualizationAvgRating { get; set; }
        public DateTime Date { get; set; }
    }
}