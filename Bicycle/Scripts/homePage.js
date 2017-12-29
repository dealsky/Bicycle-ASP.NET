$(document).ready(function () {
    
    var tdWeather = new Vue({
        el: '#weather-today',
        data: {
            temperature: "",
            weather: "",
            day_air_temperature: "",
            night_air_temperature: "",
            aqi: "",
            sd: "",
            wind_direction: "",
            wind_power: "",
            city: "",
            cityE: ""
        },
        mounted: function () {
            $.ajax({
                url: "http://route.showapi.com/9-5?showapi_appid=46304&showapi_sign=b121570716a84dabbb0143ad58f76c18&from=5&lng=121.56&lat=29.86&needMoreDay=0&needIndex=0&needHourData=0&need3HourForcast=0&needAlarm=0&",
                type: "get",
                datatype: "json",
                success: function (data) {
                    var weather = data.showapi_res_body;
                    var cityInfo = weather.cityInfo;
                    var today = weather.f1;
                    var now = weather.now;

                    tdWeather.temperature = now.temperature,
                    tdWeather.weather = now.weather,
                    tdWeather.day_air_temperature = today.day_air_temperature,
                    tdWeather.night_air_temperature = today.night_air_temperature,
                    tdWeather.aqi = now.aqi,
                    tdWeather.sd = now.sd,
                    tdWeather.wind_direction = now.wind_direction,
                    tdWeather.wind_power = now.wind_power,
                    tdWeather.city = cityInfo.c3,
                    tdWeather.cityE = cityInfo.c2
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
    });

    $("#modalLogin").modal({
        backdrop: false,
        show: false
    });

    $("#modalRegister").modal({
        backdrop: false,
        show: false
    });

    $("#modalAnnouncement").modal({
        backdrop: false,
        show: false
    });

    $("#loginButton").click(function () {
        var userAcc = $(".login-text [name='userAcc']").val();
        var userPass = $(".login-text [name='userPass']").val();

        $.ajax({
            url: "/User/Login",
            type: "POST",
            dataType: "json",
            data: {
                userAcc: userAcc,
                userPass: userPass
            },
            success: function (data) {
                if (data.log === "passError") {
                    $("#error-message").html("<div class='alert alert-danger login-message'>密码错误</div>");
                } else if (data.log === "null") {
                    $("#error-message").html("<div class='alert alert-danger login-message'>账号不存在</div>");
                } else if (data.log === "ok") {
                    $("#error-message").html("<div class='alert alert-success login-message'>登录成功</div>");
                    window.location.href = "";
                }
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    });

    var status = [];
    $(".register-body [name='userAcc']").bind("change", function () {
        var userAcc = $(this).val();
        if (userAcc.length < 6 || userAcc.length > 12) {
            var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
            var message = "<span class=\"register-error-message\">账号长度 6 ~ 12</span>";
            $("#groupAcc .error-if").html(icon + message);
            $("#groupAcc").addClass("has-error");
            status[0] = false;
        } else {
            $.ajax({
                url: "/User/RegUserAcc",
                type: "POST",
                dataType: "json",
                data: { userAcc: userAcc },
                success: function (data) {
                    if (data.message === "right") {
                        $("#groupAcc").removeClass("has-error");
                        var icon = "<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>";
                        $("#groupAcc .error-if").html(icon);
                        $("#groupAcc").addClass("has-success");
                        status[0] = true;
                    } else {
                        var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
                        var message = "<span class=\"register-error-message\">该账号已被注册</span>";
                        $("#groupAcc .error-if").html(icon + message);
                        $("#groupAcc").addClass("has-error");
                        status[0] = false;
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                    status[0] = false;
                }
            });
        }
    });

    $(".register-body [name='userPass']").bind("change", function () {
        var userPass = $(this).val();
        if (userPass.length < 6 || userPass.length > 12) {
            var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
            var message = "<span class=\"register-error-message\">密码长度 6 ~ 18</span>";
            $("#groupPass .error-if").html(icon + message);
            $("#groupPass").addClass("has-error");
            status[1] = false;
        } else {
            $("#groupPass").removeClass("has-error");
            var icon = "<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>";
            $("#groupPass .error-if").html(icon);
            $("#groupPass").addClass("has-success");
            status[1] = true;
        }
    });

    $(".register-body [name='userEmail']").bind("change", function () {
        var userEmail = $(this).val();
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(userEmail)) {
            $.ajax({
                url: "/User/RegUserEmail",
                type: "POST",
                dataType: "json",
                data: {
                    userEmail: userEmail
                },
                success: function (data) {
                    if (data.message === "error") {
                        var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
                        var message = "<span class=\"register-error-message\">该邮箱已被使用</span>";
                        $("#groupEmail .error-if").html(icon + message);
                        $("#groupEmail").addClass("has-error");
                        status[2] = false;
                    } else {
                        $("#groupEmail").removeClass("has-error");
                        var icon = "<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>";
                        $("#groupEmail .error-if").html(icon);
                        $("#groupEmail").addClass("has-success");
                        status[2] = true;
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                    status[2] = false;
                }
            });
        } else {
            var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
            var message = "<span class=\"register-error-message\">邮箱格式错误</span>";
            $("#groupEmail .error-if").html(icon + message);
            $("#groupEmail").addClass("has-error");
            status[2] = false;
        }
    });

    $(".register-body [name='userName']").bind("change", function () {
        var userName = $(this).val();
        if (userName.length < 2 || userName.length > 12) {
            var icon = "<span class=\"glyphicon glyphicon-remove form-control-feedback glyp-right\"></span>";
            var message = "<span class=\"register-error-message\">用户名长度 2~12</span>";
            $("#groupName .error-if").html(icon + message);
            $("#groupName").addClass("has-error");
            status[3] = false;
        } else {
            $("#groupName").removeClass("has-error");
            var icon = "<span class=\"glyphicon glyphicon-ok form-control-feedback glyp-right\"></span>";
            $("#groupName .error-if").html(icon);
            $("#groupName").addClass("has-success");
            status[3] = true;
        }
    });

    $("#registerButton").click(function () {
        var userAcc = $(".register-text [name='userAcc']").val();
        var userPass = $(".register-text [name='userPass']").val();
        var userEmail = $(".register-text [name='userEmail']").val();
        var userName = $(".register-text [name='userName']").val();

        if (userAcc !== "" && userPass !== "" && userEmail !== "" && userName !== "") {
            var flag = true;
            for (var i = 0; i < status.length; i++) {
                if (status[i] === false) {
                    flag = false;
                    break;
                }
            }
            if (flag === true) {
                $.ajax({
                    url: "/User/Register",
                    type: "POST",
                    dataType: "json",
                    data: {
                        userAcc: userAcc,
                        userPass: userPass,
                        userEmail: userEmail,
                        userName: userName
                    },
                    success: function (data) {
                        if (data.meg === "null") {
                            $("#error-message-register").html("<div class='alert alert-danger register-message'>改账号已被注册</div>");
                        }
                        else if (data.meg === "emailError") {
                            $("#error-message-register").html("<div class='alert alert-danger register-message'>该邮箱已被注册</div>");
                        } else if (data.meg === "right") {
                            $("#error-message-register").html("<div class='alert alert-success register-message'>注册成功</div>");
                            window.location.href = "/User/Index";
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            } else {
                $("#error-message-register").html("<div class='alert alert-danger register-message'>请处理错误项</div>");
            }
        }
        else {
            $("#error-message-register").html("<div class='alert alert-danger register-message'>请填写完注册项</div>");
        }
    });

});

function emptiedLogin() {
    $(".login-text [name='userAcc']").val("");
    $(".login-text [name='userPass']").val("");
    $("#error-message").html("");
}

function emptieRegister() {
    $(".register-text [name='userAcc']").val("");
    $(".register-text [name='userPass']").val("");
    $(".register-text [name='userEmail']").val("");
    $(".register-text [name='userName']").val("");
    $("#error-message-register").html("");
    $(".error-if").each(function () {
        $(this).html("");
    });
    $(".register-body .user-acc").each(function () {
        $(this).removeClass("has-success");
        $(this).removeClass("has-error");
    });
}

function emptiePass() {
    $("#modalPass [type='password']").each(function () {
        $(this).val("");
    });
    $(".error-if").each(function () {
        $(this).html("");
    });
    $(".login-body .user-acc").each(function () {
        $(this).removeClass("has-success");
        $(this).removeClass("has-error");
    });
    $("#modalPass .error-message").html("");
}
