(function ($, window, undefined) {
  /// <param name="$" type="jQuery" />
  "use strict";

  if (typeof ($.signalR) !== "function") {
      throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
  }

  var signalR = $.signalR;

  function makeProxyCallback(hub, callback) {
      return function () {
          // Call the client hub method
          callback.apply(hub, $.makeArray(arguments));
      };
  }

  function registerHubProxies(instance, shouldSubscribe) {
      var key, hub, memberKey, memberValue, subscriptionMethod;

      for (key in instance) {
          if (instance.hasOwnProperty(key)) {
              hub = instance[key];

              if (!(hub.hubName)) {
                  // Not a client hub
                  continue;
              }

              if (shouldSubscribe) {
                  // We want to subscribe to the hub events
                  subscriptionMethod = hub.on;
              } else {
                  // We want to unsubscribe from the hub events
                  subscriptionMethod = hub.off;
              }

              // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
              for (memberKey in hub.client) {
                  if (hub.client.hasOwnProperty(memberKey)) {
                      memberValue = hub.client[memberKey];

                      if (!$.isFunction(memberValue)) {
                          // Not a client hub function
                          continue;
                      }

                      subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                  }
              }
          }
      }
  }

  $.hubConnection.prototype.createHubProxies = function () {
      var proxies = {};
      this.starting(function () {
          // Register the hub proxies as subscribed
          // (instance, shouldSubscribe)
          registerHubProxies(proxies, true);

          this._registerSubscribedHubs();
      }).disconnected(function () {
          // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
          // (instance, shouldSubscribe)
          registerHubProxies(proxies, false);
      });

      proxies['myHub'] = this.createHubProxy('myHub'); 
      proxies['myHub'].client = { };
      proxies['myHub'].server = {
          openWord: function (nExist, tikuprv, sdate, tguid, eguid, otherparams) {
              return proxies['myHub'].invoke.apply(proxies['myHub'], $.merge(["OpenWord"], $.makeArray(arguments)));
           },

          saveWord: function (nExist, mode, bucketName, sdate, tguid, eguid, otherparams) {
              return proxies['myHub'].invoke.apply(proxies['myHub'], $.merge(["SaveWord"], $.makeArray(arguments)));
           },

          send: function (name, message) {
              return proxies['myHub'].invoke.apply(proxies['myHub'], $.merge(["Send"], $.makeArray(arguments)));
           }
      };

      return proxies;
  };

  signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
  $.extend(signalR, signalR.hub.createHubProxies());

 }(window.jQuery, window));