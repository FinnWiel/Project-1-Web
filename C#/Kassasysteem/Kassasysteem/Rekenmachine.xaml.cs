using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
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
            Button clickedButton = (Button)sender;

            switch (clickedButton.Content.ToString())
            {
                case "sin":
                    tbCurrentCalc.Text += clickedButton.Content.ToString() + "(";
                    break;
                case "cos":
                    tbCurrentCalc.Text += clickedButton.Content.ToString() + "(";
                    break;
                case "tan":
                    tbCurrentCalc.Text += clickedButton.Content.ToString() + "(";
                    break;
                case "√x":
                    tbCurrentCalc.Text += "√";
                    break;
                default:
                    tbCurrentCalc.Text += clickedButton.Content.ToString();
                    break;
            }
        }

        private void Calculate(object sender, RoutedEventArgs e)
        {
        }

        private void btnCE_Click(object sender, RoutedEventArgs e)
        {
            string calculation = tbCurrentCalc.Text;

            if (calculation.Length > 0)
            {
                string newCalc = calculation.Remove(calculation.Length - 1, 1);
                tbCurrentCalc.Text = newCalc;
            }
            else
            {
                return;
            }

        }
    }
}
