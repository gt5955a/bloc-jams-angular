(function() {
    function seekBar($document) {
        
        /**
        * @function calculatePercent
        * @desc Calculates percentage of seek bar length
        * @param {Object} seekBar {Object} event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element);
                
                /**
                * @function percentString
                * @desc Converts percentage into string
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /**
                * @function fillStyle
                * @desc Returns width of bar based on percent
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function thumbStyle
                * @desc Updates position of thumb
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @desc Updates seek bar value based on bar width and location of click
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function trackThumb
                * @desc Updates seek bar value when thumb is dragged
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();