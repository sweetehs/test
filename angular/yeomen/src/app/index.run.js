(function() {
  'use strict';

  angular
    .module('yeomen')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
