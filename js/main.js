
(function(win, $, Handlebars){
  "use strict";
  if( $("#urlparams-root").length ) {
    $("#urlparams-root").remove();
    return;
  }
  var url = location.href.split("?")[0],
      query = location.href.split("?")[1]||"",
      data = {
        url: url,
        params: []
      },
      temp = Handlebars.compile(
                '<div id="urlparams-root" class="urlparams-container" >' +
								'  <form action="/" method="get" >' +
								'    <table class="table table-striped table-border">' +
								'      <thead>' +
								'        <tr><th>Name</th><th>Value</th></tr>' +
								'      </thead>' +
								'      <tbody id="urlparams-tbody">' +
								'        {{#each params}}' +
								'        <tr>' +
								'          <td><input type="text" class="input-small param name" value="{{this.key}}"></td>' +
                '          <td><input type="text" class="input-small param value" value="{{this.val}}"></td>' +
                '          <td><a href="javascript:void(0);" class="btn delete" ><i class="icon-remove"></i></a></td>' +
								'        </tr>' +
								'        {{/each}}' +
								'      </tbody>' +
                '    </table>' +
                '    <div class="center"><input type="button" value="Submit" class="btn btn-primary btn-large submit"></div>' +
								'  </form>' +
								'</div>'),
      $el,
      submit = function(){
        var list = [];
        $el.find("input.name").each(function(){
          var $this = $(this);
          list.push( $this.val() + "=" + ($this.parents().next("td").find("input.value").val()||"") );
        });

        location.href = data.url + "?" + list.join("&");

      };

  query.split("&").forEach(function(str){
    var key = str.split("=")[0],
        val = str.split("=")[1];
    data.params.push({
      key: key,
      val: val
    });
  });
  $el = $(temp(data));
  $(document.body).append($el);
  $el.delegate('input.param', 'keydown', function(ev){
      if(ev.keyCode === 13){
        submit();
      }
    })
    .delegate('input.submit', 'click', submit )
    .delegate('a.delete', 'click', function(){
      $(this).parents("tr").hide(150, function(){
        $(this).remove();
      });
    });



})(this, jQuery, this.Handlebars);
