var bicycleTable;

$(document).ready(function () {

    bicycleTable = new Vue({
        el: "#adminTable",
        data: {
            bicycles: "",
            flag1: "ok",
            flag2: "ok"
        },
        mounted: function () {
            $.ajax({
                url: "/Admin/GetBicycleTable",
                type: "post",
                dataType: "json",
                success: function (data) {
                    bicycleTable.bicycles = data;
                    createTable(bicycleTable);
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        methods: {
            updataTable: function () {
                var arr = ($('#BicycleTable').bootstrapTable('getSelections'));
                if (arr.length === 1) {
                    if (arr[0].BicBorrowed === 0) {
                        $("#BicId").text(arr[0].BicId);
                        $("#Type").val(arr[0].BicType);
                        $("#Price").val(arr[0].BicRentPrice);
                        $("#Site").val(arr[0].SiteId);
                        $('#modalUpdataTable').modal('show');
                    } else {
                        $.growl.error({
                            title: "失败",
                            message: "无法修改处于租用状态的自行车!"
                        });
                    }
                } else {
                    $.growl.error({
                        title: "失败",
                        message: "请选择一项进行修改!"
                    });
                }
            },
            changeType: function (e) {
                var text = e.target.value;
                if (text.length > 0 && text.length < 10) {
                    $("#bicTypeG").addClass("has-success");
                    $("#bicTypeG").removeClass("has-error");
                    $("#bicTypeG .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
                    this.flag1 = "ok";
                } else {
                    $("#bicTypeG").addClass("has-error");
                    $("#bicTypeG").removeClass("has-success");
                    $("#bicTypeG .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
                        "                                <span class=\"error-message\">类型名太长或太短</span>");
                    this.flag1 = "error";
                }
            },
            changePrice: function (e) {
                var text = e.target.value;
                if (!isNaN(text)) {
                    $("#bicPriceG").addClass("has-success");
                    $("#bicPriceG").removeClass("has-error");
                    $("#bicPriceG .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
                    this.flag2 = "ok";
                } else {
                    $("#bicPriceG").addClass("has-error");
                    $("#bicPriceG").removeClass("has-success");
                    $("#bicPriceG .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
                        "                                <span class=\"error-message\">输入必须为数字</span>");
                    this.flag2 = "error";
                }
            },
            saveChanges: function () {
                var bicId = $("#BicId").text();
                var bicType = $("#Type").val();
                var bicPrice = $("#Price").val();
                
                if (this.flag1 === "ok" && this.flag2 === "ok") {
                    $.ajax({
                        url: "/Admin/UpdataBicycle",
                        type: "post",
                        dataType: "json",
                        data: {
                            bicId: bicId,
                            bicType: bicType,
                            bicPrice: bicPrice
                        },
                        success: function (data) {
                            if (data === "ok") {
                                $('#modalUpdataTable').modal('hide');
                                $.growl.notice({
                                    title: "成功",
                                    message: "修改成功"
                                });
                                $.ajax({
                                    url: "/Admin/GetBicycleTable",
                                    type: "post",
                                    dataType: "json",
                                    success: function (data) {
                                        bicycleTable.bicycles = data;
                                        createTable(bicycleTable);
                                    },
                                    error: function () {
                                        console.log("ajax error");
                                    }
                                });
                            } else {
                                console.log("error");
                            }
                        },
                        error: function (xhr) {
                            console.log("ajax error");
                        }
                    });
                } else {
                    $.growl.error({
                        title: "错误",
                        message: "请处理错误!"
                    });
                }
            }
        }
    });

    $("#addTableConfirm").bind("click", addTable);
    $("#delete-table").bind("click", deleteTable);

    $(".close").bind("click", clearForm);
    $("#bic-type").bind("change", typeJudge);
    $("#bic-price").bind("change", priceJudge);
    $("#bic-site").bind("change", siteJudge);
    $("#bic-time").bind("change", timeJudge);

});

function createTable(bicycleTable) {

    $("#BicycleTable").bootstrapTable("destroy");

    var table = $('#BicycleTable').bootstrapTable({
        columns: [
            {
                fileid: 'BicId',
                checkbox: true
            },
            {
                field: 'BicId',
                title: '编号',
                sortable: true
            },
            {
                field: 'BicType',
                title: '类型',
                sortable: true,
                editable: {
                    type: "text",
                    title: "类型",
                    width: "10%",
                    align: "right",
                    validate: function (v) {
                        if (!v) {
                            return "不能为空";
                        }
                    }
                }
            },
            {
                field: 'BicRentPrice',
                title: '价格/(小时)',
                sortable: true,
                editable: {
                    type: "text",
                    title: "价格/(小时)",
                    width: "10%",
                    align: "center",
                    validate: function (v) {
                        if (!v)
                            return "不能为空";
                        if (isNaN(v))
                            return "输入必须为数字";
                    }
                }
            },
            {
                field: 'SiteName',
                title: '停靠站点',
                sortable: true,
                formatter: function (value) {
                    if (value != null) {
                        return value;
                    } else {
                        return "---";
                    }
                },
            },
            {
                field: 'UserName',
                title: '租借者',
                sortable: true,
                formatter: function (value) {
                    if (value != null) {
                        return value;
                    } else {
                        return "---";
                    }
                },
            },
            {
                field: 'BicBorrowed',
                title: '借还状态',
                sortable: true,
                formatter: function (value) {
                    if (value === 1) {
                        return "被借";
                    } else {
                        return "没被借";
                    }
                }
            },
            {
                field: 'BicBorrowedCount',
                title: '被借次数',
                sortable: true
            },
            {
                field: 'BicBuytime',
                title: '购买时间',
                sortable: true,
                formatter: function (value) {
                    return moment(value).format("YYYY-MM-DD");
                }
            }
        ],
        data: bicycleTable.bicycles,
        striped: false,
        pagination: true,
        sidePagination: 'client',
        pageList: [5, 10, 20, 50],
        search: true,
        //showRefresh: true,
        showToggle: true,
        clickToSelect: true,
        paginationLoop: false,
        paginationPreText: "前一页",
        paginationNextText: "后一页",
        height: 450
    });
}

var flag = [false, false, false, false];

function typeJudge() {
    var text = $("#bic-type").val();
    if (text.length > 0 && text.length < 10) {
        $("#bicType").addClass("has-success");
        $("#bicType").removeClass("has-error");
        $("#bicType .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
        flag[0] = true;
    } else {
        $("#bicType").addClass("has-error");
        $("#bicType").removeClass("has-success");
        $("#bicType .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
            "                                <span class=\"error-message\">类型名太长或太短</span>");
        flag[0] = false;
    }
    ableButton();
}

function priceJudge() {
    var text = $("#bic-price").val();
    if (!isNaN(text)) {
        $("#bicPrice").addClass("has-success");
        $("#bicPrice").removeClass("has-error");
        $("#bicPrice .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
        flag[1] = true;
    } else {
        $("#bicPrice").addClass("has-error");
        $("#bicPrice").removeClass("has-success");
        $("#bicPrice .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
            "                                <span class=\"error-message\">输入必须为数字</span>");
        flag[1] = false;
    }
    ableButton();
}

function siteJudge() {
    var text = $("#bic-site").val();
    if (text.length === 0) {
        $("#bicSite").addClass("has-error");
        $("#bicSite").removeClass("has-success");
        $("#bicSite .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
            "                                <span class=\"error-message\">输入不能为空</span>");
        flag[2] = false;
    } else if (!isNaN(text)) {
        $.ajax({
            url: "/Admin/JudgeSite",
            type: "POST",
            dataType: "json",
            data: { siteId: text },
            async: false,
            success: function (data) {
                if (data.errorLog === "right") {
                    $("#bicSite").addClass("has-success");
                    $("#bicSite").removeClass("has-error");
                    $("#bicSite .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
                    flag[2] = true;
                } else {
                    $("#bicSite").addClass("has-error");
                    $("#bicSite").removeClass("has-success");
                    $("#bicSite .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
                        "                                <span class=\"error-message\">该站点不存在</span>");
                    flag[2] = false;
                }
            },
            error: function () {
                console.log("ajax error");
            }
        });
    } else {
        $("#bicSite").addClass("has-error");
        $("#bicSite").removeClass("has-success");
        $("#bicSite .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
            "                                <span class=\"error-message\">该站点不存在</span>");
        flag[2] = false;
    }
    ableButton();
}

function clearForm() {
    $("#modalAddTable .form-group").each(function () {
        $(this).removeClass("has-success");
        $(this).removeClass("has-error");

        $(this).find("input").val("");
        $(this).find(".feed-back").html("");
        $("#addTableConfirm").attr("disabled", true);
        flag = [false, false, false, false];
    });
}

function timeJudge() {
    var text = $("#bic-time").val();
    if (text !== "") {
        $("#bicTime").addClass("has-success");
        $("#bicTime").removeClass("has-error");
        $("#bicTime .feed-back").html("<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>");
        flag[3] = true;
    } else {
        $("#bicTime").addClass("has-error");
        $("#bicTime").removeClass("has-success");
        $("#bicTime .feed-back").html("<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>\n" +
            "                                <span class=\"error-message\">日期不能为空</span>");
        flag[3] = false;
    }
    ableButton();
}

function ableButton() {
    var f = true;
    for (var i = 0; i < flag.length; i++) {
        if (!flag[i]) {
            f = false;
            break;
        }
    }
    if (f) {
        $("#addTableConfirm").attr("disabled", false);
    } else {
        $("#addTableConfirm").attr("disabled", true);
    }
}

function addTable() {
    var bicType = $("#bic-type").val();
    var bicPrice = $("#bic-price").val();
    var siteId = $("#bic-site").val();
    var bicBuyTime = $("#bic-time").val();
    $.ajax({
        url: "/Admin/AddBicycle",
        type: "POST",
        dataType: "json",
        data: {
            bicType: bicType,
            bicPrice: bicPrice,
            siteId: siteId,
            bicBuyTime: new Date(bicBuyTime).getTime()
        },
        success: function (data) {
            if (data.errorLog === "right") {
                $("#modalAddTable").modal('hide');
                $.growl.notice({
                    title: "成功",
                    message: "添加成功!"
                });
                clearForm();
                $.ajax({
                    url: "/Admin/GetBicycleTable",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        bicycleTable.bicycles = data;
                        createTable(bicycleTable);
                    },
                    error: function () {
                        console.log("ajax error");
                    }
                });
            }
        },
        error: function () {
            console.log("ajax error");
        }
    });
    flag = [false, false, false, false];
}

function deleteTable() {
    
    var arr = ($('#BicycleTable').bootstrapTable('getSelections'));
    var flag = 1;
    for(var obj of arr) {
        if (obj.BicBorrowed === 1) {
            flag = 0;
            break;
        }
    }
    if (flag === 1) {
        var array = new Array();
        if (arr.length !== 0) {
            swal({
                title: "你确定要删除吗?",
                //text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    for (var i = 0; i < arr.length; i++) {
                        array.push(arr[i].BicId);
                    }
                    $.ajax({
                        url: "/Admin/RemoveBicycle",
                        type: "post",
                        dataType: "json",
                        traditional: true,
                        data: {
                            arr: array
                        },
                        success: function (data) {
                            swal("成功! 删除成功!", {
                                icon: "success",
                            });
                            $.ajax({
                                url: "/Admin/GetBicycleTable",
                                type: "post",
                                dataType: "json",
                                success: function (data) {
                                    bicycleTable.bicycles = data;
                                    createTable(bicycleTable);
                                },
                                error: function () {
                                    console.log("ajax error");
                                }
                            });
                        },
                        error: function () {
                            console.log("ajax error");
                        }
                    });
                }
            });
        }
    } else {
        $.growl.error({
            title: "失败",
             essage: "删除失败!"
        });
    }
}