using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerWPF
{
    public class devType
    {
        public int devTypeId { get; set; }
        public string value { get; set; }
    }
    public class developer
    {
        public developer(developer task)
        {
            this.developerId = task.developerId;
            this.name = task.name;
            this.lastName = task.lastName;
            this.nickname = task.nickname;
            this.email = task.email;
            this.telephone = task.telephone;
            this.Password = task.Password;
        }

        public developer()
        {

        }

        public int developerId { get; set; }
        public string name { get; set; }
        public string lastName { get; set; }
        public string nickname { get; set; }
        public string email { get; set; }
        public string telephone { get; set; }
        public string Password { get; set; }
        public int devType { get; set; }
        public string devTypeSTR { get; set; }
        public DateTimeHelper dateOfBirthSTR;
        public DateTime dateOfBirth { get { return DateTime.Now; } set { dateOfBirthSTR = new DateTimeHelper(value); } }
    }
}
