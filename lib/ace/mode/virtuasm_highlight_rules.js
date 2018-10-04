/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var VirtuASMHighlightRules = function() {
        var keywordOperators = (
            "ADR|LDR|MOV|MOVS|MVN|MVNS|STR|ADD|ADDS|SUB|SUBS|CMP|CMN|B|BLT|BLE|BGE|BGT|BEQ|BL|LDRB|" +
			"STRB|STMFD|STMFA|STMED|STMEA|LDMFD|LDMFA|LDMED|LDMEA|AND|ANDS|ORR|ORRS|EOR|EORS|BIC|BICS|" +
			"TST|TEQ|ADC|ADCS|SBC|SBCS|RSB|RSBS|RSC|RSCS|LSL|LSLS|LSR|LSRS|ASR|ASRS|ROR|RORS|RRX|RRXS|" +
			"MUL|MULS|END|NOP|CLZ"
        );

        var buildinFunctions = (
            "DCD|EQU|ORIGIN"
        );

        var keywordMapper = this.createKeywordMapper({
            "keyword.operator": keywordOperators,
            "function.buildin": buildinFunctions,
        }, "identifier", true);

        this.$rules = {
            "start" : [
                {
                    token : "comment",
                    regex : ";.*$"
                },
				{
					token : "constant.language",
					regex : "[rR](1[0-5]|[0-9])\\b|[sS][pP]\\b|[Pp][cC]\\b|[lL][rR]\\b|[fF][pP]\\b"
				},
				{
					token : "constant.numeric",
					regex : "#-?[0-9a-zA-Z]+\\b"
				},
				{
					token : "constant.numeric",
					regex : "-?[0-9]+\\b"
				},
				{
					token : "constant.numeric",
					regex : "0([xX]|b)[0-9A-Fa-f]+\\b"
				},
                DocCommentHighlightRules.getStartRule("doc-start"),
                {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }
            ]
        };

        this.embedRules(DocCommentHighlightRules, "doc-",
            [ DocCommentHighlightRules.getEndRule("start") ]);
    };

    oop.inherits(VirtuASMHighlightRules, TextHighlightRules);

    exports.VirtuASMHighlightRules = VirtuASMHighlightRules;
});
