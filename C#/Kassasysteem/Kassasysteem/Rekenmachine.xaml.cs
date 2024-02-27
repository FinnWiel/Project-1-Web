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
            Calculator calculator = new Calculator();

            switch (clickedButton.Content.ToString())
            {
                case "√x":
                    tbCurrentCalc.Text += "√";
                    break;
                case "Ans":
                    if(tbPreviousCalc.Text != "=")
                    {
                        string previousAwnser = tbPreviousCalc.Text.Remove(tbPreviousCalc.Text.Length - 1, 1); ;
                        tbCurrentCalc.Text += calculator.Solve(previousAwnser).ToString();
                    }
                    else
                    {
                        MessageBox.Show("There is no previous awnser yet.");
                    }

                    break;
                default:
                    tbCurrentCalc.Text += clickedButton.Content.ToString();
                    break;
            }
        }

        private void Calculate(object sender, RoutedEventArgs e)
        {
            Calculator calculator = new Calculator();
            tbPreviousCalc.Text = tbCurrentCalc.Text + "=";
            tbCurrentCalc.Text = calculator.Solve(tbCurrentCalc.Text).ToString();
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

        private void btnAC_Click(object sender, RoutedEventArgs e)
        {
            tbCurrentCalc.Text = "";   
        }
    }
}
