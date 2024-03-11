using System;
using System.Collections.Generic;
using System.Globalization;
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
        CultureInfo euroCulture = CultureInfo.CreateSpecificCulture("nl-NL");

        public Betaal(Window MainWindow)
        {
            InitializeComponent();

            progressBar = new DispatcherTimer();
            progressBar.Tick += new EventHandler(ProgressTick);
            progressBar.Interval = TimeSpan.FromSeconds(1);
            totalePrijs.Text = Data.itemPrice.ToString("C", euroCulture);

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
        private void resetBtn_Click(object sender, RoutedEventArgs e)
        {
            totaleWaarde.Text = "€ 0,00"; // Resets values
            retourBedrag.Text = "€ 0,00";
            nummerGeld.Text = "";
        }

        private void opslaanBtn_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Bestelling afgerond.");
            this.Close();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Button clickedButton = sender as Button;
            if (clickedButton != null)
            {
                // Get the Tag value of the clicked button
                double buttonValue = Convert.ToDouble(clickedButton.Tag);

                // Get the current total value from the textblock
                double currentTotal = Convert.ToDouble(totaleWaarde.Text.Replace("€", "").Replace(".", "").Replace(",", ".").Trim());

                double newTotal = currentTotal + buttonValue;

                totaleWaarde.Text = newTotal.ToString("C", euroCulture);
                ProgressTime.Value = 100;

                // Retour price is the the total minues the items total price
                double retourPrice = newTotal - Data.itemPrice;

                retourBedrag.Text = retourPrice.ToString("C", euroCulture);
                CalculateBillsToGiveBack();
            }
        }
        private void CalculateBillsToGiveBack()
        {
            double[] billNoms = { 200, 100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05 }; // Array with bill numbers
            double target = Convert.ToDouble(retourBedrag.Text.Replace("€", "").Replace(".", "").Replace(",", ".").Trim());
            Dictionary<double, double> itemCounts = GetItemCounts(billNoms, target);
            StringBuilder sb = new StringBuilder(); // Create stringbuilder to help with accumulating the values

            foreach (var kvp in itemCounts)
            {
                double totalItemValue = kvp.Key * kvp.Value;
                if (Math.Round(totalItemValue, 2) <= Math.Round(target, 2)) // If total item value is bigger or equal to the target value
                {
                    sb.Append($"{kvp.Value}x € {kvp.Key}, "); // Add array value and item to stringbuilder
                    target -= totalItemValue; 
                }
            }

            // Remove the trailing comma and space
            if (sb.Length > 0)
                sb.Length -= 2;

            // Display the result in the TextBlock
            nummerGeld.Text = sb.ToString();
        }

        static Dictionary<double, double> GetItemCounts(double[] arr, double amount)
        {
            Dictionary<double, double> counts = new Dictionary<double, double>();
            foreach (double item in arr)
            {
                // Item count so there can be multiple denominators for the same item in the array
                while (item <= amount)
                {
                    if (counts.ContainsKey(item))
                        counts[item]++;
                    else
                        counts[item] = 1;

                    amount -= item;
                }
            }
            return counts;
        }

    }
}
