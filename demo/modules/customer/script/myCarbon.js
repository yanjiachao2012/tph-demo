//id--存放id,number--总量，typeTitle--标题,type1Number--上面那个碳币类型,type2Number--下面那个碳币类型
function showData(id, number, typeTitle, type1Number, type2Number, colorType) {
    if (colorType == '0') {
        var color = ["#22c6b8", "#9eda49"],
            nameUP = '系统发放',
            nameDown = '他人赠送';
    } else if (colorType == "1") {
        var color = ["#f5843d", "#46c848"],
            nameUP = '消费',
            nameDown = '赠送';
    }

    //格式化内部数字显示
    var labelFromatter = {
        normal: {
            lineLine: {
                show: false
            },
            label: {
                formatter: function(params) {
                    return params.value
                },
                show: false
            }
        }
    };
    //去除标识线
    var labelLine = {
        normal: {
            labelLine: {
                show: false
            }
        }
    }
    var radius = [52, 68]; //圆形大小
    optionIncome = {
        legend: {
            show: false,
            data: [
                '系统发放', '他人赠送'
            ]
        },
        title: {
            x: 'center',
            y: 'center',
            text: number,
            subtext: typeTitle,
            textStyle: {
                color: '#24b026',
                fontSize: 30,
                fontWeight: 'normal'
            }
        },
        toolbox: {
            show: false //是否显示保存图片按钮
        },
        color: color,
        series: [{
            type: 'pie',
            center: ['50%', '50%'], //位置
            radius: radius,
            x: '0%', // for funnel
            itemStyle: labelFromatter,
            data: [{
                name: nameUP,
                value: type1Number,
                itemStyle: labelLine
            }, {
                name: nameDown,
                value: type2Number,
                itemStyle: labelLine
            }],
        }]
    };
    var income = echarts.init(document.getElementById(id));
    income.setOption(optionIncome);
}
showData('income', '8400', '累计收入碳币', '5000', '3400', '0')
showData('payCarbon', '15000', '累计支出碳币', '10000', '5000', '1')