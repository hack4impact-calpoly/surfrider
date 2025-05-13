import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ResultsTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Table className="text-black compact-table">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={4} className="text-center font-bold bg-lime-100">
              Results
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* First data row */}
          <TableRow>
            <TableCell>This amount of annual electricity generation is</TableCell>
            <TableCell className="text-center font-bold bg-lime-100">10.13%</TableCell>
            <TableCell colSpan={2}>of Californias annual electricity consumption.</TableCell>
          </TableRow>

          {/* FIRST SECTION */}
          <TableRow>
            <TableCell colSpan={4}>An equivalent amount of electricity would be produced annually by:</TableCell>
          </TableRow>

          {/* Energy source rows - left and right columns */}
          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">92.31</TableCell>
            <TableCell>Average coal plants in California</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1,504.29</TableCell>
            <TableCell>Average oil plants in California</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">84.12</TableCell>
            <TableCell>Average natural gas plants in California</TableCell>
            <TableCell className="text-right font-bold  bg-lime-100">95.91</TableCell>
            <TableCell>Average fossil fuel plants in California</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.49</TableCell>
            <TableCell>Average nuclear plants in California</TableCell>
            <TableCell className="text-right font-bold  bg-lime-100">65,696.06</TableCell>
            <TableCell>Average acres of solar in California (*ESTIMATED*)</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">#VALUE!</TableCell>
            <TableCell>Average onshore wind turbines in California (*ESTIMATED*)</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">499.97</TableCell>
            <TableCell>Average offshore wind turbines in California (*ESTIMATED*)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>&nbsp;</TableCell>
          </TableRow>

          {/* SECOND SECTION */}
          <TableRow>
            <TableCell colSpan={4}>
              The above user input kWh electricity consumed/reduced has an equivalent emissions of:
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">11,281,551</TableCell>
            <TableCell>Metric tons Carbon Dioxide (CO₂)</TableCell>
            <TableCell colSpan={2} className="font-bold bg-lime-100 text-center">
              946 lbs CO₂/MWh Emission Rate
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4}>This amount of annual emissions is equivalent to annual emissions of:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2.6278E+10</TableCell>
            <TableCell>kWh-Reduced</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">3.0215E+10</TableCell>
            <TableCell>kWh-Consumed</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.2694E+09</TableCell>
            <TableCell>Gallons of Gasoline Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.1082E+09</TableCell>
            <TableCell>Gallons of Diesel Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2,512,594.96</TableCell>
            <TableCell>Gas Powered Passenger Vehicles Per Year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">2.8927E+10</TableCell>
            <TableCell>Miles Driven by Gas Passenger Vehicles</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2.1286E+09</TableCell>
            <TableCell>therms Natural Gas Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">204,746,848.92</TableCell>
            <TableCell>Mcf Natural Gas Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">26,236,165.99</TableCell>
            <TableCell>Barrels of Oil Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">149,345.40</TableCell>
            <TableCell>Tanker Trucks of Oil Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2,195,281.45</TableCell>
            <TableCell>Household Yearly Electricity Use</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1,422,642.04</TableCell>
            <TableCell>Household Yearly Energy Use</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">427,331,491.50</TableCell>
            <TableCell>Incandescent Bulbs switched to LEDs Reduction</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">188,025,856.26</TableCell>
            <TableCell>Urban Tree Seedlings Grown for 10yr Equiv Emission Sequestering</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2,195,281.45</TableCell>
            <TableCell>Acres prevented from conversion to cropland in year of conversion</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">13,430,418.30</TableCell>
            <TableCell>Average Forestry Acres Per Year Equiv Emission Sequestering</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">512,797,789.80</TableCell>
            <TableCell>Propane cylinders used for home barbecues</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">62,225.88</TableCell>
            <TableCell>Railcars of coal burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>This amount of emissions per year results in</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">338,446,541.27</TableCell>
            <TableCell>
              Total Metric tons Carbon Dioxide (CO₂) by the end of lifetime (assuming constant grid emission rates)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4}>Which is equivalent to the emissions of:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">7.8835E+11</TableCell>
            <TableCell>kWh-Reduced</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">9.0644E+11</TableCell>
            <TableCell>kWh-Consumed</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.2633E+10</TableCell>
            <TableCell>Pounds of coal burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">488,378,847.43</TableCell>
            <TableCell>Trash bags of waste recycled instead of landfilled</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">3,903,651.00</TableCell>
            <TableCell>Tons of waste recycled instead of landfilled</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">557,664.43</TableCell>
            <TableCell>Number of garbage trucks of waste recycled instead of landfilled</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">3.02</TableCell>
            <TableCell>Coal-fired power plant emissions for one year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">28.35</TableCell>
            <TableCell>Natural gas-fired power plant emissions for one year</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">3,137.25</TableCell>
            <TableCell>Number of wind turbines running for a year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.3725E+12</TableCell>
            <TableCell>Number of smart phones charged</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.4427E-03</TableCell>
            <TableCell>ppm Concentration CO₂ Increase in the Atmosphere</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.44E-05</TableCell>
            <TableCell>°C Additional Temperature Rise</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">14,878</TableCell>
            <TableCell>Additional People Exposed to Unprecedented Heat in 2070 @ UI</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">12,064</TableCell>
            <TableCell>Additional People Outside Niche in 2070 (Temp+Demo) @ UI</TableCell>
          </TableRow>

          {/* THIRD SECTIONNN */}
          <TableRow>
            <TableCell colSpan={2}>This amount of emissions per year results in</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">338,446,541.27</TableCell>
            <TableCell>
              Total Metric tons Carbon Dioxide (CO₂) by the end of lifetime (assuming constant grid emission rates)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4}>Which is equivalent to the emissions of:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">7.8835E+11</TableCell>
            <TableCell>kWh-Reduced</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">9.0644E+11</TableCell>
            <TableCell>kWh-Consumed</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">3.8083E+10</TableCell>
            <TableCell>Gallons of Gasoline Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">3.3246E+10</TableCell>
            <TableCell>Gallons of Diesel Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">75,377,848.84</TableCell>
            <TableCell>Gas Powered Passenger Vehicles Per Year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">8.6781E+11</TableCell>
            <TableCell>Miles Driven by Gas Passenger Vehicles</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">6.3858E+10</TableCell>
            <TableCell>therms Natural Gas Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">6.1424E+09</TableCell>
            <TableCell>Mcf Natural Gas Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">787,084,979.70</TableCell>
            <TableCell>Barrels of Oil Burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">4,480,361.94</TableCell>
            <TableCell>Tanker Trucks of Oil Burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">65,858,443.52</TableCell>
            <TableCell>Household Yearly Electricity Use</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">42,679,261.19</TableCell>
            <TableCell>Household Yearly Energy Use</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">12,819,944,745.16</TableCell>
            <TableCell>Incandescent Bulbs switched to LEDs Reduction</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">5.6408E+09</TableCell>
            <TableCell>Urban Tree Seedlings Grown for 10yr Equiv Emission Sequestering</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">65,858,443.52</TableCell>
            <TableCell>Acres prevented from conversion to cropland in year of conversion</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">402,912,549.13</TableCell>
            <TableCell>Average Forestry Acres Per Year Equiv Emission Sequestering</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.5384E+10</TableCell>
            <TableCell>Propane cylinders used for home barbecues</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1,866,776.29</TableCell>
            <TableCell>Railcars of coal burned</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">3.7900E+11</TableCell>
            <TableCell>Pounds of coal burned</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.4651E+10</TableCell>
            <TableCell>Trash bags of waste recycled instead of landfilled</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">117,109,529.85</TableCell>
            <TableCell>Tons of waste recycled instead of landfilled</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">16,729,932.84</TableCell>
            <TableCell>Number of garbage trucks of waste recycled instead of landfilled</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">90.59</TableCell>
            <TableCell>Coal-fired power plant emissions for one year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">850.45</TableCell>
            <TableCell>Natural gas-fired power plant emissions for one year</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">94,117.50</TableCell>
            <TableCell>Number of wind turbines running for a year</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">4.1174E+13</TableCell>
            <TableCell>Number of smart phones charged</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">4.3280E-02</TableCell>
            <TableCell>ppm Concentration CO₂ Increase in the Atmosphere</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">4.3280E-04</TableCell>
            <TableCell>°C Additional Temperature Rise</TableCell>
          </TableRow>

          {/* Final lifetime emissions impact section */}
          <TableRow>
            <TableCell colSpan={4}>These total lifetime emissions would result in:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">446,336</TableCell>
            <TableCell>Additional People Exposed to Unprecedented Heat in 2070 UI</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">361,908</TableCell>
            <TableCell>Additional People Outside Niche in 2070 (Temp+Demo) UI</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.55</TableCell>
            <TableCell>Baseline °C Warming by End of Life SSP1-1.9</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.38</TableCell>
            <TableCell>Baseline °C Warming by Year of Study SSP1-1.9</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1.62</TableCell>
            <TableCell>Baseline °C Warming by End of Life SSP1-2.6</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1.72</TableCell>
            <TableCell>Baseline °C Warming by Year of Study SSP1-2.6</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2.12</TableCell>
            <TableCell>Baseline °C Warming by End of Life SSP2-4.5</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">2.75</TableCell>
            <TableCell>Baseline °C Warming by Year of Study SSP2-4.5</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2.72</TableCell>
            <TableCell>Baseline °C Warming by End of Life SSP3-7.0</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">3.22</TableCell>
            <TableCell>Baseline °C Warming by Year of Study SSP3-7.0</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">2.71</TableCell>
            <TableCell>Baseline °C Warming by End of Life SSP5-8.5</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">4.73</TableCell>
            <TableCell>Baseline °C Warming by Year of Study SSP5-8.5</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">1,944</TableCell>
            <TableCell>Additional Human Mortalities by End of Life SSP1-1.9</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">1,199</TableCell>
            <TableCell>Additional Human Mortalities by Year of Study SSP1-1.9</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">6,396</TableCell>
            <TableCell>Additional Human Mortalities by End of Life SSP1-2.6</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">3,688</TableCell>
            <TableCell>Additional Human Mortalities by Year of Study SSP1-2.6</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">15,219</TableCell>
            <TableCell>Additional Human Mortalities by End of Life SSP2-4.5</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">9,244</TableCell>
            <TableCell>Additional Human Mortalities by Year of Study SSP2-4.5</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">26,731</TableCell>
            <TableCell>Additional Human Mortalities by End of Life SSP3-7.0</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">15,862</TableCell>
            <TableCell>Additional Human Mortalities by Year of Study SSP3-7.0</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-right font-bold bg-lime-100">35,892</TableCell>
            <TableCell>Additional Human Mortalities by End of Life SSP5-8.5</TableCell>
            <TableCell className="text-right font-bold bg-lime-100">21,287</TableCell>
            <TableCell>Additional Human Mortalities by Year of Study SSP5-8.5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;
