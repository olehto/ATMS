using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace LoggerWPF
{
    /// <summary>
    /// Логика взаимодействия для AddWindow.xaml
    /// </summary>
    public partial class AddWindow : Window
    {
        public AddWindow()
        {
            InitializeComponent();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            Window1 main = this.Owner as Window1;
            try
            {
                Time g = new Time() { Hours = Int32.Parse(Hourss.Text), Minutes = Int32.Parse(Minutess.Text), Seconds = Int32.Parse(Secondss.Text) };
                if ((g.Hours < 0) && (g.Minutes < 0) && (g.Seconds < 0))
                {
                    throw new Exception();
                }
                main.time.Hours = g.Hours;
                main.time.Minutes = g.Minutes;
                main.time.Seconds = g.Seconds;
                main.updateTime();
                this.Close();
            }
            catch
            {
                MessageBox.Show("Enter valid data", "Mistake");
            }
        }
    }
}
