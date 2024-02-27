using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;

namespace Kassasysteem
{
    public class Calculator
    {
        public double Solve(string equation)
        {
            // Remove all spaces
            equation = Regex.Replace(equation, @"\s+", "");

            Operation operation = new Operation();
            operation.Parse(equation);

            double result = operation.Solve();

            return result;
        }
    }

    public class Operation
    {
        public Operation LeftNumber { get; set; }
        public string Operator { get; set; }
        public Operation RightNumber { get; set; }

        private Regex bracketsRegex = new Regex(@"\(([^()]*)\)");

        private Regex powerTo = new Regex(@"\^");
        private Regex additionSubtraction = new Regex(@"[+-]");
        private Regex multiplicationDivision = new Regex(@"[*/]");

        public void Parse(string equation)
        {
            while (bracketsRegex.IsMatch(equation))
            {
                equation = ParseBrackets(equation);
            }

            var operatorLocation = additionSubtraction.Match(equation);
            if (!operatorLocation.Success)
            {
                operatorLocation = multiplicationDivision.Match(equation);
            }
            if (!operatorLocation.Success)
            {
                operatorLocation = powerTo.Match(equation);
            }


            if (operatorLocation.Success)
            {
                Operator = operatorLocation.Value;
                MessageBox.Show(equation); //Shows steps in tree

                LeftNumber = new Operation();
                LeftNumber.Parse(equation.Substring(0, operatorLocation.Index));

                RightNumber = new Operation();
                RightNumber.Parse(equation.Substring(operatorLocation.Index + 1));
            }
            else
            {
                Operator = "v";
                try
                {
                    result = double.Parse(equation);
                }
                catch
                {
                    MessageBox.Show("Please enter a valid equation");
                }
            }
        }

        private string ParseBrackets(string equation)
        {
            return bracketsRegex.Replace(equation, match =>
            {
                Operation bracketOperation = new Operation();
                bracketOperation.Parse(match.Groups[1].Value);
                return bracketOperation.Solve().ToString();
            });
        }

        private double result;

        public double Solve()
        {
            switch (Operator)
            {
                case "v":
                    return result;
                case "+":
                    return LeftNumber.Solve() + RightNumber.Solve();
                case "-":
                    return LeftNumber.Solve() - RightNumber.Solve();
                case "*":
                    return LeftNumber.Solve() * RightNumber.Solve();
                case "/":
                    return LeftNumber.Solve() / RightNumber.Solve();
                case "^":
                    return Math.Pow(LeftNumber.Solve(), RightNumber.Solve());
                default:
                    throw new Exception("Unknown operator");
            }
        }
    }
}
