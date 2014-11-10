using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.ServiceModel;
using System.IO;
using System.Text;
using InterviewAPI;

namespace InterviewService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "InterviewService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select InterviewService.svc or InterviewService.svc.cs at the Solution Explorer and start debugging.
    public class InterviewService : IInterviewService
    {
        #region IIntertviewService Members

       

        public List<inters> GetInterviewsList()
        {
            List<inters> IntList = InterviewsAPI.PrintAllInterviews();
            return IntList;
        }

        public List<candis> GetCandidatesList()
        {
            List<candis> candidates = InterviewsAPI.GetCandidates();
            return candidates;
        }

        public void DeserializeFromStream(Stream stream)
        {
            //MemoryStream stream1 = new MemoryStream();
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(Intermediate));

            using (StreamReader sr = new StreamReader(stream))
            {
                Intermediate in2 = (Intermediate)ser.ReadObject(stream);
                IntermediateInsert(in2);
            }
        }
        #endregion

        static void IntermediateInsert(Intermediate interview)
        {
            Interview myInter = new Interview();
            string stringnumbers = interview.IntCandidate;
            decimal[] candidates = stringnumbers.Split(';').Select(n => Convert.ToDecimal(n)).ToArray();

            myInter.InterviewDate = Convert.ToDateTime(interview.IntDate);
            myInter.Interviewer = Convert.ToInt32(interview.InterviewerId);
            myInter.Client = Convert.ToInt32(interview.IntClient);
            myInter.Type = interview.InterviewType;
            myInter.Venue = interview.IntVenue;
            myInter.Comment = interview.IntComments;
            myInter.JobOpeningId = Convert.ToDecimal(interview.IntJobOpening);

            InterviewsAPI.AddNewInterview(myInter, candidates);

           
        }

    }
    [DataContract]
    class Intermediate
    {
        [DataMember]
        public string IntDate { get; set; }
        [DataMember]
        public string IntClient { get; set; }
        [DataMember]
        public string InterviewerId { get; set; }
        [DataMember]
        public string InterviewType { get; set; }
        [DataMember]
        public string IntVenue { get; set; }
        [DataMember]
        public string IntComments { get; set; }
        [DataMember]
        public string IntJobOpening { get; set; }
        [DataMember]
        public string IntCandidate { get; set; }
    }
}
