using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
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
using System.Xaml;
using System.Windows.Threading;
using System.Windows.Media.Animation;

namespace Kassasysteem
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        DispatcherTimer progressBar;
        public MainWindow()
        {
            InitializeComponent();
            progressBar = new DispatcherTimer();
            progressBar.Tick += new EventHandler(ProgressTick);
            progressBar.Interval = TimeSpan.FromSeconds(1);
            progressBar.Start();
            
        }

        private void ProgressTick(object sender, EventArgs e)
        {
            ProgressTime.Value = ProgressTime.Value - 1.66666667; // 100/60 = 1.66666667
 
            if (ProgressTime.Value == 0)
            {
                Application.Current.Shutdown();
            }
        }

        public double totalPrice;
        Dictionary<string, TextBlock> dynamicallyAddedTextBlocks = new Dictionary<string, TextBlock>();
        private void btnToevoegen_Click(object sender, RoutedEventArgs e)
        {
            ProgressTime.Value = 100;
            if (cmbFiets.SelectedIndex > -1 && !string.IsNullOrEmpty(txbAantalDagen.Text))
            {
                string selectedFiets = cmbFiets.Text;
                string aantalDagen = txbAantalDagen.Text;
                List<string> checkedVerzekering = new List<string>();
                List<string> checkedService = new List<string>();
                GetSelectedCheckBoxValues(checkedVerzekering, gridVerzekeringen);
                GetSelectedCheckBoxValues(checkedService, gridService);

                double bikePrice = GetTagValuesCombobox(cmbFiets);
                double verzekeringPrice = GetTagValuesCheckbox(gridVerzekeringen);
                double servicePrice = GetTagValuesCheckbox(gridService);

                double dailyPrice = bikePrice + verzekeringPrice + servicePrice;
                string PriceString = "€" + (dailyPrice * Convert.ToDouble(aantalDagen) / 100).ToString("N2", System.Globalization.CultureInfo.InvariantCulture);
                

                cmbFiets.SelectedIndex = -1;
                txbAantalDagen.Text = "";
                //TODO: Deselect checkboxes

                // Create DockPanel
                DockPanel dockPanel = new DockPanel();
                dockPanel.Background = Brushes.White;
                dockPanel.Margin = new Thickness(10, 5, 10, 5);

                // TextBlock selectedFiests
                TextBlock headerTextBlock = new TextBlock();
                headerTextBlock.Text = selectedFiets;
                headerTextBlock.VerticalAlignment = VerticalAlignment.Center;
                headerTextBlock.Margin = new Thickness(10, 0, 10, 0);
                dockPanel.Children.Add(headerTextBlock);

                // Separator
                Separator separator1 = new Separator();
                separator1.BorderThickness = new Thickness(2);
                separator1.BorderBrush = Brushes.Black;
                separator1.Margin = new Thickness(0, 10, 0, 10);
                separator1.LayoutTransform = new RotateTransform(90);
                dockPanel.Children.Add(separator1);

                // Verzekeringen
                if (checkedVerzekering.Count >= 1)
                {
                    // First StackPanel
                    StackPanel stackPanel1 = new StackPanel();
                    stackPanel1.Margin = new Thickness(10);
                    dockPanel.Children.Add(stackPanel1);

                    // Add TextBlocks Verzekeringen
                    foreach (string value in checkedVerzekering)
                    {
                        TextBlock textBlock = new TextBlock();
                        textBlock.Text = value;
                        stackPanel1.Children.Add(textBlock);
                    }
                    // Separator
                    Separator separator2 = new Separator();
                    separator2.BorderThickness = new Thickness(2);
                    separator2.BorderBrush = Brushes.Black;
                    separator2.Margin = new Thickness(0, 10, 0, 10);
                    separator2.LayoutTransform = new RotateTransform(90);
                    dockPanel.Children.Add(separator2);
                }


                // Services
                if(checkedService.Count >= 1)
                {
                    // Second StackPanel
                    StackPanel stackPanel2 = new StackPanel();
                    stackPanel2.Margin = new Thickness(10);
                    dockPanel.Children.Add(stackPanel2);

                    // Add TextBlocks to Services
                    foreach (string value in checkedService)
                    {
                        TextBlock textBlock = new TextBlock();
                        textBlock.Text = value;
                        stackPanel2.Children.Add(textBlock);
                    }

                    // Separator
                    Separator separator3 = new Separator();
                    separator3.BorderThickness = new Thickness(2);
                    separator3.BorderBrush = Brushes.Black;
                    separator3.Margin = new Thickness(0, 10, 0, 10);
                    separator3.LayoutTransform = new RotateTransform(90);
                    dockPanel.Children.Add(separator3);
                }



                // TextBlock aantalDagen
                TextBlock footerTextBlock = new TextBlock();
                footerTextBlock.VerticalAlignment = VerticalAlignment.Center;
                footerTextBlock.Margin = new Thickness(10, 0, 10, 0);
                string text = (aantalDagen == "1") ? "dag" : "dagen";
                footerTextBlock.Text = aantalDagen + " " + text;
                dockPanel.Children.Add(footerTextBlock);

                // Add Price
                string uniqueName = "priceName_" + Guid.NewGuid().ToString("N");

                TextBlock priceTextBlock = new TextBlock();
                priceTextBlock.Text = PriceString; // Set your price here
                priceTextBlock.HorizontalAlignment = HorizontalAlignment.Right;
                priceTextBlock.VerticalAlignment = VerticalAlignment.Bottom;
                priceTextBlock.Margin = new Thickness(10);
                priceTextBlock.Name = uniqueName;
                DockPanel.SetDock(priceTextBlock, Dock.Bottom);
                dockPanel.Children.Add(priceTextBlock);

                dynamicallyAddedTextBlocks.Add(uniqueName, priceTextBlock);

                // Create horizontal StackPanel for delete button
                StackPanel deleteButtonStackPanel = new StackPanel();
                deleteButtonStackPanel.Orientation = Orientation.Horizontal;
                deleteButtonStackPanel.HorizontalAlignment = HorizontalAlignment.Right;

                // Separator within deleteButtonStackPanel
                Separator separator4 = new Separator();
                separator4.BorderThickness = new Thickness(2);
                separator4.BorderBrush = Brushes.Black;
                separator4.Margin = new Thickness(0, 10, 0, 10);
                separator4.LayoutTransform = new RotateTransform(90);
                deleteButtonStackPanel.Children.Add(separator4);

                // Delete button
                Button deleteButton = new Button();
                deleteButton.Background = Brushes.Transparent;
                deleteButton.BorderBrush = Brushes.Transparent;
                deleteButton.Cursor = Cursors.Hand;
                deleteButton.Click += DeleteButtonClick; // Add click event handler
                StackPanel deleteButtonContentStackPanel = new StackPanel();
                deleteButtonContentStackPanel.Orientation = Orientation.Horizontal;
                Ellipse ellipse = new Ellipse();
                ellipse.Margin = new Thickness(10, 0, 0, 0);
                ellipse.Fill = Brushes.Red;
                ellipse.Height = 10;
                ellipse.Width = 10;
                deleteButtonContentStackPanel.Children.Add(ellipse);
                TextBlock deleteButtonTextBlock = new TextBlock();
                deleteButtonTextBlock.VerticalAlignment = VerticalAlignment.Center;
                deleteButtonTextBlock.Margin = new Thickness(5);
                deleteButtonTextBlock.Text = "Delete";
                deleteButtonContentStackPanel.Children.Add(deleteButtonTextBlock);
                deleteButton.Content = deleteButtonContentStackPanel;
                deleteButtonStackPanel.Children.Add(deleteButton);

                dockPanel.Children.Add(deleteButtonStackPanel);

                // Add the DockPanel to a StackPanel
                StackPanel parentStackPanel = new StackPanel();
                parentStackPanel.Children.Add(dockPanel);

                // Set the parent StackPanel as the content of the main window
                orderList.Children.Add(parentStackPanel);

                TextBlock priceTextBlock1 = dockPanel.FindName("priceName") as TextBlock;
                if (priceTextBlock1 != null)
                {
                    // Found the priceTextBlock, you can now access its properties or manipulate it
                    string price = priceTextBlock1.Text;
                    Console.WriteLine("Found priceTextBlock using FindName(). Price: " + price);
                }
                else
                {
                    // priceTextBlock not found
                    Console.WriteLine("Unable to find priceTextBlock using FindName().");
                }
               
                UpdateTotalPrice();
            }
        }

        private List<string> GetSelectedCheckBoxValues(List<string> selectedValues, Grid cbGrid)
        {
            // Iterate through each CheckBox control
            foreach (var child in cbGrid.Children)
            {
                if (child is CheckBox checkBox)
                {
                    // Check if the CheckBox is checked
                    if (checkBox.IsChecked == true)
                    { 
                        // Retrieve the value or any other associated data
                        string value = checkBox.Content.ToString();
                        // Add the value to the list
                        selectedValues.Add(value);
                    }
                }
            }

            // Return the list containing the selected checkbox values
            return selectedValues;
        }
        private double GetTagValuesCombobox(ComboBox comboBox)
        {
            double tagValue = 0.0;

            if (comboBox.SelectedItem is ComboBoxItem selectedItem && double.TryParse(selectedItem.Tag?.ToString().Replace(",", ""), out tagValue))
            {
                return tagValue;
            }else
            { 
                return 0;
            }
        }
        private double GetTagValuesCheckbox(Grid grid)
        {
            double combinedTagValues = 0.0;

            // Check each control in your container (e.g., a Grid)
            foreach (var child in grid.Children)
            {
                // Check if the control is a CheckBox
                if (child is CheckBox checkBox && checkBox.IsChecked == true)
                {
                    // Parse the tag value to get the double value and add it to the combinedTagValues
                    if (double.TryParse(checkBox.Tag?.ToString().Replace(",", ""), out double tagValue))
                    {
                        combinedTagValues += tagValue;
                    }
                }
            }

            return combinedTagValues;
        }
        // Function to update the total price
        // Function to update the total price
        void UpdateTotalPrice()
        {
            // Reset total price to 0
            double totalPrice = 0.0;

            // Define a culture for parsing Euro currency
            CultureInfo euroCulture = CultureInfo.CreateSpecificCulture("nl-NL");

            // Iterate through each TextBlock in the dictionary
            foreach (var kvp in dynamicallyAddedTextBlocks)
            {
                TextBlock priceTextBlock = kvp.Value;

                // Parse the price string and add it to totalPrice
                double price;
                string priceString = priceTextBlock.Text.Replace("€", "").Replace(".",",").Trim(); // Remove Euro symbol and extra spaces
                if (double.TryParse(priceString, NumberStyles.Currency, euroCulture, out price))
                {
                    totalPrice += price;
                }
                else
                {
                    // Handle parsing error
                    Console.WriteLine($"Parsing failed for price: {priceString}");
                }
            }

            // Update the UI with the new total price
            tbTotal.Text = totalPrice.ToString("C", euroCulture); // Format as currency
        }


        private void DeleteButtonClick(object sender, RoutedEventArgs e)
        {
            // Find the parent DockPanel of the delete button
            DockPanel parentDockPanel = FindParentOrderItem(sender as Button);

            // If parent DockPanel is found, remove it from the StackPanel
            if (parentDockPanel != null)
            {
                // Find the price TextBlock by its name within the parent DockPanel
                TextBlock priceTextBlock = parentDockPanel.Children.OfType<TextBlock>()
                    .FirstOrDefault(tb => tb.Name != null && tb.Name.StartsWith("priceName_"));

                // If price TextBlock is found, remove it from the dynamicallyAddedTextBlocks dictionary
                if (priceTextBlock != null && !string.IsNullOrEmpty(priceTextBlock.Name))
                {
                    dynamicallyAddedTextBlocks.Remove(priceTextBlock.Name);
                }

                StackPanel parentStackPanel = parentDockPanel.Parent as StackPanel;
                if (parentStackPanel != null)
                {
                    parentStackPanel.Children.Remove(parentDockPanel);
                }
            }
            ProgressTime.Value = 100;
            UpdateTotalPrice();
        }

        private DockPanel FindParentOrderItem(Button button)
        {
            DependencyObject parent = VisualTreeHelper.GetParent(button);
            while (parent != null && !(parent is DockPanel))
            {
                parent = VisualTreeHelper.GetParent(parent);
            }
            return parent as DockPanel;
        }

        private void RemoveAllOrderItems()
        {
            // Find all DockPanels in the StackPanel
            var dockPanels = orderList.Children.OfType<StackPanel>().ToList();

            // Remove each DockPanel from the StackPanel
            foreach (var dockPanel in dockPanels)
            {
                orderList.Children.Remove(dockPanel);
            }
        }

        private void btnNieuweKlant_Click(object sender, RoutedEventArgs e)
        {
            ProgressTime.Value = 100;
            RemoveAllOrderItems();
            UpdateTotalPrice();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Rekenmachine rekenmachine = new Rekenmachine();
            rekenmachine.WindowStartupLocation = WindowStartupLocation.CenterScreen;
            rekenmachine.Show();
            ProgressTime.Value = 100;
        }

        private void cmbFiets_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ProgressTime.Value = 100;
        }

        private void CheckBox_Checked(object sender, RoutedEventArgs e)
        {
            ProgressTime.Value = 100;
        }
    }
}
