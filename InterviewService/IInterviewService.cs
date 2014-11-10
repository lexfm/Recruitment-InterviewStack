using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.IO;
using System.Text;
using InterviewAPI;

namespace InterviewService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IInterviewService" in both code and config file together.
    [ServiceContract]
    public interface IInterviewService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getlist")]
        List<inters> GetInterviewsList();

        [OperationContract]
        [WebInvoke(Method = "POST",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "insertjson")]
        void DeserializeFromStream(Stream stream);

        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "getcandis")]
        List<candis> GetCandidatesList();
    }
}
