import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';

const { Option } = Select;

const generateOptions = (data, sortType) => {
  const categories = data?.map((item) => item.date);

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Vegana',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        `<td style="padding:0"><b>{point.y} ${sortType.unit} </b></td></tr>`,
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: sortType.title,
        data: data?.map((item) => item[sortType.data]),
      },
    ],
  };
};

const sortData = [
  { id: 1, value: 'users', title: 'Nguời dùng' },
  { id: 1, value: 'products', title: 'Sản phẩm' },
  { id: 1, value: 'bills', title: 'Doanh thu' },
];

export default function LineChart({ data, loading, setCartData }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  const [sort, setSort] = useState('bills');

  useEffect(() => {
    if (data) {
      let customData = [];
      let sortType = {};

      switch (sort) {
        case 'bills':
          sortType = {
            title: 'Doanh thu',
            unit: 'VNĐ',
            data: 'bills',
          };
          break;
        case 'products':
          sortType = {
            title: 'Sản phẩm',
            unit: 'sản phẩm',
            data: 'products',
          };
          break;
        case 'users':
          sortType = {
            title: 'Người dùng',
            unit: 'Người',
            data: 'users',
          };
          break;
        default:
          break;
      }

      const mData = example(data[sortType.data], sort);
      switch (reportType) {
        case 'all':
          customData = mData;
          break;
        case '30': {
          customData = mData.slice(Math.max(mData.length - 30, 1));
          break;
        }
        case '7': {
          customData = mData.slice(Math.max(mData.length - 7, 1));
          break;
        }

        case '1': {
          customData = mData.slice(Math.max(mData.length - 2, 1));
          break;
        }
        default:
          customData = mData;
          break;
      }
      setCartData(customData);

      setOptions(generateOptions(customData, sortType));
    }
  }, [data, reportType, sort]);

  const handelChangeSort = (e) => {
    setSort(e);
  };

  function example(arr1, type) {
    if (!arr1) return;
    let firstDate = moment(arr1[0]?.date, 'DD/MM/YYYY');
    firstDate.hour(12);
    const lastDate = moment();
    lastDate.hour(12);
    var arr = [];
    while (firstDate <= lastDate) {
      let obj = { date: firstDate.format('DD/MM/YYYY'), [type]: 0 };
      const index = arr1.findIndex(
        (item) =>
          firstDate.format('DD/MM/YYYY') === moment(item.date, 'DD/MM/YYYY').format('DD/MM/YYYY')
      );
      if (index > -1) {
        obj[type] = arr1[index][type];
      }
      arr.push({ ...obj });
      firstDate = moment(firstDate + 24 * 3600 * 1000);
    }

    return arr;
  }

  example([
    { date: '14/12/2021', bill: 15000 },
    { date: '15/12/2021', bill: 17000 },
    { date: '20/12/2021', bill: 140000 },
  ]);

  return (
    <>
      <div className="line-chart">
        <div className="line-chart__sort">
          <div className="line-chart__sort--left">
            <button
              onClick={() => setReportType('all')}
              className={`button button__report ${
                reportType === 'all' ? 'button__report--active' : ''
              } `}
            >
              Tất cả
            </button>
            <button
              className={`button button__report ${
                reportType === '30' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('30')}
            >
              30 ngày
            </button>
            <button
              className={`button button__report ${
                reportType === '7' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('7')}
            >
              7 ngày
            </button>
            <button
              className={`button button__report ${
                reportType === '1' ? 'button__report--active' : ''
              } `}
              onClick={() => setReportType('1')}
            >
              Hôm nay
            </button>
          </div>
          <div className="line-chart__sort--right">
            <span className="topbar__right--text">{t('products.sort by')}: </span>
            <Select
              showSearch
              style={{ width: 160 }}
              placeholder={t(`products.placeholder`)}
              optionFilterProp="children"
              onChange={handelChangeSort}
              defaultValue="bills"
            >
              {sortData.map((item, index) => (
                <Option value={item.value} key={index}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
