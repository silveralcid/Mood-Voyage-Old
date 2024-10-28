namespace Domain
{
    public class Need
    {
        public Guid Id { get; set; } // primary key for EF, need to be specifically Id
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Examples { get; set; }
        public byte Rating { get; set; }
        public DateTime Date { get; set; }
    }
}