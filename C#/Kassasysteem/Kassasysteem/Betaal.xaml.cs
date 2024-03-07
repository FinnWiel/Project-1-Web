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
using System.Windows.Threading;
namespace Kassasysteem
{
    /// <summary>
    /// Interaction logic for Betaal.xaml
    /// </summary>
    public partial class Betaal : Window
    {
        DispatcherTimer progressBar;
        public Betaal()
        {
            InitializeComponent();

            progressBar = new DispatcherTimer();
            progressBar.Tick += new EventHandler(ProgressTick);
            progressBar.Interval = TimeSpan.FromSeconds(1);

        }

        private void ProgressTick(object sender, EventArgs e)
        {
            ProgressTime.Value = ProgressTime.Value - 1.66666667; // 100/60 = 1.66666667

            if (ProgressTime.Value == 0)
            {
                Application.Current.Shutdown();
            }
        }
        private void Window_Deactivated(object sender, EventArgs e)
        {
            progressBar.Stop();
            ProgressTime.Value = 100;
        }

        private void Window_Activated(object sender, EventArgs e)
        {
            progressBar.Start();
        }

    }
}
