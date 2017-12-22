
//sampe directive for css
ngApp.directive('backgroundImage', function(){
  return function(scope, element, attrs){
      var url = attrs.backImg;
      element.css({
          'background': 'url(' + url +') no-repeat',
      });
  };
});

ngApp.directive('setWidthPercent', function(){
  return function(sope, element, attrs){
      var widthPercent = attrs.setWidthPercent;
      element.css({
          'width': widthPercent+"%",
      });
  };
});

