$(function() {
  var $treeItemTools = $('#tree-item-tools'); 
  var getId = function(node) {
    if (node.hasClass('jstree')) return "ROOT";
    
    var link = node.closest('li');
    return link.attr('id');
  }
  
  var $roots = $(".sortable-tree");
  $roots.delegate('a[href="#"]', 'click', function() { return false; });
  
  $roots.delegate('li', 'mouseenter', function() {
    if (!$(this).find('a:first .tree-actions').length)
      $(this).find('a:first').append($treeItemTools.html());
  });
  $roots.delegate('li', 'mouseleave', function() {
    $(this).find('.tree-actions').remove();
  });
  
  $roots.delegate('li .tree-actions .edit', 'click', function() {
	  try{
		  console.log($(this).closest('a'), 'edited');
	  } catch(err){
		  
	  }
  });
  
  $roots.delegate('li .tree-actions span', 'click', function() {
	  	var redUrl = $(this).attr('href'); 
	  	redUrl = redUrl.substring(0, (redUrl.length-1)) + $(this).closest('li').attr('id');
	    document.location.href = redUrl;
	  });
  
  $roots.bind('move_node.jstree', function(e, data) {
    var rollback = data.rlbk;
    
    $.ajax({
      async: false,
      type: "POST",
      dataType: "json",
      url: nodeSortPostUrl,
      data: {
        parent: getId(data.rslt.np),
        node: getId(data.rslt.o),
        index: data.rslt.cp
      },
      success: function(data, textStatus, XMLHttpRequest) {
        if (data.status != "SUCCESS") {
          alert(data.error); 
          $.jstree.rollback(rollback);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
          $.jstree.rollback(rollback);
      }
    });
  }); 

  $roots.jstree({ 
    themes: { 
      "theme" : "classic", 
      "dots" : true, 
      "icons" : false
    },
    types: {
    	"max_children"  : 1,
    	"valid_children" : [ "homepage" ],
    	"types": {
    		"homepage": {
    			"valid_children" : [ "page" ],
    			"start_drag" : false,
				"move_node" : false
    		},
    		"page": {
    			"valid_children" : [ "page" ]
    		},
    	}
    },
    plugins: ["themes", "dnd", "html_data", "cookies", "types"]
  });
});