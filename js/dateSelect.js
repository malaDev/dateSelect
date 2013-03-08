(function(jQuery) {
	// définition du plugin jQuery
 	$.fn.dateSelect = function(opt) {
		// Fusionner les paramètres par défaut et ceux de l'utilisateur
		opt = $.extend({
			plInit:2012,
			calendar:'css/calendar.png',
			tabMois:['','Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'],
			titMois:['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
			conteneur:'table-cal',
			theme:'default'
		}, opt);
		var o=$(this);
		izQ=$(this);
		izH=this;
		var valMois=[0,1,2,3,4,5,6,7,8,9,10,11,12];
		var pos=o.position();
		var h=o.innerHeight()
		
		o.addClass('input-date-select');
		//console.log(o);
		var imgHTML=$('<img class="bt-date-select" src="'+opt.calendar+'"/>');
		var img=imgHTML.appendTo(o.parent());
		var table;
		
		o.focus(function(){o.blur()})
		
		img.click(function(){
			var tab=opt.tabMois;
			def=$.init0(o,opt.plInit);
			if ($('.table-bloc').length==0){
				var divTable=$('<div id="'+opt.conteneur+'">').appendTo('body');
				table=$('<table class="table-bloc">').appendTo(divTable);
				table.addClass(opt.theme);
				var topCal=$('<tr id="top-cal" class="top-cal">').appendTo(table);
				
				for (i=0;i<4;i++){
					$('<tr >').appendTo(table);
				}
				var tr=table.find('tr');
				//console.log(tr);
				
				$('<td colspan="3"><table id="int-top-cal"><tr><td class="bt-left"></td><td id="content-annee">'+def.annee+'</td><td class="bt-right"></td><tr></table></td>').appendTo($('#top-cal'));
				var iterTr=1;
				for (i=1;i<tab.length;i++){
					var trAdded=$('<td class="select-mois" title="'+opt.titMois[i]+'" val="'+tab[i]+'">'+tab[i]+'</td>').appendTo(tr.eq(iterTr));
					if(i%3==0)iterTr++;
					if(def.mois==tab[i])trAdded.addClass('selected-mois');
				}
				
				//design
				var tdTop=$('#top-cal');
				var widthTop=tdTop.outerWidth();

				var inTop=$('#int-top-cal');
				//console.log(widthTop);
				inTop.css('width',widthTop);			
				
				divTable.css('position','absolute');
				divTable.css('top',parseInt(pos.top)+parseInt(h)+parseInt(9)+'px');
				divTable.css('left',parseInt(pos.left)+'px');
				
				//direction gauche/droite
				var imgLeft=$('<img class="img-bt img-left" src="css/dir-left.png"/>').appendTo($('.bt-left'));
				var imgRight=$('<img class="img-bt img-right" src="css/dir-right.png"/>').appendTo($('.bt-right'));
				imgLeft.click(function(){
					var annee=parseInt($('#content-annee').text());
					annee--;
					$('#content-annee').text(annee);
					$('.selected-mois').removeClass('selected-mois');
					def=$.init0(o,opt.plInit);
					if (annee==def['annee'])table.find('td.select-mois[val="'+def['mois']+'"]').addClass('selected-mois');
				});
				imgRight.click(function(){
					var annee=parseInt($('#content-annee').text());
					annee++;
					$('#content-annee').text(annee);
					$('.selected-mois').removeClass('selected-mois');
					def=$.init0(o,opt.plInit);
					if (annee==def['annee'])table.find('td.select-mois[val="'+def['mois']+'"]').addClass('selected-mois');					
				});
				$('.select-mois').click(function(){
					var annee=parseInt($('#content-annee').text());
					var mois=$(this).text();
					o.val(mois+'-'+annee);
					table.parent().slideUp(800,function(){divTable.remove()});
				});
				$(document).bind('keydown', function(e) {
					if (e.keyCode == 27){
						table.parent().fadeOut(function(){divTable.remove()});
					}
					return true
				})
			}
		});
		
	};
	$.init0=function(o,valAn){
		def={};
		if(o.val()!=''){
			var valu=o.val();
			tab_=valu.split('-');
			def['annee']=tab_[1];
			def['mois']=tab_[0];
		}else{
			def['annee']=valAn;
			def['mois']='';
		}
		return def;
	};
})(jQuery);