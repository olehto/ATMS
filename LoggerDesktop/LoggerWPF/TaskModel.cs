using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{

    public class TaskModel
    {
        public int taskId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTimeHelper DateStartSTR;
        public long dateStart
        {
            get { return 0; }
            set
            {
                DateStartSTR = new DateTimeHelper(new DateTime(1970, 1, 1, 0, 0, 0, 0));
                DateStartSTR.AddMilliseconds(value);
                datst = DateStartSTR.ToString();
            }
        }
        public DateTimeHelper DeadLineSTR;
        public long deadLine
        {
            get { return 0; }
            set
            {
                DeadLineSTR = new DateTimeHelper(new DateTime(1970, 1, 1, 0, 0, 0, 0));
                DeadLineSTR.AddMilliseconds(value);
                deadl = DeadLineSTR.ToString();
            }
        }
        public string version { get; set; }
        public string duration { get; set; }
        public string datst { get;set; }
        public string deadl { get; set; }
        public int developer { get; set; }

        public TaskModel()
        {
            
        }
    }

}
