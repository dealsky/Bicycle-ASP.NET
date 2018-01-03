﻿var bicycleTable;

$(document).ready(function () {

    bicycleTable = new Vue({
        el: "#adminTable",
        data: {
            bicycles: ""
        },
        mounted: function () {
            $.ajax({
                url: "/Admin/GetBicycleTable",
                type: "post",
                dataType: "json",
                success: function (data) {
                    data = eval("(" + data + ")");
                    bicycleTable.bicycles = data;
                    createTable(bicycleTable);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
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
                field: 'module_park',
                title: '停靠站点',
                formatter: function (value) {
                    if (value.length != 0) {
                        return value[0].SiteName;
                    } else {
                        return "";
                    }
                },
                searchable: false
            },
            {
                field: 'module_rented',
                title: '租借者',
                formatter: function (value) {
                    if (value.length != 0) {
                        for(var obj of value) {
                            if (obj.RentStatus === 1) {
                                return obj.UserName;
                            }
                        }
                        return "";
                    } else {
                        return "";
                    }
                },
                searchable: false
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
                    var date = new Date(value);
                    var month = date.getMonth() + 1;
                    return date.getFullYear() + "-" + month + "-" + date.getDate();
                }
            }
        ],
        data: bicycleTable.bicycles,
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
        height: 450,
        onEditableSave: function (field, row, oldValue, $el) {
            if (field === "bicycle.bicrentprice") {
                row.bicycle.bicrentprice = row[field];
            } else if (field === "bicycle.bictype") {
                row.bicycle.bictype = row[field];
            }
            $.ajax({
                type: "POST",
                url: "/Bicycle/Administer/EditBicycle.do",
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(row.bicycle),
                success: function (data) {
                    var opt = {
                        url: "/Bicycle/Administer/TableBicycle.do",
                        silent: true,
                        query: {
                            type: 1,
                            level: 2
                        }
                    };
                    $('#BicycleTable').bootstrapTable('refresh', opt);
                    alert("修改成功！");
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
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
            error: function (xhr) {
                console.log(xhr.responseText);
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
                        data = eval("(" + data + ")");
                        bicycleTable.bicycles = data;
                        createTable(bicycleTable);
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
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
                    $.growl.notice({
                        title: "成功",
                        message: "删除成功!"
                    });
                    $.ajax({
                        url: "/Admin/GetBicycleTable",
                        type: "post",
                        dataType: "json",
                        success: function (data) {
                            data = eval("(" + data + ")");
                            bicycleTable.bicycles = data;
                            createTable(bicycleTable);
                        },
                        error: function (xhr) {
                            console.log(xhr.responseText);
                        }
                    });
                },
                error: function (xhr) {
                    console.log(xhr.responseText)
                }
            });
        }
    } else {
        $.growl.error({
            title: "失败",
            message: "删除失败!"
        });
    }
}