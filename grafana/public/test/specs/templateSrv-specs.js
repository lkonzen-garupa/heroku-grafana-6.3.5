/*! grafana - v2.2.0-pre1 - 2015-09-02
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["mocks/dashboard-mock","lodash","features/templating/templateSrv"],function(a){"use strict";describe("templateSrv",function(){var b,c;beforeEach(module("grafana.services")),beforeEach(module(function(){c=a.create()})),beforeEach(inject(function(a){b=a})),describe("init",function(){beforeEach(function(){b.init([{name:"test",current:{value:"oogle"}}])}),it("should initialize template data",function(){var a=b.replace("this.[[test]].filters");expect(a).to.be("this.oogle.filters")})}),describe("replace can pass scoped vars",function(){beforeEach(function(){b.init([{name:"test",current:{value:"oogle"}}])}),it("should replace $test with scoped value",function(){var a=b.replace("this.$test.filters",{test:{value:"mupp",text:"asd"}});expect(a).to.be("this.mupp.filters")}),it("should replace $test with scoped text",function(){var a=b.replaceWithText("this.$test.filters",{test:{value:"mupp",text:"asd"}});expect(a).to.be("this.asd.filters")})}),describe("render variable to string values",function(){it("single value should return value",function(){var a=b.renderVariableValue({current:{value:"test"}});expect(a).to.be("test")}),it("multi value and glob format should render glob string",function(){var a=b.renderVariableValue({multiFormat:"glob",current:{value:["test","test2"]}});expect(a).to.be("{test,test2}")}),it("multi value and regex format should render regex string",function(){var a=b.renderVariableValue({multiFormat:"regex values",current:{value:["test","test2"]}});expect(a).to.be("(test|test2)")})}),describe("can check if variable exists",function(){beforeEach(function(){b.init([{name:"test",current:{value:"oogle"}}])}),it("should return true if exists",function(){var a=b.variableExists("$test");expect(a).to.be(!0)})}),describe("can hightlight variables in string",function(){beforeEach(function(){b.init([{name:"test",current:{value:"oogle"}}])}),it("should insert html",function(){var a=b.highlightVariablesAsHtml("$test");expect(a).to.be('<span class="template-variable">$test</span>')}),it("should insert html anywhere in string",function(){var a=b.highlightVariablesAsHtml("this $test ok");expect(a).to.be('this <span class="template-variable">$test</span> ok')}),it("should ignore if variables does not exist",function(){var a=b.highlightVariablesAsHtml("this $google ok");expect(a).to.be("this $google ok")})}),describe("when checking if a string contains a variable",function(){beforeEach(function(){b.init([{name:"test",current:{value:"muuuu"}}])}),it("should find it with $var syntax",function(){var a=b.containsVariable("this.$test.filters","test");expect(a).to.be(!0)}),it("should find it with [[var]] syntax",function(){var a=b.containsVariable("this.[[test]].filters","test");expect(a).to.be(!0)})}),describe("updateTemplateData with simple value",function(){beforeEach(function(){b.init([{name:"test",current:{value:"muuuu"}}])}),it("should set current value and update template data",function(){var a=b.replace("this.[[test]].filters");expect(a).to.be("this.muuuu.filters")})}),describe("fillVariableValuesForUrl with multi value",function(){beforeEach(function(){b.init([{name:"test",current:{value:["val1","val2"]}}])}),it("should set multiple url params",function(){var a={};b.fillVariableValuesForUrl(a),expect(a["var-test"]).to.eql(["val1","val2"])})}),describe("fillVariableValuesForUrl with multi value and scopedVars",function(){beforeEach(function(){b.init([{name:"test",current:{value:["val1","val2"]}}])}),it("should set multiple url params",function(){var a={};b.fillVariableValuesForUrl(a,{test:{value:"val1"}}),expect(a["var-test"]).to.eql("val1")})}),describe("replaceWithText",function(){beforeEach(function(){b.init([{name:"server",current:{value:"{asd,asd2}",text:"All"}},{name:"period",current:{value:"$__auto_interval",text:"auto"}}]),b.setGrafanaVariable("$__auto_interval","13m"),b.updateTemplateData()}),it("should replace with text except for grafanaVariables",function(){var a=b.replaceWithText("Server: $server, period: $period");expect(a).to.be("Server: All, period: 13m")})})})});