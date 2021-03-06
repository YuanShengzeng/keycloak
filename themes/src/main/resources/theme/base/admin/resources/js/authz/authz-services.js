module.factory('ResourceServer', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server', {
        realm : '@realm',
        client: '@client'
    }, {
        'update' : {method : 'PUT'},
        'import' : {url: authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/import', method : 'POST'},
        'settings' : {url: authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/settings', method : 'GET'}
    });
});

module.factory('ResourceServerResource', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/resource/:rsrid', {
        realm : '@realm',
        client: '@client',
        rsrid : '@rsrid'
    }, {
        'update' : {method : 'PUT'}
    });
});

module.factory('ResourceServerScope', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/scope/:id', {
        realm : '@realm',
        client: '@client',
        id : '@id'
    }, {
        'update' : {method : 'PUT'}
    });
});

module.factory('ResourceServerPolicy', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/policy/:id', {
        realm : '@realm',
        client: '@client',
        id : '@id'
    }, {
        'update' : {method : 'PUT'}
    });
});

module.factory('PolicyProvider', function($resource) {
    return $resource(authUrl + '/admin/realms/:realm/clients/:client/authz/resource-server/policy/providers', {
        realm : '@realm',
        client: '@client'
    });
});

module.service('AuthzDialog', function($modal) {
    var dialog = {};

    var openDialog = function(title, message, btns, template) {
        var controller = function($scope, $modalInstance, $sce, title, message, btns) {
            $scope.title = title;
            $scope.message = $sce.trustAsHtml(message);
            $scope.btns = btns;

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        return $modal.open({
            templateUrl: resourceUrl + template,
            controller: controller,
            resolve: {
                title: function() {
                    return title;
                },
                message: function() {
                    return message;
                },
                btns: function() {
                    return btns;
                }
            }
        }).result;
    }

    dialog.confirmDeleteWithMsg = function(name, type, msg, success) {
        var title = 'Delete ' + type;
        msg += 'Are you sure you want to permanently delete the ' + type + ' <strong>' + name + '</strong> ?';
        var btns = {
            ok: {
                label: 'Delete',
                cssClass: 'btn btn-danger'
            },
            cancel: {
                label: 'Cancel',
                cssClass: 'btn btn-default'
            }
        }

        openDialog(title, msg, btns, '/templates/authz/kc-authz-modal.html').then(success);
    };

    dialog.confirmDelete = function(name, type, success) {
        var title = 'Delete ' + type;
        var msg = 'Are you sure you want to permanently delete the ' + type + ' <strong>' + name + '</strong> ?';
        var btns = {
            ok: {
                label: 'Delete',
                cssClass: 'btn btn-danger'
            },
            cancel: {
                label: 'Cancel',
                cssClass: 'btn btn-default'
            }
        }

        openDialog(title, msg, btns, '/templates/authz/kc-authz-modal.html').then(success);
    }

    return dialog;
});