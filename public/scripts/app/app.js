'use strict';

/**
* Canvas Module
*
* Description
*/

angular.module("canvas", ["ngRoute","ngDragDrop"])

.config(function($routeProvider) {
	$routeProvider.otherwise("/");
	$routeProvider.when("/",{
		templateUrl:"scripts/app/home/home.html",
		controller:"CanvasController"
	});
	console.log("configured");
})
.directive('draggable', function(){
  // Runs during compile
  return function(scope,element){
    var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
  };
})
.directive('droppable', function() {
    return {
        scope: {
          drop:'&'
        },
        link: function(scope, element) {
            // again we need the native object
          var el = element[0];
          el.addEventListener(
          'dragover',
          function(e) {
            e.dataTransfer.dropEffect = 'move';
            // allows us to drop
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
            },
            false
          );

          el.addEventListener(
    'dragenter',
    function(e) {
        this.classList.add('over');
        return false;
    },
    false
);

el.addEventListener(
    'dragleave',
    function(e) {
        this.classList.remove('over');
        return false;
    },
    false
);

el.addEventListener(
    'drop',
    function(e) {
        // Stops some browsers from redirecting.
        if (e.stopPropagation) e.stopPropagation();

        this.classList.remove('over');

        var item = document.getElementById(e.dataTransfer.getData('Text'));
        if(item.parentNode && item.parentNode.id!='dropper') {
          var item_clone = item.cloneNode(true);
          item_clone.classList.add('draggable');
          this.appendChild(item_clone);
        }
        console.log(e);
        //this.appendChild(item);
        scope.$apply(function(scope){
          var fn = scope.drop();
          if ('undefined' !== typeof fn) {
            fn(item.id, binId);
          }
        });
        return false;
    },
    false
);


        }
    }
})
.directive("drawing", function(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d');
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      // the last coordinates before the current move
      var centerX;
      var centerY;
      var currentX;
      var currentY;
      
      element.bind('mousedown', function(event){
        
        centerX = event.offsetX;
        centerY = event.offsetY;
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          //console.log(event);
          currentX = event.offsetX;
          currentY = event.offsetY;
          
          draw(centerX, centerY, currentX, currentY);
        }
        
      });

      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      function draw(startX, startY, currentX, currentY){
        reset();
        var sizeX = currentX - startX;
        var sizeY = currentY - startY;
        
        ctx.rect(startX, startY, sizeX, sizeY);
        ctx.lineWidth = 3;
        // color
        ctx.strokeStyle = '#fff';
        // draw it
        ctx.stroke();
      }
    }
  };
});

