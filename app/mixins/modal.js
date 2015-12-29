import Ember from "ember";

export default Ember.Mixin.create({

  modalTitle: '',
  modalBodyPartialName: 'partials/modal-bodies/default',
  modalSubmitTitle: '',
  modalSubmitAction: '',
  modalHasCancelButton: true,

  modalMessage: '',

  defaultModalOptions: function () {
    return {
      title: '',
      bodyPartial: 'partials/modal-bodies/default',
      submitTitle: '',
      submitAction: '',
      cancelButton: true,

      modalMessage: '',
    };
  },

  showModal: function () {
    var controller = this;

    $('#modal').modal('show');
    $('#modal').one('hidden.bs.modal', function () {
      controller.clearModalVars();
    });
  },

  hideModal: function () {
    $('#modal').modal('hide');
  },

  clearModalVars: function () {
    this.setModalVarsWithOptions(this.defaultModalOptions());
  },

  setModalVarsWithOptions: function (options) {
    this.set('modalTitle', options.title);
    this.set('modalBodyPartialName', options.bodyPartial);
    this.set('modalSubmitTitle', options.submitTitle);
    this.set('modalSubmitAction', options.submitAction);
    this.set('modalHasCancelButton', options.cancelButton);

    this.set('modalMessage', options.modalMessage);
  },

  //
  // standard modals
  //
  renderModal: function (options) {
    var mergedOptions = $.extend({}, this.defaultModalOptions(), options);

    this.setModalVarsWithOptions(mergedOptions);
    this.showModal();
  },

  //
  // error modals
  //
  // allowed options: errorTitle, errorMessage
  renderErrorModal: function (options) {
    var errorOptions = {
      title: options.errorTitle,
      bodyPartial: 'partials/modal-bodies/message',
      submitTitle: 'Ok',
      cancelButton: false,
      modalMessage: options.errorMessage
    };
    var mergedOptions = $.extend({}, this.defaultModalOptions(), errorOptions);

    this.setModalVarsWithOptions(mergedOptions);
    this.showModal();
  },

  actions: {
    forwardAction: function (action) {
      if (action === '') {
        this.hideModal();
      } else {
        this.send(action);
      }
    }
  }
});
