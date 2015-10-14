window.SessionUtil = {
  logOut: function() {
    $.ajax({
      type: 'delete',
      url: 'session',
      success: function() {
        window.location="/"
      }
    });
  }

}
