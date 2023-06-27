
$(function () {
  var currentHour = dayjs().hour();

  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    }
    else if (blockHour === currentHour) {
      $(this).addClass("present");
    }
    else {
      $(this).addClass("future");
    }
  });

  $(".saveBtn").on("click", function () {
    var timeBlock = $(this).parent();
    var description = timeBlock.find(".description").val();
    var hour = timeBlock.attr("id");
    localStorage.setItem(hour, description);
  });
  
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);
    if (description !== null) {
      $(this).find(".description").val(description);
    }
  });
});
