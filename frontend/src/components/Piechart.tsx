
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);
interface Piechartprops{
    invoicedata:invoice[]
}
const Piechart = ({invoicedata}:Piechartprops) => {
    const paidCount = invoicedata.filter(invoice => invoice.status).length;
  const unpaidCount =  invoicedata.length - paidCount;
  const data = {
    labels: [`Paid: ${paidCount}`, `Unpaid: ${unpaidCount}`],
    datasets: [
      {
        data: [paidCount, unpaidCount],
        backgroundColor: ['#70afe0', '#eec0c0'],
        hoverBackgroundColor: ['#cae0e3', '#efd4d4'],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="w-64 h-64">
    <Pie  data={data} options={options} />
    </div>
  )
}

export default Piechart