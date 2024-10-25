namespace Domain
{
    public class Activity
    {

        public Guid Id { get; set; } // primary key for EF, need to be specifically Id
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}