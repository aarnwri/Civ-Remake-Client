import Ember from 'ember';

export default Ember.Route.extend({

  invite: '',

  inviteUser: function (invite) {
    this.invite = invite;

    invite.save().then(
      this.onInviteSuccess.bind(this),
      this.onInviteFail.bind(this)
    ).finally(
      this.onInviteFinally.bind(this)
    );
  },

  onInviteSuccess: function (invite) {
    console.log("invite post request was successful");
  },

  onInviteFail: function (error) {

    console.log("invite post request was fail: error: " + error.errors[0]);
    var userNotFound = error.errors.any(function (err) {
      return err === "could not find user";
    });

    if (userNotFound) {
      this.controllerFor('application').renderErrorModal({
        errorTitle: "User Not Found!",
        errorMessage: "Check the email spelling and try again",
      });
    }
  },

  onInviteFinally: function () {
    console.log("invite post request finally...");
  },

  actions: {
    sendInvite: function (invite) {
      // TODO: check for proper validation here before sending the invite
      console.log('send invite to ' + invite.get('email'));
      this.inviteUser(invite);
    }
  }
});
