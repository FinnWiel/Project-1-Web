using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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

        private Regex powerTo = new Regex("[`^`]", RegexOptions.RightToLeft);
        private Regex additionSubtraction = new Regex("[+-]", RegexOptions.RightToLeft);
        private Regex multiplicationDivision = new Regex("[*/]", RegexOptions.RightToLeft);

        public void Parse(string equation)
        {
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

                LeftNumber = new Operation();
                LeftNumber.Parse(equation.Substring(0, operatorLocation.Index));

                RightNumber = new Operation();
                RightNumber.Parse(equation.Substring(operatorLocation.Index + 1));
            }
            else
            {
                Operator = "v";
                result = double.Parse(equation);
            }
        }

        private double result;

        public double Solve()
        {
            switch (Operator)
            {
                case "v":
                    break;
                case "+":
                    result = LeftNumber.Solve() + RightNumber.Solve();
                    break;
                case "-":
                    result = LeftNumber.Solve() - RightNumber.Solve();
                    break;
                case "*":
                    result = LeftNumber.Solve() * RightNumber.Solve();
                    break;
                case "/":
                    result = LeftNumber.Solve() / RightNumber.Solve();
                    break;
                case "^":
                    result = Math.Pow(LeftNumber.Solve(), RightNumber.Solve());
                    break;
                default:
                    throw new Exception("Call Parse first.");
            }

            return result;
        }
    }
}
