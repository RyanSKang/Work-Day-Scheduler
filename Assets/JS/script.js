// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
$(document).ready(function(){
  var currentTime= $('#currentDay');
  var date= dayjs().format('MM/DD/YYYY, hh:mm a');
  currentTime.text(date);

  // Make logic for saveBtn
  var saveBtn= $('.saveBtn');
  saveBtn.on('click',function(event){
    event.preventDefault();
    var timeSlotID= $(this).attr('id')
    var task= $(this).siblings('.description').val();
    console.log('this is my task ',task)
    localStorage.setItem(timeSlotID,task);
    retrieveTask()
  })

  // Show saved Task logic
  retrieveTask()
  function retrieveTask(){
    for(var i=9; i<19; i++){
      var task=localStorage.getItem(i);
      $('#' + i + '').text(task);
    }
}

// Color coding TimeSlots for past present and future
// 1. need to create current time to only display hour so i can make if statement with
// container ID to compare with hour
// 2. need to create if statements to see what the container will be 
// based on condition
// 3. need to call ID of a container in order to see which container is affected

colorCode()
function colorCode(){
  var time=dayjs().hour();
  $(".time-block").each(function(){
    var blockHour= parseInt($(this).attr("id").split("-")[1]);
    console.log(blockHour);
    console.log(time);
    // checking if console checks out
    
    if(blockHour<time){
      $(this).addClass('past');
    } else if (blockHour===time){
      $(this).removeClass('past');
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
      $(this).removeClass('present');
      $(this).removeClass('past')
    }
  });
  }
});
