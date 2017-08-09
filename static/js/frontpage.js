function submit_check(email) {
    var csrftoken = getCookie('csrftoken');
    if (email.length == 0) {
        return false; 
    }
    if (!isValidEmailAddress(email)) {
        alert("Please submit a correct email address"); 
        return false;
    }
    $.ajax({
        url: "/email/",
        type: "POST",
        dataType: "JSON",
        data: {"email": email},
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
                $('.check-btn').prop('disabled', true);
            },
		success:function(data){
            $(".front-wrapper").empty();
            get_owe_money($(".front-wrapper"), data["email"]);
        },
        error: function(data) {
        },
        complete: function() {
            $('.check-btn').prop('disabled', false);
        }
    });
}

function submit_sub(email) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/sub_email/",
        type: "POST",
        dataType: "JSON",
        data: {"email": email},
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
                $('.sub-btn').prop('disabled', true);
            },
		success:function(data){
            $('.sub-btn').text("Got it!");
        },
        error: function(data) {
        },
        complete: function() {
            $('.sub-btn').prop('disabled', false);
        }
    }); 
}

function get_owe_money(container, email) {
    $.ajax({
        url: "/api/owe/?email=" + email,
        type: "GET",
        dataType: "JSON",
		success:function(data){
            owe_money(container, data, email);
            get_email(container);
        },
        error: function(data) {
        },
    });
}

function owe_money(container, data, email) {
    var money = 0;
    var $owe_div = $("<div />", {
           "class": "owe-div col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2"
       });
    $.each(data["results"], function(k, v){
        money += v["money"];
        var $owe_wrapper = $("<div />", {
               "class": "owe-wrapper",
           });
        var $owe_money = $("<span />", {
               "class": "owe-span",
               "text": "$" + v["money"].toLocaleString('en')
           });
        var $owe_email = $("<span />", {
               "class": "owe-email",
               "text": "by " + v["lend_email"],
           });
        var $owe_reason = $("<span />", {
               "class": "owe-reason",
               "text": '"' + v["reason"] + '"' + "\xa0\xa0",
           });
        var $clear = $("<div />", {
                "class": "clear",
        });
        $owe_div.append($owe_wrapper);
        $owe_div.append($clear);
        $owe_div.append($hidden_email);
        $owe_wrapper.append($owe_money);
        $owe_wrapper.append($owe_reason);
        $owe_wrapper.append($owe_email);
        });
    var $hidden_email = $("<input />", {
            "type": "hidden",
            "value": email,
            "id": "hidden-email"
    });
    var $title_div = $("<div />", {
           "class": "title-div col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2"
       });
    var $detect_span = $("<span />", {
           "class": "detect-span",
           "text": "You Totally Owe"
       });
    var $detect_money = $("<span />", {
           "class": "detect-money",
           "text": "$ " + money.toLocaleString('en'),
       });
    $title_div.append($detect_span);
    $title_div.append($detect_money);
    container.append($title_div);
    container.append($owe_div);
    container.append($hidden_email);
}

function get_email(container) {
    var $sub_div = $("<div />", {
        "class": "sub-div form-group col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3",
    });
    var $sub_input = $("<input />", {
        "type": "email",
        "placeholder": "your@email.com",
        "class": "sub-input form-control",
    });
    var $sub_btn = $("<button />", {
        "class": "sub-btn btn btn-primary btn-lg btn-block",
        "text": "Get Email When You Owe Money"
    });

    container.append($sub_div);
    $sub_div.append($sub_input);
    $sub_div.append($sub_btn);
    // add notice button 
    var $notice_div = $("<div />", {
        "class": "notice-div form-group col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3",
    });
    var $notice_label = $("<label />", {
        "class": "notice-label",
        "text": "One More Thing"
    });
    var $notice_btn = $("<button />", {
        "class": "notice-btn btn btn-warning btn-lg btn-block",
        "text": "+  Friends Who Owe Your Money"
    });

    container.append($notice_div);
    $notice_div.append($notice_label);
    $notice_div.append($notice_btn);
}

function show_owe_form(container, email) {
    container.empty();
    var $title_div = $("<div />", {
           "class": "title-div col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2"
       });
    var $detect_span = $("<span />", {
           "class": "detect-span",
           "text": "WHO OWE YOU MONEY?"
       });
    var $details_span = $("<span />", {
           "class": "details-span",
           "text": "Build beautiful, contemporary sites in just moments with Foundry and Variant Page Builder."
       });
    var $front_div = $("<div />", {
           "class": "front-div col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3"
       });
    var $detect_form = $("<div />", {
           "class": "detect-form form-group"
       });
    var $detect_form2 = $("<div />", {
           "class": "detect-form form-group"
       });
    var $detect_form3 = $("<div />", {
           "class": "detect-form form-group"
       });
    var $detect_form4 = $("<div />", {
           "class": "detect-form form-group"
       });
    var $input_email = $("<input />", {
           "type": "text",
           "placeholder": "Enter His/Her Email    (Your friend will get email once they join)",
           "id": "add-email",
           "class": "form-control"
       });
    var $input_money = $("<input />", {
           "type": "text",
           "placeholder": "How much money they owe you?",
           "id": "add-money",
           "class": "form-control"
       });
    var $input_reason = $("<input />", {
           "type": "text",
           "placeholder": "Why and When",
           "id": "add-reason",
           "class": "form-control"
       });
    var $add_btn_div = $("<div />", {
           "class": "btn-div"
       });
    var $add_btn = $("<button />", {
           "class": "add-btn btn btn-primary btn-lg",
           "text": "Notice Your Friends"
       });
    var $hidden_email = $("<input />", {
           "type": "hidden",
           "id": "hidden-email",
           "value": email
       });


    container.append($title_div);
    $title_div.append($detect_span);
    $title_div.append($details_span);
    container.append($front_div);
    container.append($hidden_email);
    $front_div.append($detect_form2);
    $front_div.append($detect_form3);
    $front_div.append($detect_form4);
    $front_div.append($add_btn_div);
    $add_btn_div.append($add_btn);
    $detect_form2.append($input_email);
    $detect_form3.append($input_money);
    $detect_form4.append($input_reason);
}

function add_owe_friend(lend, email, money, reason) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/friends/",
        type: "POST",
        dataType: "JSON",
        data: {"lend": lend, "email": email, "money": money, "reason": reason},
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
                $('.check-btn').prop('disabled', true);
            },
		success:function(data){
            console.log(data)
        },
        error: function(data) {
        },
        complete: function() {
            $('.check-btn').prop('disabled', false);
        }
    });
}
