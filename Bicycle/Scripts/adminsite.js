$(document).ready(function () {
    var adminSite = new Vue({
        el: "#adminSite",
        data: {
            allSite: "",
            selected: "",
            addSiteArea: "",
            addSiteName: "",
            siteAreas: [],
            upSiteName: "",
            upSiteId: ""
        },
        mounted: function () {
            this.getData();
            $.ajax({
                url: "http://restapi.amap.com/v3/config/district?keywords=%E9%84%9E%E5%B7%9E&subdistrict=1&key=e6f027eef2e8495f71abdecb7e2161f8",
                type: "get",
                dataType: "json",
                success: function (data) {
                    var arr = data.districts[0].districts
                    for(var site of arr) {
                        adminSite.siteAreas.push(site);
                    }
                },
                error: function (xhr) {
                    console.log("ajax error");
                }
            });
        },
        methods: {
            getData: function () {
                $.ajax({
                    url: "/Admin/GetSite",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        adminSite.allSite = data;
                        createTable(adminSite.allSite);
                    },
                    error: function (xhr) {
                        console.log("ajax error");
                    }
                });
            },
            addSite: function () {
                if (this.addSiteArea.length && this.addSiteName) {
                    $.ajax({
                        url: "/Admin/AddSite",
                        type: "post",
                        data: {
                            siteArea: this.addSiteArea,
                            siteName: this.addSiteName
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data === "ok") {
                                adminSite.getData();
                                $('#AddSite').modal('hide');
                                $.growl.notice({
                                    title: "成功",
                                    message: "添加站点成功!"
                                });
                            }
                        },
                        error: function () {
                            console.log("ajax error");
                        }
                    });
                } else {
                    $.growl.error({
                        title: "错误",
                        message: "请正确输入"
                    });
                }
            },
            deleteSite: function () {
                var arr = ($('#siteTable').bootstrapTable('getSelections'));
                var array = [], flag = 1;
                for(var site of arr) {
                    if (site.SiteAmount !== 0) {
                        flag = 0;
                        break;
                    } else {
                        array.push(site.SiteId);
                    }
                }
                if (array.length !== 0 && flag === 1) {
                    swal({
                        title: "确定删除?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            $.ajax({
                                url: "/Admin/RemoveSite",
                                type: "post",
                                dataType: "json",
                                data: {
                                    siteIdList: array
                                },
                                success: function (data) {
                                    if (data === "ok") {
                                        adminSite.getData();
                                        swal("成功! 删除成功!", {
                                            icon: "success",
                                        });
                                    }
                                },
                                error: function () {
                                    console.log("ajax error");
                                }
                            });
                            
                        }
                    });
                } else {
                    swal("失败! 选中的站点停车数不为0，无法删除!", {
                        icon: "error",
                    });
                }
            },
            clickUpdata: function () {
                var arr = ($('#siteTable').bootstrapTable('getSelections'));
                if (arr.length === 1) {
                    $('#UpdataSite').modal('show');
                    this.upSiteId = arr[0].SiteId;
                    this.upSiteName = arr[0].SiteName;
                }
            },
            UpdataSite: function () {
                if (this.upSiteName.length !== 0) {
                    $.ajax({
                        url: "/Admin/UpdataSite",
                        type: "post",
                        dataType: "json",
                        data: {
                            siteId: this.upSiteId,
                            siteName: this.upSiteName
                        },
                        success: function (data) {
                            if (data === "ok") {
                                adminSite.getData();
                                $('#UpdataSite').modal('hide');
                                $.growl.notice({
                                    title: "成功",
                                    message: "更新成功!"
                                });
                            }
                        }
                    });
                } else {
                    $.growl.error({
                        title: "失败",
                        message: "失败了!失败了!失败了!失败了..."
                    });
                }
            }
        }
    });
});

function createTable(allSite) {
    $("#siteTable").bootstrapTable("destroy");
    var table = $('#siteTable').bootstrapTable({
        columns: [
            {
                fileid: 'SiteId',
                checkbox: true
            },
            {
                field: 'SiteId',
                title: '编号',
                sortable: true
            },
            {
                field: 'MagName',
                title: '管理员姓名',
                sortable: true
            },
            {
                field: 'SiteName',
                title: '站点名',
                sortable: true
            },
            {
                field: 'SiteArea',
                title: '站点区域',
                sortable: true
            },
            {
                field: 'SiteAmount',
                title: '站点停车数',
                sortable: true
            }
        ],
        data: allSite,
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
