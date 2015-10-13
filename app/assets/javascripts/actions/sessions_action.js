window.SessionsActions = {
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
