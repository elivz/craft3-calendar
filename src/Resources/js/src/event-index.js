"use strict";Craft.EventIndex=Craft.BaseElementIndex.extend({buttonGroup:null,init:function(t,e,n){this.on("selectSource",$.proxy(this,"updateButton")),this.on("selectSite",$.proxy(this,"updateButton")),this.base(t,e,n)},getDefaultSourceKey:function(){return this.base()},updateButton:function(){if(this.$source){this.resetMenuButton();var t=this.$source,e=t.data(),n=e.id,r=e.name,a=e.handle,i=e.key,s="*"===i,o=this.getValidSources().filter(function(t){return t.id!==n}),u=$("<div />",{"class":"btngroup submit"}),d=this.createMenuList(o),l=void 0,c=void 0,f="btn submit";s?(l=Craft.t("calendar","New Event"),f+=" menubtn"):(l=Craft.t("calendar","New {calendar} Event",{calendar:r}),f+=" add icon",c=this.getSourceUrl(a));var h=$("<a />",{"class":f,href:c,text:Craft.escapeHtml(l)}).appendTo(u);d.appendTo(u);var p=h;!s&&o.length>0&&(p=$("<div />",{"class":"btn submit menubtn"}).insertBefore(d)),new Garnish.MenuBtn(p),this.buttonGroup=u,this.addButton(this.buttonGroup)}},resetMenuButton:function(){this.buttonGroup&&this.buttonGroup.remove()},createMenuList:function(t){var e=$("<div />",{"class":"menu"}),n=$("<ul />").appendTo(e),r=!0,a=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){var u=s.value,d=u.name,l=u.handle,c=u.color,f=$("<li />");$("<a />",{href:this.getSourceUrl(l),text:Craft.escapeHtml(d)}).prepend($("<span />",{"class":"color-indicator"}).css({backgroundColor:c})).appendTo(f),f.appendTo(n)}}catch(h){a=!0,i=h}finally{try{!r&&o["return"]&&o["return"]()}finally{if(a)throw i}}return e},getValidSources:function(){for(var t=this.$sources,e=[],n=0;n<t.length;n++){var r=$(t[n]),a=r.data(),i=a.key,s=a.id,o=a.handle,u=a.name,d=a.color,l=a.sites,c=void 0===l?"":l;if("*"!==i){var f=(""+c).split(",").map(function(t){return parseInt(t)});f.indexOf(this.siteId)!==-1&&e.push({key:i,id:s,handle:o,name:u,color:d})}}return e},getSourceUrl:function(t){var e=this,n=Craft.sites.find(function(t){return t.id===e.siteId}),r=n.handle;return Craft.getUrl("calendar/events/new/"+t+"/"+r)}}),Craft.registerElementIndexClass("Solspace\\Calendar\\Elements\\Event",Craft.EventIndex);