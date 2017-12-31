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
            setText(this);
            setChart();
        }
    });

});

function setText(bicycleSta) {
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

function setChart() {
    typeCountChart();
    borrowCountChart();
    siteCountChart();
}

function typeCountChart() {
    var colors = randColor();
    $.ajax({
        url: "/User/TypeChart",
        type: "post",
        dataType: "json",
        success: function (map) {
            var arr = Object.keys(map);
            var data = [], labels = [];
            for (var type in map) {
                data.push(map[type]);
                labels.push(type);
            }
            var countData = {
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }],
                labels: labels
            };
            var ctx = $("#typeCountChart").get(0).getContext("2d");
            new Chart(ctx, {
                type: "pie",
                data: countData
            });
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}

function borrowCountChart() {
    var colors = randColor();
    $.ajax({
        url: "/User/BorrowChart",
        type: "post",
        dataType: "json",
        success: function (map) {
            var arr = Object.keys(map);
            var data = [], labels = [];
            for (var type in map) {
                data.push(map[type]);
                labels.push(type);
            }
            var countData = {
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }],
                labels: labels
            };
            var ctx = $("#borrowCountChart").get(0).getContext("2d");
            new Chart(ctx, {
                type: "pie",
                data: countData
            });
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}

function siteCountChart() {
    var colors = randColor();
    $.ajax({
        url: "/User/SiteChart",
        type: "post",
        dataType: "json",
        success: function (map) {
            var arr = Object.keys(map);
            var data = [], labels = [];
            for (var type in map) {
                data.push(map[type]);
                labels.push(type);
            }
            var countData = {
                datasets: [{
                    data: data,
                    backgroundColor: colors
                }],
                labels: labels
            };
            var ctx = $("#countSiteChart").get(0).getContext("2d");
            new Chart(ctx, {
                type: "pie",
                data: countData
            });
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}

function randColor() {
    var colorAll = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
    var colors = [];
    while(colors.length < 5) {
        var num = parseInt(Math.random() * (5 + 1), 10);
        var flag = true;
        for(var i = 0; i<colors.length; i++) {
            if (colors[i] === colorAll[num]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            colors.push(colorAll[num]);
        }
    }
    return colors;
}