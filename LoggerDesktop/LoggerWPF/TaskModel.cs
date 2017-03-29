using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class TaskModel
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime Deadline { get; set; }
        public string Version { get; set; }
        public int priority_id { get; set; }
        public int type_id { get; set; }
        public int status_id { get; set; }
        public DateTime time { get; set; }
        public int hours { get; set; }
        public int minutes { get; set; }
        public int sprint_id { get; set; }
        public int developer_id { get; set; }
    }
}
