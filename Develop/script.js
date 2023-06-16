

$(function() {
  var currentHour = dayjs().hour();

  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);
  var startHour = 9; 
  var endHour = 17; 
  for (var hour = startHour; hour <= endHour; hour++) {
    var timeBlockEl = $("<div>")
      .attr("id", "hour-" + hour)
      .addClass("row time-block");
  var hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(dayjs(hour, "H").format("ha"));
  var descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");

  var saveBtnEl = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);
    $(".container-lg").append(timeBlockEl);
  }

  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
  if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  $(".time-block").on("click", ".description", function() {
    $(this).addClass("active");
  });

  $(".time-block").on("click", ".saveBtn", function() {
    var timeBlock = $(this).parent();
    var description = timeBlock.find(".description").val();
    var hour = timeBlock.attr("id");
    localStorage.setItem(hour, description);
  });

  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);
    if (description !== null) {
      $(this).find(".description").val(description);
    }
  });
});