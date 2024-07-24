
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, eachMonthOfInterval, startOfYear, endOfYear, isValid, parseISO } from 'date-fns';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface Bargraphprops{
    invoicedata:invoice[]
}
const Bargraph = ({invoicedata}:Bargraphprops) => {
    const currentYear = new Date().getFullYear();
  const monthsInYear = eachMonthOfInterval({
    start: startOfYear(new Date(currentYear, 0, 1)),
    end: endOfYear(new Date(currentYear, 0, 1))
  });
  const monthLabels = monthsInYear.map(date => format(date, 'MMM'));
  const invoiceCounts = monthsInYear.map(month => {
    return invoicedata.filter(invoice => {
      let invoiceDate: Date | null = null;

      if (invoice.due_date instanceof Date) {
        invoiceDate = invoice.due_date;
      } else if (typeof invoice.due_date === 'string') {
        invoiceDate = parseISO(invoice.due_date);
      }

      if (invoiceDate && isValid(invoiceDate)) {
        return invoiceDate.getMonth() === month.getMonth() && invoiceDate.getFullYear() === currentYear;
      }
      return false;
    }).length;
  });

  console.log('Invoice counts:', invoiceCounts);
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Number of Invoices',
        data: invoiceCounts,
        backgroundColor: 'rgba(79, 102, 228, 0.6)',
        borderColor: '#7e87d8',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Invoices'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Monthly Invoices for ${currentYear}`,
      },
    },
  };
  return (
    <div className="w-full h-96 mt-auto">{invoiceCounts.some(count => count > 0) ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No invoice data available for the current year.</p>
      )}</div>
  )
}

export default Bargraph