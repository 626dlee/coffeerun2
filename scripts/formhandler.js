(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  function FormHandler(selector) {
    //code here
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);

    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    // console.log("Setting submit handler for form");
    //More code here
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var data = $(this).serializeArray();
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;

      });
      fn(data);
      this.reset();
      this.elements[0].focus();
    })
  };



  FormHandler.prototype.addInputHandler = function (fn) {
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      //event handler
      var emailAddress = event.target.value;

      var message = '';
      if (fn(emailAddress)) {
        $(event.target).setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        $(event.target).setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
