(function( $ ) {
  	//custome event
  	var event = jQuery.Event("gnotify-event-hide");
	//defining default settings and merging/extending the user define 'options'
	var settings = {
		'top': 0,
		'left': 0,
		'height': $(window).height(),
		'width': $(window).width(),

		'location' : 'top-center',
		'background-color' : '#F9EDBE',
		'foreground-color' : '#222222',
		'border-color'     : '#F0C36D', 
		'showimage': true,
		'msg': 'Loading...'
	};
	
	//defining methods in a single namespace//
	//this is apparently the advice from jquery
	var methods = {
		//default method
		init: function( options ){
			return this.each(function(){
				//defining default settings and merging/extending the user define 'options'
				settings = $.extend( settings , options );

				//defining html element for the notifier
				//if there already remove it//
				$('#gnotifier').remove();
				var div = $('<div />');
				$(div).attr('id', 'gnotifier');
				$(div).addClass('gnotifier');
				//$(div).css('visibility','hidden');
				$(div).live('gnotifier-hide-event', function(){
					alert('Triggered');
					console.log('tiggered');
					$(div).remove();
					$('.gnotifier').remove();
				});

				//setting up display div
				$(div).css('padding','5px 10px');
				$(div).css('font-weight','bold');
				$(div).css('font-size','100%');
				$(div).css('display', 'block');
				$(div).css('position', 'absolute');
				$(div).css('z-index', '10001');
				
				//if user disables image then dont show it//
				if(settings['showimage'] != false)	$(div).append('<img style="margin-right: 5px;" src="./images/loading.gif" />');

				//now the sekxy message//
				$(div).append(settings.msg);

				$(div).css('background', settings['background-color'] + ' none repeat scroll 0%');
				$(div).css('foreground-color', settings['foreground-color']);
				$(div).css('border', '1px solid ' + settings['border-color']);

				var width  = 0;
				var height = 0;
				if(settings['location'] == 'top-center'){
					width = (settings.width - $(div).width())/2;
					width = width - ($(div).width()/2);
					$(div).css('top', settings.top);
					$(div).css('left', width );
				}else if(settings['location'] == 'top-left'){
					$(div).css('top', settings.top);
					$(div).css('left', settings.left);
				}else if(settings['location'] == 'top-right'){
					width = (settings.width - $(div).outerWidth(true));
					$(div).css('top', settings.top);
					$(div).css('left', width);
				}else if(settings['location'] == 'sub-center'){
					width  = (settings.width - $(div).outerWidth(true))/2;
					height = (settings.height - $(div).outerWidth(true))/3;
					$(div).css('top', height );
					$(div).css('left', width );

				}else if(settings['location'] == 'center'){
					width  = (settings.width - $(div).outerWidth(true))/2;
					height = (settings.height - $(div).outerWidth(true))/2;
					$(div).css('top', height );
					$(div).css('left', width );
				
				}else{
					width = (settings.width - $(div).outerWidth(true))/2;
					$(div).css('top', settings.top);
					$(div).css('left', width );
				}

				//add the new element to the dom and 
				//make it visible
				$(div).appendTo('body');
				$(div).css('visibility','visible');
			});
		},
		//hiding the notification if not need anymore
		hide: function(){
			//return 'this' object to support method chaining
			return this.each(function(){
				//$(div).css('display', 'none');
				//$(div).css('visibility',' hidden');
				$('#gnotifier').trigger('gnotifier-hide-event');

				// function open() {
				// //blah
				// $('#id')triggerHandler({ type:"lightbox.open" });
				// //more
				// }

				// which could then later be caught by anyone using your plugin like so:


				// $(function() {
				// $('#id').on("lightbox.open", function() {
				// alert("The lightbox just opened. Woo!");
				// });
				// });

			});
		},
		update: function(msg){
			return this.each(function(msg){
				$(div).html(msg);
			});
		}
	};

	//Now call the methods defined above
	$.fn.Notify = function( method, options ) {
		if(!this){
			alert('this is not defined');
			$.error( 'Method ' +  method + ' does not exist on jQuery.notifi' );
			return;
		}

		if(methods[method]){
			methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if( typeof method === 'object' || !method){
			methods.init.apply( this, arguments );
		}else
			$.error( 'Method ' +  method + ' does not exist on jQuery.notifi' );
	}
  	

})( jQuery, window, undefined );

