function submit_check(name, email) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/email/",
        type: "POST",
        dataType: "JSON",
        data: {"name": name, "email": email},
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
                $('.check-btn').prop('disabled', true);
            },
		success:function(data){
            owe_money($(".front-wrapper"), data);
        },
        error: function(data) {
        },
        complete: function() {
            $('.check-btn').prop('disabled', false);
        }
    });
}

function owe_money(container, money) {
}

function show_owe_form(container) {
    var $title_div = $("<div />", {
           "class": "title-div col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2"
       });

    var $detect_span = $("<span />", {
           "class": "detect-span",
           "text": "WHO OWE YOU MONEY?"
       });

    var $front_div = $("<div />", {
           "class": "front-div col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2"
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

    var $input_name = $("<input />", {
           "type": "text",
           "placeholder": "Enter His/Her Name    (We use your name to notice your firends.)",
           "id": "check-name",
           "class": "form-control"
       });

    var $input_email = $("<input />", {
           "type": "text",
           "placeholder": "Enter His/Her Name    (Your friend will get email once they join)",
           "id": "check-email",
           "class": "form-control"
       });

    var $input_money = $("<input />", {
           "type": "text",
           "placeholder": "How much money they owe you?",
           "id": "check-money",
           "class": "form-control"
       });

    var $input_reason = $("<input />", {
           "type": "text",
           "placeholder": "Why and When",
           "id": "check-",
           "class": "form-control"
       });

    container.append($title_div);
    $title_div.append($detect_span);
    container.append($front_div);
    $front_div.append($detect_form);
    $front_div.append($detect_form2);
    $front_div.append($detect_form3);
    $front_div.append($detect_form4);
    $detect_form.append($input_name);
    $detect_form2.append($input_email);
    $detect_form3.append($input_money);
    $detect_form4.append($input_reason);
}
