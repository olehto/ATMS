using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class ProjectModel
    {
        public int projectId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTimeHelper DateStartSTR;
        public long dateStart { 
            get { return 0; }
            set { 
                DateStartSTR = new DateTimeHelper(new DateTime(1970, 1, 1, 0, 0, 0, 0)); 
                DateStartSTR.AddMilliseconds(value); 
            }
        }
        public DateTimeHelper DeadLineSTR;
        public long deadLine { get { return 0; } 
            set { 
                DeadLineSTR = new DateTimeHelper(new DateTime(1970, 1, 1, 0, 0, 0, 0)); 
                DeadLineSTR.AddMilliseconds(value); 
            } 
        }
        public List<TaskModel> list { get; set; }
        public ProjectModel()
        {
            list = new List<TaskModel>();
            list.Add(new TaskModel());
        }
    }
}
