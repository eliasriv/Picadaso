(function(a){AWEContent.Models.TableCol=Backbone.RelationalModel.extend({defaults:{tagName:"td",content:"cell"}});AWEContent.Collections.TableColList=Backbone.Collection.extend({model:AWEContent.Models.TableCol});AWEContent.Views.TableColView=Backbone.View.extend({tagName:function(){return this.model.get("tagName")},className:function(){return this.model.get("className")},initialize:function(){this.listenTo(this.model,"destroy",this.destroy)},render:function(){var b=this;if(this.model.get("tagName")=="col"){var c=this.model.get("colWidth")||"";this.$el.html(this.model.get("content"));this.$el.css({width:c})}else{this.$el.html('<div class="content" >'+this.model.get("content")+"</div>");var d,e;AWEContent.jqIframe(".content",this.el).hallo({plugins:{halloformat:{formattings:{bold:true,italic:true,underline:true,strikethrough:true}},hallojustify:{},hallolists:{lists:{ordered:true,unordered:true}}},create:function(){this.addEventListener("paste",function(f){f.preventDefault();var g=f.clipboardData.getData("text/plain");AWEContent.documentIframe.execCommand("insertHTML",false,g)})},editable:true,deactivated:function(f){b.changeContent(f);e=a(f.target).height();if(e!=d){a(f.target).closest(".awe-section").trigger("resize")}}})}},destroy:function(){this.remove()},changeContent:function(c){var b=a(c.currentTarget).html();this.model.set("content",b)}});AWEContent.Models.TableRow=Backbone.RelationalModel.extend({defaults:{type:"tbody",colums:[]},relations:[{type:Backbone.HasMany,key:"colums",relatedModel:AWEContent.Models.TableCol,relatedCollection:AWEContent.Collections.TableColList}],clone:function(){var b=new AWEContent.Collections.TableColList();this.get("colums").each(function(c){b.add(c.clone())});return new AWEContent.Models.TableRow({colums:b})}});AWEContent.Views.TableRowView=Backbone.View.extend({tagName:"tr",type:function(){return this.model.get("type")},initialize:function(){this.listenTo(this.model.get("colums"),"add",this.addColum);this.listenTo(this.model,"destroy",this.destroy)},render:function(){var b=this;this.model.get("colums").each(function(d){var c=new AWEContent.Views.TableColView({model:d});c.render();b.$el.append(c.$el)})},destroy:function(){this.remove()},addColum:function(d,e,c){var b=new AWEContent.Views.TableColView({model:d});b.render();this.$el.append(b.$el)}});AWEContent.Collections.TableRowList=Backbone.Collection.extend({model:AWEContent.Models.TableRow});AWEContent.Models.TableItem=AWEContent.Models.Item.extend({defaults:{machine_name:"table",title:"Title Tables",TableColums:3,TableRows:3,TableHeader:1,TableFooter:1,EqualColum:0,ColOddBG:"",ColEvenBG:"",RowOddBG:"",RowEvenBG:"",CellBorderEnable:1,CellPaddingEnable:0,customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:0,customDataAnimations:'{"type" : "none"}',cellModelSettings:{},boxModelSettings:{},content:[],lgResponsive:true,xsResponsive:true,mediumResponsive:true,smResponsive:true},relations:[{type:Backbone.HasMany,key:"content",relatedModel:AWEContent.Models.TableRow,relatedCollection:AWEContent.Collections.TableRowList},{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings},{type:Backbone.HasOne,key:"cellModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],createView:function(){this.view=new AWEContent.Views.TableItem({model:this})},clone:function(){var b={};a.each(this.toJSON(),function(c,d){b[c]=d});b.boxModelSettings=new AWEContent.Models.BoxModelSettings(b.boxModelSettings);b.cellModelSettings=new AWEContent.Models.BoxModelSettings(b.cellModelSettings);return new AWEContent.Models.TableItem(b)}});AWEContent.Views.TableItem=AWEContent.Views.Item.extend({styleTemplate:_.template("            <%= classtable  %> tbody tr:nth-child(odd) { background-color: <%= rowoddbg  %>;}            <%= classtable  %> tbody tr:nth-child(even) { background-color: <%= rowevenbg  %>;}            <%= classtable  %> colgroup col:nth-child(odd) { background-color: <%= coloddbg  %>;}            <%= classtable  %> colgroup col:nth-child(even) { background-color: <%= colevenbg  %>;}        "),initialize:function(){this.resizeInitialized=false;AWEContent.Views.Item.prototype.initialize.call(this);this.listenTo(this.model.get("content"),"add",this.addRow);this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged);this.listenTo(this.model.get("cellModelSettings"),"change",this.applySettingsChanged);var b=this;this.$el.hover(function(){if(!b.resizeInitialized){b.rowResize()}})},renderItemContent:function(){var n=this,m=a("<table></table>"),l=a("<thead></thead>"),c=a("<tfoot></tfoot>"),j=a('<div class="awe-item awe-table '+n.cid+'"></div>'),d=n.model.toJSON(),g=this.styleTemplate({classtable:"."+n.cid,rowoddbg:d.RowOddBG,rowevenbg:d.RowEvenBG,coloddbg:d.ColOddBG,colevenbg:d.ColEvenBG});m.append("<thead></thead>").append("<tbody></tbody>").append("<tfoot></tfoot>");this.model.get("content").each(function(q){var p=new AWEContent.Views.TableRowView({model:q});p.render();switch(q.get("type")){case"colgroup":var o=new AWEContent.Views.TableRowView({model:q,tagName:"colgroup"});o.render();m.prepend(o.$el);break;case"theader":m.find("thead").append(p.$el);break;case"tbody":m.find("tbody").append(p.$el);break;case"tfooter":m.find("tfoot").append(p.$el);break}});if(!d.TableHeader){a("thead",m).hide()}if(!d.TableFooter){a("tfoot",m).hide()}m.attr("id",d.customID).addClass(d.customClass);j.prepend(m);j.append('<style class="table-style">'+g+"</style>");m.renderItemDefaultBoxModel(d.boxModelSettings);m.renderItemDefaultAttributes(d.customEnableAttributes,d.customDataAttributes);if(d.customEnableAnimations){var e=d.customDataAnimations;j.processAnimations(e)}j.append('<style class="cell-border"></style>');j.append('<style class="cell-padding"></style>');var h=a(".cell-border",j),b=a(".cell-padding",j),i=d.cellModelSettings;if(i.enabledCustomBorder==0){h.html("")}else{if(i.enabledCustomBorder==1){var k="";if(i.enabledConstraintBorder==1){k="."+n.cid+" table td, ."+n.cid+" table th{border: "+i.borderTop+"}"}else{k="."+n.cid+" table td, ."+n.cid+" table th {border-top: "+i.borderTop+"}";k+="."+n.cid+" table td, ."+n.cid+" table th {border-bottom: "+i.borderBottom+"}";k+="."+n.cid+" table td, ."+n.cid+" table th {border-left: "+i.borderLeft+"}";k+="."+n.cid+" table td, ."+n.cid+" table th {border-right: "+i.borderRight+"}"}if(j.find(".cell-border").length){h.html(k)}else{j.append('<style class="cell-border">'+k+"</style>")}}}if(i.enabledCustomPadding==0){b.html("")}else{if(i.enabledCustomPadding==1){var f="";if(i.enabledConstraintPadding==1){f="."+n.cid+" table td, ."+n.cid+" table th{padding: "+i.paddingTop+"px}"}else{f="."+n.cid+" table td, ."+n.cid+" table th {padding-top: "+i.paddingTop+"px}";f+="."+n.cid+" table td, ."+n.cid+" table th {padding-bottom: "+i.paddingBottom+"px}";f+="."+n.cid+" table td, ."+n.cid+" table th {padding-left: "+i.paddingLeft+"px}";f+="."+n.cid+" table td, ."+n.cid+" table th {padding-right: "+i.paddingRight+"px}"}if(j.find(".cell-padding").length){b.html(f)}else{j.append('<style class="cell-padding">'+f+"</style>")}}}n.$el.defaultResponsive(d);return j},applySettingsChanged:function(d,j){var i=this,b=i.model.toJSON(),f=b.cellModelSettings,e=a(".awe-item",i.el),h=a("table",i.el),g=a(".awe-table tbody td",i.el),c=i.$el.height();a.each(d.changed,function(C,x){switch(C){case"TableColums":i.model.get("content").each(function(M,L){var E=M.get("colums").length,G=x>E?(x-E):(E-x);if(x>E){for(var H=0;H<G;H++){var D=(M.get("type")=="theader")?"th":(M.get("type")=="colgroup")?"col":"td",J=(M.get("type")=="theader")?"Header":(M.get("type")=="tfooter")?"Footer":(M.get("type")=="colgroup")?"":"cell",K=new AWEContent.Models.TableCol({tagName:D,content:J});M.get("colums").add(K)}}else{for(var F=0;F<G;F++){var I=M.get("colums").pop();I.destroy()}}});i.rowResize();i.$el.closest(".awe-section").trigger("resize");break;case"TableRows":var q=i.model.get("TableHeader"),l=i.model.get("TableFooter"),n=i.model.get("content").length,v=x+3;if(n<v){for(var z=0;z<(v-n);z++){var m=i.model.get("content").models["1"].clone();m.set({type:"tbody"});m.get("colums").each(function(E,D){E.set({tagName:"td",content:"cell"})});i.model.get("content").add(m)}}else{var o=i.model.get("content"),u=o.length-1,r=n-v;while(r&&u!=-1){var s=i.model.get("content").at(u);if(s.get("type")=="tbody"){r--;o.remove(s);s.destroy()}u--}}i.$el.closest(".awe-section").trigger("resize");break;case"TableHeader":var B=i.model.get("content").models;a("thead th",i.el).css("width","");a("tr:first-child td",i.el).css("width","");if(x==0){a(".awe-table thead",i.$el).hide();i.iframeJQuery("tbody tr:first td",i.el).resizable("enable").find(".ui-resizable-handle").css("width","")}else{a(".awe-table thead",i.$el).show();i.iframeJQuery("tbody tr:first td",i.el).resizable("disable").find(".ui-resizable-handle").css("width","0")}i.$el.closest(".awe-section").trigger("resize");break;case"TableFooter":if(x==0){a(".awe-table tfoot",i.$el).hide()}else{a(".awe-table tfoot",i.$el).show()}i.$el.closest(".awe-section").trigger("resize");break;case"EqualColum":if(!a(".awe-table style.table-col-with",i.el).length){a(".awe-table",i.el).append('<style class="table-col-with"></style>')}if(x==0){a(".awe-table style.table-col-with",i.el).html("")}else{a(".awe-table td, .awe-table th, .awe-table col",i.$el).attr("style","");a(".awe-table style.table-col-with",i.el).html(".awe-table."+i.cid+" >table >colgroup >col {width: 1%;}")}i.$el.closest(".awe-section").trigger("resize");break;case"RowOddBG":case"RowEvenBG":case"ColOddBG":case"ColEvenBG":if(i.updateColor){clearTimeout(i.updateColor)}i.updateColor=setTimeout(function(){var D=i.styleTemplate({classtable:"."+i.cid,rowoddbg:b.RowOddBG,rowevenbg:b.RowEvenBG,coloddbg:b.ColOddBG,colevenbg:b.ColEvenBG});if(a(".awe-table style.table-style",i.el).length){a(".awe-table style.table-style",i.el).html(D)}else{a(".awe-table",i.el).append('<style class="table-style">'+D+"</style>")}i.updateColor=false},100);break;case"customID":h.attr("id",x);break;case"customClass":var w=i.model.previousAttributes().customClass;h.removeClass(w).addClass(x);break;case"customEnableAttributes":h.renderChangeSettingsAttributes(C,x,b.customDataAttributes);break;case"customActionAttributes":h.renderChangeSettingsAttributes(C,x);break;case"customEnableAnimations":var A,k;if(x){A=b.customDataAnimations;k=null;e.processAnimations(A)}else{A=null;k=b.customDataAnimations;e.processAnimations(A,k)}break;case"customDataAnimations":var A,k;A=b.customDataAnimations;k=i.model.previousAttributes().customDataAnimations;e.processAnimations(A,k);break;default:var y=Object.keys(d.toJSON());if(a.inArray(C,y)>-1){if(d.get("nameBox")==="box"){h.renderChangeSettingBoxModel(C,x,d);if(C==="enabledCustomBorderRadius"){if(x){h.css("overflow","hidden")}else{h.css("overflow","")}}}else{if(f.enabledCustomBorder==0){a("style.cell-border",i.el).html("")}else{if(f.enabledCustomBorder==1){var p="";if(f.enabledConstraintBorder==1){p="."+i.cid+" table td, ."+i.cid+" table th{border: "+f.borderTop+"}"}else{p="."+i.cid+" table td, ."+i.cid+" table th {border-top: "+f.borderTop+"}";p+="."+i.cid+" table td, ."+i.cid+" table th {border-bottom: "+f.borderBottom+"}";p+="."+i.cid+" table td, ."+i.cid+" table th {border-left: "+f.borderLeft+"}";p+="."+i.cid+" table td, ."+i.cid+" table th {border-right: "+f.borderRight+"}"}if(a("style.cell-border",i.el).length){a("style.cell-border",i.el).html(p)}else{a(".awe-table",i.el).append('<style class="cell-border">'+p+"</style>")}}}if(f.enabledCustomPadding==0){a("style.cell-padding",i.el).html("")}else{if(f.enabledCustomPadding==1){var t="";if(f.enabledConstraintPadding==1){t="."+i.cid+" table td, ."+i.cid+" table th{padding: "+f.paddingTop+"px}"}else{t="."+i.cid+" table td, ."+i.cid+" table th {padding-top: "+f.paddingTop+"px}";t+="."+i.cid+" table td, ."+i.cid+" table th {padding-bottom: "+f.paddingBottom+"px}";t+="."+i.cid+" table td, ."+i.cid+" table th {padding-left: "+f.paddingLeft+"px}";t+="."+i.cid+" table td, ."+i.cid+" table th {padding-right: "+f.paddingRight+"px}"}if(a("style.cell-padding",i.el).length){a("style.cell-padding",i.el).html(t)}else{a(".awe-table",i.el).append('<style class="cell-padding">'+t+"</style>")}}}i.$el.closest(".awe-section").trigger("resize")}}else{i.$el.changeResponsive(C,x)}break}});setTimeout(function(){i.checkChangeHeight(c)},100)},addRow:function(e,d,b){var c=new AWEContent.Views.TableRowView({model:e});c.render();switch(e.get("type")){case"theader":a("table thead",this.$el).append(c.$el);break;case"tbody":a("table tbody",this.$el).append(c.$el);break;case"tfooter":a("table tfoot",this.$el).append(c.$el);break}},rowResize:function(){var b=this,d,c=b.model.toJSON();b.iframeJQuery("th:not(.ui-resizable), tbody tr:first td:not(.ui-resizable)",b.el).resizable({handles:"e",start:function(){var e=a(this).index();b.model.set("EqualColum",0,{updateToPanel:true});a("col",b.el).eq(e).css("width","")},stop:function(h,j){var f=a(this).index(),i=f+1,g=j.size.width,e=b.model.get("content").at(0).get("colums").at(f);b.iframeJQuery("col",b.el).eq(f).css({width:g});e.set({colWidth:g})}});if(c.TableHeader){b.iframeJQuery("tbody tr:first td",b.el).resizable("disable").find(".ui-resizable-handle").css("width","0")}else{b.iframeJQuery("tbody tr:first td",b.el).resizable("enable").find(".ui-resizable-handle").css("width","");b.iframeJQuery("thead",b.el).hide()}this.resizeInitialized=true}});AWEContent.Views.TableItemController=AWEContent.Views.ItemController.extend({machineName:"table",controllerHtml:function(){return'<div class="title-icon">Table</div><i class="ic ac-icon-table"></i>'},createItemModel:function(d){if(d){d.cellModelSettings=new AWEContent.Models.BoxModelSettings(d.cellModelSettings);d.boxModelSettings=new AWEContent.Models.BoxModelSettings(d.boxModelSettings);var i=new AWEContent.Collections.TableRowList(),h=d.content.length;a.each(d.content,function(q,p){var r=new AWEContent.Models.TableRow();a.each(p.colums,function(t,u){var s=new AWEContent.Models.TableCol(u);r.get("colums").add(s)});p.colums=r.get("colums");i.add(p)});d.content=i;return new AWEContent.Models.TableItem(d)}else{var m=new AWEContent.Models.BoxModelSettings({nameBox:"cell"}),f=new AWEContent.Models.BoxModelSettings({nameBox:"box"}),n=new AWEContent.Models.TableCol({tagName:"th",content:"Header"}),g=new AWEContent.Models.TableCol({tagName:"col",content:""}),o=new AWEContent.Models.TableCol(),c=new AWEContent.Models.TableCol({content:"Footer"}),l=new AWEContent.Models.TableRow({type:"colgroup",tagName:"colgroup",colums:[g,g.clone(),g.clone()]}),e=new AWEContent.Models.TableRow({type:"theader",colums:[n,n.clone(),n.clone()]}),b=new AWEContent.Models.TableRow({type:"tbody",colums:[o,o.clone(),o.clone()]}),k=new AWEContent.Models.TableRow({type:"tfooter",colums:[c,c.clone(),c.clone()]}),j=new AWEContent.Collections.TableRowList([l,e,b,b.clone(),b.clone(),k]);return new AWEContent.Models.TableItem({cellModelSettings:m,boxModelSettings:f,content:j})}}});AWEContent.Views.TablePanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-table",panelName:"table",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var b=this;a("#table-number-colums",b.el).change(function(d,c){b.editingModel.set("TableColums",c.value)});a("#table-number-rows",b.el).change(function(d,c){b.editingModel.set("TableRows",c.value)});a("#table-enable-header input",b.el).change(function(d,c){if(!c){b.editingModel.set("TableHeader",parseInt(a(this).val()))}});a("#table-enable-footer input",b.el).change(function(d,c){if(!c){b.editingModel.set("TableFooter",parseInt(a(this).val()))}});a("#table-equal-colum-width input",b.el).change(function(d,c){if(!c){b.editingModel.set("EqualColum",a(this).val())}});a("#table-odd-col-background",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("ColOddBG",c)});a("#table-even-col-background",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("ColEvenBG",c)});a("#table-odd-row-background",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("RowOddBG",c)});a("#table-even-row-background",b.el).change(function(d,c){if(c){c=c.toRgbString()}else{c=""}b.editingModel.set("RowEvenBG",c)});a("#table-column-box-model",b.el).initBoxModelPanel(b,"boxModelSettings");a("#table-column-box-model-cell",b.el).initBoxModelPanel(b,"cellModelSettings");a("#text-table-custom-id",b.el).change(function(){b.editingModel.set("customID",a(this).val())});a("#text-table-custom-class",b.el).change(function(){b.editingModel.set("customClass",a(this).val())});a("#table-custom-attributes",this.el).initAttributesPanel(b);a("#table-animations",this.el).change(function(c,d){b.editingModel.set("customEnableAnimations",d.enabled);if(d){b.editingModel.set("customDataAnimations",d.animations)}})},setPanelElementsValue:function(){var b=this,c=this.editingModel.toJSON();a("#table-number-colums",b.el).aweSlider("value",c.TableColums);a("#table-number-rows",b.el).aweSlider("value",c.TableRows);a("#table-enable-header input",b.el).val(c.TableHeader).trigger("change",true);a("#table-enable-footer input",b.el).val(c.TableFooter).trigger("change",true);a("#table-equal-colum-width input",b.el).val(c.EqualColum).trigger("change",true);a("#table-odd-row-background",this.el).aweColorPicker("value",c.RowOddBG);a("#table-even-row-background",this.el).aweColorPicker("value",c.RowEvenBG);a("#table-odd-col-background",this.el).aweColorPicker("value",c.ColOddBG);a("#table-even-col-background",this.el).aweColorPicker("value",c.ColEvenBG);a("#table-column-box-model",this.el).initBoxModel(c.boxModelSettings);a("#table-column-box-model-cell",this.el).initBoxModel(c.cellModelSettings);a("#text-table-custom-id",this.el).val(c.customID);a("#text-table-custom-class",this.el).val(c.customClass);a("#table-custom-attributes",this.el).initAttributes(c.customEnableAttributes,c.customDataAttributes);a("#table-animations",this.el).aweAnimation("value",{enabled:c.customEnableAnimations,animations:c.customDataAnimations,previewEl:b.editingModel.view.$el});if(!this.editingModel.isFirstEdit){this.listenTo(this.editingModel,"change:EqualColum",this.updateEqualColumnController);this.editingModel.isFirstEdit=1}},updateEqualColumnController:function(c,d,b){if(b.updateToPanel){a("#table-equal-colum-width input",this.$el).val(d).trigger("change",true)}},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Table</h2></div>'},custom_attributes:{type:"section",number_colums:{type:"slider",title:"Columns",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],default_value:4,allow_type:true},number_rows:{type:"slider",title:"Rows",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],default_value:4,allow_type:true},enable_header:{type:"toggle",title:"Table header",default_value:1},enable_footer:{type:"toggle",title:"Table footer",default_value:1},equal_colum_width:{type:"toggle",title:"Equal column width",default_value:0}},custom_background:{type:"section",odd_row_background:{type:"colorpicker",title:"Odd row background",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},even_row_background:{type:"colorpicker",title:"Even row background",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},odd_col_background:{type:"colorpicker",title:"Odd Col background",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}},even_col_background:{type:"colorpicker",title:"Even col background",options:{preferredFormat:"rgb",AlphaVerticle:true,showAlpha:true,allowEmpty:true,showInput:true}}},custom_cell:{type:"section",column_box_model_cell:{type:"tabs",tabs:[{tab_title:"Cell Border",contents:{custom_border_cell:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Cell padding",contents:{custom_padding_cell:{type:"box_model",model_type:"padding",allow_type:true,min_value:0,max_value:100,default_value:0}}}]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:true,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"Custom class"},default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}}});a(document).ready(function(){AWEContent.Controllers.table=new AWEContent.Views.TableItemController();AWEContent.Panels.table=new AWEContent.Views.TablePanel()})})(jQuery);