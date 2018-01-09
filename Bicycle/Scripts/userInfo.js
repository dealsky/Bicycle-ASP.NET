var rentalCard;

$(document).ready(function () {
    var userInfo = new Vue({
        el: "#userInfo",
        data: {
            userAcc: "",
            userName: "",
            userEmail: "",
            userTel: "",
            userIdCard: "",
            userSex: ""
        },
        mounted: function () {
            $.ajax({
                url: "/User/GetUserInfo",
                type: "post",
                dataType: "json",
                success: function (data) {
                    if (data.log === "right") {
                        var user = data.user;
                        userInfo.userAcc = user.UserAcc;
                        userInfo.userName = user.UserName;
                        userInfo.userEmail = user.UserEmail;
                        userInfo.userTel = user.UserTel;
                        userInfo.userIdCard = user.UserIdCard;
                        userInfo.userSex = user.UserSex === 0 ? "female" : "male";
                        $("#userName").text(user.UserName);
                        $("#userEmail").text(user.UserEmail);
                        $("#userEmail").attr("href", "mailto:" + user.UserEmail);
                    }
                    else {

                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
    });

    $("#userBody").validate({
        rules: {
            userName: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            userEmail: {
                required: true,
                email: true
            },
            userTel: {
                minlength: 11,
                maxlength: 11
            },
            userIdCard: {
                minlength: 18,
                maxlength: 18
            }
        },
        messages: {
            userName: {
                minlength: "昵称长度 2 ~ 12",
                maxlength: "昵称长度 2 ~ 12"
            },
            userEmail: {
                email: "请输入格式正确的邮箱地址"
            },
            userTel: {
                minlength: "请输入格式正确的手机号码",
                maxlength: "请输入格式正确的手机号码"
            },
            userIdCard: {
                minlength: "请输入格式正确的省份证号码",
                maxlength: "请输入格式正确的省份证号码"
            }
        }
    });

    rentalCard = new Vue({
        el: "#rentalCard",
        data: {
            recown: "",
            recstatus: "",
            recid: "",
            recbalance: "",
            recoptime: ""
        },
        mounted: function () {
            initCard();
        },
        methods: {
            addRentalCard: function () {
                $.ajax({
                    url: "/User/AddRentalCard",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data.log === "ok") {
                            initCard();
                            $.growl.notice({
                                title: "成功",
                                message: "租借卡办理成功!"
                            });
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            },
            deleteRentalCard: function () {

                var str = rentalCard.recstatus === 1 ? "该租借卡还有余额，你确定要删除吗？" : "你确定要删除吗？";
                var recId = this.recid;
                var d = dialog({
                    title: '警告',
                    content: str,
                    okValue: '确定',
                    ok: function () {
                        $.ajax({
                            url: "/User/DeleteRentalCard",
                            type: "post",
                            dataType: "json",
                            data: {
                                recid: recId
                            },
                            success: function (data) {
                                if (data.log === "ok") {
                                    rentalCard.recown = false;
                                    $.growl({
                                        title: "成功",
                                        message: "租借卡删除成功!"
                                    });
                                }
                            },
                            error: function (xhr) {
                                console.log(xhr.responseText);
                            }
                        });
                        return true;
                    },
                    cancelValue: '取消',
                    cancel: function () { }
                });
                d.width(280);
                d.showModal();
            },
            openChargeMoney: function () {
                $("#chargeMoney").modal("show");
            },
            keyMonery: function () {
                if ($("#moneyNum").val()) {
                    if ($("#moneyNum").val() > 99999999) {
                        $("#chargeBtn").attr("disabled", true);
                    } else {
                        $("#chargeBtn").attr("disabled", false);
                    }
                } else {
                    $("#chargeBtn").attr("disabled", true);
                }
            },
            confirmCharge: function () {
                var addMoney = parseFloat($("#moneyNum").val());
                $.ajax({
                    url: "/User/ChargeMoney",
                    type: "post",
                    dataType: "json",
                    data: {
                        recid: rentalCard.recid,
                        addMoney: addMoney
                    },
                    success: function (data) {
                        if (data.log === "ok") {
                            $("#chargeMoney").modal("hide");
                            $("#moneyNum").val("");
                            $("#chargeBtn").attr("disabled", true);
                            initCard();
                            $.growl.notice({
                                title: "成功",
                                message: "充值成功!"
                            });
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            }
        }
    });

});

function initCard()
{
    $.ajax({
        url: "/User/GetUserRentalCard",
        type: "post",
        dataType: "json",
        success: function (data) {
            var rc = data.rentalCard;
            if (rc != null) {
                rentalCard.recown = true;
                rentalCard.recstatus = rc.RecStatus;
                rentalCard.recid = rc.RecId;
                var num = new Number(rc.RecBalance);
                rentalCard.recbalance = num.toFixed(2);
                rentalCard.recoptime = moment(rc.RecOptime).format("YYYY-MM-DD hh:mm:ss");
            }
            else {
                rentalCard.recown = false;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}
