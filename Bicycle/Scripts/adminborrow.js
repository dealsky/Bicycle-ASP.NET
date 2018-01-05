$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        url: "/Admin/GetBorrowTable",
        type: "post",
        DataType: "json",
        success: function (data) {
            data = eval("(" + data + ")");
            createTable(data);
        },
        error: function () {
            console.log("ajax error");
        }
    });
}

function createTable(data) {
    $("#borrowTable").bootstrapTable({
        columns: [
            {
                field: "RentId",
                title: "编号",
                sortable: true
            },
            {
                field: "BicId",
                title: "自行车编号",
                sortable: true
            },
            {
                field: "BicType",
                title: "自行车型号",
                sortable: true
            },
            {
                field: "UserName",
                title: "租借者",
                sortable: true
            },
            {
                field: "RentStatus",
                title: "租借状态",
                sortable: true,
                formatter: function (value) {
                    if (value === 0) {
                        return "已还";
                    } else {
                        return "未还";
                    }
                }
            },
            {
                field: "RentPrice",
                title: "费用",
                sortable: true
            },
            {
                field: "RentBowTime",
                title: "借车时间",
                sortable: true,
                formatter: function (value) {
                    return moment(value).format("YYYY-MM-DD hh:mm:ss");
                }
            },
            {
                field: "RentRenTime",
                title: "还车时间",
                sortable: true,
                formatter: function (value) {
                    if (value) {
                        return moment(value).format("YYYY-MM-DD hh:mm:ss");
                    } else {
                        return "";
                    }
                }
            }
        ],
        data: data,
        striped: false,
        pagination: true,
        sidePagination: 'client',
        pageList: [5, 10, 20, 50],
        search: true,
        showRefresh: true,
        showToggle: true,
        clickToSelect: true,
        paginationLoop: false,
        paginationPreText: "前一页",
        paginationNextText: "后一页",
        height: 450
    });
}