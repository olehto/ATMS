using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class Log
    {
        public int LogId { get; set; }
        public int ClientId { get; set; }
        public DateTime Date { get; set; }
        public string Screen { get; set; }
        public List<string> programList { get; set; }
        public Log()
        {
            programList = new List<string>();
        }
    }
}
