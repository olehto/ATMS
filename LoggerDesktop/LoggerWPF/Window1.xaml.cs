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
using System.Text.RegularExpressions;

namespace LoggerWPF
{
    /// <summary>
    /// Логика взаимодействия для Window1.xaml
    /// </summary>
    public partial class Window1 : Window
    {
        MainWindow main;
        int currentPartOfTime;//для отмерения отрезка времени в 40 секунд
        System.Windows.Threading.DispatcherTimer dispatcherTimer;//таймер(регулярный вызов события)
        public Time time;//для отображения времени
        int current_client_id;//получить номер сотрудника после авторизации
        List<System.Diagnostics.Process> processes;//список процессов
        List<ProjectModel> projectList;//список проектов
        List<TaskModel> taskList;


        List<Log> logList;//это список влогов для текущего таска

        public Window1()
        {
            InitializeComponent();
            time = new Time();
            //при загрузки данного окна
            //здесь обработчики событий загрузки окна:
            this.Loaded += new RoutedEventHandler(BWindow_Loaded);
            //после окончания загрузки
            this.ContentRendered += new EventHandler(CloseMain);
            //при закрытии
            this.Closing += new System.ComponentModel.CancelEventHandler(Closee);//this is для закрытия окна
            this.PlayButton.IsEnabled = true;
            this.StopButton.IsEnabled = false;
            this.PauseButton.IsEnabled = false;
            /*работа с таймером
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * */
            dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
            dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);
            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
            currentPartOfTime = 0;
            /*
             * 
             * 
             * 
             * 
             * 
             * 
             * */
            //*******************************************************
            projectList = new List<ProjectModel>();
            projectList.Add(new ProjectModel() { DateStart = DateTime.Now, DeadLine = DateTime.Now, Description = "Description", projectID = projectList.Count, Title = "Title1" });
            projectList.Add(new ProjectModel() { DateStart = DateTime.Now, DeadLine = DateTime.Now, Description = "Description", projectID = projectList.Count, Title = "Title2" });
            projectList.Add(new ProjectModel() { DateStart = DateTime.Now, DeadLine = DateTime.Now, Description = "Description", projectID = projectList.Count, Title = "Title3" });
            
            //*******************************************************
            logList = new List<Log>();
            trvFamilies.ItemsSource = projectList;
        }


        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            updateTime();
            if ((time.Hours == 0) && (time.Minutes == 0) && (time.Seconds == 0))
            {
                dispatcherTimer.Stop();
            }
            else
            {
                time.ChangeTime();
                currentPartOfTime++;
                if (currentPartOfTime == 40)
                {
                    Log f = new Log();
                    f.LogId = 0;
                    f.ClientId = current_client_id;
                    f.Date = DateTime.Now;
                    foreach (System.Diagnostics.Process PR in processes)
                    {
                        f.programList.Add(PR.MainWindowTitle);
                    }
                    f.Screen = "Here must be the path of screen";
                }
            }
        }

        public void updateTime()
        {

            string TimeForShow;
            if (time.Hours < 10)
                TimeForShow = "0" + time.Hours;
            else
                TimeForShow = time.Hours + "";
            TimeForShow += ":";
            if (time.Minutes < 10)
                TimeForShow += "0" + time.Minutes;
            else
                TimeForShow += time.Minutes + "";
            TimeForShow += ":";
            if (time.Seconds < 10)
                TimeForShow += "0" + time.Seconds;
            else
                TimeForShow += time.Seconds;
            TextTimer.Text = TimeForShow;
        }

        //When close daugter-windows, the main windows will be closed too
        private void Closee(object sender, System.ComponentModel.CancelEventArgs e)
        {
            main.Close();
        }

        private void CloseMain(object sender, EventArgs e)
        {
            main.Visibility = Visibility.Hidden;
        }


        void BWindow_Loaded(object sender, RoutedEventArgs e)
        {
            main = this.Owner as MainWindow;
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            main.Visibility = Visibility.Visible;
            this.Close();
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {//СПИСОК ПРОЦЕССОВ
            double screenLeft = SystemParameters.VirtualScreenLeft;
            double screenTop = SystemParameters.VirtualScreenTop;
            double screenWidth = SystemParameters.VirtualScreenWidth;
            double screenHeight = SystemParameters.VirtualScreenHeight;
            //MAKE SCREENSHOT
            using (System.Drawing.Bitmap bmp = new System.Drawing.Bitmap((int)screenWidth,
                (int)screenHeight))
            {
                using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bmp))
                {
                    String filename = "ScreenCapture-" + DateTime.Now.ToString("ddMMyyyy-hhmmss") + ".png";
                    Opacity = .0;
                    g.CopyFromScreen((int)screenLeft, (int)screenTop, 0, 0, bmp.Size);
                    bmp.Save("C:\\Users\\Yuri\\Desktop\\ICONS FOR PROJECT\\screenshots\\" + filename);
                    Opacity = 1;
                }

            }
            //********************************
        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            //changetimer
            AddWindow aw = new AddWindow();
            aw.Owner = this;
            aw.Show();
        }

        private void Button_Click_4(object sender, RoutedEventArgs e)
        {//play
            dispatcherTimer.Start();
            PlayButton.IsEnabled = false;
            StopButton.IsEnabled = true;
            PauseButton.IsEnabled = true;
            ChangeButton.IsEnabled = false;
        }

        private void PauseButton_Click(object sender, RoutedEventArgs e)
        {//pause
            dispatcherTimer.Stop();
            PlayButton.IsEnabled = true;
            StopButton.IsEnabled = true;
            PauseButton.IsEnabled = false;
            ChangeButton.IsEnabled = false;
        }

        private void Button_Click_5(object sender, RoutedEventArgs e)
        {//stop
            dispatcherTimer.Stop();
            PlayButton.IsEnabled = true;
            StopButton.IsEnabled = false;
            PauseButton.IsEnabled = false;
            ChangeButton.IsEnabled = true;
            time.Clear();
            updateTime();
        }

        private void trvFamilies_SelectedItemChanged(object sender, RoutedPropertyChangedEventArgs<object> e)
        {
            ProjectModel k = trvFamilies.SelectedItem as ProjectModel;
            TaskList.Items.Clear();
            foreach (TaskModel g in k.list)
            {
                TaskList.Items.Add(g);
            }
        }
        /******************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * *****************************************************
         * ***************************************************** */

    }


    public class Family
    {
        public Family()
        {
            this.Members = new System.Collections.ObjectModel.ObservableCollection<FamilyMember>();
        }

        public string Name { get; set; }

        public System.Collections.ObjectModel.ObservableCollection<FamilyMember> Members { get; set; }
    }

    public class FamilyMember
    {
        public string Name { get; set; }

        public int Age { get; set; }
    }
}
