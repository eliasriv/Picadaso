(function(a){AWEContent.Models.SectionSettings=Backbone.RelationalModel.extend({bgImageURL:"",defaults:{customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[]",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',enabledFullScreen:0,enabledFluid:0,equalRowHeight:0,rowSpacing:-1,bgColor:"",bgFid:-1,bgImage:"",bgMode:"repeat",bgPosition:"center center",enableScrolling:0,enabledBgOverlay:0,bgOverlayColor:"",enableBackgroundVideo:0,bgVideoUrl:"",enableAutoPlayVideo:1,enableShowButton:0,enableMute:0,boxModelSettings:{},lgResponsive:true,xsResponsive:true,mediumResponsive:true,smResponsive:true,hoverResponsive:false},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],clone:function(){var b={};a.each(this.toJSON(),function(c,d){b[c]=d});b.boxModelSettings=new AWEContent.Models.BoxModelSettings(b.boxModelSettings);return new AWEContent.Models.SectionSettings(b)}});AWEContent.Models.Section=Backbone.RelationalModel.extend({defaults:{columns:[],settings:{}},relations:[{type:Backbone.HasOne,key:"settings",relatedModel:AWEContent.Models.SectionSettings,reverseRelation:{key:"section",type:Backbone.HasOne}}],clone:function(){var b=new AWEContent.Collections.ListColumn(),c=this.get("settings").clone();this.get("columns").each(function(d){b.add(d.clone())});return new AWEContent.Models.Section({columns:b,settings:c})}});AWEContent.Views.Section=Backbone.View.extend({tagName:"section",className:"awe-section creating",template:_.template('<div class="container"></div>            <div class="awe-custom custom-section">                <ul>                    <li class="js-section-move"><i class="ic ac-icon-move"></i></li>                    <li class="js-add-column"><i class="ic ac-icon-add"></i></li>                    <li class="toogle-pull js-edit-section" data-it="edit-section"><i class="ic ac-icon-edit"></i></li>                    <li class="cus-show-more">                        <i class="ic ac-icon-ellipsis-h"></i>                        <ul class="cus-more-contain">                            <li class="js-clone-section"><i class="ic ac-icon-clone"></i></li>                            <li class="totrash js-delete-section"><i class="ic ac-icon-trash"></i></li>                            <li class="js-save-section cus-res-mode cus-save"><i class="ic ac-icon-save"></i></li>                        </ul>                    </li>                </ul>            </div>'),events:{"click > .custom-section .js-add-column":"addColumn","click > .custom-section .js-edit-section":"editSectionSettings","click > .custom-section .js-clone-section":"cloneSection","click > .custom-section .js-delete-section":"destroy","click > .custom-section .js-save-section":"saveSection"},initialize:function(){var b=this;this.model.set("connectSpacingToColumn",false);this.listenTo(this.model.get("settings"),"change",this.renderChangeSectionSetting);this.listenTo(this.model.get("settings").get("boxModelSettings"),"change",this.renderChangeSectionSetting);this.listenTo(this.model.get("columns"),"add",this.listenChangeListColumn);this.listenTo(this.model.get("columns"),"remove",this.listenChangeListColumn);this.listenTo(this.model,"change",this.listenChangeListColumn);this.render();this.$el.resize(function(d,c){b.sectionResize(d,c)});a(window).resize(function(){b.fullScreen();b.processResize()});this.$el.bind("getImageURLSuccess",function(d,c){})},sectionResize:function(c,b){if(b==undefined){this.processEqualRowHeight()}this.processResize(b)},processEqualRowHeight:function(){var c=this,d=c.model.get("settings"),b=d.get("equalRowHeight");if(b){var e=0;a.each(a("> .container > .row > .awe-col > .awe-col-content > .awe-col-wrapper",c.$el),function(){a(this).css("min-height","");e=a(this).height()>e?a(this).height():e});c.model.get("columns").each(function(f,g){f.get("settings").unset("heightEqual",{silent:true}).set({enableMinHeight:0,heightEqual:e});f.get("settings").get("heightEqual")});c.$el.addClass("awe-equal-column")}else{c.model.get("columns").each(function(f,g){f.get("settings").set({enableMinHeight:1,heightEqual:-1})});c.$el.removeClass("awe-equal-column")}this.processResize()},render:function(){if(AWEContent.alwaysFluid&&AWEContent.module&&AWEContent.module==="block_painter"){this.model.get("settings").set("enabledFluid",1)}var b=new AWEContent.Views.ListColumn({collection:this.model.get("columns")});this.$el.append(this.template());a("> .container",this.$el).append(b.$el);this.$el.addClass("awe-model-"+this.model.cid);this.$el.mouseover(function(c){a(this).addClass("hover");c.stopPropagation()}).mouseout(function(c){a(this).removeClass("hover");c.stopPropagation()});this.renderSectionSetting()},addColumn:function(c){var d=new AWEContent.Models.BoxModelSettings(),b=new AWEContent.Models.Column({classes:new AWEContent.Models.BootstrapGrid(),items:new AWEContent.Collections.ListItem(),settings:new AWEContent.Models.ColumnSettings({boxModelSettings:d})});this.model.get("columns").add(b)},editSectionSettings:function(){AWEContent.Panels.section.editModel(this.model)},cloneSection:function(){var c=this.model.clone(),b=this.model.collection.indexOf(this.model);this.model.collection.add(c,{at:b+1})},destroy:function(){var c=this,b=AWEContent.Panels.section,d=c.model.get("columns");if(b.isOpenned&&b.$el.data("model.id")==this.model.cid){b.$el.removeAttr("data-model.id");b.closePanel()}d.each(function(e){e.removePanelView()});this.model.collection.remove(this.model);this.model.destroy();this.remove()},saveSection:function(){AWEContent.templateDialog.savedElement=this.$el;AWEContent.templateDialog.type="section";AWEContent.templateDialog.open({title:"",data:this.model.toJSON(),category:"custom"})},renderSectionSetting:function(){var c=this,d=c.model.get("settings").toJSON(),e=c.$el;c.$overlay=a('<div class="section-bg-overlay custom-overlay"></div>');e.attr("id",d.customID);if(d.customEnableAttributes&&d.customDataAttributes!=""){var f=a.parseJSON(d.customDataAttributes);a.each(f,function(h,g){e.attr("data-"+g.attrName,g.attrValue)})}if(d.customClass){c.$el.addClass(d.customClass)}c.fullScreen();if(d.enabledFluid||AWEContent.alwaysFluid){a(" > .container",c.$el).css("width","100%")}this.$el.aweImageURL({fid:[d.bgFid],styles:["none"],success:function(g,j,i,h){c.getBackgroundImageURL(g,j,i,h)}});if(d.bgMode=="parallax"){c.$el.attr("data-parallax",true)}else{c.$el.attr("data-parallax",false)}c.$el.attr("data-scrolling",d.enableScrolling?true:false);AWEContent.jqIframe(c.el).parallax();if(d.enableBackgroundVideo!=""){c.setVideo()}if(d.enabledBgOverlay){e.prepend(c.$overlay);c.$overlay.css("background-color",d.bgOverlayColor)}e.renderItemDefaultBoxModel(d.boxModelSettings,c.$overlay);c.$el.defaultResponsive(d);var b=setInterval(function(){if(a("> .container > .row > .awe-col:eq(0) >.ui-resizable-handle",c.el).length){clearInterval(b);c.processEqualRowHeight()}},50)},renderChangeSectionSetting:function(d,c){var b=this,e=b.$el,f=a("> .container",e);a.each(d.changed,function(h,j){b.$el.changeResponsive(h,j);e.renderChangeSettingBoxModel(h,j,d,b.$overlay);switch(h){case"customID":e.attr("id",j);break;case"customClass":var g=d.previousAttributes().customClass;if(g){e.removeClass(g)}e.addClass(j);break;case"customEnableAttributes":if(d.get("customDataAttributes")!="[]"){var k=[];k=a.parseJSON(d.get("customDataAttributes"));a.each(k,function(m,l){if(j){e.attr("data-"+l.attrName,l.attrValue)}else{e.removeAttr("data-"+l.attrName)}})}break;case"customDataAttributes":if(c&&c.action&&c.data){if(c.action=="addAttr"||c.action=="updateAttr"){e.attr(c.data.attrName,c.data.attrValue)}else{e.removeAttr(c.data.attrName)}}break;case"enabledFullScreen":b.fullScreen();b.$el.resize();break;case"enabledFluid":if(j||AWEContent.alwaysFluid){f.css("width","100%")}else{f.css("width","")}break;case"rowSpacing":b.setSpacingColumn();break;case"equalRowHeight":b.processEqualRowHeight();break;case"bgColor":case"bgFid":case"bgPosition":b.processBackground(d.toJSON(),e);break;case"bgMode":if(j=="parallax"){b.$el.attr("data-parallax",true)}else{b.$el.attr("data-parallax",false)}b.processBackground(d.toJSON(),e);break;case"enableScrolling":if(j){b.$el.attr("data-scrolling",true)}else{b.$el.attr("data-scrolling",false)}break;case"enabledBgOverlay":if(j){a(">.container",b.el).before(b.$overlay)}else{a("> .section-bg-overlay",e).remove()}break;case"bgOverlayColor":b.$overlay.css("background-color",j);break;case"enableBackgroundVideo":if(!j){a("> .frame-embed",b.$el).remove();b.processBackground(d.toJSON(),e)}else{b.setVideo()}break;case"bgVideoUrl":b.setVideo();break;case"enableAutoPlayVideo":b.setVideo();break;case"enableMute":if(typeof b.player=="object"&&b.player.mute){j?b.player.mute():b.player.unMute()}if(typeof b.player=="object"&&b.player.element){var i=j?0:1;b.player.api("setVolume",i)}break;case"enableShowButton":if(j){a("> .frame-embed > .awe-media-control",e).show()}else{a("> .frame-embed > .awe-media-control",e).hide()}break}})},setSpacingColumn:function(){var b=this,e=this.model.get("columns"),g=[],d=0,f=this.model.get("settings").get("rowSpacing"),c=0;g[0]=[];e.each(function(i,j){var h=b.isColumnShow(i);d+=h.isOffset;if(d>12||h.newRow){d=h.isOffset;c++;g[c]=[]}g[c].push(j)});a.each(g,function(h,j){var i=j.length-1;a.each(j,function(m,l){var n=e.at(l),o=n.get("settings").get("boxModelSettings"),k=(f-30)/2;if(i&&f!=-1){o.set("enabledCustomMargin",1);if(m==0){o.set("marginLeft",0);o.set("marginRight",k)}else{if(m==i){o.set("marginLeft",k);o.set("marginRight",0)}else{o.set("marginLeft",k);o.set("marginRight",k)}}}})})},isColumnShow:function(c){var e=AWEContent.Toolbars.responsive,f=c.get("classes").toJSON(),d=c.view.$el,b="";switch(e){case"col-lg":b="lg-hidden";break;case"col-md":b="md-hidden";break;case"col-sm":b="sm-hidden";break;case"col-xs":b="xs-hidden";break}if(d.hasClass(b)){return{isOffset:0,newRow:0}}else{if(d.css("clear")=="none"){return{isOffset:f[e]+f[e+"-offset"],newRow:0}}else{if(d.css("clear")=="both"){return{isOffset:f[e]+f[e+"-offset"],newRow:1}}}}},listenChangeListColumn:function(){var b=this;setTimeout(function(){b.setSpacingColumn()},100);this.model.set("connectSpacingToColumn",false)},fullScreen:function(){var b=this,c=b.model.toJSON().settings,d=b.$el;if(c){if(c.enabledFullScreen){var e=a(window).height();d.css("min-height",e+"px")}else{d.css("min-height","")}}},processYT:function(d){var b=this;b.player=new AWEContent.windowIframe.YT.Player(d,{events:{onReady:c}});function c(){if(b.model.get("settings").toJSON().enableMute){b.player.mute()}else{b.player.unMute()}}},setVideo:function(){var c=this;AWEContent.Library.addLibrary("video",b);function b(){AWEContent.jqIframe(">.frame-embed",c.$el).remove();if(c.model.get("settings").toJSON().bgVideoUrl==""){return false}c.$el.prepend('<div class="frame-embed">                        <iframe id="iframe-video-'+c.cid+'" class="frame-embed-item iframe-video" src="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>                        <div class="overlay-iframe" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0""></div>                        <div class="awe-media-control"><a class="media-btn"></a></div>                    </div>');var h=c.model.get("settings").toJSON(),l=AWEContent.jqIframe(">.frame-embed",c.$el),m=AWEContent.jqIframe(">#iframe-video-"+c.cid,l).attr("src",""),i=AWEContent.jqIframe(".overlay-iframe",l),k=AWEContent.jqIframe(">.awe-media-control",l),j=AWEContent.jqIframe(">.media-btn",k),f=a.processVideo(h.bgVideoUrl),e;c.player="";k.hide();var g=setInterval(function(){if(AWEContent.jqIframe("> .frame-embed > #iframe-video-"+c.cid,c.$el).length>0){clearInterval(g);d()}},50);function d(){if(h.enableBackgroundVideo&&f.typeVideo!=""){m.attr("src",f.attrVideo);if(h.enableAutoPlayVideo){e=m.attr("src").replace("autoplay=0","autoplay=1");m.attr("src",e);i.css("background","");j.addClass("pause-btn")}else{c.processBackground(h,i);j.addClass("play-btn")}if(f.typeVideo=="vimeo"){m[0].onload=function(){c.processResize();if(h.enableShowButton){k.show()}c.player=AWEContent.windowIframe.Froogaloop(m[0]);var n=h.enableMute?0:1;c.player.api("setVolume",n);j.click(function(){if(j.hasClass("pause-btn")){j.removeClass("pause-btn").addClass("play-btn");a(this).addClass("active").prev().removeClass("active");c.player.api("pause")}else{j.removeClass("play-btn").addClass("pause-btn");a(this).addClass("active").next().removeClass("active");i.css("background","");c.player.api("play")}})}}if(f.typeVideo=="youtube"){if(!h.enableShowButton){e=m.attr("src").replace("controls=1","controls=0");m.attr("src",e)}m[0].onload=function(){c.processYT("iframe-video-"+c.cid);if(h.enableShowButton){k.show()}j.click(function(){if(j.hasClass("pause-btn")){j.removeClass("pause-btn").addClass("play-btn");a(this).addClass("active").prev().removeClass("active");c.player.pauseVideo()}else{j.removeClass("play-btn").addClass("pause-btn");a(this).addClass("active").next().removeClass("active");i.css("background","");c.player.playVideo()}});c.processResize()}}}c.$el.css({"background-image":"","background-repeat":"","background-attachment":"","background-size":"","background-position":""})}}},processResize:function(c){var o=this,h=a("> .frame-embed",o.$el),n=a("> iframe",h),k=16/9,j=h.outerWidth(),i=h.outerHeight(),e=1,l,g,b,f,m,d;if(n.length==0){return false}if(i!=0&&j!=0){e=j/i}if(e<=k){b=j/k;g=j*i/b;d=-(g-j)/2+"px";n.css({top:"",left:d,height:"",width:g+"px"})}else{f=i*k;l=i*j/f;m=-(l-i)/2+"px";n.css({left:"",top:m,width:"",height:l+"px"})}},processBackground:function(g,f){var d=this,g=g,h=g.bgColor,c="",i="",b="",e="";if(g.bgFid>0){c="url("+encodeURI(this.model.bgImageURL)+")";if(g.bgMode=="parallax"){i="";b="fixed";e="50% 0%/cover"}else{if(g.bgMode=="fullcover"){e="center/cover";b=""}else{i=g.bgMode;e=g.bgPosition}}h+=" "+c+" "+i+" "+b+" "+e}f.css("background",h);return h},getBackgroundImageURL:function(d,g,f,e){var c=this.model.toJSON().settings,b=e&&e[c.bgFid]&&e[c.bgFid]["none"]?e[c.bgFid]["none"]:"";this.model.bgImageURL=b;this.processBackground(c,this.$el)}});AWEContent.Collections.ListSection=Backbone.Collection.extend({model:AWEContent.Models.Section,createSection:function(){var c=new AWEContent.Models.BoxModelSettings(),b=new AWEContent.Models.Column({items:new AWEContent.Collections.ListItem(),settings:new AWEContent.Models.ColumnSettings({boxModelSettings:c}),classes:new AWEContent.Models.BootstrapGrid()}),d=new AWEContent.Models.Section({columns:new AWEContent.Collections.ListColumn([b]),settings:new AWEContent.Models.SectionSettings({boxModelSettings:new AWEContent.Models.BoxModelSettings()})});this.add(d)}});AWEContent.Views.ListSection=Backbone.View.extend({className:"awe-sections-wrapper",initialize:function(d){var c=this,b=-1;if(d.el){this.setElement(d.el)}this.render();AWEContent.jqIframe(c.el).sortable({handle:".js-section-move",items:".awe-section",axis:"y",tolerance:"pointer",containment:"body",start:function(e,f){b=f.item.index()},update:function(f,g){var e=g.item.index();if(e!=b){var h=c.collection.remove(c.collection.at(b),{silent:true});c.collection.add(h,{at:e,silent:true})}}});this.$el.sortable({handle:".section-move",items:"section.awe-section",tolerance:"pointer",placeholder:"awe-item-placeholder",start:function(e,f){a(".panel-template .obj-adjust").addClass("position-default");f.helper.css("z-index",9999)},stop:function(e,f){a("#panel-template .obj-adjust").removeClass("position-default")},update:function(g,h){var f=a("input[name=template-data]",h.item).val().trim();if(f){var e=JSON.parse(f),i=AWEContent.createSectionFromTemplate(JSON.parse(e.data));AWEContent.sections.add(i,{at:a(".library-template-item",c.$el).index()})}a(".library-template-item",c.$el).remove()}});this.$el.sortable("disable");this.listenTo(this.collection,"add",this.addSection);AWEContent.iframe.contents().find("a.save-page-template").click(function(e){e.preventDefault();AWEContent.templateDialog.savedElement=AWEContent.iframe.contents().find("#awe-section-wrapper");AWEContent.templateDialog.type="page";AWEContent.templateDialog.showMsg=true;AWEContent.templateDialog.open({title:"",data:AWEContent.sections.toJSON()})})},render:function(){a(".awe-section",this.$el).remove();this.collection.each(function(c){var b=new AWEContent.Views.Section({model:c});if(a(".add-section",this.$el).length){b.$el.insertBefore(a(".add-section",this.$el))}else{this.$el.append(b.$el)}},this)},addSection:function(e){var d=this.collection.indexOf(e),c=new AWEContent.Views.Section({model:e});if(d===0){this.$el.prepend(c.$el)}else{var b=a("> .awe-section:eq("+(d-1)+")",this.$el);if(b.length){c.$el.insertAfter(b)}else{this.$el.append(c.$el)}}AWEContent.Panels.toolbarPanel.updateSortableColumn(a(".awe-col-wrapper",c.$el))}})})(jQuery);