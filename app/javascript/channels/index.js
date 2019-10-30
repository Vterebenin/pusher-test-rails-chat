// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)
import $ from 'jquery'
import Pusher from 'pusher-js'

$(document).ready(function() {
    var channel, pusher, updateChat, username;
    username = '';
    updateChat = function(data) {
      $('.chat-box').append("<div class=\"col-12\">\n  <div class=\"chat bg-secondary d-inline-block text-left text-white mb-2\">\n    <div class=\"chat-bubble\">\n      <small class=\"chat-username\">" + data.username + "</small>\n      <p class=\"m-0 chat-message\">" + data.message + "</p>\n    </div>\n  </div>\n</div>");
    };
    $('.sidebar-form').keyup(function(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        username = event.target.value;
        $('.username').append(username);
        $('#username').val(username);
        $('.username').removeClass('d-none');
        $('.sidebar-form').addClass('d-none');
        $('#message').removeAttr("disabled");
        $('#message').focus();
      }
    });
    $('#chat-form').on('ajax:success', function(data) {
      $('#chat-form')[0].reset();
    });
    pusher = new Pusher('ff571542681f592e96f7', {
      cluster: 'eu',
      encrypted: true
    });
    channel = pusher.subscribe('chat');
    channel.bind('new', function(data) {
      console.log('testst')
      updateChat(data);
      return false
    });
})

