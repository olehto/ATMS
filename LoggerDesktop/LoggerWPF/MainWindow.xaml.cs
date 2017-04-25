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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace LoggerWPF
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        CallWebAPI CallAPI;
        public MainWindow()
        {
            InitializeComponent();
            CallAPI = new CallWebAPI();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            CallAPI.GetToken(Login.Text, Password.Password);
            if (CallAPI.token.status == "0")
            {
                MessageBox.Show("Error");
                return;
            } 
            CallAPI.GetProfile();
            if (CallAPI.token.status == "0")
            {
                MessageBox.Show("Error");
                return;
            }
            Window1 win = new Window1(CallAPI.g, CallAPI);
            win.Owner = this;
            win.Show();
        }
    }
}
