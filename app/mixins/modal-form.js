import Ember from "ember";

export default Ember.Mixin.create({

  modalFormTitle: '',
  partialToRenderInBody: 'partials/modal-bodies/default',

  footerSubmitButtonTitle: '',
  footerSubmitButtonAction: '',
  footerHasCancelButton: true,

  formValidated: false,

  onFormValidatedChange: function () {
    if (this.get('formValidated')) {
      $('#modal-form').modal('hide');
    }
  }.observes('formValidated'),

  setupModal: function (formTitle, partialName, submitTitle, actionName, hasCancelButton) {
    var controller = this;

    this.set('modalFormTitle', formTitle);
    this.set('partialToRenderInBody', partialName);
    this.set('footerSubmitButtonTitle', submitTitle);
    this.set('footerSubmitButtonAction', actionName);
    this.set('footerHasCancelButton', hasCancelButton);
    this.set('formValidated', false);

    $('#modal-form').modal('show');
    $('#modal-form').one('hidden.bs.modal', function () {
      controller.clearModal();
    });
  },

  clearModal: function () {
    this.set('modalFormTitle', '');
    this.set('partialToRenderInBody', 'partials/modal-bodies/default');
    this.set('footerSubmitButtonTitle', '');
    this.set('footerSubmitButtonAction', '');
    this.set('footerHasCancelButton', true);
    this.set('formValidated', false);
  },

  actions: {
    forwardAction: function (action) {
      this.send(action);
    }
  }
});
