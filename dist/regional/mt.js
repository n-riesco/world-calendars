/*
 * World Calendars
 * https://github.com/alexcjohnson/world-calendars
 *
 * Batch-converted from kbwood/calendars
 * Many thanks to Keith Wood and all of the contributors to the original project!
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

﻿/* http://keith-wood.name/calendars.html
   Maltese localisation for Gregorian/Julian calendars for jQuery.
   Written by Chritian Sciberras (uuf6429@gmail.com). */
var main = require('../main');
var _gregorian = main.calendars.gregorian;
var _julian = main.calendars.julian;

_gregorian.prototype.regionalOptions['mt'] = {
    name: 'Gregorian',
    epochs: ['BCE', 'CE'],
    monthNames: ['Jannar','Frar','Marzu','April','Mejju','Ġunju',
    'Lulju','Awissu','Settembru','Ottubru','Novembru','Diċembru'],
    monthNamesShort: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun',
    'Lul', 'Awi', 'Set', 'Ott', 'Nov', 'Diċ'],
    dayNames: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
    dayNamesShort: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
    dayNamesMin: ['Ħ','T','T','E','Ħ','Ġ','S'],
    digits: null,
    dateFormat: 'dd/mm/yyyy',
    firstDay: 1,
    isRTL: false
};
if (_julian) {
    _julian.prototype.regionalOptions['mt'] =
        _gregorian.prototype.regionalOptions['mt'];
}
