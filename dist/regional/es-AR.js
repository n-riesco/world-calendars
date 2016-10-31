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
   Spanish/Argentina localisation for Gregorian/Julian calendars for jQuery.
   Written by Esteban Acosta Villafane (esteban.acosta@globant.com) of Globant (http://www.globant.com). */
var main = require('../main');
var _gregorian = main.calendars.gregorian;
var _julian = main.calendars.julian;

_gregorian.prototype.regionalOptions['es-AR'] = {
    name: 'Gregorian',
    epochs: ['BCE', 'CE'],
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
    digits: null,
    dateFormat: 'dd/mm/yyyy',
    firstDay: 0,
    isRTL: false
};
if (_julian) {
    _julian.prototype.regionalOptions['es-AR'] =
        _gregorian.prototype.regionalOptions['es-AR'];
}
