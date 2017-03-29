using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class Time
    {
        public int Seconds { get; set; }
        public int Minutes { get; set; }
        public int Hours { get; set; }

        public void ChangeTime()
        {
            if (Seconds == 0)
            {
                if (Minutes == 0)
                {
                    if (Hours != 0)
                        Hours -= 1;
                    Minutes = 59;
                }
                else
                {
                    Minutes -= 1;
                }
                Seconds = 59;
            }
            else
            {
                Seconds -= 1;
            }
        }
        public void Clear()
        {
            this.Seconds = 0;
            this.Minutes = 0;
            this.Hours = 0;
        }
    }
}
