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
using System.Drawing;

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
        string password;//пароль(для проверки корректности работы изменения пароля)
        int current_task;
        CallWebAPI API;

        List<Log> logList;//это список влогов для текущего таска

        public Window1(developer prof, CallWebAPI API)
        {
            InitializeComponent();
            this.API = API;
            password = "123";
            //HERE PROFILE INITIALIZE VALUES
            Name.Text = prof.name;
            Lastname.Text = prof.lastName;
            DoB.Text = prof.dateOfBirthSTR.ToString();
            Email.Text = prof.email;
            Phone.Text = prof.telephone;
            Nickname.Text = prof.nickname;
            current_client_id = prof.developerId;
            Techn.Text = prof.devTypeSTR + "";
            time = new Time();
            //**********************
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
             * */
            dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
            dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);
            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
            currentPartOfTime = 0;
            /*
             * */
            //*******************************************************
            projectList = new List<ProjectModel>();
            projectList = API.GetProjects();
            //projectList.Add(new ProjectModel() { DateStart = new DateTimeHelper(DateTime.Now), DeadLine = new DateTimeHelper(DateTime.Now), Description = "Descriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncriptioncription", projectID = projectList.Count, Title = "Title1" });
            //projectList.Add(new ProjectModel() { DateStart = new DateTimeHelper(DateTime.Now), DeadLine = new DateTimeHelper(DateTime.Now), Description = "Description", projectID = projectList.Count, Title = "Title2" });
            //projectList.Add(new ProjectModel() { DateStart = new DateTimeHelper(DateTime.Now), DeadLine = new DateTimeHelper(DateTime.Now), Description = "Description", projectID = projectList.Count, Title = "Title3" });
            
            //*******************************************************
            logList = new List<Log>();
            trvFamilies.ItemsSource = projectList;
        }


        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            updateTime();
            if ((time.Hours == 0) && (time.Minutes == 0) && (time.Seconds == 0))
            {
                stopclick();
            }
            else
            {
                time.ChangeTime();
                currentPartOfTime++;
                if (currentPartOfTime == 1)
                {
                    Log f = new Log();
                    f.LogId = 0;
                    f.ClientId = current_client_id;
                    f.Date = DateTime.Now;
                    processes = System.Diagnostics.Process.GetProcesses().ToList();
                    foreach (System.Diagnostics.Process p in processes)
                    {
                        bool k = true;
                        if (!String.IsNullOrEmpty(p.MainWindowTitle))
                        {
                            foreach (string g in f.programList)
                            {
                                if (p.MainWindowTitle == g)
                                {
                                    k = false; break;
                                }
                            }
                            if (k)
                            {
                                f.programList.Add(p.MainWindowTitle);
                            }
                        }
                    }
                    this.Visibility = Visibility.Hidden;
                    //f.Screen = MakeScreen().
                    string pl="";
                    foreach (string str in f.programList)
                    {
                        pl += str + " ";
                    }
                    API.PutLog(current_task, pl, MakeScreen());
                    this.Visibility = Visibility.Visible;
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
        {
            AboutBox1 ab = new AboutBox1();
            ab.Show();
        }

        private byte[] MakeScreen()
        {
            byte[] byteArray = new byte[5];
            double screenLeft = SystemParameters.VirtualScreenLeft;
            double screenTop = SystemParameters.VirtualScreenTop;
            double screenWidth = SystemParameters.VirtualScreenWidth;
            double screenHeight = SystemParameters.VirtualScreenHeight;
            String filename;
            //MAKE SCREENSHOT
            using (System.Drawing.Bitmap bmp = new System.Drawing.Bitmap((int)screenWidth,
                (int)screenHeight))
            {
                using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bmp))
                {
                    filename = "ScreenCapture-" + DateTime.Now.ToString("ddMMyyyy-hhmmss") + ".png";
                    Opacity = .0;
                    g.CopyFromScreen((int)screenLeft, (int)screenTop, 0, 0, bmp.Size);
                    bmp.Save("C:\\Users\\Yuri\\Desktop\\ICONS FOR PROJECT\\screenshots\\" + filename);
                    byteArray = ImageToByte2(bmp);
                    Opacity = 1;
                }

            }
            return byteArray;
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
            playclick();
        }
        public void playclick()
        {
            dispatcherTimer.Start();
            PlayButton.IsEnabled = false;
            StopButton.IsEnabled = true;
            PauseButton.IsEnabled = true;
            ChangeButton.IsEnabled = false;
        }

        private void PauseButton_Click(object sender, RoutedEventArgs e)
        {//pause
            pauseclick();
        }
        public void pauseclick()
        {
            dispatcherTimer.Stop();
            PlayButton.IsEnabled = true;
            StopButton.IsEnabled = true;
            PauseButton.IsEnabled = false;
            ChangeButton.IsEnabled = false;
        }

        private void Button_Click_5(object sender, RoutedEventArgs e)
        {//stop
            stopclick();
        }
        public void stopclick()
        {
            dispatcherTimer.Stop();
            PlayButton.IsEnabled = true;
            StopButton.IsEnabled = false;
            PauseButton.IsEnabled = false;
            ChangeButton.IsEnabled = true;
            time.Clear();
            updateTime();
            currentPartOfTime = 0;
        }

        private void trvFamilies_SelectedItemChanged(object sender, SelectionChangedEventArgs e)
        {
            ProjectModel k = trvFamilies.SelectedItem as ProjectModel;
            TaskList.Items.Clear();
            taskList = API.GetTasks(k.projectId);
            foreach (TaskModel task in taskList)
            {
                if (task.developer == API.g.developerId)
                    TaskList.Items.Add(task);
            }
            ProjectStart.Text = k.DateStartSTR.ToString();
            ProjectDeadline.Text = k.DeadLineSTR.ToString();
            ProjectDescr.Text = k.description;
        }

        private void ChangePassword_Click(object sender, RoutedEventArgs e)
        {
            if (ChangePasswordCanvas.Visibility == System.Windows.Visibility.Visible)
            {
                ChangePasswordCanvas.Visibility = System.Windows.Visibility.Hidden;
                ChangePassword.Content = "Change password   ▶";
            }
            else
            {
                ChangePasswordCanvas.Visibility = System.Windows.Visibility.Visible;
                ChangePassword.Content = "Change password   ▼";
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            ProjectCanvas.Visibility = System.Windows.Visibility.Hidden;
            ProfileCanvas.Visibility = System.Windows.Visibility.Visible;
            ///HERE ZEROING OUT PASSWORD FIELDS
            OldPassword.Text = "";
            NewPassword.Text = "";
            NewPasswordRepeat.Text = "";
            PasswordChangeStatus.Content = "";
            ///////////////////////////////////
            ChangePasswordCanvas.Visibility = System.Windows.Visibility.Hidden;
            ChangePassword.Content = "Change password   ▶";
        }

        private void Button_Click_6(object sender, RoutedEventArgs e)
        {
            ProjectCanvas.Visibility = System.Windows.Visibility.Visible;
            ProfileCanvas.Visibility = System.Windows.Visibility.Hidden;
        }

        private void ChangePasswordFinish_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (OldPassword.Text != password)
                    throw new FormatException();
                if (NewPassword.Text != NewPasswordRepeat.Text)
                    throw new IndexOutOfRangeException();
                password = NewPasswordRepeat.Text;
                PasswordChangeStatus.Foreground = new SolidColorBrush(Colors.Blue);
                PasswordChangeStatus.Content = "SUCCESFULLY CHANGED";
            }
            catch (FormatException)
            {
                PasswordChangeStatus.Foreground = new SolidColorBrush(Colors.Red);
                PasswordChangeStatus.Content = "INCORRECT PASSWORD";
            }
            catch (IndexOutOfRangeException)
            {
                PasswordChangeStatus.Foreground = new SolidColorBrush(Colors.Red);
                PasswordChangeStatus.Content = "PASSWORDS DO NOT MATCH";
            }
        }

        private void TaskList_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            TaskModel task = TaskList.SelectedItem as TaskModel;
            current_task = task.taskId;
            string gg = task.duration[0] + "" + task.duration[1]; 
            time.Hours = Int32.Parse(gg);
            gg = task.duration[3] + "" + task.duration[4];
            time.Minutes = Int32.Parse(gg);
            gg = task.duration[6] + "" + task.duration[7];
            time.Seconds = Int32.Parse(gg);
            updateTime();
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
        public static byte[] ImageToByte2(System.Drawing.Image img)
        {
            using (var stream = new System.IO.MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }
    }



}
