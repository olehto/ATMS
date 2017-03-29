using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class ProjectModel
    {
        public int projectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DeadLine { get; set; }
        public List<TaskModel> list { get; set; }
        public ProjectModel()
        {
            list = new List<TaskModel>();
            list.Add(new TaskModel());
        }
    }
}
