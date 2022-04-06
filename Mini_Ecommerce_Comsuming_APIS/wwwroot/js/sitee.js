/*! jQuery Validation Plugin - v1.17.0 - 7/29/2017
 * https://jqueryvalidation.org/
 * Copyright (c) 2017 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!c.settings.submitHandler||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&(!j.form&&j.hasAttribute("contenteditable")&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr.pseudos||a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name"));var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0],this.name=d),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);if("function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f){if(j=f.call(b,j),"string"!=typeof j)throw new TypeError("The normalizer should return a string value.");delete g.normalizer}for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a});
// Unobtrusive validation support library for jQuery and jQuery Validate
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// @version v3.2.11
!function(a){"function"==typeof define&&define.amd?define("jquery.validate.unobtrusive",["jquery-validation"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery-validation")):jQuery.validator.unobtrusive=a(jQuery)}(function(a){function e(a,e,n){a.rules[e]=n,a.message&&(a.messages[e]=a.message)}function n(a){return a.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/g)}function t(a){return a.replace(/([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g,"\\$1")}function r(a){return a.substr(0,a.lastIndexOf(".")+1)}function i(a,e){return 0===a.indexOf("*.")&&(a=a.replace("*.",e)),a}function o(e,n){var r=a(this).find("[data-valmsg-for='"+t(n[0].name)+"']"),i=r.attr("data-valmsg-replace"),o=i?a.parseJSON(i)!==!1:null;r.removeClass("field-validation-valid").addClass("field-validation-error"),e.data("unobtrusiveContainer",r),o?(r.empty(),e.removeClass("input-validation-error").appendTo(r)):e.hide()}function d(e,n){var t=a(this).find("[data-valmsg-summary=true]"),r=t.find("ul");r&&r.length&&n.errorList.length&&(r.empty(),t.addClass("validation-summary-errors").removeClass("validation-summary-valid"),a.each(n.errorList,function(){a("<li />").html(this.message).appendTo(r)}))}function s(e){var n=e.data("unobtrusiveContainer");if(n){var t=n.attr("data-valmsg-replace"),r=t?a.parseJSON(t):null;n.addClass("field-validation-valid").removeClass("field-validation-error"),e.removeData("unobtrusiveContainer"),r&&n.empty()}}function l(e){var n=a(this),t="__jquery_unobtrusive_validation_form_reset";if(!n.data(t)){n.data(t,!0);try{n.data("validator").resetForm()}finally{n.removeData(t)}n.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"),n.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")}}function u(e){var n=a(e),t=n.data(v),r=a.proxy(l,e),i=f.unobtrusive.options||{},u=function(n,t){var r=i[n];r&&a.isFunction(r)&&r.apply(e,t)};return t||(t={options:{errorClass:i.errorClass||"input-validation-error",errorElement:i.errorElement||"span",errorPlacement:function(){o.apply(e,arguments),u("errorPlacement",arguments)},invalidHandler:function(){d.apply(e,arguments),u("invalidHandler",arguments)},messages:{},rules:{},success:function(){s.apply(e,arguments),u("success",arguments)}},attachValidation:function(){n.off("reset."+v,r).on("reset."+v,r).validate(this.options)},validate:function(){return n.validate(),n.valid()}},n.data(v,t)),t}var m,f=a.validator,v="unobtrusiveValidation";return f.unobtrusive={adapters:[],parseElement:function(e,n){var t,r,i,o=a(e),d=o.parents("form")[0];d&&(t=u(d),t.options.rules[e.name]=r={},t.options.messages[e.name]=i={},a.each(this.adapters,function(){var n="data-val-"+this.name,t=o.attr(n),s={};void 0!==t&&(n+="-",a.each(this.params,function(){s[this]=o.attr(n+this)}),this.adapt({element:e,form:d,message:t,params:s,rules:r,messages:i}))}),a.extend(r,{__dummy__:!0}),n||t.attachValidation())},parse:function(e){var n=a(e),t=n.parents().addBack().filter("form").add(n.find("form")).has("[data-val=true]");n.find("[data-val=true]").each(function(){f.unobtrusive.parseElement(this,!0)}),t.each(function(){var a=u(this);a&&a.attachValidation()})}},m=f.unobtrusive.adapters,m.add=function(a,e,n){return n||(n=e,e=[]),this.push({name:a,params:e,adapt:n}),this},m.addBool=function(a,n){return this.add(a,function(t){e(t,n||a,!0)})},m.addMinMax=function(a,n,t,r,i,o){return this.add(a,[i||"min",o||"max"],function(a){var i=a.params.min,o=a.params.max;i&&o?e(a,r,[i,o]):i?e(a,n,i):o&&e(a,t,o)})},m.addSingleVal=function(a,n,t){return this.add(a,[n||"val"],function(r){e(r,t||a,r.params[n])})},f.addMethod("__dummy__",function(a,e,n){return!0}),f.addMethod("regex",function(a,e,n){var t;return!!this.optional(e)||(t=new RegExp(n).exec(a),t&&0===t.index&&t[0].length===a.length)}),f.addMethod("nonalphamin",function(a,e,n){var t;return n&&(t=a.match(/\W/g),t=t&&t.length>=n),t}),f.methods.extension?(m.addSingleVal("accept","mimtype"),m.addSingleVal("extension","extension")):m.addSingleVal("extension","extension","accept"),m.addSingleVal("regex","pattern"),m.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"),m.addMinMax("length","minlength","maxlength","rangelength").addMinMax("range","min","max","range"),m.addMinMax("minlength","minlength").addMinMax("maxlength","minlength","maxlength"),m.add("equalto",["other"],function(n){var o=r(n.element.name),d=n.params.other,s=i(d,o),l=a(n.form).find(":input").filter("[name='"+t(s)+"']")[0];e(n,"equalTo",l)}),m.add("required",function(a){"INPUT"===a.element.tagName.toUpperCase()&&"CHECKBOX"===a.element.type.toUpperCase()||e(a,"required",!0)}),m.add("remote",["url","type","additionalfields"],function(o){var d={url:o.params.url,type:o.params.type||"GET",data:{}},s=r(o.element.name);a.each(n(o.params.additionalfields||o.element.name),function(e,n){var r=i(n,s);d.data[r]=function(){var e=a(o.form).find(":input").filter("[name='"+t(r)+"']");return e.is(":checkbox")?e.filter(":checked").val()||e.filter(":hidden").val()||"":e.is(":radio")?e.filter(":checked").val()||"":e.val()}}),e(o,"remote",d)}),m.add("password",["min","nonalphamin","regex"],function(a){a.params.min&&e(a,"minlength",a.params.min),a.params.nonalphamin&&e(a,"nonalphamin",a.params.nonalphamin),a.params.regex&&e(a,"regex",a.params.regex)}),m.add("fileextensions",["extensions"],function(a){e(a,"extension",a.params.extensions)}),a(function(){f.unobtrusive.parse(document)}),f.unobtrusive});

/*global jQuery:false, alert:false */

/*
 * Default text - jQuery plugin for html5 dragging files from desktop to browser
 *
 * Author: Weixi Yen
 *
 * Email: [Firstname][Lastname]@gmail.com
 *
 * Copyright (c) 2010 Resopollution
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.github.com/weixiyen/jquery-filedrop
 *
 * Version:  0.1.0
 *
 * Features:
 *      Allows sending of extra parameters with file.
 *      Works with Firefox 3.6+
 *      Future-compliant with HTML5 spec (will work with Webkit browsers and IE9)
 * Usage:
 *  See README at project homepage
 *
 */
; (function ($) {

    var default_opts = {
        fallback_id: '',
        fallback_dropzoneClick: true,
        url: '',
        refresh: 1000,
        paramname: 'userfile',
        requestType: 'POST',    // just in case you want to use another HTTP verb
        allowedfileextensions: [],
        allowedfiletypes: [],
        maxfiles: 25,           // Ignored if queuefiles is set > 0
        maxfilesize: 1,         // MB file size limit
        queuefiles: 0,          // Max files before queueing (for large volume uploads)
        queuewait: 200,         // Queue wait time if full
        data: {},
        headers: {},
        drop: empty,
        dragStart: empty,
        dragEnter: empty,
        dragOver: empty,
        dragLeave: empty,
        docEnter: empty,
        docOver: empty,
        docLeave: empty,
        beforeEach: empty,
        afterAll: empty,
        rename: empty,
        error: function (err, file, i, status) {
            alert(err);
        },
        uploadStarted: empty,
        uploadFinished: empty,
        progressUpdated: empty,
        globalProgressUpdated: empty,
        speedUpdated: empty
    },
        errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge", "FileTypeNotAllowed", "NotFound", "NotReadable", "AbortError", "ReadError", "FileExtensionNotAllowed"];

    $.fn.filedrop = function (options) {
        var opts = $.extend({}, default_opts, options),
            global_progress = [],
            doc_leave_timer, stop_loop = false,
            files_count = 0,
            files;

        if (opts.fallback_dropzoneClick === true) {
            $('#' + opts.fallback_id).css({
                display: 'none',
                width: 0,
                height: 0
            });
        }

        this.on('drop', drop).on('dragstart', opts.dragStart).on('dragenter', dragEnter).on('dragover', dragOver).on('dragleave', dragLeave);
        $(document).on('drop', docDrop).on('dragenter', docEnter).on('dragover', docOver).on('dragleave', docLeave);

        if (opts.fallback_dropzoneClick === true) {
            if (this.find('#' + opts.fallback_id).length > 0) {
                throw "Fallback element [" + opts.fallback_id + "] cannot be inside dropzone, unless option fallback_dropzoneClick is false";
            }
            else {
                this.on('click', function (e) {
                    $('#' + opts.fallback_id).trigger(e);
                });
            }
        }

        $('#' + opts.fallback_id).change(function (e) {
            opts.drop(e);
            files = e.target.files;
            files_count = files.length;
            upload();
        });

        function drop(e) {
            if (opts.drop.call(this, e) === false) return false;
            if (!e.originalEvent.dataTransfer)
                return;
            files = e.originalEvent.dataTransfer.files;
            if (files === null || files === undefined || files.length === 0) {
                opts.error(errors[0]);
                return false;
            }
            files_count = files.length;
            upload();
            e.preventDefault();
            return false;
        }

        function getBuilder(filename, filedata, mime, boundary) {
            var dashdash = '--',
                crlf = '\r\n',
                builder = '',
                paramname = opts.paramname;

            if (opts.data) {
                var params = $.param(opts.data).replace(/\+/g, '%20').split(/&/);

                $.each(params, function () {
                    var pair = this.split("=", 2),
                        name = decodeURIComponent(pair[0]),
                        val = decodeURIComponent(pair[1]);

                    if (pair.length !== 2) {
                        return;
                    }

                    builder += dashdash;
                    builder += boundary;
                    builder += crlf;
                    builder += 'Content-Disposition: form-data; name="' + name + '"';
                    builder += crlf;
                    builder += crlf;
                    builder += val;
                    builder += crlf;
                });
            }

            if (jQuery.isFunction(paramname)) {
                paramname = paramname(filename);
            }

            builder += dashdash;
            builder += boundary;
            builder += crlf;
            builder += 'Content-Disposition: form-data; name="' + (paramname || "") + '"';
            builder += '; filename="' + encodeURIComponent(filename) + '"';
            builder += crlf;

            builder += 'Content-Type: ' + mime;
            builder += crlf;
            builder += crlf;

            builder += filedata;
            builder += crlf;

            builder += dashdash;
            builder += boundary;
            builder += dashdash;
            builder += crlf;
            return builder;
        }

        function progress(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                if (this.currentProgress !== percentage) {

                    this.currentProgress = percentage;
                    opts.progressUpdated(this.index, this.file, this.currentProgress);

                    global_progress[this.global_progress_index] = this.currentProgress;
                    globalProgress();

                    var elapsed = new Date().getTime();
                    var diffTime = elapsed - this.currentStart;
                    if (diffTime >= opts.refresh) {
                        var diffData = e.loaded - this.startData;
                        var speed = diffData / diffTime; // KB per second
                        opts.speedUpdated(this.index, this.file, speed);
                        this.startData = e.loaded;
                        this.currentStart = elapsed;
                    }
                }
            }
        }

        function globalProgress() {
            if (global_progress.length === 0) {
                return;
            }

            var total = 0, index;
            for (index in global_progress) {
                if (global_progress.hasOwnProperty(index)) {
                    total = total + global_progress[index];
                }
            }

            opts.globalProgressUpdated(Math.round(total / global_progress.length));
        }

        // Respond to an upload
        function upload() {
            stop_loop = false;

            if (!files) {
                opts.error(errors[0]);
                return false;
            }

            if (opts.allowedfiletypes.push && opts.allowedfiletypes.length) {
                for (var fileIndex = files.length; fileIndex--;) {
                    if (!files[fileIndex].type || $.inArray(files[fileIndex].type, opts.allowedfiletypes) < 0) {
                        opts.error(errors[3], files[fileIndex]);
                        return false;
                    }
                }
            }

            if (opts.allowedfileextensions.push && opts.allowedfileextensions.length) {
                for (var fileIndex = files.length; fileIndex--;) {
                    var allowedextension = false;
                    for (i = 0; i < opts.allowedfileextensions.length; i++) {
                        if (files[fileIndex].name.substr(files[fileIndex].name.length - opts.allowedfileextensions[i].length).toLowerCase()
                                == opts.allowedfileextensions[i].toLowerCase()
                        ) {
                            allowedextension = true;
                        }
                    }
                    if (!allowedextension) {
                        opts.error(errors[8], files[fileIndex]);
                        return false;
                    }
                }
            }

            var filesDone = 0,
                filesRejected = 0;

            if (files_count > opts.maxfiles && opts.queuefiles === 0) {
                opts.error(errors[1]);
                return false;
            }

            // Define queues to manage upload process
            var workQueue = [];
            var processingQueue = [];
            var doneQueue = [];

            // Add everything to the workQueue
            for (var i = 0; i < files_count; i++) {
                workQueue.push(i);
            }

            // Helper function to enable pause of processing to wait
            // for in process queue to complete
            var pause = function (timeout) {
                setTimeout(process, timeout);
                return;
            };

            // Process an upload, recursive
            var process = function () {

                var fileIndex;

                if (stop_loop) {
                    return false;
                }

                // Check to see if are in queue mode
                if (opts.queuefiles > 0 && processingQueue.length >= opts.queuefiles) {
                    return pause(opts.queuewait);
                } else {
                    // Take first thing off work queue
                    fileIndex = workQueue[0];
                    workQueue.splice(0, 1);

                    // Add to processing queue
                    processingQueue.push(fileIndex);
                }

                try {
                    if (beforeEach(files[fileIndex]) !== false) {
                        if (fileIndex === files_count) {
                            return;
                        }
                        var reader = new FileReader(),
                            max_file_size = 1048576 * opts.maxfilesize;

                        reader.index = fileIndex;
                        if (files[fileIndex].size > max_file_size) {
                            opts.error(errors[2], files[fileIndex], fileIndex);
                            // Remove from queue
                            processingQueue.forEach(function (value, key) {
                                if (value === fileIndex) {
                                    processingQueue.splice(key, 1);
                                }
                            });
                            filesRejected++;
                            return true;
                        }

                        reader.onerror = function (e) {
                            switch (e.target.error.code) {
                                case e.target.error.NOT_FOUND_ERR:
                                    opts.error(errors[4]);
                                    return false;
                                case e.target.error.NOT_READABLE_ERR:
                                    opts.error(errors[5]);
                                    return false;
                                case e.target.error.ABORT_ERR:
                                    opts.error(errors[6]);
                                    return false;
                                default:
                                    opts.error(errors[7]);
                                    return false;
                            };
                        };

                        reader.onloadend = !opts.beforeSend ? send : function (e) {
                            opts.beforeSend(files[fileIndex], fileIndex, function () { send(e); });
                        };

                        reader.readAsDataURL(files[fileIndex]);

                    } else {
                        filesRejected++;
                    }
                } catch (err) {
                    // Remove from queue
                    processingQueue.forEach(function (value, key) {
                        if (value === fileIndex) {
                            processingQueue.splice(key, 1);
                        }
                    });
                    opts.error(errors[0]);
                    return false;
                }

                // If we still have work to do,
                if (workQueue.length > 0) {
                    process();
                }
            };

            var send = function (e) {

                var fileIndex = (e.srcElement || e.target).index;

                // Sometimes the index is not attached to the
                // event object. Find it by size. Hack for sure.
                if (e.target.index === undefined) {
                    e.target.index = getIndexBySize(e.total);
                }

                var xhr = new XMLHttpRequest(),
                    upload = xhr.upload,
                    file = files[e.target.index],
                    index = e.target.index,
                    start_time = new Date().getTime(),
                    boundary = '------multipartformboundary' + (new Date()).getTime(),
                    global_progress_index = global_progress.length,
                    builder,
                    newName = rename(file.name),
                    mime = file.type;

                if (opts.withCredentials) {
                    xhr.withCredentials = opts.withCredentials;
                }

                var encodedString = e.target.result.split(',')[1];
                var data = encodedString === undefined ? '' : atob(encodedString);
                if (typeof newName === "string") {
                    builder = getBuilder(newName, data, mime, boundary);
                } else {
                    builder = getBuilder(file.name, data, mime, boundary);
                }

                upload.index = index;
                upload.file = file;
                upload.downloadStartTime = start_time;
                upload.currentStart = start_time;
                upload.currentProgress = 0;
                upload.global_progress_index = global_progress_index;
                upload.startData = 0;
                upload.addEventListener("progress", progress, false);

                // Allow url to be a method
                if (jQuery.isFunction(opts.url)) {
                    xhr.open(opts.requestType, opts.url(upload), true);
                } else {
                    xhr.open(opts.requestType, opts.url, true);
                }

                xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                // Add headers
                $.each(opts.headers, function (k, v) {
                    xhr.setRequestHeader(k, v);
                });

                if (!xhr.sendAsBinary) {
                    xhr.sendAsBinary = function (datastr) {
                        function byteValue(x) {
                            return x.charCodeAt(0) & 0xff;
                        }
                        var ords = Array.prototype.map.call(datastr, byteValue);
                        var ui8a = new Uint8Array(ords);
                        this.send(ui8a.buffer);
                    }
                }

                xhr.sendAsBinary(builder);

                global_progress[global_progress_index] = 0;
                globalProgress();

                opts.uploadStarted(index, file, files_count);

                xhr.onload = function () {
                    var serverResponse = null;

                    if (xhr.responseText) {
                        try {
                            serverResponse = jQuery.parseJSON(xhr.responseText);
                        }
                        catch (e) {
                            serverResponse = xhr.responseText;
                        }
                    }

                    var now = new Date().getTime(),
                        timeDiff = now - start_time,
                        result = opts.uploadFinished(index, file, serverResponse, timeDiff, xhr);
                    filesDone++;

                    // Remove from processing queue
                    processingQueue.forEach(function (value, key) {
                        if (value === fileIndex) {
                            processingQueue.splice(key, 1);
                        }
                    });

                    // Add to donequeue
                    doneQueue.push(fileIndex);

                    // Make sure the global progress is updated
                    global_progress[global_progress_index] = 100;
                    globalProgress();

                    if (filesDone === (files_count - filesRejected)) {
                        afterAll();
                    }
                    if (result === false) {
                        stop_loop = true;
                    }


                    // Pass any errors to the error option
                    if (xhr.status < 200 || xhr.status > 299) {
                        opts.error(xhr.statusText, file, fileIndex, xhr.status);
                    }
                };
            };

            // Initiate the processing loop
            process();
        }

        function getIndexBySize(size) {
            for (var i = 0; i < files_count; i++) {
                if (files[i].size === size) {
                    return i;
                }
            }

            return undefined;
        }

        function rename(name) {
            return opts.rename(name);
        }

        function beforeEach(file) {
            return opts.beforeEach(file);
        }

        function afterAll() {
            return opts.afterAll();
        }

        function dragEnter(e) {
            clearTimeout(doc_leave_timer);
            e.preventDefault();
            opts.dragEnter.call(this, e);
        }

        function dragOver(e) {
            clearTimeout(doc_leave_timer);
            e.preventDefault();
            opts.docOver.call(this, e);
            opts.dragOver.call(this, e);
        }

        function dragLeave(e) {
            clearTimeout(doc_leave_timer);
            opts.dragLeave.call(this, e);
            e.stopPropagation();
        }

        function docDrop(e) {
            e.preventDefault();
            opts.docLeave.call(this, e);
            return false;
        }

        function docEnter(e) {
            clearTimeout(doc_leave_timer);
            e.preventDefault();
            opts.docEnter.call(this, e);
            return false;
        }

        function docOver(e) {
            clearTimeout(doc_leave_timer);
            e.preventDefault();
            opts.docOver.call(this, e);
            return false;
        }

        function docLeave(e) {
            doc_leave_timer = setTimeout((function (_this) {
                return function () {
                    opts.docLeave.call(_this, e);
                };
            })(this), 200);
        }

        return this;
    };

    function empty() { }

    try {
        if (XMLHttpRequest.prototype.sendAsBinary) {
            return;
        }
        XMLHttpRequest.prototype.sendAsBinary = function (datastr) {
            function byteValue(x) {
                return x.charCodeAt(0) & 0xff;
            }
            var ords = Array.prototype.map.call(datastr, byteValue);
            var ui8a = new Uint8Array(ords);

            // Not pretty: Chrome 22 deprecated sending ArrayBuffer, moving instead
            // to sending ArrayBufferView.  Sadly, no proper way to detect this
            // functionality has been discovered.  Happily, Chrome 22 also introduced
            // the base ArrayBufferView class, not present in Chrome 21.
            if ('ArrayBufferView' in window)
                this.send(ui8a);
            else
                this.send(ui8a.buffer);
        };
    } catch (e) { }

})(jQuery);

/* jshint -W071, -W074 */
/* global jQuery:false */

/* Disabled options are:
 * W071: This function has too many statements
 * W074: This function's cyclomatic complexity is too high
 */

/*
 *	jQuery ezPlus 1.1.6
 *	Demo's and documentation:
 *	http://igorlino.github.io/elevatezoom-plus/
 *
 *	licensed under MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 *
 */

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {
        }

        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {
    var EZP = {
        init: function (options, elem) {
            var self = this;
            var $galleries;

            self.elem = elem;
            self.$elem = $(elem);

            self.imageSrc = self.$elem.data('zoom-image') ? self.$elem.data('zoom-image') : self.$elem.attr('src');

            self.options = $.extend({}, $.fn.ezPlus.options, self.responsiveConfig(options || {}));

            if (!self.options.enabled) {
                return;
            }

            //TINT OVERRIDE SETTINGS
            if (self.options.tint) {
                self.options.lensColour = 'none'; //colour of the lens background
                self.options.lensOpacity = '1'; //opacity of the lens
            }
            //INNER OVERRIDE SETTINGS
            if (self.options.zoomType === 'inner') {
                self.options.showLens = false;
            }

            //Remove alt on hover

            self.$elem.parent().removeAttr('title').removeAttr('alt');

            self.zoomImage = self.imageSrc;

            self.refresh(1);

            //Create the image swap from the gallery
            $galleries = $(self.options.gallery ? ('#' + self.options.gallery) : self.options.gallerySelector);
            $galleries.on('click.zoom', self.options.galleryItem, function (e) {

                //Set a class on the currently active gallery image
                if (self.options.galleryActiveClass) {
                    $(self.options.galleryItem, $galleries).removeClass(self.options.galleryActiveClass);
                    $(this).addClass(self.options.galleryActiveClass);
                }
                //stop any link on the a tag from working
                if (this.tagName === 'A') {
                    e.preventDefault();
                }

                //call the swap image function
                if ($(this).data('zoom-image')) {
                    self.zoomImagePre = $(this).data('zoom-image');
                }
                else {
                    self.zoomImagePre = $(this).data('image');
                }
                self.swaptheimage($(this).data('image'), self.zoomImagePre);
                if (this.tagName === 'A') {
                    return false;
                }
            });
        },
        refresh: function (length) {
            var self = this;

            setTimeout(function () {
                self.fetch(self.imageSrc);

            }, length || self.options.refresh);
        },
        fetch: function (imgsrc) {
            //get the image
            var self = this;
            var newImg = new Image();
            newImg.onload = function () {
                //set the large image dimensions - used to calculte ratio's
                self.largeWidth = newImg.width;
                self.largeHeight = newImg.height;
                //once image is loaded start the calls
                self.startZoom();
                self.currentImage = self.imageSrc;
                //let caller know image has been loaded
                self.options.onZoomedImageLoaded(self.$elem);
            };
            self.setImageSource(newImg, imgsrc); // this must be done AFTER setting onload

            return;
        },
        setImageSource: function (image, src) {
            //sets an image's source.
            image.src = src;
        },
        startZoom: function () {
            var self = this;
            //get dimensions of the non zoomed image
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();

            //activated elements
            self.isWindowActive = false;
            self.isLensActive = false;
            self.isTintActive = false;
            self.overWindow = false;

            //CrossFade Wrapper
            if (self.options.imageCrossfade) {
                self.zoomWrap = self.$elem.wrap('<div style="height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;" class="zoomWrapper" />');
                self.$elem.css('position', 'absolute');
            }

            self.zoomLock = 1;
            self.scrollingLock = false;
            self.changeBgSize = false;
            self.currentZoomLevel = self.options.zoomLevel;

            //get offset of the non zoomed image
            self.nzOffset = self.$elem.offset();
            //calculate the width ratio of the large/small image
            self.widthRatio = (self.largeWidth / self.currentZoomLevel) / self.nzWidth;
            self.heightRatio = (self.largeHeight / self.currentZoomLevel) / self.nzHeight;

            function getWindowZoomStyle() {
                return 'overflow: hidden;' +
                    'background-position: 0px 0px;text-align:center;' +
                    'background-color: ' + String(self.options.zoomWindowBgColour) + ';' +
                    'width: ' + String(self.options.zoomWindowWidth) + 'px;' +
                    'height: ' + String(self.options.zoomWindowHeight) + 'px;' +
                    'float: left;' +
                    'background-size: ' + self.largeWidth / self.currentZoomLevel + 'px ' + self.largeHeight / self.currentZoomLevel + 'px;' +
                    'display: none;z-index:100;' +
                    'border: ' + String(self.options.borderSize) + 'px solid ' + self.options.borderColour + ';' +
                    'background-repeat: no-repeat;' +
                    'position: absolute;';
            }

            //if window zoom
            if (self.options.zoomType === 'window') {
                self.zoomWindowStyle = getWindowZoomStyle();
            }

            function getInnerZoomStyle() {
                //has a border been put on the image? Lets cater for this
                var borderWidth = self.$elem.css('border-left-width');

                return 'overflow: hidden;' +
                    'margin-left: ' + String(borderWidth) + ';' +
                    'margin-top: ' + String(borderWidth) + ';' +
                    'background-position: 0px 0px;' +
                    'width: ' + String(self.nzWidth) + 'px;' +
                    'height: ' + String(self.nzHeight) + 'px;' +
                    'float: left;' +
                    'display: none;' +
                    'cursor:' + (self.options.cursor) + ';' +
                    'px solid ' + self.options.borderColour + ';' +
                    'background-repeat: no-repeat;' +
                    'position: absolute;';
            }

            //if inner  zoom
            if (self.options.zoomType === 'inner') {
                self.zoomWindowStyle = getInnerZoomStyle();
            }

            function getWindowLensStyle() {
                var lensHeight, lensWidth;
                // adjust images less than the window height

                if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
                    lensHeight = self.nzHeight;
                }
                else {
                    lensHeight = String(self.options.zoomWindowHeight / self.heightRatio);
                }
                if (self.largeWidth < self.options.zoomWindowWidth) {
                    lensWidth = self.nzWidth;
                }
                else {
                    lensWidth = String(self.options.zoomWindowWidth / self.widthRatio);
                }

                return 'background-position: 0px 0px;width: ' + String((self.options.zoomWindowWidth) / self.widthRatio) + 'px;' +
                    'height: ' + String((self.options.zoomWindowHeight) / self.heightRatio) +
                    'px;float: right;display: none;' +
                    'overflow: hidden;' +
                    'z-index: 999;' +
                    'opacity:' + (self.options.lensOpacity) + ';filter: alpha(opacity = ' + (self.options.lensOpacity * 100) + '); zoom:1;' +
                    'width:' + lensWidth + 'px;' +
                    'height:' + lensHeight + 'px;' +
                    'background-color:' + (self.options.lensColour) + ';' +
                    'cursor:' + (self.options.cursor) + ';' +
                    'border: ' + (self.options.lensBorderSize) + 'px' +
                    ' solid ' + (self.options.lensBorderColour) + ';background-repeat: no-repeat;position: absolute;';
            }

            //lens style for window zoom
            if (self.options.zoomType === 'window') {
                self.lensStyle = getWindowLensStyle();
            }

            //tint style
            self.tintStyle = 'display: block;' +
                'position: absolute;' +
                'background-color: ' + self.options.tintColour + ';' +
                'filter:alpha(opacity=0);' +
                'opacity: 0;' +
                'width: ' + self.nzWidth + 'px;' +
                'height: ' + self.nzHeight + 'px;';

            //lens style for lens zoom with optional round for modern browsers
            self.lensRound = '';

            if (self.options.zoomType === 'lens') {
                self.lensStyle = 'background-position: 0px 0px;' +
                    'float: left;display: none;' +
                    'border: ' + String(self.options.borderSize) + 'px solid ' + self.options.borderColour + ';' +
                    'width:' + String(self.options.lensSize) + 'px;' +
                    'height:' + String(self.options.lensSize) + 'px;' +
                    'background-repeat: no-repeat;position: absolute;';
            }

            //does not round in all browsers
            if (self.options.lensShape === 'round') {
                self.lensRound = 'border-top-left-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-top-right-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-bottom-left-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;' +
                    'border-bottom-right-radius: ' + String(self.options.lensSize / 2 + self.options.borderSize) + 'px;';
            }

            //create the div's                                                + ""
            //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

            self.zoomContainer =
                $('<div class="zoomContainer" style="' +
                    'position:absolute;' +
                    'left:' + self.nzOffset.left + 'px;' +
                    'top:' + self.nzOffset.top + 'px;' +
                    'height:' + self.nzHeight + 'px;' + '' +
                    'width:' + self.nzWidth + 'px;' +
                    'z-index:' + self.options.zIndex + '"></div>');
            $(self.options.zoomContainerAppendTo).append(self.zoomContainer);

            //this will add overflow hidden and contrain the lens on lens mode
            if (self.options.containLensZoom && self.options.zoomType === 'lens') {
                self.zoomContainer.css('overflow', 'hidden');
            }
            if (self.options.zoomType !== 'inner') {
                self.zoomLens = $('<div class="zoomLens" style="' + self.lensStyle + self.lensRound + '">&nbsp;</div>')
                    .appendTo(self.zoomContainer)
                    .click(function () {
                        self.$elem.trigger('click');
                    });

                if (self.options.tint) {
                    self.tintContainer = $('<div/>').addClass('tintContainer');
                    self.zoomTint = $('<div class="zoomTint" style="' + self.tintStyle + '"></div>');

                    self.zoomLens.wrap(self.tintContainer);

                    self.zoomTintcss = self.zoomLens.after(self.zoomTint);

                    //if tint enabled - set an image to show over the tint

                    self.zoomTintImage = $('<img style="' +
                        'position: absolute; left: 0px; top: 0px; max-width: none; ' +
                        'width: ' + self.nzWidth + 'px; ' +
                        'height: ' + self.nzHeight + 'px;" ' +
                        'src="' + self.imageSrc + '">')
                        .appendTo(self.zoomLens)
                        .click(function () {

                            self.$elem.trigger('click');
                        });
                }
            }

            var targetZoomContainer = isNaN(self.options.zoomWindowPosition) ? 'body' : self.zoomContainer;
            //create zoom window
            self.zoomWindow = $('<div style="z-index:999;' +
                'left:' + (self.windowOffsetLeft) + 'px;' +
                'top:' + (self.windowOffsetTop) + 'px;' + self.zoomWindowStyle + '" class="zoomWindow">&nbsp;</div>')
                .appendTo(targetZoomContainer).click(function () {
                    self.$elem.trigger('click');
                });
            self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css('width', self.options.zoomWindowWidth);
            self.zoomWindow.wrap(self.zoomWindowContainer);

            //  self.captionStyle = "text-align: left;background-color: black;'+
            // 'color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";
            // self.zoomCaption = $('<div class="ezplus-caption" '+
            // 'style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

            if (self.options.zoomType === 'lens') {
                self.zoomLens.css('background-image', 'url("' + self.imageSrc + '")');
            }
            if (self.options.zoomType === 'window') {
                self.zoomWindow.css('background-image', 'url("' + self.imageSrc + '")');
            }
            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css('background-image', 'url("' + self.imageSrc + '")');
            }

            /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
            if (self.options.touchEnabled) {
                //touch events
                self.$elem.bind('touchmove', function (e) {
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);
                });
                self.zoomContainer.bind('touchmove', function (e) {
                    if (self.options.zoomType === 'inner') {
                        self.showHideWindow('show');

                    }
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchend', function (e) {
                    self.showHideWindow('hide');
                    if (self.options.showLens) {
                        self.showHideLens('hide');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('hide');
                    }
                });

                self.$elem.bind('touchend', function (e) {
                    self.showHideWindow('hide');
                    if (self.options.showLens) {
                        self.showHideLens('hide');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('hide');
                    }
                });
                if (self.options.showLens) {
                    self.zoomLens.bind('touchmove', function (e) {

                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch);
                    });

                    self.zoomLens.bind('touchend', function (e) {
                        self.showHideWindow('hide');
                        if (self.options.showLens) {
                            self.showHideLens('hide');
                        }
                        if (self.options.tint && self.options.zoomType !== 'inner') {
                            self.showHideTint('hide');
                        }
                    });
                }
            }
            //Needed to work in IE
            self.$elem.bind('mousemove', function (e) {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
                //make sure on orientation change the setposition is not fired
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;

            });

            self.zoomContainer.bind('click', self.options.onImageClick);

            self.zoomContainer.bind('mousemove', function (e) {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
                mouseMoveZoomHandler(e);
            });

            function mouseMoveZoomHandler(e) {
                //self.overWindow = true;
                //make sure on orientation change the setposition is not fired
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;
            }

            var elementToTrack = null;
            if (self.options.zoomType !== 'inner') {
                elementToTrack = self.zoomLens;
            }
            if (self.options.tint && self.options.zoomType !== 'inner') {
                elementToTrack = self.zoomTint;
            }
            if (self.options.zoomType === 'inner') {
                elementToTrack = self.zoomWindow;
            }

            //register the mouse tracking
            if (elementToTrack) {
                elementToTrack.bind('mousemove', mouseMoveZoomHandler);
            }

            //  lensFadeOut: 500,  zoomTintFadeIn
            self.zoomContainer.add(self.$elem).mouseenter(function () {
                if (self.overWindow === false) {
                    self.setElements('show');
                }
            }).mouseleave(function () {
                if (!self.scrollLock) {
                    self.setElements('hide');
                    self.options.onDestroy(self.$elem);
                }
            });
            //end ove image

            if (self.options.zoomType !== 'inner') {
                self.zoomWindow.mouseenter(function () {
                    self.overWindow = true;
                    self.setElements('hide');
                }).mouseleave(function () {
                    self.overWindow = false;
                });
            }
            //end ove image

            // var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

            //      $(this).empty();
            //    return false;

            //fix for initial zoom setting
            //if (self.options.zoomLevel !== 1) {
            //    	self.changeZoomLevel(self.currentZoomLevel);
            //}
            //set the min zoomlevel
            if (self.options.minZoomLevel) {
                self.minZoomLevel = self.options.minZoomLevel;
            }
            else {
                self.minZoomLevel = self.options.scrollZoomIncrement * 2;
            }

            if (self.options.scrollZoom) {
                self.zoomContainer.add(self.$elem).bind('wheel DOMMouseScroll MozMousePixelScroll', function (e) {
                    // in IE there is issue with firing of mouseleave - So check whether still scrolling
                    // and on mouseleave check if scrolllock
                    self.scrollLock = true;
                    clearTimeout($.data(this, 'timer'));
                    $.data(this, 'timer', setTimeout(function () {
                        self.scrollLock = false;
                        //do something
                    }, 250));

                    var theEvent = e.originalEvent.deltaY || e.originalEvent.detail * -1;

                    //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                    //   e.preventDefault();

                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();

                    if (theEvent / 120 > 0) {
                        //scrolling up
                        if (self.currentZoomLevel >= self.minZoomLevel) {
                            self.changeZoomLevel(self.currentZoomLevel - self.options.scrollZoomIncrement);
                        }
                    }
                    else {
                        //scrolling down

                        //Check if it has to maintain original zoom window aspect ratio or not
                        if ((!self.fullheight && !self.fullwidth) || !self.options.mantainZoomAspectRatio) {
                            if (self.options.maxZoomLevel) {
                                if (self.currentZoomLevel <= self.options.maxZoomLevel) {
                                    self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                                }
                            }
                            else {
                                //andy
                                self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                            }
                        }
                    }
                    return false;
                });
            }
        },
        setElements: function (type) {
            var self = this;
            if (!self.options.zoomEnabled) {
                return false;
            }
            if (type === 'show') {
                if (self.isWindowSet) {
                    if (self.options.zoomType === 'inner') {
                        self.showHideWindow('show');
                    }
                    if (self.options.zoomType === 'window') {
                        self.showHideWindow('show');
                    }
                    if (self.options.showLens) {
                        self.showHideLens('show');
                    }
                    if (self.options.tint && self.options.zoomType !== 'inner') {
                        self.showHideTint('show');
                    }
                }
            }

            if (type === 'hide') {
                if (self.options.zoomType === 'window') {
                    self.showHideWindow('hide');
                }
                if (!self.options.tint) {
                    self.showHideWindow('hide');
                }
                if (self.options.showLens) {
                    self.showHideLens('hide');
                }
                if (self.options.tint) {
                    self.showHideTint('hide');
                }
            }
        },
        setPosition: function (e) {

            var self = this;

            if (!self.options.zoomEnabled) {
                return false;
            }

            //recaclc offset each time in case the image moves
            //this can be caused by other on page elements
            self.nzHeight = self.$elem.height();
            self.nzWidth = self.$elem.width();
            self.nzOffset = self.$elem.offset();

            if (self.options.tint && self.options.zoomType !== 'inner') {
                self.zoomTint.css({
                    top: 0,
                    left: 0
                });
            }
            //set responsive
            //will checking if the image needs changing before running this code work faster?
            if (self.options.responsive && !self.options.scrollZoom) {
                if (self.options.showLens) {
                    var lensHeight, lensWidth;
                    if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                        lensHeight = self.nzHeight;
                    }
                    else {
                        lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
                    }
                    if (self.largeWidth < self.options.zoomWindowWidth) {
                        lensWidth = self.nzWidth;
                    }
                    else {
                        lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                    }
                    self.widthRatio = self.largeWidth / self.nzWidth;
                    self.heightRatio = self.largeHeight / self.nzHeight;
                    if (self.options.zoomType !== 'lens') {
                        //possibly dont need to keep recalcalculating
                        //if the lens is heigher than the image, then set lens size to image size
                        if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                            lensHeight = self.nzHeight;

                        }
                        else {
                            lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
                        }

                        if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
                            lensWidth = self.nzWidth;
                        }
                        else {
                            lensWidth = String((self.options.zoomWindowWidth / self.widthRatio));
                        }

                        self.zoomLens.css({
                            'width': lensWidth,
                            'height': lensHeight
                        });

                        if (self.options.tint) {
                            self.zoomTintImage.css({
                                'width': self.nzWidth,
                                'height': self.nzHeight
                            });
                        }

                    }
                    if (self.options.zoomType === 'lens') {
                        self.zoomLens.css({
                            width: String(self.options.lensSize) + 'px',
                            height: String(self.options.lensSize) + 'px'
                        });
                    }
                    //end responsive image change
                }
            }

            //container fix
            self.zoomContainer.css({
                top: self.nzOffset.top,
                left: self.nzOffset.left
            });
            self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
            self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
            //calculate the Location of the Lens

            //calculate the bound regions - but only if zoom window
            if (self.options.zoomType === 'window') {
                var zoomLensHeight = self.zoomLens.height() / 2;
                var zoomLensWidth = self.zoomLens.width() / 2;
                self.Etoppos = (self.mouseTop < 0 + zoomLensHeight);
                self.Eboppos = (self.mouseTop > self.nzHeight - zoomLensHeight - (self.options.lensBorderSize * 2));
                self.Eloppos = (self.mouseLeft < 0 + zoomLensWidth);
                self.Eroppos = (self.mouseLeft > (self.nzWidth - zoomLensWidth - (self.options.lensBorderSize * 2)));
            }
            //calculate the bound regions - but only for inner zoom
            if (self.options.zoomType === 'inner') {
                self.Etoppos = (self.mouseTop < ((self.nzHeight / 2) / self.heightRatio));
                self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight / 2) / self.heightRatio)));
                self.Eloppos = (self.mouseLeft < 0 + (((self.nzWidth / 2) / self.widthRatio)));
                self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth / 2) / self.widthRatio - (self.options.lensBorderSize * 2)));
            }

            // if the mouse position of the slider is one of the outerbounds, then hide  window and lens
            if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
                self.setElements('hide');
                return;
            }
            //else continue with operations
            else {
                //lens options
                if (self.options.showLens) {
                    //		self.showHideLens('show');
                    //set background position of lens
                    self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
                    self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));
                }
                //adjust the background position if the mouse is in one of the outer regions

                //Top region
                if (self.Etoppos) {
                    self.lensTopPos = 0;
                }
                //Left Region
                if (self.Eloppos) {
                    self.windowLeftPos = 0;
                    self.lensLeftPos = 0;
                    self.tintpos = 0;
                }
                //Set bottom and right region for window mode
                if (self.options.zoomType === 'window') {
                    if (self.Eboppos) {
                        self.lensTopPos = Math.max((self.nzHeight) - self.zoomLens.height() - (self.options.lensBorderSize * 2), 0);
                    }
                    if (self.Eroppos) {
                        self.lensLeftPos = (self.nzWidth - (self.zoomLens.width()) - (self.options.lensBorderSize * 2));
                    }
                }
                //Set bottom and right region for inner mode
                if (self.options.zoomType === 'inner') {
                    if (self.Eboppos) {
                        self.lensTopPos = Math.max(((self.nzHeight) - (self.options.lensBorderSize * 2)), 0);
                    }
                    if (self.Eroppos) {
                        self.lensLeftPos = (self.nzWidth - (self.nzWidth) - (self.options.lensBorderSize * 2));
                    }
                }
                //if lens zoom
                if (self.options.zoomType === 'lens') {

                    self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));
                    self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));
                    self.zoomLens.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');

                    if (self.changeBgSize) {
                        if (self.nzHeight > self.nzWidth) {
                            if (self.options.zoomType === 'lens') {
                                self.zoomLens.css('background-size',
                                    self.largeWidth / self.newvalueheight + 'px ' +
                                    self.largeHeight / self.newvalueheight + 'px');
                            }

                            self.zoomWindow.css('background-size',
                                self.largeWidth / self.newvalueheight + 'px ' +
                                self.largeHeight / self.newvalueheight + 'px');
                        }
                        else {
                            if (self.options.zoomType === 'lens') {
                                self.zoomLens.css('background-size',
                                    self.largeWidth / self.newvaluewidth + 'px ' +
                                    self.largeHeight / self.newvaluewidth + 'px');
                            }
                            self.zoomWindow.css('background-size',
                                self.largeWidth / self.newvaluewidth + 'px ' +
                                self.largeHeight / self.newvaluewidth + 'px');
                        }
                        self.changeBgSize = false;
                    }

                    self.setWindowPosition(e);
                }
                //if tint zoom
                if (self.options.tint && self.options.zoomType !== 'inner') {
                    self.setTintPosition(e);
                }
                //set the css background position
                if (self.options.zoomType === 'window') {
                    self.setWindowPosition(e);
                }
                if (self.options.zoomType === 'inner') {
                    self.setWindowPosition(e);
                }
                if (self.options.showLens) {
                    if (self.fullwidth && self.options.zoomType !== 'lens') {
                        self.lensLeftPos = 0;
                    }
                    self.zoomLens.css({
                        left: self.lensLeftPos + 'px',
                        top: self.lensTopPos + 'px'
                    });
                }

            } //end else
        },
        showHideZoomContainer: function (change) {
            var self = this;
            if (change === 'show') {
                if (self.zoomContainer) {
                    self.zoomContainer.show();
                }
            }
            if (change === 'hide') {
                if (self.zoomContainer) {
                    self.zoomContainer.hide();
                }
            }
        },
        showHideWindow: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isWindowActive && self.zoomWindow) {
                    self.options.onShow(self);
                    if (self.options.zoomWindowFadeIn) {
                        self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
                    }
                    else {
                        self.zoomWindow.show();
                    }
                    self.isWindowActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isWindowActive) {
                    if (self.options.zoomWindowFadeOut) {
                        self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
                            if (self.loop) {
                                //stop moving the zoom window when zoom window is faded out
                                clearInterval(self.loop);
                                self.loop = false;
                            }
                        });
                    }
                    else {
                        self.zoomWindow.hide();
                    }
                    self.isWindowActive = false;
                }
            }
        },
        showHideLens: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isLensActive) {
                    if (self.options.lensFadeIn && self.zoomLens) {
                        self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
                    }
                    else {
                        self.zoomLens.show();
                    }
                    self.isLensActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isLensActive) {
                    if (self.options.lensFadeOut) {
                        self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
                    }
                    else {
                        self.zoomLens.hide();
                    }
                    self.isLensActive = false;
                }
            }
        },
        showHideTint: function (change) {
            var self = this;
            if (change === 'show') {
                if (!self.isTintActive && self.zoomTint) {

                    if (self.options.zoomTintFadeIn) {
                        self.zoomTint.css('opacity', self.options.tintOpacity).animate().stop(true, true).fadeIn('slow');
                    }
                    else {
                        self.zoomTint.css('opacity', self.options.tintOpacity).animate();
                        self.zoomTint.show();
                    }
                    self.isTintActive = true;
                }
            }
            if (change === 'hide') {
                if (self.isTintActive) {

                    if (self.options.zoomTintFadeOut) {
                        self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
                    }
                    else {
                        self.zoomTint.hide();
                    }
                    self.isTintActive = false;
                }
            }
        },

        setLensPosition: function (e) {
        },

        setWindowPosition: function (e) {
            //return obj.slice( 0, count );
            var self = this;

            if (!isNaN(self.options.zoomWindowPosition)) {

                switch (self.options.zoomWindowPosition) {
                    case 1: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);//DONE - 1
                        self.windowOffsetLeft = (+self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 2:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 3: //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 4: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 5: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                        break;
                    case 6:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                            self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

                            self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                        }
                        else { //negative margin
                            $.noop();
                        }

                        break;
                    case 7: //done
                        self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = 0; //DONE 7, 13
                        break;
                    case 8: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 9:  //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 10:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 11:
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 12: //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);  //DONE 8,9,10,11,12
                        break;
                    case 13: //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (0); //DONE 7, 13
                        break;
                    case 14:
                        if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16

                            self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                        }
                        else { //negative margin
                            $.noop();
                        }
                        break;
                    case 15://done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                        break;
                    case 16:  //done
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    default: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffsetY);//DONE - 1
                        self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                }
            } //end isNAN
            else {
                //WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
                self.externalContainer = $('#' + self.options.zoomWindowPosition);
                self.externalContainerWidth = self.externalContainer.width();
                self.externalContainerHeight = self.externalContainer.height();
                self.externalContainerOffset = self.externalContainer.offset();

                self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
                self.windowOffsetLeft = self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

            }
            self.isWindowSet = true;
            self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffsetY;
            self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffsetX;

            self.zoomWindow.css({
                top: self.windowOffsetTop,
                left: self.windowOffsetLeft
            });

            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css({
                    top: 0,
                    left: 0
                });

            }

            self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));
            self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
            if (self.Etoppos) {
                self.windowTopPos = 0;
            }
            if (self.Eloppos) {
                self.windowLeftPos = 0;
            }
            if (self.Eboppos) {
                self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * (-1);
            }
            if (self.Eroppos) {
                self.windowLeftPos = ((self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * (-1));
            }

            //stops micro movements
            if (self.fullheight) {
                self.windowTopPos = 0;
            }
            if (self.fullwidth) {
                self.windowLeftPos = 0;
            }

            //set the css background position
            if (self.options.zoomType === 'window' || self.options.zoomType === 'inner') {

                if (self.zoomLock === 1) {
                    //overrides for images not zoomable
                    if (self.widthRatio <= 1) {
                        self.windowLeftPos = 0;
                    }
                    if (self.heightRatio <= 1) {
                        self.windowTopPos = 0;
                    }
                }
                // adjust images less than the window height

                if (self.options.zoomType === 'window') {
                    if (self.largeHeight < self.options.zoomWindowHeight) {
                        self.windowTopPos = 0;
                    }
                    if (self.largeWidth < self.options.zoomWindowWidth) {
                        self.windowLeftPos = 0;
                    }
                }
                //set the zoomwindow background position
                if (self.options.easing) {

                    //     if(self.changeZoom){
                    //           clearInterval(self.loop);
                    //           self.changeZoom = false;
                    //           self.loop = false;

                    //            }
                    //set the pos to 0 if not set
                    if (!self.xp) {
                        self.xp = 0;
                    }
                    if (!self.yp) {
                        self.yp = 0;
                    }
                    //if loop not already started, then run it
                    if (!self.loop) {
                        self.loop = setInterval(function () {
                            //using zeno's paradox

                            self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
                            self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;
                            if (self.scrollingLock) {

                                clearInterval(self.loop);
                                self.xp = self.windowLeftPos;
                                self.yp = self.windowTopPos;

                                self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                                self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType === 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvalueheight + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvalueheight + 'px ' +
                                            self.largeHeight / self.newvalueheight + 'px');
                                    }
                                    else {
                                        if (self.options.zoomType !== 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvaluewidth + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvaluewidth + 'px ' +
                                            self.largeHeight / self.newvaluewidth + 'px');
                                    }

                                    /*
                                     if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
                                     if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}
                                     if (!self.bgloop){
                                     self.bgloop = setInterval(function(){

                                     self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount;
                                     self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

                                     self.zoomWindow.css('background-size', self.bgxp + 'px ' + self.bgyp + 'px' );


                                     }, 16);

                                     }
                                     */
                                    self.changeBgSize = false;
                                }

                                self.zoomWindow.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');
                                self.scrollingLock = false;
                                self.loop = false;

                            }
                            else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                                //stops micro movements
                                clearInterval(self.loop);
                                self.zoomWindow.css('background-position', self.windowLeftPos + 'px ' + self.windowTopPos + 'px');
                                self.loop = false;
                            }
                            else {
                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType === 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvalueheight + 'px ' +
                                                self.largeHeight / self.newvalueheight + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvalueheight + 'px ' +
                                            self.largeHeight / self.newvalueheight + 'px');
                                    }
                                    else {
                                        if (self.options.zoomType !== 'lens') {
                                            self.zoomLens.css('background-size',
                                                self.largeWidth / self.newvaluewidth + 'px ' +
                                                self.largeHeight / self.newvaluewidth + 'px');
                                        }
                                        self.zoomWindow.css('background-size',
                                            self.largeWidth / self.newvaluewidth + 'px ' +
                                            self.largeHeight / self.newvaluewidth + 'px');
                                    }
                                    self.changeBgSize = false;
                                }

                                self.zoomWindow.css('background-position', self.xp + 'px ' + self.yp + 'px');
                            }
                        }, 16);
                    }
                }
                else {
                    if (self.changeBgSize) {
                        if (self.nzHeight > self.nzWidth) {
                            if (self.options.zoomType === 'lens') {
                                self.zoomLens.css('background-size',
                                    self.largeWidth / self.newvalueheight + 'px ' +
                                    self.largeHeight / self.newvalueheight + 'px');
                            }

                            self.zoomWindow.css('background-size',
                                self.largeWidth / self.newvalueheight + 'px ' +
                                self.largeHeight / self.newvalueheight + 'px');
                        }
                        else {
                            if (self.options.zoomType === 'lens') {
                                self.zoomLens.css('background-size',
                                    self.largeWidth / self.newvaluewidth + 'px ' +
                                    self.largeHeight / self.newvaluewidth + 'px');
                            }
                            if ((self.largeHeight / self.newvaluewidth) < self.options.zoomWindowHeight) {

                                self.zoomWindow.css('background-size',
                                    self.largeWidth / self.newvaluewidth + 'px ' +
                                    self.largeHeight / self.newvaluewidth + 'px');
                            }
                            else {

                                self.zoomWindow.css('background-size',
                                    self.largeWidth / self.newvalueheight + 'px ' +
                                    self.largeHeight / self.newvalueheight + 'px');
                            }

                        }
                        self.changeBgSize = false;
                    }

                    self.zoomWindow.css('background-position',
                        self.windowLeftPos + 'px ' +
                        self.windowTopPos + 'px');
                }
            }
        },

        setTintPosition: function (e) {
            var self = this;
            var zoomLensWidth = self.zoomLens.width();
            var zoomLensHeight = self.zoomLens.height();
            self.nzOffset = self.$elem.offset();
            self.tintpos = String(((e.pageX - self.nzOffset.left) - (zoomLensWidth / 2)) * (-1));
            self.tintposy = String(((e.pageY - self.nzOffset.top) - zoomLensHeight / 2) * (-1));
            if (self.Etoppos) {
                self.tintposy = 0;
            }
            if (self.Eloppos) {
                self.tintpos = 0;
            }
            if (self.Eboppos) {
                self.tintposy = (self.nzHeight - zoomLensHeight - (self.options.lensBorderSize * 2)) * (-1);
            }
            if (self.Eroppos) {
                self.tintpos = ((self.nzWidth - zoomLensWidth - (self.options.lensBorderSize * 2)) * (-1));
            }
            if (self.options.tint) {
                //stops micro movements
                if (self.fullheight) {
                    self.tintposy = 0;

                }
                if (self.fullwidth) {
                    self.tintpos = 0;

                }
                self.zoomTintImage.css({
                    'left': self.tintpos + 'px',
                    'top': self.tintposy + 'px'
                });
            }
        },

        swaptheimage: function (smallimage, largeimage) {
            var self = this;
            var newImg = new Image();

            if (self.options.loadingIcon) {
                self.spinner = $('<div style="' +
                    'background: url(\'' + self.options.loadingIcon + '\') no-repeat center;' +
                    'height:' + self.nzHeight + 'px;' +
                    'width:' + self.nzWidth + 'px;' +
                    'z-index: 2000;position: absolute; ' +
                    'background-position: center center;"></div>');
                self.$elem.after(self.spinner);
            }

            self.options.onImageSwap(self.$elem);

            newImg.onload = function () {
                self.largeWidth = newImg.width;
                self.largeHeight = newImg.height;
                self.zoomImage = largeimage;
                self.zoomWindow.css('background-size', self.largeWidth + 'px ' + self.largeHeight + 'px');

                self.swapAction(smallimage, largeimage);
                return;
            };
            self.setImageSource(newImg, largeimage);  // this must be done AFTER setting onload
        },

        swapAction: function (smallimage, largeimage) {
            var self = this;
            var elemWidth = self.$elem.width();
            var elemHeight = self.$elem.height();
            var newImg2 = new Image();
            newImg2.onload = function () {
                //re-calculate values
                self.nzHeight = newImg2.height;
                self.nzWidth = newImg2.width;
                self.options.onImageSwapComplete(self.$elem);

                self.doneCallback();
                return;
            };
            self.setImageSource(newImg2, smallimage);

            //reset the zoomlevel to that initially set in options
            self.currentZoomLevel = self.options.zoomLevel;
            self.options.maxZoomLevel = false;

            //swaps the main image
            //self.$elem.attr('src',smallimage);
            //swaps the zoom image
            if (self.options.zoomType === 'lens') {
                self.zoomLens.css('background-image', 'url("' + largeimage + '")');
            }
            if (self.options.zoomType === 'window') {
                self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
            }
            if (self.options.zoomType === 'inner') {
                self.zoomWindow.css('background-image', 'url("' + largeimage + '")');
            }

            self.currentImage = largeimage;

            if (self.options.imageCrossfade) {
                var oldImg = self.$elem;
                var newImg = oldImg.clone();
                self.$elem.attr('src', smallimage);
                self.$elem.after(newImg);
                newImg.stop(true).fadeOut(self.options.imageCrossfade, function () {
                    $(this).remove();
                });

                // if(self.options.zoomType === 'inner'){
                //remove any attributes on the cloned image so we can resize later
                self.$elem.width('auto').removeAttr('width');
                self.$elem.height('auto').removeAttr('height');
                //   }

                oldImg.fadeIn(self.options.imageCrossfade);

                if (self.options.tint && self.options.zoomType !== 'inner') {

                    var oldImgTint = self.zoomTintImage;
                    var newImgTint = oldImgTint.clone();
                    self.zoomTintImage.attr('src', largeimage);
                    self.zoomTintImage.after(newImgTint);
                    newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function () {
                        $(this).remove();
                    });

                    oldImgTint.fadeIn(self.options.imageCrossfade);

                    //self.zoomTintImage.attr('width',elem.data('image'));

                    //resize the tint window
                    self.zoomTint.css({
                        height: elemHeight,
                        width: elemWidth
                    });
                }

                self.zoomContainer.css({
                    'height': elemHeight,
                    'width': elemWidth
                });

                if (self.options.zoomType === 'inner') {
                    if (!self.options.constrainType) {
                        self.zoomWrap.parent().css({
                            'height': elemHeight,
                            'width': elemWidth
                        });

                        self.zoomWindow.css({
                            'height': elemHeight,
                            'width': elemWidth
                        });
                    }
                }

                if (self.options.imageCrossfade) {
                    self.zoomWrap.css({
                        'height': elemHeight,
                        'width': elemWidth
                    });
                }
            }
            else {
                self.$elem.attr('src', smallimage);
                if (self.options.tint) {
                    self.zoomTintImage.attr('src', largeimage);
                    //self.zoomTintImage.attr('width',elem.data('image'));
                    self.zoomTintImage.attr('height', elemHeight);
                    //self.zoomTintImage.attr('src') = elem.data('image');
                    self.zoomTintImage.css('height', elemHeight);
                    self.zoomTint.css('height', elemHeight);

                }
                self.zoomContainer.css({
                    'height': elemHeight,
                    'width': elemWidth
                });

                if (self.options.imageCrossfade) {
                    self.zoomWrap.css({
                        'height': elemHeight,
                        'width': elemWidth
                    });
                }
            }
            if (self.options.constrainType) {

                //This will contrain the image proportions
                if (self.options.constrainType === 'height') {

                    var autoWDimension = {
                        'height': self.options.constrainSize,
                        'width': 'auto'
                    };
                    self.zoomContainer.css(autoWDimension);

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css(autoWDimension);
                        self.constwidth = self.zoomWrap.width();
                    }
                    else {
                        self.$elem.css(autoWDimension);
                        self.constwidth = elemWidth;
                    }

                    var constWDim = {
                        'height': self.options.constrainSize,
                        'width': self.constwidth
                    };
                    if (self.options.zoomType === 'inner') {

                        self.zoomWrap.parent().css(constWDim);
                        self.zoomWindow.css(constWDim);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css(constWDim);
                        self.zoomTint.css(constWDim);
                        self.zoomTintImage.css(constWDim);
                    }

                }
                if (self.options.constrainType === 'width') {
                    var autoHDimension = {
                        'height': 'auto',
                        'width': self.options.constrainSize
                    };
                    self.zoomContainer.css(autoHDimension);

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css(autoHDimension);
                        self.constheight = self.zoomWrap.height();
                    }
                    else {
                        self.$elem.css(autoHDimension);
                        self.constheight = elemHeight;
                    }

                    var constHDim = {
                        'height': self.constheight,
                        'width': self.options.constrainSize
                    };
                    if (self.options.zoomType === 'inner') {
                        self.zoomWrap.parent().css(constHDim);
                        self.zoomWindow.css(constHDim);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css(constHDim);
                        self.zoomTint.css(constHDim);
                        self.zoomTintImage.css(constHDim);
                    }
                }
            }
        },

        doneCallback: function () {
            var self = this;
            if (self.options.loadingIcon) {
                self.spinner.hide();
            }

            self.nzOffset = self.$elem.offset();
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();

            // reset the zoomlevel back to default
            self.currentZoomLevel = self.options.zoomLevel;

            //ratio of the large to small image
            self.widthRatio = self.largeWidth / self.nzWidth;
            self.heightRatio = self.largeHeight / self.nzHeight;

            //NEED TO ADD THE LENS SIZE FOR ROUND
            // adjust images less than the window height
            if (self.options.zoomType === 'window') {
                var lensHeight, lensWidth;

                if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
                    lensHeight = self.nzHeight;

                }
                else {
                    lensHeight = String((self.options.zoomWindowHeight / self.heightRatio));
                }

                if (self.nzWidth < self.options.zoomWindowWidth) {
                    lensWidth = self.nzWidth;
                }
                else {
                    lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                }

                if (self.zoomLens) {
                    self.zoomLens.css({
                        'width': lensWidth,
                        'height': lensHeight
                    });
                }
            }
        },

        getCurrentImage: function () {
            var self = this;
            return self.zoomImage;
        },

        getGalleryList: function () {
            var self = this;
            //loop through the gallery options and set them in list for fancybox
            self.gallerylist = [];
            if (self.options.gallery) {
                $('#' + self.options.gallery + ' a').each(function () {

                    var imgSrc = '';
                    if ($(this).data('zoom-image')) {
                        imgSrc = $(this).data('zoom-image');
                    }
                    else if ($(this).data('image')) {
                        imgSrc = $(this).data('image');
                    }
                    //put the current image at the start
                    if (imgSrc === self.zoomImage) {
                        self.gallerylist.unshift({
                            href: '' + imgSrc + '',
                            title: $(this).find('img').attr('title')
                        });
                    }
                    else {
                        self.gallerylist.push({
                            href: '' + imgSrc + '',
                            title: $(this).find('img').attr('title')
                        });
                    }
                });
            }
            //if no gallery - return current image
            else {
                self.gallerylist.push({
                    href: '' + self.zoomImage + '',
                    title: $(this).find('img').attr('title')
                });
            }
            return self.gallerylist;
        },

        changeZoomLevel: function (value) {
            var self = this;

            //flag a zoom, so can adjust the easing during setPosition
            self.scrollingLock = true;

            //round to two decimal places
            self.newvalue = parseFloat(value).toFixed(2);
            var newvalue = self.newvalue;

            //maxwidth & Maxheight of the image
            var maxheightnewvalue = self.largeHeight / ((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
            var maxwidthtnewvalue = self.largeWidth / ((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);

            //calculate new heightratio
            if (self.options.zoomType !== 'inner') {
                if (maxheightnewvalue <= newvalue) {
                    self.heightRatio = (self.largeHeight / maxheightnewvalue) / self.nzHeight;
                    self.newvalueheight = maxheightnewvalue;
                    self.fullheight = true;
                }
                else {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                    self.newvalueheight = newvalue;
                    self.fullheight = false;
                }

                // calculate new width ratio

                if (maxwidthtnewvalue <= newvalue) {
                    self.widthRatio = (self.largeWidth / maxwidthtnewvalue) / self.nzWidth;
                    self.newvaluewidth = maxwidthtnewvalue;
                    self.fullwidth = true;
                }
                else {
                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    self.newvaluewidth = newvalue;
                    self.fullwidth = false;
                }
                if (self.options.zoomType === 'lens') {
                    if (maxheightnewvalue <= newvalue) {
                        self.fullwidth = true;
                        self.newvaluewidth = maxheightnewvalue;
                    } else {
                        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;

                        self.fullwidth = false;
                    }
                }
            }

            if (self.options.zoomType === 'inner') {
                maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
                maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);
                if (newvalue > maxheightnewvalue) {
                    newvalue = maxheightnewvalue;
                }
                if (newvalue > maxwidthtnewvalue) {
                    newvalue = maxwidthtnewvalue;
                }

                if (maxheightnewvalue <= newvalue) {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                    if (newvalue > maxheightnewvalue) {
                        self.newvalueheight = maxheightnewvalue;
                    } else {
                        self.newvalueheight = newvalue;
                    }
                    self.fullheight = true;
                }
                else {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;

                    if (newvalue > maxheightnewvalue) {

                        self.newvalueheight = maxheightnewvalue;
                    } else {
                        self.newvalueheight = newvalue;
                    }
                    self.fullheight = false;
                }

                if (maxwidthtnewvalue <= newvalue) {

                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    if (newvalue > maxwidthtnewvalue) {

                        self.newvaluewidth = maxwidthtnewvalue;
                    } else {
                        self.newvaluewidth = newvalue;
                    }

                    self.fullwidth = true;
                }
                else {
                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    self.newvaluewidth = newvalue;
                    self.fullwidth = false;
                }
            } //end inner
            var scrcontinue = false;

            if (self.options.zoomType === 'inner') {
                if (self.nzWidth >= self.nzHeight) {
                    if (self.newvaluewidth <= maxwidthtnewvalue) {
                        scrcontinue = true;
                    }
                    else {
                        scrcontinue = false;
                        self.fullheight = true;
                        self.fullwidth = true;
                    }
                }
                if (self.nzHeight > self.nzWidth) {
                    if (self.newvaluewidth <= maxwidthtnewvalue) {
                        scrcontinue = true;
                    }
                    else {
                        scrcontinue = false;
                        self.fullheight = true;
                        self.fullwidth = true;
                    }
                }
            }

            if (self.options.zoomType !== 'inner') {
                scrcontinue = true;
            }

            if (scrcontinue) {
                self.zoomLock = 0;
                self.changeZoom = true;

                //if lens height is less than image height
                if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight) {
                    self.currentZoomLevel = self.newvalueheight;
                    if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
                        self.changeBgSize = true;
                        self.zoomLens.css('height', String(self.options.zoomWindowHeight / self.heightRatio) + 'px');
                    }
                    if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
                        self.changeBgSize = true;
                    }
                }

                if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth) {
                    if (self.options.zoomType !== 'inner') {
                        if (self.newvaluewidth > self.newvalueheight) {
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                    }

                    if (self.options.zoomType !== 'lens' && self.options.zoomType !== 'inner') {
                        self.changeBgSize = true;

                        self.zoomLens.css('width', String(self.options.zoomWindowWidth / self.widthRatio) + 'px');
                    }
                    if (self.options.zoomType === 'lens' || self.options.zoomType === 'inner') {
                        self.changeBgSize = true;
                    }

                }
                if (self.options.zoomType === 'inner') {
                    self.changeBgSize = true;

                    if (self.nzWidth > self.nzHeight) {
                        self.currentZoomLevel = self.newvaluewidth;
                    }
                    if (self.nzHeight > self.nzWidth) {
                        self.currentZoomLevel = self.newvaluewidth;
                    }
                }
            }      //under

            //sets the boundry change, called in setWindowPos
            self.setPosition(self.currentLoc);
            //
        },

        closeAll: function () {
            var self = this;
            if (self.zoomWindow) {
                self.zoomWindow.hide();
            }
            if (self.zoomLens) {
                self.zoomLens.hide();
            }
            if (self.zoomTint) {
                self.zoomTint.hide();
            }
        },

        changeState: function (value) {
            var self = this;
            if (value === 'enable') {
                self.options.zoomEnabled = true;
            }
            if (value === 'disable') {
                self.options.zoomEnabled = false;
            }
        },

        responsiveConfig: function (options) {
            if (options.respond && options.respond.length > 0) {
                return $.extend({}, options, this.configByScreenWidth(options));
            }
            return options;
        },

        configByScreenWidth: function (options) {
            var screenWidth = $(window).width();

            var config = $.grep(options.respond, function (item) {
                var range = item.range.split('-');
                return (screenWidth >= range[0]) && (screenWidth <= range[1]);
            });

            if (config.length > 0) {
                return config[0];
            } else {
                return options;
            }
        }
    };

    $.fn.ezPlus = function (options) {
        return this.each(function () {
            var elevate = Object.create(EZP);

            elevate.init(options, this);

            $.data(this, 'ezPlus', elevate);

        });
    };

    $.fn.ezPlus.options = {
        borderColour: '#888',
        borderSize: 4,
        constrainSize: false,  //in pixels the dimensions you want to constrain on
        constrainType: false,  //width or height
        containLensZoom: false,
        cursor: 'inherit', // user should set to what they want the cursor as, if they have set a click function
        debug: false,
        easing: false,
        easingAmount: 12,
        enabled: true,

        gallery: false,
        galleryActiveClass: 'zoomGalleryActive',
        gallerySelector: false,
        galleryItem: 'a',

        imageCrossfade: false,

        lensBorderColour: '#000',
        lensBorderSize: 1,
        lensColour: 'white', //colour of the lens background
        lensFadeIn: false,
        lensFadeOut: false,
        lensOpacity: 0.4, //opacity of the lens
        lensShape: 'square', //can be 'round'
        lensSize: 200,
        lenszoom: false,

        loadingIcon: false, //http://www.example.com/spinner.gif

        // This change will allow to decide if you want to decrease
        // zoom of one of the dimensions once the other reached it's top value,
        // or keep the aspect ratio, default behaviour still being as always,
        // allow to continue zooming out, so it keeps retrocompatibility.
        mantainZoomAspectRatio: false,
        maxZoomLevel: false,
        minZoomLevel: false,

        onComplete: $.noop,
        onDestroy: $.noop,
        onImageClick: $.noop,
        onImageSwap: $.noop,
        onImageSwapComplete: $.noop,
        onShow: $.noop,
        onZoomedImageLoaded: $.noop,

        preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
        respond: [],
        responsive: true,
        scrollZoom: false, //allow zoom on mousewheel, true to activate
        scrollZoomIncrement: 0.1,  //steps of the scrollzoom
        showLens: true,
        tint: false, //enable the tinting
        tintColour: '#333', //default tint color, can be anything, red, #ccc, rgb(0,0,0)
        tintOpacity: 0.4, //opacity of the tint
        touchEnabled: true,

        zoomActivation: 'hover', // Can also be click (PLACEHOLDER FOR NEXT VERSION)
        zoomContainerAppendTo: 'body', //zoom container parent selector
        zoomLevel: 1, //default zoom level of image
        zoomTintFadeIn: false,
        zoomTintFadeOut: false,
        zoomType: 'window', //window is default,  also 'lens' available -
        zoomWindowAlwaysShow: false,
        zoomWindowBgColour: '#fff',
        zoomWindowFadeIn: false,
        zoomWindowFadeOut: false,
        zoomWindowHeight: 400,
        zoomWindowOffsetX: 0,
        zoomWindowOffsetY: 0,
        zoomWindowPosition: 1,
        zoomWindowWidth: 400,
        zoomEnabled: true, //false disables zoomwindow from showing
        zIndex: 999
    };

})(jQuery, window, document);

/*!
 * paginga - jQuery Pagination Plugin v0.8.1
 * https://github.com/mrk-j/paginga
 *
 * Copyright 2017 Mark and other contributors
 * Released under the MIT license
 * https://github.com/mrk-j/paginga/blob/master/LICENSE
 */
;(function ($, window, document, undefined)
{
    "use strict";

        var pluginName = "paginga",
            defaults = {
                itemsPerPage: 3,
                itemsContainer: ".items",
                item: "> div",
                page: 1,
                nextPage: ".nextPage",
                previousPage: ".previousPage", 
                firstPage: ".firstPage",
                lastPage: ".lastPage",
                pageNumbers: ".pageNumbers",
                maxPageNumbers: false,
                currentPageClass: "active",
                pager: ".pager",
                autoHidePager: true,
                scrollToTop: {
                    offset: 15,
                    speed: 100,
                },
                history: false,
                historyHashPrefix: "page-"
            };

        // The actual plugin constructor
        function paginga(element, options)
        {
            this.element = element;
            this.settings = $.extend( true, {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this._ready = false;
            this.currentPage = this.settings.page;
            this.items = $(this.element).find(this.settings.itemsContainer + " " + this.settings.item);
            this.totalPages = Math.ceil(this.items.length / this.settings.itemsPerPage);

            if(this.totalPages <= 1)
            {
                $(this.element).find(this.settings.pager).hide();
            }
            else
            {
                this.init();
            }
        }

        $.extend(paginga.prototype,
        {
            init: function()
            {
                this.bindEvents();
                this.showPage();

                if(this.settings.history)
                {
                    var plugin = this;

                    if(window.location.hash)
                    {
                        var hash = parseInt(window.location.hash.substring(plugin.settings.historyHashPrefix.length + 1), 10);

                        if(hash <= plugin.totalPages && hash > 0)
                        {
                            plugin.currentPage = hash;
                            plugin.showPage.call(plugin);
                        }
                    }

                    window.addEventListener("popstate", function(event)
                    {
                        plugin.currentPage = event && event.state && event.state.page ? event.state.page : plugin.settings.page;
                        plugin.showPage.call(plugin);
                    });
                }

                this._ready = true;
            },
            bindEvents: function()
            {
                var plugin = this,
                    element = $(plugin.element),
                    previousElement = element.find(plugin.settings.previousPage),
                    nextElement = element.find(plugin.settings.nextPage),
                    firstElement = element.find(plugin.settings.firstPage),
                    lastElement = element.find(plugin.settings.lastPage);

                previousElement.on("click", function()
                {
                    plugin.showPreviousPage.call(plugin);
                });

                nextElement.on("click", function()
                {
                    plugin.showNextPage.call(plugin);
                });

                firstElement.on("click", function()
                {
                    plugin.showFirstPage.call(plugin);
                });

                lastElement.on("click", function()
                {
                    plugin.showLastPage.call(plugin);
                });
            },
            showPreviousPage: function()
            {
                this.currentPage--;

                if(this.currentPage <= 1)
                {
                    this.currentPage = 1;
                }

                this.setHistoryUrl();
                this.showPage();
            },
            showNextPage: function()
            {
                this.currentPage++;

                if(this.currentPage >= this.totalPages)
                {
                    this.currentPage = this.totalPages;
                }

                this.setHistoryUrl();
                this.showPage();
            },
            showFirstPage: function()
            {
                this.currentPage = 1;

                this.setHistoryUrl();
                this.showPage();
            },
            showLastPage: function()
            {
                this.currentPage = this.totalPages;

                this.setHistoryUrl();
                this.showPage();
            },
            showPage: function()
            {
                var firstItem = (this.currentPage * this.settings.itemsPerPage) - this.settings.itemsPerPage,
                    lastItem = firstItem + this.settings.itemsPerPage;

                $.each(this.items, function(index, item)
                {
                    if(index >= firstItem && index < lastItem)
                    {
                        $(item).show();

                        return true;
                    }

                    $(item).hide();
                });

                var plugin = this,
                    element = $(plugin.element),
                    previousElement = element.find(plugin.settings.previousPage),
                    nextElement = element.find(plugin.settings.nextPage),
                    firstElement = element.find(plugin.settings.firstPage),
                    lastElement = element.find(plugin.settings.lastPage);

                if(plugin._ready && plugin.settings.scrollToTop && (element.offset().top - plugin.settings.scrollToTop.offset) < $(window).scrollTop())
                {
                    $("html, body").animate({ scrollTop: (element.offset().top - plugin.settings.scrollToTop.offset) }, plugin.settings.scrollToTop.speed);
                }

                if(this.currentPage <= 1)
                {
                    previousElement.addClass("disabled");
                    firstElement.addClass("disabled");
                }
                else
                {
                    previousElement.removeClass("disabled");
                    firstElement.removeClass("disabled");
                }

                if(this.currentPage >= this.totalPages)
                {
                    nextElement.addClass("disabled");
                    lastElement.addClass("disabled");
                }
                else
                {
                    nextElement.removeClass("disabled");
                    lastElement.removeClass("disabled");
                }

                var pager = element.find(this.settings.pager),
                    pageNumbers = pager.find(this.settings.pageNumbers);

                if(pageNumbers)
                {
                    pageNumbers.html("");

                    var firstPage = 1;
                    var lastPage = this.totalPages;

                    if(this.settings.maxPageNumbers)
                    {
                        var offset = Math.ceil((this.settings.maxPageNumbers - 1) / 2);

                        firstPage = Math.max(1, this.currentPage - offset);
                        lastPage = Math.min(this.totalPages, this.currentPage + offset);

                        if(lastPage - firstPage < this.settings.maxPageNumbers - 1)
                        {
                            if(firstPage <= offset)
                            {
                                lastPage = Math.min(this.totalPages, firstPage + this.settings.maxPageNumbers - 1);
                            }
                            else if(lastPage > this.totalPages - offset)
                            {
                                firstPage = Math.max(1, lastPage - this.settings.maxPageNumbers + 1);
                            }
                        }
                    }

                    for(var pageNumber = firstPage; pageNumber <= lastPage; pageNumber++)
                    {
                        var className = pageNumber == this.currentPage ? this.settings.currentPageClass : "";

                        pageNumbers.append("<a href='javascript:void(0);' data-page='" + pageNumber + "' class='" + className + "'>" + pageNumber + "</a>");
                    }

                    pageNumbers.find("a").on("click", function()
                    {
                        plugin.currentPage = $(this).data("page");

                        plugin.setHistoryUrl.call(plugin);
                        plugin.showPage.call(plugin);
                    });
                }
            },
            setHistoryUrl: function()
            {
                var plugin = this;

                if(plugin._ready && plugin.settings.history && "pushState" in history)
                {
                    history.pushState({ page: this.currentPage }, null, '#' + plugin.settings.historyHashPrefix + this.currentPage);
                }
            }
        });

        $.fn[pluginName] = function(options)
        {
            return this.each(function()
            {
                if(!$.data(this, "plugin_" + pluginName))
                {
                    $.data(this, "plugin_" + pluginName, new paginga(this, options));
                }
            });
        };

})(jQuery, window, document);


$(document).ready(function () {
    $(document).on('click', '.plus', function () {
        var count = $(this).closest(".qty").find(".count");
        var count = $(this).siblings(".count");
        var count = $(this).parent().find(".count");
        $(count).val(parseInt($(count).val()) + 1);
        var qty = $(this).closest('.qty').find('.count');
        var price = $(this).closest('tr').find('[id*=price]');
        var total = $(this).closest('.row').find('[id*=lblsub]');
        var total1 = $(this).closest('.row').find('[id*=lbltotal]');
        $(total).text(parseFloat($(total).text()) + parseFloat($(price).val()));
        $(total1).text(parseFloat($(total1).text()) + parseFloat($(price).val()));
    });

    $(document).on('click', '.minus', function () {
        var count = $(this).closest(".qty").find(".count");
        var count = $(this).siblings(".count");
        var count = $(this).parent().find(".count");
        $(count).val(parseInt($(count).val()) - 1);
        var qty = $(this).closest('.qty').find('.count');
        var price = $(this).closest('tr').find('[id*=price]');
        var total = $(this).closest('.row').find('[id*=lblsub]');
        var total1 = $(this).closest('.row').find('[id*=lbltotal]');
        $(total).text(parseFloat($(total).text()) - parseFloat($(price).val()));
        $(total1).text(parseFloat($(total1).text()) - parseFloat($(price).val()));

    });
});
$(function () {
    $('[id*=btnSend]').on('click', function () {
        var id = $(this).closest('tr').find('td').eq(1).html().trim();
        var linetotal = $(this).closest('tr').find('td').eq(2).html().trim();
        var price = $(this).closest('tr').find("td:eq(5) input[type='text']").val().trim();
        var quantity = $(this).closest('tr').find("td:eq(6) input[type='text']").val();
        $.post("/Product/UpdateCart", { id: id, linetotal: linetotal, price: price, quantity: quantity }, function (r) {
        });
    });
});

$(function () {
    var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                    $(".gallery img").attr("style", "height:110px;width: 110px;padding:2px;border:1px solid blue");

                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    };

    $('#fileupload').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });
});
//$(function () {
//    $(".paginate").paginga({
//        itemsPerPage: 6
//    });

//    $(".paginate-page-2").paginga({
//        page: 2
//    });

//    $(".paginate-no-scroll").paginga({
//        scrollToTop: false
//    });
//});
function PagerClick(index) {
    document.getElementById("hfCurrentPageIndex").value = index;
    document.forms[0].submit();
}


$(document).ready(function () {
    $(document).on('click', '#plusdet', function () {
        $('.countQty').val(parseInt($('.countQty').val()) + 1);
    });
    $(document).on('click', '#minusdet', function () {
        $('.countQty').val(parseInt($('.countQty').val()) - 1);
        if ($('.countQty').val() == 0) {
            $('.countQty').val(1);
        }
    });
});

$("#img_01").ezPlus({
    tint: true,
    tintColour: '#F90', tintOpacity: 0.5
});

function myFunction(imgs) {
    var expandImg = document.getElementById("img_01");
    expandImg.src = imgs.src;
}
$('#SearchBar').change(function () {
    var value = this.value.toLowerCase();
    
    var dt = $('#myproductList #items').each(function () {
        var id = $(this).text().toLowerCase();
        $(this).toggle(id.indexOf(value) !== -1);
    //    $('#pagi').show();
    })
    //if (dt > -1) {
    //    $('#pagi').show();
    //}
    //else {
    //    $('#pagi').hide();
    //}

});
