using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class DateTimeHelper
    {
        public DateTime j { get; set; }
        public DateTimeHelper(DateTime f)
        {
            j = new DateTime(f.Year, f.Month, f.Day);
        }
        public override string ToString()
        {
            string k;
            if (j.Day < 10)
                k = "0" + j.Day + "/";
            else
                k = j.Day + "/";
            if (j.Month < 10)
                k += "0" + j.Month + "/";
            else
                k += j + "/";
            k += j.Year;
            return k;
        }

        internal void AddMilliseconds(long value)
        {
            long beginTicks = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).Ticks;
            DateTime dt = new DateTime(beginTicks + value * 10000, DateTimeKind.Utc);
            this.j = dt;
        }
    }
}
