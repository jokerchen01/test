import * as echarts from "echarts";

// 事件趋势变化
export const SJBHQS = {
  tooltip: {
    trigger: "axis",
    textStyle: {
      fontSize: 35,
    },
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  color: ["rgba(147, 255, 254, 0.3)", "rgba(255, 191, 143, 0.3)"],
  // legend: {
  //   data: ["案件数", "办结数"],
  //   itemHeight: 12, //改变圆圈大小
  //   icon: "circle",
  //   padding: [20, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
  //   textStyle: {
  //     fontSize: 18,
  //     color: "#FFFFFF",
  //   },
  // },
  grid: {
    top: 20,
    left: 0,
    right: 20,
    bottom: 10,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "5.1",
      "5.2",
      "5.3",
      "5.4",
      "5.5",
      "5.6",
      "5.7",
      "5.8",
      "5.9",
      "5.10",
      "5.11",
      "5.12",
      "5.13",
      "5.14",
      "5.15",
      "5.16",
      "5.17",
      "5.18",
      "5.19",
      "5.20",
      "5.21",
      "5.22",
      "5.23",
      "5.24",
      "5.25",
      "5.26",
      "5.27",
      "5.28",
      "5.29",
      "5.30",
      "5.31",
    ],
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(155, 194, 255, .5)",
        width: 1,
        type: "solid",
      },
    },
    axisLabel: {
      color: "#ffffff",
      fontSize: 18,
      fontFamily: "PingFang SC",
      fontWeight: 500,
      color: "#BCDBE8",
      opacity: 0.8,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: true,
      lineStyle: {
        color: "#B8E3FF",
        width: 0,
        type: "solid",
      },
    },
    axisLabel: {
      fontSize: 20,
      fontFamily: "PingFang SC",
      fontWeight: 400,
      color: "#BCDBE8",
      opacity: 0.8,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "rgba(133,213,255,0.08)",
      },
    },
  },
  series: [
    {
      name: "案件数",
      symbol: "none",
      type: "line",
      lineStyle: {
        color: "rgba(147, 255, 254)",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(147, 255, 254, 0.3)" },
          { offset: 1, color: "rgba(147, 255, 254, 0)" },
        ]),
      },
      data: [
       
      ],
      smooth: true,
    },
    {
      name: "办结数",
      symbol: "none",
      type: "line",
      lineStyle: {
        color: "rgba(255, 191, 143)",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(255, 191, 143, 0.3)" },
          { offset: 1, color: "rgba(255, 191, 143, 0)" },
        ]),
      },
      data: [3950, 3460, 2760, 2253, 4620, 2650, 1659, 2450],
      smooth: true,
    },
  ],
};

//当日事件总数
export const DRSJZS = {
  legend: {
    orient: "vertical",
    top: "center",
    left: 200,
    // height: 100,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 18,
      color: "#FFFFFF",
      borderWidth: 5,
    },
  },
  tooltip: {
    trigger: "item",
    textStyle: {
      fontSize: 35,
    },
  },
  grid: {
    left: "3%",
    right: "6%",
    bottom: "3%",
  },
  color: [
    "rgba(63, 216, 130, 1)",
    "rgba(208, 144, 93, 1)",
    "rgba(28, 168, 215, 1)",
    "rgba(136, 93, 208, 1)",
    "rgba(135, 244, 247, 1)",
    "rgba(225, 104, 104, 1)",
    "rgba(162, 162, 162, 1)",
  ],
  series: [
    {
      itemStyle: {
        borderRadius: 10,
        borderColor: "rgba(11, 40, 54, .2)",
        borderWidth: 20,
      },
      right: "20%",
      // name: "chart",
      type: "pie",
      radius: ["60%", "75%"],
      center: ["30.5%", "50.5%"], //设置图的上下左右的位置
      data: [
        { name: "城管平台", value: 874 },
        { name: "其他", value: 25 },
        { name: "12345平台", value: 316 },
        { name: "大联动平台", value: 1195 },
        { name: "区城运平台", value: 25 },
      ],

      label: {
        show: false,
        position: "center",
      },
    },
  ],
};

//消防督查趋势
export const fireControlTrend = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["监督检查单位", "下发责令改正通知书", "数据督查整改火灾隐患"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    // right: "4%",
    bottom: "0%",
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 47,
    show: true,
  },
  grid: {
    top: 20,
    left: "2%",
    right: "4%",
    bottom: "15%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      // data: ["监督检查单位", "下发责令改正通知书", "数据督查整改火灾隐患"],
      data: [
        "01月",
        "02月",
        "03月",
        "04月",
        "05月",
        "06月",
        "07月",
        "08月",
        "09月",
        "10月",
        "11月",
        "12月",
      ],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        // rotate: 45,
        textStyle: {
          fontSize: 18,
          color: "#FFFFFF",
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  /*  dataZoom: [
    {
      type: "inside",
      minValueSpan: 10,
      maxValueSpan: 10,
    },
  ], */
  series: [
    {
      name: "监督检查单位",
      type: "bar",
      showBackground: true,
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #74C7FF 0%, #FFFFFF 0%, #74C7FF 0%, #F2F7FF 0%, #74C7FF 0%, rgba(172,229,255,0.15) 100%)",
        },
      },
      data: [112, 121, 155, 135, 127, 157, 142, 337, 166, 320, 152, 111],
    },
    {
      name: "下发责令改正通知书",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(139, 255, 187, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(132, 255, 187, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, rgba(139,255,187,0.82) 18%, rgba(132,255,187,0) 100%)",
        },
      },
      data: [42, 63, 88, 75, 86, 93, 121, 72, 55, 300, 111, 83],
    },
    {
      name: "数据督查整改火灾隐患",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(249, 181, 131, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(244, 178, 119, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, rgba(139,255,187,0.82) 18%, rgba(132,255,187,0) 100%)",
        },
      },
      data: [52, 183, 195, 214, 222, 205, 186, 202, 230, 699, 570, 333],
    },
  ],
};
//道路安全
export const roadSafety = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["事故数", "伤人事故数", "亡人事故数"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 17,
    show: true,
  },
  grid: {
    top: 20,
    left: "2%",
    right: "4%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        // rotate: 45,
        textStyle: {
          fontSize: 18,
          color: "#FFFFFF",
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
    },
  ],
  series: [
    {
      name: "事故数",
      type: "bar",
      showBackground: true,
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #74C7FF 0%, #FFFFFF 0%, #74C7FF 0%, #F2F7FF 0%, #74C7FF 0%, rgba(172,229,255,0.15) 100%)",
        },
      },
      data: [33, 64, 50, 81, 44, 60, 70, 92, 65, 74, 71, 56],
    },
    {
      name: "伤人事故数",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(139, 255, 187, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(132, 255, 187, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, rgba(139,255,187,0.82) 18%, rgba(132,255,187,0) 100%)",
        },
      },
      data: [4, 6, 8, 2, 10, 6, 7, 5, 7, 3, 8, 7],
    },
    {
      name: "亡人事故数",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(249, 181, 131, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(244, 178, 119, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, rgba(139,255,187,0.82) 18%, rgba(132,255,187,0) 100%)",
        },
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};
//燃气安全 饼图-管道类型分布
export const gasPieOne = {
  color: ["#59FF84", "#FFAF71", "#8ED4FF"],
  title: {
    text: "管道类型分布",
    textStyle: {
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 28,
    },
  },
  legend: {
    orient: "vertical",
    left: 100,
    right: "0",
    top: "middle",
    data: ["钢管", "PE管"],
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      left: -140,
      data: [
        {
          value: 350,
          name: "钢管",
        },
        {
          value: 865,
          name: "PE管",
        },
      ],
      radius: ["42%", "50%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
    {
      itemStyle: {
        opacity: 0.3,
      },
      type: "pie",
      label: {
        show: false,
      },
      left: -140,
      data: [
        {
          value: 350,
          name: "钢管",
        },
        {
          value: 865,
          name: "PE管",
        },
      ],
      radius: ["35%", "42%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
  ],
};

//燃气安全 饼图-管道压力分布
export const gasPieTwo = {
  color: ["#59FF84", "#FFAF71", "#8ED4FF"],
  title: {
    text: "管道类型分布",
    textStyle: {
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 28,
    },
  },
  legend: {
    orient: "vertical",
    left: 90,
    right: "0",
    top: "middle",
    data: ["高压次高压", "中压", "低压"],
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      left: -140,
      data: [
        {
          value: 35,
          name: "高压次高压",
        },
        {
          value: 536,
          name: "中压",
        },
        {
          value: 744,
          name: "低压",
        },
      ],
      radius: ["42%", "50%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
    {
      itemStyle: {
        opacity: 0.3,
      },
      type: "pie",
      label: {
        show: false,
      },
      left: -140,
      data: [
        {
          value: 35,
          name: "高压次高压",
        },
        {
          value: 536,
          name: "中压",
        },
        {
          value: 744,
          name: "低压",
        },
      ],
      radius: ["35%", "42%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
  ],
};

//燃气安全 柱状图
export const gasTrend = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(50,50,50,0.7)",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 20,
    },
  },
  legend: {
    data: ["处数", "点位数"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 30,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    show: true,
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [
        "驷马桥",
        "金泉",
        "西安路",
        "营门口",
        "荷花池",
        "沙河源",
        "抚琴",
        "五块石",
        "九里堤",
      ],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 0,
        textStyle: {
          fontSize: 18,
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      nameTextStyle: {
        fontSize: 18,
        align: "right",
        padding: [0, 6, 0, 0],
      },
      minInterval: 1,
      splitLine: {
        show: true,

        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
    {
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
    },
  ],
  series: [
    {
      name: "处数",
      type: "bar",

      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.1500))",
        },
      },
      data: [3, 9, 25, 3, 4, 8, 5, 3, 6],
    },
    {
      name: "点位数",
      type: "bar",

      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(139, 255, 187, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(132, 255, 187, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(139, 255, 187, 0.82), rgba(132, 255, 187, 0))",
        },
      },
      data: [30, 90, 40, 30, 40, 80, 50, 30, 60],
    },
  ],
};
// 社会维稳  年度涉稳风险隐患
export const NDSWFXYH = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    orient: "horizontal",
    x: "right",
    y: "top",
    textStyle: {
      color: "rgba(192, 211, 229, 1)",
      fontWeight: 500,
      fontFamily: "PingFang SC",
      fontSize: 18,
    },
  },
  grid: {
    top: "35px",
    left: "35px",
    right: "0",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "rgba(240, 151, 103, 1)",
      },
      name: "上一年涉稳风险隐患数量",
      data: [12, 4, 5, 15, 22, 12, 18],
    },
    {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "rgba(103, 170, 240, 1)",
      },
      name: "本年涉稳风险隐患数量",
      data: [7, 4, 5, 2, 4, 9, 10],
    },
  ],
};
// 社会维稳  涉稳风险隐患街道分布情况
export const SWFXYHJDFBQK = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        // backgroundColor: "rgba(103, 236, 240, 1)",
      },
    },
  },
  grid: {
    top: "35px",
    left: "35px",
    right: "0",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      lineHeight: 18,
      interval: 0,
    },
    data: [
      "全泉",
      "天回镇",
      "五块石",
      "抚琴",
      "驷马桥",
      "西华",
      "沙河源",
      "西安路",
      "茶店子",
      "营门口",
      "凤凰山",
      "荷花池",
    ],
  },
  yAxis: {
    name: "",
    minInterval: 1,
    type: "value",
    // interval: 0.25,
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      // padding: [10, -8, 18, 0],
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 0, color: "rgba(116, 199, 255, 1)" },
          { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      barGap: "-100%",
      data: [7, 8, 1, 9, 6, 4, 0, 1, 3, 4, 1, 4],
    },
  ],
};
// 社会维稳 涉稳风险隐患领域分布情况
export const SWFXYHLYFBQK = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        // backgroundColor: "rgba(103, 236, 240, 1)",
      },
    },
  },
  grid: {
    top: "35px",
    left: "35px",
    right: "0",
    bottom: "35px",
  },
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 10,
      maxValueSpan: 10,
    },
  ],
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      lineHeight: 18,
      interval: 0,
    },
    data: [
      "房地产领域",
      "工程建设",
      "金融领域",
      "金征地拆迁泉",
      "民工权益",
      "教育领域",
      "移民问题",
      "涉军领域",
      "医疗卫生",
    ],
  },
  yAxis: {
    name: "",
    minInterval: 1,
    type: "value",
    // interval: 0.25,
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      // padding: [10, -8, 18, 0],
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 0, color: "rgba(116, 199, 255, 1)" },
          { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      barGap: "-100%",
      data: [7, 8, 1, 9, 6, 4, 0, 1, 3],
    },
  ],
};
// 网络舆情弹窗  街道舆情
export const streetSentiment = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        // backgroundColor: "rgba(103, 236, 240, 1)",
      },
    },
  },
  grid: {
    top: "10px",
    left: "35px",
    right: "0",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      lineHeight: 18,
      interval: 0,
      formatter: function (value) {
        let name = "";
        if (value.includes("街道")) {
          name = value.replace("街道", "");
        } else {
          name = value;
        }
        if (name.length > 5) {
          name = name.slice(0, 3);
        }
        return name;
      },
    },
    data: [
      "全泉",
      "天回镇",
      "五块石",
      "抚琴",
      "驷马桥",
      "西华",
      "沙河源",
      "西安路",
      "茶店子",
      "营门口",
      "凤凰山",
      "荷花池",
    ],
  },
  yAxis: {
    name: "",
    type: "value",
    // interval: 0.25,
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      // padding: [10, -8, 18, 0],
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 0, color: "rgba(116, 199, 255, 1)" },
          { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      barGap: "-100%",
      data: [7, 8, 1, 9, 6, 4, 0, 1, 3, 4, 1, 4],
    },
  ],
};
// 各街道/社区电梯数量分布
export const elevatorNum = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        // backgroundColor: "rgba(103, 236, 240, 1)",
      },
    },
  },
  grid: {
    top: "10px",
    left: "50px",
    right: "0",
    bottom: "45px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      lineHeight: 18,
      interval: 0,
      rotate: 30,
      formatter: function (value) {
        let name = "";
        if (value.includes("街道")) {
          name = value.replace("街道", "");
        } else {
          name = value;
        }
        if (name.length > 5) {
          name = name.slice(0, 3);
        }
        return name;
      },
    },
    data: [
      "全泉",
      "天回镇",
      "五块石",
      "抚琴",
      "驷马桥",
      "西华",
      "沙河源",
      "西安路",
      "茶店子",
      "营门口",
      "凤凰山",
      "荷花池",
    ],
  },
  yAxis: {
    name: "",
    type: "value",
    // interval: 0.25,
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      // padding: [10, -8, 18, 0],
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 8,
      maxValueSpan: 8,
    },
  ],
  series: [
    {
      type: "bar",
      showBackground: true,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 0, color: "rgba(116, 199, 255, 1)" },
          { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      barGap: "-100%",
      data: [7, 8, 1, 9, 6, 4, 0, 1, 3, 4, 1, 4],
    },
  ],
};
// 合格率1
export const percentOfPass1 = {
  color: ["#8ED4FF", "#EE2222", "#E49C65", "#E16868"],
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 24,
    },
    // formatter: "{a} <br/>{b} : {c} ({d}%)"   //鼠标放上去 展示内容
    formatter: "{b} : {d}%", //鼠标放上去 展示内容
  },
  legend: {
    show: false,
    orient: "vertical",
    left: 300,
    right: "0",
    top: "center",
    itemWidth: 10,
    itemHeight: 10,
    data: ["优", "良", "轻度污染", "严重污染"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      data: [
        {
          value: "56%",
          name: "优",
        },
        {
          value: 107,
          name: "良",
        },
        {
          value: 56,
          name: "轻度污染",
        },
        {
          value: 18,
          name: "严重污染",
        },
      ],
      radius: "80%",
    },
  ],
};
// 合格率2
export const percentOfPass2 = {
  color: ["#8ED4FF", "#EE2222", "#E49C65", "#E16868"],
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 24,
    },
    formatter: "{b} : {d}%", //鼠标放上去 展示内容
  },
  legend: {
    show: false,
    orient: "vertical",
    left: 300,
    right: "0",
    top: "center",
    itemWidth: 10,
    itemHeight: 10,
    data: ["优", "良", "轻度污染", "严重污染"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      data: [
        {
          value: "56%",
          name: "优",
        },
        {
          value: 107,
          name: "良",
        },
        {
          value: 56,
          name: "轻度污染",
        },
        {
          value: 18,
          name: "严重污染",
        },
      ],
      radius: "80%",
    },
  ],
};
// 合格率3
export const percentOfPass3 = {
  color: ["#8ED4FF", "#EE2222", "#E49C65", "#E16868"],
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 24,
    },
    formatter: "{b} : {d}%", //鼠标放上去 展示内容
  },
  legend: {
    show: false,
    orient: "vertical",
    left: 300,
    right: "0",
    top: "center",
    itemWidth: 10,
    itemHeight: 10,
    data: ["优", "良", "轻度污染", "严重污染"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      data: [
        {
          value: "56%",
          name: "优",
        },
        {
          value: 107,
          name: "良",
        },
        {
          value: 56,
          name: "轻度污染",
        },
        {
          value: 18,
          name: "严重污染",
        },
      ],
      radius: "80%",
    },
  ],
};
export const distributeOfMedicalGroup_age = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    show: false,
  },
  grid: {
    top: 40,
    left: "2%",
    right: "4%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [
        "18岁以下",
        "18-29岁",
        "30-39岁",
        "40-49岁",
        "50-59岁",
        "60-64岁",
        "65岁以上",
      ],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        // rotate: 45,
        textStyle: {
          fontSize: 18,
          color: "#FFFFFF",
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  series: [
    {
      type: "bar",
      showBackground: true,
      emphasis: {
        focus: "series",
      },
      backgroundStyle: {
        color: "#CFE4ED",
        opacity: 0.08,
      },
      barWidth: 12,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #74C7FF 0%, #FFFFFF 0%, #74C7FF 0%, #F2F7FF 0%, #74C7FF 0%, rgba(172,229,255,0.15) 100%)",
        },
      },
      data: [13, 34, 10, 11, 12, 60, 70],
    },
  ],
};
// 药品人群性别分布
export const distributeOfMedicalGroup_gender = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["男性", "女性"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#BCDBE8",
      fontSize: 18,
      fontFamily: "PingFang SC",
      fontWeight: 500,
    },
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 17,
    show: true,
  },
  grid: {
    top: 40,
    left: "2%",
    right: "4%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [
        "18岁以下",
        "18-29岁",
        "30-39岁",
        "40-49岁",
        "50-59岁",
        "60-64岁",
        "65岁以上",
      ],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        // rotate: 45,
        textStyle: {
          fontSize: 18,
          color: "#FFFFFF",
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  series: [
    {
      name: "男性",
      type: "bar",
      showBackground: false,
      emphasis: {
        focus: "series",
      },
      barWidth: 12,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #EDC267 0%, #74C7FF 0%, #F4C986 0%, #74C7FF 0%, #3ADFE9 0%, rgba(86,217,236,0.15) 100%)",
        },
      },
      data: [13, 34, 10, 11, 12, 60, 70],
    },
    {
      name: "女性",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      barWidth: 12,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(139, 255, 187, 0.82)",
            },
            {
              offset: 1,
              color: "rgba(132, 255, 187, 0)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #3ADFE9 0%, rgba(86,217,236,0.15) 100%)",
        },
      },
      data: [42, 62, 88, 24, 10, 60, 70],
    },
  ],
};
//空气质量-相关诉求趋势
export const airAppeal = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
  },
  legend: {
    orient: "horizontal",
    x: "center",
    y: "top",
    textStyle: {
      color: "rgba(192, 211, 229, 1)",
      fontWeight: 500,
      fontFamily: "PingFang SC",
      fontSize: 18,
    },
  },
  grid: {
    top: "35px",
    left: "50px",
    right: "40px",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: true,
    },
    axisLine: {
      show: true,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      /*    interval: 0, */
    },
    data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
  },
  yAxis: {
    minInterval: 1,
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      smooth: true,
      type: "line",
      symbol: "none",

      symbolSize: 12,
      areaStyle: {
        opacity: 0.3,
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(255, 191, 143, 0.8)", // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: "rgba(255, 191, 143, 0.1)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
      itemStyle: {
        normal: {
          color: "rgba(255, 191, 143, 1)", //改变折线点的颜色
          lineStyle: {
            color: "rgba(255, 191, 143, 0.8)", //改变折线颜色
          },
        },
      },
      name: "2022",
      data: [20, 40, 30, 60, 40, 50, 20],
    },
    /*  {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "rgba(103, 170, 240, 1)",
      },
      name: "2011",
      data: [100, 40, 60, 20, 10, 80, 40],
    }, */
  ],
};
//空气质量-诉求街道分布
export const airAppealTrend = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  grid: {
    top: 50,
    left: "0%",
    right: "4%",
    bottom: "0%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["一月", "二月", "三月", "四月", "五月", "六月"],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
      },
      axisLabel: {
        interval: 0, //设置间隔为0
        textStyle: {
          fontSize: 18,
          color: "#FFFFFF",
        },
        /*  formatter: function(value) {
          return value.slice(0, 2);
        }, */
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,

      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
          type: "dashed",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      nameTextStyle: {
        fontSize: 18,
        color: "rgba(192, 211, 229, 1)",
      },
      axisLabel: {
        formatter: "{value}",

        textStyle: {
          fontSize: 18,
        },
      },
      /* min: function(value) {
        return value.min;
      }, */
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 13,
      maxValueSpan: 13,
    },
  ],
  series: [
    {
      type: "bar",
      showBackground: true,
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
            {
              offset: 0,
              color: "rgba(28, 151, 233, 1)",
            },
            {
              offset: 1,
              color: "rgba(86, 192, 236, 0.15)",
            },
          ]),
          backgroundColor:
            "linear-gradient(0deg, #74C7FF 0%, #FFFFFF 0%, #74C7FF 0%, #F2F7FF 0%, #74C7FF 0%, rgba(172,229,255,0.15) 100%)",
        },
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      data: [13, 34, 10, 11, 12, 60, 70, 92],
    },
  ],
};
//空气质量-相关诉求趋势
export const airOpinions = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
  },
  legend: {
    orient: "horizontal",
    x: "center",
    y: "top",
    textStyle: {
      color: "rgba(192, 211, 229, 1)",
      fontWeight: 500,
      fontFamily: "PingFang SC",
      fontSize: 18,
    },
  },
  grid: {
    top: "35px",
    left: "100px",
    right: "40px",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: true,
    },
    axisLine: {
      show: true,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
    data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      smooth: true,
      type: "line",
      symbol: "none",
      symbolSize: 12,
      areaStyle: {
        opacity: 0.3,
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147, 255, 254, 0.8)", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(147, 255, 254, 0.1)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
      itemStyle: {
        normal: {
          color: "rgba(147, 255, 254, 1)", //改变折线点的颜色
          lineStyle: {
            color: "rgba(147, 255, 254, 0.5)", //改变折线颜色
          },
        },
      },
      name: "2022",
      data: [40, 50, 40, 30, 60, 80, 20],
    },
    /*  {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "rgba(103, 170, 240, 1)",
      },
      name: "2011",
      data: [100, 40, 60, 20, 10, 80, 40],
    }, */
  ],
};
//空气质量-舆情Top5饼图
export const airOpinionsPIE = {
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 18,
    },
  },
  color: ["#59FF84", "#8ED4FF", "#E16868", "#AFFFFE", "#FFAF71"],
  legend: {
    type: "scroll",
    orient: "vertical",
    left: 244,
    top: 0,
    itemGap: 25,
    itemWidth: 15,
    itemHeight: 15,

    textStyle: {
      fontSize: 18, //字体大小
      color: "#ffffff", //字体颜色
      rich: {
        labelName: {
          fontSize: 32,
          fontFamily: "Akzidenz-Grotesk BQ Condensed",
          fontWeight: "400",
          color: "#FFFFFF",
          padding: [0, 0, 0, 10],
        },
      },
    },
  },
  series: [
    {
      type: "pie",
      left: "10px",
      radius: ["60%", "70%"],
      center: ["107", "50%"],
      avoidLabelOverlap: false,

      label: {
        formatter: "{c}",
        show: false,
      },

      emphasis: {
        label: {
          show: false,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 25, name: "城市管理" },
        { value: 25, name: "房屋管理" },
        { value: 13, name: "环境保护" },
        { value: 13, name: "涉疫情事件" },
        { value: 24, name: "社情民意" },
      ],
    },
    {
      left: "10px",
      itemStyle: {
        opacity: 0.3,
      },
      radius: ["50%", "60%"],
      center: ["107", "50%"],
      type: "pie",
      colorBy: "data",
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      data: [
        { value: 25, name: "城市管理" },
        { value: 25, name: "房屋管理" },
        { value: 13, name: "环境保护" },
        { value: 13, name: "涉疫情事件" },
        { value: 24, name: "社情民意" },
      ],
    },
  ],
};
//空气质量天数
export const airQuality = {
  color: ["#59FF84", "#8ED4FF", "#E49C65", "#E16868"],
  tooltip: {
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 28,
    },
  },
  legend: {
    orient: "vertical",
    left: 300,
    right: "0",
    top: "center",
    itemWidth: 10,
    itemHeight: 10,
    data: ["优", "良", "轻度污染", "严重污染"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      left: "100",
      radius: ["60%", "70%"],
      center: ["107", "50%"],
      avoidLabelOverlap: false,

      label: {
        formatter: "{c}",
        show: false,
      },

      emphasis: {
        label: {
          show: false,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 25, name: "城市管理" },
        { value: 25, name: "房屋管理" },
        { value: 13, name: "环境保护" },
        { value: 13, name: "涉疫情事件" },
        { value: 24, name: "社情民意" },
      ],
    },
    {
      left: "100",
      itemStyle: {
        opacity: 0.3,
      },
      radius: ["50%", "60%"],
      center: ["107", "50%"],
      type: "pie",
      colorBy: "data",
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      data: [
        { value: 25, name: "城市管理" },
        { value: 25, name: "房屋管理" },
        { value: 13, name: "环境保护" },
        { value: 13, name: "涉疫情事件" },
        { value: 24, name: "社情民意" },
      ],
    },
  ],
};
//数字城管
export const GDPTrend = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["生产总值"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 30,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    show: false,
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 18,
        },
        show: true,
        formatter: function (value) {
          let name = "";
          if (value.includes("街道办事处")) {
            name = value.replace("街道办事处", "");
          } else {
            name = value;
          }
          if (name.length > 5) {
            name = name.slice(0, 3);
          }
          return name;
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
    {
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
    },
  ],
  series: [
    {
      name: "生产总值",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.1500))",
        },
      },
      data: [620, 734, 1090, 1130, 1120],
    },
    {
      name: "生产总值",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 1)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.1500)",
            },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.1500))",
        },
      },
      data: [620, 734, 1090, 1130, 1120],
    },
  ],
};

export const top3GdpPie = {
  color: [
    "#59FF84",
    "#FFAF71",
    "#8ED4FF",
    "#E16868",
    "#0D939E",
    "#57DAF2",
    "#F3E8B7",
  ],
  tooltip: {
    position: ["50%", "0%"],
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 28,
    },
  },
  legend: {
    orient: "vertical",
    left: 147,
    right: "0",
    top: "40%",
    data: ["第一产业", "第二产业", "第三产业"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
    icon: "rect",
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      left: -120,
      data: [
        {
          value: 0.03,
          name: "第一产业",
        },
        {
          value: 145.1,
          name: "第二产业",
        },
        {
          value: 606.3,
          name: "第三产业",
        },
      ],
      radius: ["42%", "50%"],
    },
    {
      itemStyle: {
        opacity: 0.3,
      },
      type: "pie",
      label: {
        show: false,
      },
      left: -120,
      data: [
        {
          value: 0.03,
          name: "第一产业",
        },
        {
          value: 145.1,
          name: "第二产业",
        },
        {
          value: 606.3,
          name: "第三产业",
        },
      ],
      radius: ["35%", "42%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
  ],
};

export const gdpRectTrend = {
  color: ["#4BE4EA", "#F35A6E", "#5DABE9"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    icon: "circle",
    data: ["第一产业", "第二产业", "第三产业"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 30,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    show: true,
  },
  grid: {
    left: "2%",
    right: "1%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["20年12月", "21年6月", "21年12月", "22年3月", "22年6月"],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 18,
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,

      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(86, 98, 110, 0.4)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          textStyle: {
            textAlign: "center",
          },
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
    {
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
    },
  ],
  series: [
    {
      name: "第一产业",
      data: [2.5, 5.7, 10.1, 7.1, 5.8],
      type: "line",
    },
    {
      name: "第二产业",
      data: [7.1, 9.3, 8.5, 3.4, 3.4],
      type: "line",
    },
    {
      name: "第三产业",
      data: [1.6, 11.8, 6.9, 2.9, 0.7],
      type: "line",
    },
  ],
};
//数字城管-突出问题-圆环
export const top3newGdpPie = {
  color: ["#59FF84", "#FFAF71", "#8ED4FF"],
  tooltip: {
    position: ["50%", "0%"],
    trigger: "item",
    show: true,
    textStyle: {
      color: "#fff",
      fontSize: 28,
    },
  },
  legend: {
    orient: "vertical",
    left: 147,
    right: "0",
    top: "middle",
    data: ["第一产业", "第二产业", "第二产业"],
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },

    formatter: function (value) {
      return value.length > 4 ? value.slice(0, 4) : value;
    },
    icon: "rect",
  },
  series: [
    {
      type: "pie",
      label: {
        show: false,
      },
      left: -100,
      data: [
        {
          value: 0.03,
          name: "第一产业",
        },
        {
          value: 145.1,
          name: "第二产业",
        },
        {
          value: 606.3,
          name: "第三产业",
        },
      ],
      radius: ["42%", "50%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
    {
      itemStyle: {
        opacity: 0.3,
      },
      type: "pie",
      label: {
        show: false,
      },
      left: -100,
      data: [
        {
          value: 0.03,
          name: "第一产业",
        },
        {
          value: 145.1,
          name: "第二产业",
        },
        {
          value: 606.3,
          name: "第三产业",
        },
      ],
      radius: ["35%", "42%"],
      color: ["#59FF84", "#FFAF71", "#8ED4FF"],
    },
  ],
};

//数字城管-突出问题-柱状
export const GDPnewTrend = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "none",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["立案事件数", "待处置事件数"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 30,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
    show: true,
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "value",

      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          fontSize: 18,
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        // 分割线配置
        lineStyle: {
          color: "#56626E",
        },
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      data: ["施工管理", "街面秩序", "宣传广告", "市容环境"],
      minInterval: 1,
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
        formatter: function (value) {
          return value.length > 4 ? value.slice(0, 4) : value;
        },

        margin: 20,
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
      zoomOnMouseWheel: true,
      orient: "vertical",
    },
  ],
  series: [
    {
      name: "立案事件数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: "rgba(139, 255, 187, 0.95)",
            },
            {
              offset: 1,
              color: "rgba(132, 255, 187, 0.7)",
            },
          ]),
        },
      },
      data: [12, 15, 8, 12],
    },
    {
      name: "待处置事件数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: "rgba(116, 199, 255, 0.95)",
            },
            {
              offset: 1,
              color: "rgba(172, 229, 255, 0.7)",
            },
          ]),
        },
      },
      data: [5, 7, 7, 5],
    },
  ],
};
// 餐饮企业街道分布
export const streetFood = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        // backgroundColor: "rgba(103, 236, 240, 1)",
      },
    },
  },
  grid: {
    top: "10px",
    left: "50px",
    right: "0",
    // bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
      lineHeight: 18,
      interval: 0,
      rotate: 35,
      formatter: function (value) {
        let name = "";
        if (value.includes("街道")) {
          name = value.replace("街道", "");
        } else {
          name = value;
        }
        if (name.length > 5) {
          name = name.slice(0, 3);
        }
        return name;
      },
    },
    data: [],
  },
  yAxis: {
    name: "",
    type: "value",
    // interval: 0.25,
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      // padding: [10, -8, 18, 0],
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      barWidth: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 0, color: "rgba(116, 199, 255, 1)" },
          { offset: 1, color: "rgba(172, 229, 255, 0.15)" },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(103, 236, 240, .8)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, .2)",
          },
        ]),
      },
      barGap: "-100%",
      data: [],
    },
  ],
};
//油烟投诉趋势
export const lampblack = {
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    orient: "horizontal",
    x: "right",
    y: "top",
    textStyle: {
      color: "rgba(192, 211, 229, 1)",
      fontWeight: 500,
      fontFamily: "PingFang SC",
      fontSize: 18,
    },
  },
  grid: {
    top: "35px",
    left: "50px",
    right: "0",
    bottom: "35px",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
    // data: ["8.11", "8.12", "8.13", "8.14", "8.15", "8.16", "8.17"],
    data: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "rgba(86, 98, 110, 1)",
      },
    },
    nameTextStyle: {
      fontSize: 18,
      color: "rgba(192, 211, 229, 1)",
    },
    axisLabel: {
      color: "rgba(192, 211, 229, 1)",
      fontSize: 18,
      opacity: 1,
    },
  },
  series: [
    {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "#62AAF5",
      },
      // name: "2020",
      data: [12, 4, 5, 15, 22, 12, 18],
      areaStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#62AAF5", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(225,225,225,0)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
    },
    {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: " #65EAEE",
      },
      // name: "2021年",
      data: [7, 4, 5, 2, 4, 9, 10],
      areaStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#65EAEE", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(225,225,225,0)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
    },
    {
      type: "line",
      symbol: "circle",
      symbolSize: 12,
      itemStyle: {
        color: "#F09767",
      },
      // name: "2022年",
      data: [7, 4, 5, 2, 4, 9, 10],
      areaStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#F09767", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(225,225,225,0)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
    },
  ],
};
// 餐饮企业监控级别
export const miniteringOfCateringEnterprecies = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: 230,
    left: 10,
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      type: "pie",
      radius: ["50", "90"],
      center: ["100", "130"], //饼图x,y定位
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 3,
        borderColor: "#113249",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "left",
      },
      emphasis: {
        label: {
          show: false,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 148, name: "分类1" }, //#59FF84
        { value: 735, name: "分类2" }, //#FFAF71
        { value: 580, name: "分类3" }, //#8ED4FF
      ],
      color: [
        "#59FF84",
        "#FFAF71",
        "#8ED4FF",
        "#E16868",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
    },
  ],
};
// 餐饮企业类型分布
export const distributeOfCateringType = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    itemGap: 20,
    // bottom: 0,
    top: 230,
    left: 30,
    textStyle: {
      color: "#FFF",
      fontSize: 20,
      fontFamily: "PingFang SC",
    },
  },
  series: [
    {
      // name: "Access From",
      type: "pie",
      radius: ["50", "90"],
      center: ["100", "130"], //饼图x,y定位
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 3,
        borderColor: "#113249",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "left",
      },
      emphasis: {
        label: {
          show: false,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
      color: [
        "#59FF84",
        "#FFAF71",
        "#8ED4FF",
        "#E16868",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
    },
  ],
};

// 全年达标率
export const QNDBL = {
  title: {
    text: "",
    top: "25",
    x: "center",
    y: "top",
    textAlign: "left",
    textStyle: {
      color: "#FFFFFF",
      fontSize: 26,
      fontFamily: "Akzidenz-Grotesk BQ Condensed",
      // textAlign: "center",
    },
  },
  /*  legend: {
    top: "5%",
    left: "center",
  }, */
  color: [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: "#7CAEBF" },
      { offset: 1, color: "#7CAEBF" },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: "RGBA(9, 24, 39, 0)" },
      { offset: 1, color: "RGBA(9, 24, 39, 0)" },
    ]),
  ],
  series: [
    {
      type: "pie",
      radius: ["70%", "80%"],
      center: ["50%", "50%"],
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
};

//街道事件分析
export const eventAnalysis = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["当日事件数", "退单数", "督办催办"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 16,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    // top:'10%',
    left: "2%",
    right: "1%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["驷马桥", "营门口", "凤凰山", "茶店子", "金泉"],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        /* rotate: 70, */
        textStyle: {
          fontSize: 16,
          color: 'rgba(188, 219, 232, 0.8)'
        },
        show: true,
        formatter: function(value) {
          return value.length > 3 ? value.slice(0, 3) : value;
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(74, 106, 132, 0.6)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      splitNumber: 3,
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
          color: 'rgba(188, 219, 232, 0.8)'
        },
      },
    },
    {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      splitNumber: 3,
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
      maxValueSpan: 5,
    },
  ],
  series: [
    {
      name: "当日事件数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(9, 205, 207, 0.82)" },
            { offset: 1, color: "rgba(9, 185, 206, 0)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.1500))",
        },
      },
      data: [620, 734, 1090, 1130, 1120],
    },
    {
      name: "退单数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 105, 82, 1)" },
            { offset: 1, color: "rgba(255, 105, 82, 1)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(255, 105, 82, 1), rgba(255, 105, 82, 1))",
        },
      },
      data: [120, 132, 101, 290, 220],
    },
    {
      name: "督办催办",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 188, 84, 1)" },
            { offset: 1, color: "rgba(255, 188, 84, 1)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(255, 188, 84, 1), rgba(255, 188, 84, 1))",
        },
      },
      data: [60, 72, 190, 130, 110],
    },
  ],
};

//委办局事件分析
export const commissionBureau = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      color: "#E0F3FF",
      fontSize: 30,
    },
  },
  legend: {
    data: ["当日事件数", "退单数", "督办催办"],
    // selectedMode: false, // 是否允许点击
    textStyle: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    top: 16,
    right: "4%",
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    // top:'10%',
    left: "2%",
    right: "1%",
    bottom: "1%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["驷马桥", "营门口", "凤凰山", "茶店子", "金泉"],
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
          // backgroundColor: "linearGradient(180deg, #4A6A84, #4A6A84)", //'#4A6A84'
        },
      },
      axisLabel: {
        interval: 0,
        /* rotate: 70, */
        textStyle: {
          fontSize: 16,
          color: 'rgba(188, 219, 232, 0.8)'
        },
        show: true,
        formatter: function(value) {
          return value.length > 3 ? value.slice(0, 3) : value;
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      minInterval: 1,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(74, 106, 132, 0.6)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#E0F3FF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      splitNumber: 3,
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
          color: 'rgba(188, 219, 232, 0.8)'
        },
      },
    },
    {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: "#FFFFFF",
        },
        show: false, //隐藏y轴
      },
      axisTick: {
        show: false, //不显示坐标轴刻度
      },
      splitNumber: 3,
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 18,
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      minValueSpan: 5,
    },
  ],
  series: [
    {
      name: "当日事件数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(9, 205, 207, 0.82)" },
            { offset: 1, color: "rgba(9, 185, 206, 0)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(116, 199, 255, 1), rgba(172, 229, 255, 0.1500))",
        },
      },
      data: [620, 734, 1090, 1130, 1120],
    },
    {
      name: "退单数",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 105, 82, 1)" },
            { offset: 1, color: "rgba(255, 105, 82, 1)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(255, 105, 82, 1), rgba(255, 105, 82, 1))",
        },
      },
      data: [120, 132, 101, 290, 220],
    },
    {
      name: "督办催办",
      type: "bar",
      stack: "Search Engine",
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 188, 84, 1)" },
            { offset: 1, color: "rgba(255, 188, 84, 1)" },
          ]),
          backgroundColor:
            "linear-gradient(180deg, rgba(255, 188, 84, 1), rgba(255, 188, 84, 1))",
        },
      },
      data: [60, 72, 190, 130, 110],
    },
  ],
};