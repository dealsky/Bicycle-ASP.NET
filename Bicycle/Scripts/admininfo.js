$(document).ready(function () {
    var adminInfo = new Vue({
        el: "#adminInfo",
        data: {
            MagName: "",
            MagSex: "",
            MagPass: "",
            PassAgain: "",
            MagTel: "",
            passFlag: "-1"
        },
        mounted: function () {
            $.ajax({
                url: "/Admin/GetAdminInfo",
                type: "post",
                dataType: "json",
                success: function (data) {
                    adminInfo.MagName = data.MagName;
                    adminInfo.MagSex = data.MagSex;
                    adminInfo.MagTel = data.MagTel;
                },
                error: function () {
                    console.log("ajax error");
                }
            });
        },
        methods: {
            updataAdminInfo: function () {
                var admin = {
                    MagName: this.MagName,
                    MagSex: this.MagSex,
                    MagTel: this.MagTel
                };
                if (this.passFlag === 0) {
                    swal("失败", "密码错误!", "error");
                } else {
                    if (this.passFlag === 1) {
                        if (this.PassAgain === "") {
                            swal("失败", "新密码不能为空!", "error");
                            return;
                        }
                        admin.MagPass = this.PassAgain;
                    }
                    $.ajax({
                        url: "/Admin/UpdataAdminInfo",
                        type: "post",
                        dataType: "json",
                        data: admin,
                        success: function (data) {
                            if (data === "ok") {
                                swal("成功", "信息更新成功!", "success");
                                adminInfo.MagPass = "";
                                adminInfo.PassAgain = "";
                                adminInfo.passFlag = -1;
                                $("#passAgain").attr("disabled", true);
                            }
                        }
                    });
                }
            },
            inputPass: function () {
                if (this.MagPass.length !== 0) {
                    $.ajax({
                        url: "/Admin/AdminPsssRight",
                        type: "post",
                        dataType: "json",
                        data: {
                            MagPass: this.MagPass
                        },
                        success: function (data) {
                            if (data === "ok") {
                                adminInfo.passFlag = 1;
                                $("#passAgain").attr("disabled", false);
                            } else {
                                $("#passAgain").attr("disabled", true);
                                adminInfo.passFlag = 0;
                            }
                        }
                    });
                } else {
                    $("#passAgain").attr("disabled", true);
                    this.passFlag = -1;
                }
            }
        }
    });
});