using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Kassasysteem
{
    /// <summary>
    /// Interaction logic for Rekenmachine.xaml
    /// </summary>
    public partial class Rekenmachine : Window
    {
        public Rekenmachine()
        {
            InitializeComponent();
        }

        private void Button_Click_Number(object sender, RoutedEventArgs e)
        {
            Button b = (Button)sender;
            tbCurrentCalc.Text += b.Content.ToString();
        }

        private void Calculate(object sender, RoutedEventArgs e)
        {
            string calculation = tbCurrentCalc.Text;
        }

        private void btnCE_Click(object sender, RoutedEventArgs e)
        {
            string calculation = tbCurrentCalc.Text;
            string newCalc = calculation.Remove(calculation.Length - 1, 1);
            tbCurrentCalc.Text = newCalc;
        }
    }
}
