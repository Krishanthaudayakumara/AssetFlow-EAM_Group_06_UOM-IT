using System.Collections.Generic;


namespace Server.Models.Support
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public DateTime CreateDate { get; set; }
        public ICollection<Agent> Agents { get; set; }
        public int IssueTypeId { get; set; }
        public IssueType IssueType { get; set; }
         public string ProfileImage { get; set; }
    }
}