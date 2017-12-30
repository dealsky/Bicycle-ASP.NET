$(document).ready(function () {

    var bicycleSta = new Vue({
        el: "#bicycleSta",
        data: {
            bicNum: "",     
            maxType: "",
            minType: "",
            borrowSum: "",
            maxBorType: "",
            minBorType: "",
            siteNum: "",
            maxSite: "",
            minSite: ""
        },
        mounted: function () {
            $.ajax({
                url: "/User/GetSituation",
                type: "post",
                dataType: "json",
                success: function (data) {
                    bicycleSta.bicNum = data.bicNum;
                    var maxType = {
                        type: data.maxType,
                        count: data.maxTypeNum
                    };
                    bicycleSta.maxType = maxType;
                    var minType = {
                        type: data.minType,
                        count: data.minTypeNum
                    };
                    bicycleSta.minType = minType;
                    bicycleSta.borrowSum = data.borrowSum;
                    var maxBorType = {
                        type: data.maxBorType,
                        count: data.maxBorTypeNum
                    };
                    bicycleSta.maxBorType = maxBorType;
                    var minBorType = {
                        type: data.minBorType,
                        count: data.minBorTypeNum
                    };
                    bicycleSta.minBorType = minBorType;
                    bicycleSta.siteNum = data.siteNum;
                    var maxSite = {
                        name: data.maxSite,
                        count: data.maxSiteNum
                    };
                    bicycleSta.maxSite = maxSite;
                    var minSite = {
                        name: data.minSite,
                        count: data.minSiteNum
                    };
                    bicycleSta.minSite = minSite;
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
    });

});