$(document).ready(function () {

    var borrowBicycle = new Vue({
        el: "#borrowBicycle",
        data: {
            siteAreas: [],
            siteSelected: "",
            siteNow: "站点名",
            sites: [],
            rentedId: "",
            borrowedBicycle: ""
        },
        mounted: function () {
            $.ajax({
                url: "http://restapi.amap.com/v3/config/district?keywords=%E9%84%9E%E5%B7%9E&subdistrict=1&key=e6f027eef2e8495f71abdecb7e2161f8",
                type: "get",
                dataType: "json",
                success: function (data) {
                    var arr = data.districts[0].districts
                    for(var site of arr) {
                        borrowBicycle.siteAreas.push(site);
                    }
                    
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
            getBorrowedBicycle(this);
            this.siteSelected = "五乡镇";
            this.selectSite();
        },
        methods: {
            selectSite: function () {
                var siteArea = this.siteSelected;
                $.ajax({
                    url: "/User/SelectedSite",
                    type: "post",
                    dataType: "json",
                    data: {
                        siteArea: siteArea
                    },
                    success: function (data) {
                        var arr = [];
                        for(site of data) {
                            arr.push(site);
                        }
                        borrowBicycle.sites = arr;
                        getSiteTable(borrowBicycle);
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            },
            returnBicycle: function () {

                var html = "<input class='form-control' id='returnSite' type='text' placeholder='请输入还车站点编号'/>";

                var d = dialog({
                    title: "还车站点编号",
                    content: html,
                    okValue: '确定',
                    ok: function () {
                        var returnSite = $("#returnSite").val();
                        if (returnSite === "") {
                            $.growl.error({
                                title: "失败",
                                message: "请输入还车站点编号!"
                            });
                            return false;
                        } else {
                            $.ajax({
                                url: "/User/RetuenBicycle",
                                type: "post",
                                dataType: "json",
                                data: {
                                    bicId: borrowBicycle.borrowedBicycle.bicId,
                                    price: borrowBicycle.borrowedBicycle.bicMoney,
                                    siteId: returnSite,
                                    rentId: borrowBicycle.rentedId
                                },
                                success: function (data) {
                                    if (data.log === "ok") {
                                        borrowBicycle.borrowedBicycle = "";
                                        $.growl.notice({
                                            title: "成功",
                                            message: "还车成功!"
                                        });
                                        borrowBicycle.selectSite();
                                    } else if (data.log === "siteNone") {
                                        $.growl.error({
                                            title: "失败",
                                            message: "此站点不存在!"
                                        });

                                    } else if (data.log === "siteOver") {
                                        $.growl.error({
                                            title: "失败",
                                            message: "该站点已经满了!"
                                        });
                                    }
                                },
                                errot: function (xhr) {
                                    console.log(xhr.responseText);
                                }
                            });
                        }
                    },
                    cancelValue: '取消',
                    cancel: function () { }
                });
                d.showModal();
            }
        }
    });

    window.borrowEvent = {
        "click .button": function (e, value, row, index) {
            var arr = [];
            arr.push(row.BicId);
            var d = dialog({
                title: "确认",
                content: "确认要租这辆车吗？",
                okValue: "确定",
                ok: function () {
                    this.title("租借中…");
                    $.ajax({
                        url: "/User/BorrowBicycle",
                        type: "post",
                        dataType: "json",
                        data: {
                            bicId: row.BicId,
                            price: row.BicRentPrice,
                            bicType: row.BicType,
                            parkId: row.ParkId,
                            siteId: row.SiteId
                        },
                        success: function (data) {
                            if (data.log === "ok") {

                                $("#bicycleTable").bootstrapTable("remove", {
                                    field: "BicId",
                                    values: arr
                                });

                                $.growl.notice({
                                    title: "成功",
                                    message: "租车成功!"
                                });
                                borrowBicycle.selectSite();
                                getBorrowedBicycle(borrowBicycle);

                            } else if (data.log === "borrowed") {

                                $.growl.error({
                                    title: "失败",
                                    message: "同时最多只能租一辆车!"
                                });

                            } else if (data.log === "money") {

                                $.growl.error({
                                    title: "失败",
                                    message: "余额不足!"
                                });

                            } else if (data.log === "rentalCard") {

                                $.growl.error({
                                    title: "失败",
                                    message: "请先办理租借卡!"
                                });
                            }
                        },
                        error: function (xhr) {
                            console.log(xhr.responseText);
                        }
                    }); 
                    return true;
                },
                cancelValue: "取消",
                cancel: function () { }
            });
            d.width(320);
            d.showModal();
        }
    };
    
});

function getSiteTable(borrowBicycle) {

    $("#siteTable").bootstrapTable("destroy");

    $("#siteTable").bootstrapTable({
        columns: [{
            field: "SiteId",
            title: "站点编号",
            width: "30%",
            class: "font12"
        }, {
            field: "SiteName",
            title: "站点名",
            width: "40%",
            class: "font12"
        }, {
            field: "SiteAmount",
            title: "车数",
            width: "30%",
            sortable: "true",
            class: "font12"
        }],
        data: borrowBicycle.sites,
        striped: false,
        cache: false,
        pagination: true,
        sortable: true,
        sortOrder: "asc",
        pageNumber: 1,
        pageSize: 10,
        sidePagination: 'client',
        pageList: [10],
        clickToSelect: true,
        paginationLoop: false,
        paginationPreText: "前一页",
        paginationNextText: "后一页",
        height: 475,
        onClickRow: function (row) {
            $.ajax({
                url: "/User/GetBicycleTable",
                type: "post",
                dataType: "json",
                data: {
                    siteId: row.SiteId
                },
                success: function (data) {
                    getBicycleTable(data);
                },
                error: function () {
                    console.log("ajax error");
                }
            })
            borrowBicycle.siteNow = row.SiteName;
        }
    });
}

function getBicycleTable(bicData) {

    $("#bicycleTable").bootstrapTable("destroy");

    $("#bicycleTable").bootstrapTable({
        columns: [{
            field: "BicId",
            title: "编号",
            width: "20%",
            sortable: "true",
            class: "font12"
        }, {
            field: "BicType",
            title: "类型",
            width: "20%",
            sortable: "true",
            class: "font12"
        }, {
            field: "BicRentPrice",
            title: "价格/小时",
            width: "20%",
            sortable: "true",
            class: "font12"
        }, {
            field: "BicBorrowedCount",
            title: "租用次数",
            width: "20%",
            sortable: "true",
            class: "font12"
        }, {
            width: "20%",
            formatter: function () {
                return "<button type='button' class='button button-rounded button-royal button-small'>借车</button>";
            },
            events: borrowEvent
        }],
        data: bicData,
        striped: false,
        cache: false,
        pagination: true,
        sortable: true,
        sortOrder: "asc",
        search: true,
        //showRefresh: true,
        pageNumber: 1,
        pageSize: 10,
        sidePagination: 'client',
        pageList: [10],
        clickToSelect: true,
        paginationLoop: false,
        paginationPreText: "前一页",
        paginationNextText: "后一页",
        height: 480,
    });
}

function getBorrowedBicycle(borrowBicycle) {
    $.ajax({
        url: "/User/BorrowedBicycle",
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.log === "ok") {
                var rented = data.rented;
                var nowTime = new Date().getTime();
                var rentTime = moment(rented.RentBowTime);
                var minutes = parseInt((nowTime - rentTime.unix()*1000) / 1000 / 60);
                var price = rented.BicRentPrice;
                if (minutes % 60 === 0) {
                    price = parseInt(minutes / 60) * price;
                } else {
                    price = (parseInt(minutes / 60) + 1) * price;
                }
                var borrowedBicycle = {
                    bicId: rented.BicId,
                    bicType: rented.BicType,
                    bicTime: minutes,
                    bicMoney: price
                }
                borrowBicycle.rentedId = rented.RentId;
                borrowBicycle.borrowedBicycle = borrowedBicycle;
               
            } else if (data.log === "none") {
                //  pass
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}