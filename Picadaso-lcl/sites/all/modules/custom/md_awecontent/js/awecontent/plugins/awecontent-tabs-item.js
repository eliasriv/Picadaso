(function(a){AWEContent.Models.TabItem=Backbone.RelationalModel.extend({defaults:{title:"",content:[],icon:"ic ac-icon-done"},clone:function(){var b=new AWEContent.Collections.ListColumn();this.get("content").each(function(c){b.add(c.clone())});return new AWEContent.Models.TabItem({title:this.get("title"),content:b})}});AWEContent.Views.TabItem=Backbone.View.extend({tabController:_.template('<li class="awe-tab-item">                <a href="#custom-obj-tab-<%= tabIndex %>">                    <span class="awe-tab-icon"><i class="<%= tabIcon %>"></i></span>                    <span class="awe-tab-title"><%= tabTitle %></span>                </a>                <div class="awe-custom cus-tab-item">                    <ul>                        <li class="awe-tab-item-clone"><i class="ic ac-icon-clone"></i></li>                        <li class="awe-tab-item-del"><i class="ic ac-icon-trash"></i></li>                        <li class="awe-tab-item-move"><i class="ic ac-icon-move"></i></li>                    </ul>                </div>            </li>'),initialize:function(){this.listenTo(this.model,"destroy",this.remove)},render:function(b){var c=new AWEContent.Views.ListColumn({collection:this.model.get("content")});this.$el.append(c.$el).attr("id","custom-obj-tab-"+this.model.cid)},remove:function(){this.$el.remove()}});AWEContent.Collections.ListTabItem=Backbone.Collection.extend({model:AWEContent.Models.TabItem});AWEContent.Models.TabsItem=AWEContent.Models.Item.extend({defaults:{machine_name:"tabs",tabPosition:"tabs-left",enableIcon:0,iconPosition:"left",titleColorEnable:1,titleTextAlign:"tabs-title-left",normalTextColor:"",normalBackgroundColor:"",hoverTextColor:"",hoverBackgroundColor:"",activeTextColor:"",activeBackgroundColor:"",boxModelSettings:{},customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:0,customDataAnimations:'{"type" : "none"}',tabs:[],lgResponsive:true,xsResponsive:true,mediumResponsive:true,smResponsive:true},relations:[{type:Backbone.HasMany,key:"tabs",relatedModel:AWEContent.Models.TabItem,relatedCollection:AWEContent.Collections.ListTabItem,reverseRelation:{key:"tabsItem"}},{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],hasContentLayout:true,getContentColumnModel:function(h,g){var f=h.parent().parent(),e=f.attr("aria-labelledby"),d=a("li.awe-tab-item[aria-labelledby="+e+"]",f.parent().parent()),c=d.index(),b=this.get("tabs").at(c);return b.get("content").at(g)},createView:function(){this.view=new AWEContent.Views.TabsItem({model:this})},clone:function(){var c={},b=new AWEContent.Collections.ListTabItem();this.get("tabs").each(function(d){b.add(d.clone())});a.each(this.toJSON(),function(d,e){if(d!="tabs"){c[d]=e}});c.tabs=b;c.boxModelSettings=new AWEContent.Models.BoxModelSettings(c.boxModelSettings);return new AWEContent.Models.TabsItem(c)},removePanelView:function(){AWEContent.Models.Item.prototype.removePanelView.call(this);this.get("tabs").each(function(b){b.get("content").each(function(c){c.removePanelView()})})}});AWEContent.Views.TabsItem=AWEContent.Views.Item.extend({controller:_.template('<div class="select-tab">                <ul>                    <%= controllers %>                    <li class="awe-new-tab add-tab"><i class="ic ac-icon-add"></i></li>                </ul>            </div>'),titleColorStyle:_.template(".<%= className %> > .select-tab > ul > li.awe-tab-item {                background-color: <%= normalBgColor %>;            }            .<%= className %>  > .select-tab > ul > li.awe-tab-item > .ui-tabs-anchor {                color: <%= normalColor %>;                background-color: <%= normalBgColor %>;            }            .<%= className %>  > .select-tab > ul > li.awe-tab-item:hover,            .<%= className %> ul > li.awe-tab-item.ui-state-hover {                color: <%= hoverColor %> !important;                background-color: <%= hoverBgColor %> !important;            }            .<%= className %>  > .select-tab > ul > li.awe-tab-item:hover > .ui-tabs-anchor,            .<%= className %> li.awe-tab-item.ui-state-hover > .ui-tabs-anchor {                color: <%= hoverColor %> !important;                background-color: <%= hoverBgColor %> !important;            }            .<%= className %>  > .select-tab > ul > li.awe-tab-item.ui-state-active > .ui-tabs-anchor {                color: <%= activeColor %>;                background-color: <%= activeBgColor %>;            }"),additionalEvents:{"click > .awe-tabs > .select-tab > ul > li.awe-new-tab":"addTab","click > .awe-tabs > .select-tab > ul > li.awe-tab-item > .cus-tab-item > ul > li.awe-tab-item-del":"deleteTab","click > .awe-tabs > .select-tab > ul > li.awe-tab-item > .cus-tab-item > ul > li.awe-tab-item-edit":"editTitleTab","click > .awe-tabs > .select-tab > ul > li.awe-tab-item > .cus-tab-item > ul > li.awe-tab-item-clone":"cloneTab","click > .awe-tabs li.awe-tab-item .awe-tab-icon":"changeIcon","change > .awe-tabs li.awe-tab-item .awe-tab-icon":"changeIcon",},initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this);this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged);var b=this;b.iframeJQuery(b.$el).delegate(".awe-tabs","itemReady",function(){b.iframeJQuery(b.$el).undelegate();var c=b.iframeJQuery(this).tabs(),d;b.iframeJQuery(".select-tab > ul",b.iframeJQuery(this)).sortable({axis:"x",items:".awe-tab-item",handle:".awe-custom .awe-tab-item-move",start:function(e,f){d=f.item.index()},stop:function(g,h){var f=h.item.index(),e=b.model.get("tabs"),i=e.remove(e.at(d));e.add(i,{at:f,silent:true});c.tabs("refresh")}});if(b.model.get("tabPosition")=="tabs-vertical-right"||b.model.get("tabPosition")=="tabs-vertical-left"){b.iframeJQuery(".select-tab > ul",b.iframeJQuery(this)).sortable("option","axis","y")}b.editTitleTab();AWEContent.Panels.toolbarPanel.updateSortableColumn()})},renderItemContent:function(){var d=this,i="",e=a('<div class="md-content-tab"></div>'),b=a('<div class="awe-item awe-tabs"><style></style></div>'),f=d.model.toJSON(),c=a("> style",b);d.classTabs="awe-tab-"+this.cid;b.addClass(this.classTabs);this.totalTabs=0;d.model.get("tabs").each(function(l,j){d.totalTabs++;var k=new AWEContent.Views.TabItem({model:l}),m=(l.get("title"))?l.get("title"):"AWETab "+d.totalTabs;l.set("title",m);i+=k.tabController({tabIndex:l.cid,tabTitle:m,tabIcon:l.get("icon")});k.render();e.append(k.$el)});i=this.controller({controllers:i});b.append(i).append(e);b.addClass(f.tabPosition).addClass(f.titleTextAlign);if(f.titleColorEnable){var h={className:d.classTabs,normalColor:f.normalTextColor,normalBgColor:f.normalBgColor,hoverColor:f.hoverTextColor,hoverBgColor:f.hoverBackgroundColor,activeColor:f.activeTextColor,activeBgColor:f.activeBackgroundColor};c.html(d.titleColorStyle(h))}b.renderItemDefaultBoxModel(f.boxModelSettings);b.attr("id",f.customID).addClass(f.customClass);b.renderItemDefaultAttributes(f.customEnableAttributes,f.customDataAttributes);if(f.customEnableAnimations){var g=f.customDataAnimations;b.processAnimations(g)}d.$el.defaultResponsive(f);if(f.enableIcon){b.addClass("awe-tab-icon-enabled");if(f.iconPosition=="right"){b.addClass("awe-tab-icon-right")}}return b},applySettingsChanged:function(c){var b=this,d=b.model.toJSON(),f=a("> .awe-tabs",this.$el),g,e=b.$el.height();a.each(c.changedAttributes(),function(j,n){b.$el.changeResponsive(j,n);f.renderChangeSettingBoxModel(j,n,c);switch(j){case"tabPosition":var i=b.model.previousAttributes().tabPosition;f.removeClass(i).addClass(n);a("> .awe-tabs > .md-content-tab",b.$el).before(a("> .awe-tabs > .select-tab",b.$el));if(i=="tabs-vertical-left"||i=="tabs-vertical-right"){b.iframeJQuery("> .awe-tabs >.select-tab > ul",b.iframeJQuery(b.$el)).sortable("option","axis","x")}if(i.indexOf("tabs-bottom")!=-1){a("> .awe-tabs >.select-tab",b.$el).css({position:""});a(".awe-tabs",b.$el).css("height","");a("> .awe-tabs > .md-content-tab",b.$el).before(a("> .awe-tabs > .select-tab",b.$el))}if(n.indexOf("tabs-bottom")!=-1){a("> .awe-tabs > .select-tab",b.$el).css({position:"static"});a("> .awe-tabs > .md-content-tab",b.$el).after(a("> .awe-tabs > .select-tab",b.$el))}if(n=="tabs-vertical-right"){a("> .awe-tabs > .md-content-tab",b.$el).css({width:"100%","float":"none"}).after(a("> .awe-tabs > .select-tab",b.$el));b.iframeJQuery("> .awe-tabs >.select-tab > ul",b.iframeJQuery(b.$el)).sortable("option","axis","y")}if(n=="tabs-vertical-left"){a("> .awe-tabs > .md-content-tab",b.$el).css("width","").before(a("> .awe-tabs > .select-tab",b.$el));b.iframeJQuery("> .awe-tabs >.select-tab > ul",b.iframeJQuery(b.$el)).sortable("option","axis","y")}break;case"enableIcon":n?a(".awe-tabs",b.$el).addClass("awe-tab-icon-enabled"):a(".awe-tabs",b.$el).removeClass("awe-tab-icon-enabled");break;case"iconPosition":if(n=="left"){a(".awe-tabs",b.$el).removeClass("awe-tab-icon-right")}else{a(".awe-tabs",b.$el).addClass("awe-tab-icon-right")}break;case"titleColorEnable":var m={className:b.classTabs,normalColor:d.normalTextColor,normalBgColor:d.normalBgColor,hoverColor:d.hoverTextColor,hoverBgColor:d.hoverBackgroundColor,activeColor:d.activeTextColor,activeBgColor:d.activeBackgroundColor},k=n?b.titleColorStyle(m):"";a("> style",f).html(k);break;case"titleTextAlign":f.removeClass(b.model.previousAttributes().titleTextAlign).addClass(n);break;case"normalTextColor":case"normalBackgroundColor":case"hoverTextColor":case"hoverBackgroundColor":case"activeTextColor":case"activeBackgroundColor":b.updateTitleColor();break;case"customID":f.attr("id",n);break;case"customClass":g=b.model.previousAttributes().customClass;f.removeClass(g).addClass(n);break;case"customEnableAttributes":f.renderChangeSettingsAttributes(j,n,d.customDataAttributes);break;case"customActionAttributes":f.renderChangeSettingsAttributes(j,n);break;case"customEnableAnimations":var l,h;if(n){l=d.customDataAnimations;h=null;f.processAnimations(l)}else{l=null;h=d.customDataAnimations;f.processAnimations(l,h)}break;case"customDataAnimations":f.processAnimations(d.customDataAnimations,b.model.previousAttributes().customDataAnimations);break}});setTimeout(function(){b.checkChangeHeight(e)},50)},updateTitleColor:function(){var b=this,d=this.model.toJSON();if(this.updateColor){clearTimeout(this.updateColor)}var e={className:b.classTabs,normalColor:d.normalTextColor,normalBgColor:d.normalBackgroundColor,hoverColor:d.hoverTextColor,hoverBgColor:d.hoverBackgroundColor,activeColor:d.activeTextColor,activeBgColor:d.activeBackgroundColor},c=b.titleColorStyle(e);a(".awe-tabs > style",b.$el).html(c);a("li.awe-tab-item .ui-tabs-anchor",b.$el).css({"background-color":"",color:""});a("li.awe-tab-item",b.$el).css({"background-color":"",color:""})},addTab:function(){this.totalTabs++;var e=new AWEContent.Models.BoxModelSettings(),d=new AWEContent.Models.Column({items:new AWEContent.Collections.ListItem(),settings:new AWEContent.Models.ColumnSettings({boxModelSettings:e}),classes:new AWEContent.Models.BootstrapGrid()}),g=new AWEContent.Models.TabItem({content:new AWEContent.Collections.ListColumn([d])}),c=new AWEContent.Views.TabItem({model:g}),f="AWETab "+this.totalTabs,b=c.tabController({tabIndex:g.cid,tabTitle:f,tabIcon:g.get("icon")});c.render();c.model.set("title",f);a(b).insertBefore(a("> .awe-tabs > .select-tab > ul > li.awe-new-tab",this.$el));a("> .awe-tabs > .md-content-tab",this.$el).append(c.$el);this.iframeJQuery(" > .awe-tabs",this.iframeJQuery(this.el)).tabs("refresh");this.model.get("tabs").add(g,{silent:true});this.editTitleTab(":last");AWEContent.Panels.toolbarPanel.updateSortableColumn();this.resizeItem()},cloneTab:function(c){var l=this,f=a(c.target),k=f.closest(".awe-tab-item"),i=k.index(),d=l.model.get("tabs").at(i),e=d.clone(),b=new AWEContent.Views.TabItem({model:e}),h=e.get("title")+" Clone",g=e.get("icon"),j=b.tabController({tabIndex:e.cid,tabTitle:h,tabIcon:g});b.render();b.model.set("title",h);a(j).insertAfter(k);b.$el.insertAfter(a("> .awe-tabs > .md-content-tab",this.$el).children().eq(i));this.iframeJQuery(" > .awe-tabs",this.iframeJQuery(this.el)).tabs("refresh");this.model.get("tabs").add(e,{at:i+1,silent:true});this.editTitleTab(":eq("+(i+2)+")");AWEContent.Panels.toolbarPanel.updateSortableColumn();this.resizeItem()},deleteTab:function(e){var d=(a(e.target).hasClass("awe-tab-item-del"))?a(e.target):a(e.target).parents(".awe-tab-item-del"),f=d.parent().parent().parent(),c=f.index(),b=this.model.get("tabs").at(c);if(b.get("content")!=undefined){b.get("content").each(function(g,h){g.removePanelView()})}b=this.model.get("tabs").remove(b);f.remove();b.destroy();this.iframeJQuery(".awe-tabs",this.iframeJQuery(this.el)).tabs("refresh");this.resizeItem()},editTitleTab:function(e){var c=this,d,f,g,b,h=e;if(e==undefined){h=""}c.iframeJQuery("> .awe-tabs > .select-tab > ul > li"+h,c.iframeJQuery(c.$el)).prev().find("span.awe-tab-title").keydown(function(i){i.stopPropagation()}).click(function(i){i.preventDefault();i.stopPropagation();a(this).attr("contenteditable","true").focus()}).focusin(function(i){d=a(this).parents("li.awe-tab-item:first").index();f=c.model.get("tabs").at(d);g=f.get("title");a(this).text(g)}).focusout(function(i){d=a(this).parents("li.awe-tab-item:first").index();f=c.model.get("tabs").at(d);g=a(this).text();f.set("title",g);a(this).text(g);a(this).attr("contenteditable","false")})},changeIcon:function(e,f){var c=a(e.target).hasClass("awe-tab-icon")?a(e.target):a(e.target).parents(".awe-tab-icon"),d=c.parents("li.awe-tab-item:first").index(),b=this.model.get("tabs").at(d);if(e.type=="click"){c.attr("data-name-icon",b.get("icon"));AWEContent.Panels.listIconPanel.processIcon(c,{name:"accordion"})}if(e.type=="change"){b.set("icon",f.nameIcon);a("> i",c).removeClass().addClass(f.nameIcon)}}});AWEContent.Views.TabsItemController=AWEContent.Views.ItemController.extend({machineName:"tabs",controllerHtml:function(){return'<div class="title-icon">Tabs</div><i class="ic ac-icon-tabs"></i>'},createItemModel:function(f){if(f){var c=new AWEContent.Models.BoxModelSettings(f.boxModelSettings),b=new AWEContent.Collections.ListTabItem();f.boxModelSettings=c;a.each(f.tabs,function(i,k){var j=new AWEContent.Collections.ListColumn();a.each(k.content,function(l,n){var m=AWEContent.createColumnFromTemplate(n);j.add(m)});k.content=j;delete k.tabsItem;b.add(new AWEContent.Models.TabItem(k))});f.tabs=b;return new AWEContent.Models.TabsItem(f)}else{var e=new AWEContent.Models.BoxModelSettings(),d=new AWEContent.Models.Column({items:new AWEContent.Collections.ListItem(),settings:new AWEContent.Models.ColumnSettings({boxModelSettings:e}),classes:new AWEContent.Models.BootstrapGrid()}),h=new AWEContent.Models.TabItem({content:new AWEContent.Collections.ListColumn([d])}),g=new AWEContent.Models.BoxModelSettings();return new AWEContent.Models.TabsItem({tabs:new AWEContent.Collections.ListTabItem(h),boxModelSettings:g})}}});AWEContent.Views.TabsPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel tabs-panel",panelName:"tabs",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var b=this;a(".color-picker",b.el).append('<input type="hidden" name="changing-color">');a("#tabs-position",b.el).change(function(d,c){b.editingModel.set("tabPosition",c.value)});a("#tabs-enable-icon input",this.$el).change(function(c,e){var d=parseInt(a(this).val());if(d){a("#tabs-icon-pos",b.$el).show()}else{a("#tabs-icon-pos",b.$el).hide()}if(!e){b.editingModel.set("enableIcon",d)}});a("#tabs-icon-pos",b.$el).change(function(d,c){b.editingModel.set("iconPosition",c.value)});a("#tabs-title-color input",b.el).change(function(d,c){if(parseInt(a(this).val())){a(this).closest(".toggle-enable").nextAll().show()}else{a(this).closest(".toggle-enable").nextAll().hide()}if(!c){b.editingModel.set("titleColorEnable",parseInt(a(this).val()))}});a("#tabs-title-align",b.el).change(function(d,c){b.editingModel.set("titleTextAlign",c.value)});a("#tabs-normal-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("normalTextColor",c)});a("#tabs-normal-background-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("normalBackgroundColor",c)});a("#tabs-hover-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("hoverTextColor",c)});a("#tabs-hover-background-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("hoverBackgroundColor",c)});a("#tabs-active-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("activeTextColor",c)});a("#tabs-active-background-color",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("activeBackgroundColor",c)});a("#tabs-column-box-model",b.el).initBoxModelPanel(b,"boxModelSettings");a("#text-tabs-custom-id",b.el).change(function(){b.editingModel.set("customID",a(this).val())});a("#text-tabs-custom-class",b.el).change(function(){b.editingModel.set("customClass",a(this).val())});a("#tabs-custom-attributes",this.el).initAttributesPanel(b);a("#tabs-animations",this.el).change(function(c,d){b.editingModel.set("customEnableAnimations",d.enabled);if(d){b.editingModel.set("customDataAnimations",d.animations)}})},setPanelElementsValue:function(){var b=this,c=this.editingModel.toJSON();a("#tabs-position",b.el).aweSelect("value",c.tabPosition);if(!Drupal.settings.enable_icon){a("#tabs-enable-icon, #tabs-icon-pos",this.$el).remove()}else{a("#tabs-enable-icon input",this.$el).val(c.enableIcon).trigger("change",true);a("#tabs-icon-pos",this.$el).aweSelect("value",c.iconPosition)}a("#tabs-title-color input",b.el).val(c.titleColorEnable).trigger("change",{isPanel:true});a("#tabs-title-align",b.el).aweSelect("value",c.titleTextAlign);a("#tabs-normal-color",b.el).aweColorPicker("value",c.normalTextColor);a("#tabs-normal-background-color",b.el).aweColorPicker("value",c.normalBackgroundColor);a("#tabs-hover-color",b.el).aweColorPicker("value",c.hoverTextColor);a("#tabs-hover-background-color",b.el).aweColorPicker("value",c.hoverBackgroundColor);a("#tabs-active-color",b.el).aweColorPicker("value",c.activeTextColor);a("#tabs-active-background-color",b.el).aweColorPicker("value",c.activeBackgroundColor);a("#tabs-column-box-model",b.el).initBoxModel(c.boxModelSettings);a("#text-tabs-custom-id",b.el).val(c.customID);a("#text-tabs-custom-class",b.el).val(c.customClass);a("#tabs-custom-attributes",this.el).initAttributes(c.customEnableAttributes,c.customDataAttributes);a("#tabs-animations",this.el).aweAnimation("value",{enabled:c.customEnableAnimations,animations:c.customDataAnimations,previewEl:b.editingModel.view.$el})},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Tabs</h2></div>'},custom_attributes:{type:"section",position:{type:"select",title:"Position",options:{"tabs-left":"Top Left","tabs-center":"Top Center","tabs-right":"Top Right","tabs-bottom tabs-left":"Bottom Left","tabs-bottom tabs-center":"Bottom Center","tabs-bottom tabs-right":"Bottom Right","tabs-vertical-left":"Vertical Left","tabs-vertical-right":"Vertical Right"},default_value:"tab-left"},enable_icon:{type:"toggle",title:"Enable icon",default_value:0},icon_pos:{type:"select",title:"Icon pos",options:{left:"Left",right:"Right"},default_value:"left"}},Custom_title:{type:"section",title:{type:"markup",markup:'<div class="name-title"><h4>Tab title</h4></div>'},title_align:{type:"select",title:"Align",options:{"tabs-title-left":"Left","tabs-title-center":"Center","tabs-title-right":"Right"},default_value:"tabs-title-left"},title_color:{type:"toggle",title:"Enable custom title color",default_value:0},display_model_color:{type:"tabs",tabs:[{tab_title:"Normal",contents:{normal_color:{type:"colorpicker",title:"Text color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},normal_background_color:{type:"colorpicker",title:"Background color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}}}},{tab_title:"Hover",contents:{hover_color:{type:"colorpicker",title:"Text color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},hover_background_color:{type:"colorpicker",title:"Background color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}}}},{tab_title:"Active",contents:{active_color:{type:"colorpicker",title:"Text color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},active_background_color:{type:"colorpicker",title:"Background color",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}}}}]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{custom_border_radius:{type:"box_model",model_type:"border_radius",allow_type:true,min_value:0,max_value:100,default_value:0}}},{tab_title:"Padding",contents:{custom_padding:{type:"box_model",model_type:"padding",allow_type:true,min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:true,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"Custom class"},default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}}});a(document).ready(function(){AWEContent.Controllers.tabs=new AWEContent.Views.TabsItemController();AWEContent.Panels.tabs=new AWEContent.Views.TabsPanel()})})(jQuery);