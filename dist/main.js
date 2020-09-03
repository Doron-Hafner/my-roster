 const source = $('#roster-template').html();
 const template = Handlebars.compile(source)

$("#submit").on("click", function () {
    const input = $("#teamName").val().toLowerCase()
    $.get(`/api/teams/${input}`, function(data){
        renderRoster(data)
        console.log(data);
    })
})

const renderRoster = (data) => {
    const newHTML = template({data});
    console.log({data});
    $('#playersContainer').empty()
    $('#playersContainer').append(newHTML);
}

