namespace BusinessLogicLayer.Models.Response
{
    public class CountersResponseModel
    {
        public ulong CountVisit { get; set; }
        public ulong CountInfo { get; set; }
        public ulong CountResult { get; set; }
        public ulong CountVisitForMonth { get; set; }
        public ulong CountInfoForMonth { get; set; }
        public ulong CountResultForMonth { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
    }
}
