function submit_check(email) {
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/email/",
        type: "POST",
        dataType: "JSON",
        data: {"email": email},
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            },
		success:function(data){
            console.log(data);
        },
        error: function(data) {
        }
    });
}
