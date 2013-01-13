
(function(win, $, Handlebars){
  "use strict";
  if( $("#urlparams-root").length ) {
    $("#urlparams-root").remove();
    return;
  }
  var url = location.href.split("?")[0],
      query = location.search.substr(1)||"",
      data = {
        url: url,
        params: []
      },
      trStr =   '<tr class="urlparams-tr" data-urlparams-name="{{this.key}}" data-urlparams-value="{{this.val}}">' +
                '    <td><input type="text" class="input-small param name" value="{{this.key}}"></td>' +
                '    <td><input type="text" class="input-small param value" value="{{this.val}}"></td>' +
                '    <td><a href="javascript:void(0);" class="btn delete" ><i class="icon-remove"></i></a></td>' +
                '</tr>',
      tr   = Handlebars.compile( trStr )({key: '', val: ''}),
      temp = Handlebars.compile(
                '<div id="urlparams-root" class="urlparams-container" >' +
								'  <form action="/" method="get" >' +
                '    <div class="input-prepend urlparams-narrow">' +
                '      <span class="add-on"><i class="icon-search"></i></span>'+
                '      <input type="text" class="narrow input-smart" value="" placeholder="Narrow parameter">' +
                '      <a href="javascript:void(0);" class="btn urlparams-clear" ><i class="icon-remove"></i></a>' +
                '    </div>' +
								'    <table class="table table-striped table-border">' +
								'      <thead>' +
								'        <tr><th>Name</th><th>Value</th></tr>' +
								'      </thead>' +
								'      <tbody id="urlparams-tbody">' +
								'        {{#each params}}' +
                trStr +
								'        {{/each}}' +
								'      </tbody>' +
                '    </table>' +
                '    <div class="center"><input type="button" value="Submit" class="btn btn-primary btn-large submit"></div>' +
								'  </form>' +
								'</div>'),
      $el,
      $narrow,
      $body = $(document.body),
      submit = function(){
        var list = [],
            q = "";
        $el.find("input.name").each(function(){
          var $this = $(this),
              key = $this.val(),
              val = $this.parents().next("td").find("input.value").val();
          if( key === "" && val === "" ) return;
          list.push( encodeURIComponent( key ) + "=" + encodeURIComponent( val ) );
        });
        q = list.join("&");
        location.href = data.url + ( q ? "?" + q : "") + location.hash;

      };

  query.split("&").forEach(function(str){
    var key = str.split("=")[0],
        val = str.split("=")[1];
    if( key === "" && typeof val === 'undefined' ) return;
    data.params.push({
      key: decodeURIComponent( key ),
      val: decodeURIComponent( val )
    });
  });
  // for Additional parameter
  data.params.push({
    key: "",
    val: ""
  });

  $el = $(temp(data));
  $narrow = $el.find("input.narrow");
  $el.delegate('input.param', 'keydown', function(ev){
      var $this, attr;
      if(ev.keyCode === 13){
        submit();
      } else {
        $this = $(this);
        attr = "data-urlparams-" + ( $this.hasClass("name") ? "name" : "value" );
        $this.parents("tr").attr( attr, $this.val() );
      }
    })
    .delegate('input.name', 'keydown', function(){
      var $this = $(this);
      $this.parents("tr").data("urlparams-name", $this.val());
    })
    .delegate('input.value', 'keydown', function(){
      var $this = $(this);
      $this.parents("tr").data("urlparams-value", $this.val());
    })
    .delegate('input.submit', 'click', submit )
    .delegate('a.delete', 'click', function(){
      var $this = $(this),
          tr = $this.parents("tr");
      if( ! $this.hasClass("disabled") ){
        tr.hide(100, function(){
          tr.remove();
        });
      }
    })
    .delegate('input.narrow', 'keyup', function(ev){
      var val = $narrow.val();
      if(val === ""){
        $el.find( '.urlparams-tr' ).show();
      } else {
        $el.find( '.urlparams-tr' ).hide();
        $el.find( '[data-urlparams-name*="'+val+'"], [data-urlparams-value*="'+val+'"]' ).show();
        if( ev.keyCode === 13 ){
          $el.find( 'input.param:visible:first' ).focus();
        }
      }
    })
    .delegate('a.urlparams-clear', 'click', function(){
      $narrow.val("").trigger("keyup");
      $narrow.focus();
    })
    .delegate('input.value:last', 'keyup', function(ev){
      var $this = $(this),
          $tr = $(tr);
      if( $this.val() === "" ) {
        return;
      }
      $this.parents().find(".delete").removeClass("disabled");
      $tr.find(".delete").addClass("disabled");
      $el.find("#urlparams-tbody").append($tr);
    });

  $body.append($el);
  $narrow.focus();
  $el.find(".urlparams-tr:last").find(".delete").addClass("disabled");

  $body.scrollTop(0);

})(this, jQuery, this.Handlebars);
