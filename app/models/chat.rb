class Chat < ApplicationRecord
  after_create :notify_pusher

  def notify_pusher
    Pusher.trigger('chat', 'new', self.as_json)
  end
end
