import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeCreateRecordResponse: function (store, primaryModelClass, payload, id, requestType) {
    // console.log("store: " + store);
    // console.log('primaryModelClass: ' + primaryModelClass);
    // console.log('payload' + JSON.stringify(payload));
    // console.log('id' + id);
    // console.log('requestType' + requestType);

    window.payload = payload;

    var sanitizedPayload = {
      data: {
        id: payload.user.id,
        type: 'user',
        attributes: {
          email: payload.user.email
        },
        relationships: {
          session: {
            data:
              { id: payload.session.id, type: 'session' }
            
          }
        }
      },
      included: [
        {
          id: payload.session.id,
          type: 'session',
          attributes: {
            token: payload.session.token
          }
        }
      ]
    }

    return sanitizedPayload;
  }

});
